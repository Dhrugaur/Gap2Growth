import { supabase } from "./supabaseClient";

/**
 * Retrieves the onboarding and profile status for a given authenticated user.
 * Queries public.profiles first. If table is not yet migrated, it checks user_metadata as fallback.
 *
 * @param {import('@supabase/supabase-js').User} user
 * @returns {Promise<{ id: string, onboarding_completed: boolean, quiz_responses: any, created_at?: string, updated_at?: string } | null>}
 */
export async function getOnboardingProfile(user) {
  if (!user || !user.id) return null;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, onboarding_completed, quiz_responses, created_at, updated_at")
      .eq("id", user.id)
      .maybeSingle();

    if (error) {
      // Check if table does not exist in Supabase (PostgreSQL 42P01)
      if (
        error.code === "42P01" ||
        error.message?.includes("does not exist") ||
        error.message?.includes("profiles")
      ) {
        console.warn(
          "Supabase 'profiles' table not found. Using user_metadata fallback until SQL migration is executed.",
          error
        );
        const metadata = user.user_metadata || {};
        return {
          id: user.id,
          onboarding_completed: Boolean(metadata.onboarding_completed),
          quiz_responses: metadata.quiz_responses || null,
          tableMissing: true,
        };
      }
      throw error;
    }

    if (data) {
      return data;
    }

    // No row found yet in profiles table: check user_metadata as fallback
    const metadata = user.user_metadata || {};
    return {
      id: user.id,
      onboarding_completed: Boolean(metadata.onboarding_completed),
      quiz_responses: metadata.quiz_responses || null,
    };
  } catch (err) {
    console.error("Error fetching user profile from Supabase:", err);
    // Fall back to metadata in session if network or DB issue occurred
    const metadata = user.user_metadata || {};
    return {
      id: user.id,
      onboarding_completed: Boolean(metadata.onboarding_completed),
      quiz_responses: metadata.quiz_responses || null,
      error: err,
    };
  }
}

/**
 * Persists onboarding completion and quiz responses for an authenticated user.
 * Upserts to public.profiles and syncs user_metadata in Supabase Auth.
 *
 * @param {import('@supabase/supabase-js').User} user
 * @param {object} quizData
 * @returns {Promise<{ id: string, onboarding_completed: boolean, quiz_responses: any, updated_at: string }>}
 */
export async function saveOnboardingProfile(user, quizData) {
  if (!user || !user.id) {
    throw new Error("No authenticated user found to save onboarding profile.");
  }

  const now = new Date().toISOString();
  const profilePayload = {
    id: user.id,
    onboarding_completed: true,
    quiz_responses: quizData,
    updated_at: now,
  };

  let dbSuccess = false;
  let dbError = null;

  // 1. Upsert into public.profiles
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(profilePayload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      dbError = error;
      console.warn("Could not upsert into 'profiles' table:", error.message);
    } else {
      dbSuccess = true;
      if (data?.created_at) {
        profilePayload.created_at = data.created_at;
      }
    }
  } catch (err) {
    dbError = err;
    console.warn("Exception writing to 'profiles' table:", err);
  }

  // 2. Also sync to user_metadata on the Supabase auth user
  try {
    const { error: metaError } = await supabase.auth.updateUser({
      data: {
        onboarding_completed: true,
        quiz_responses: quizData,
      },
    });

    if (metaError && !dbSuccess) {
      throw metaError;
    }
  } catch (metaErr) {
    console.warn("Could not update user_metadata:", metaErr);
    if (!dbSuccess) {
      throw dbError || metaErr;
    }
  }

  // If table write failed with an actual database error (and not just missing table), throw it
  if (dbError && dbError.code !== "42P01" && !dbError.message?.includes("does not exist")) {
    throw new Error(dbError.message || "Failed to save profile to database.");
  }

  return profilePayload;
}
