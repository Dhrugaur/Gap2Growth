import { supabase } from './supabase'

export async function loginWithGitHub() {
  const { data, error } =
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    })

  if (error) {
    console.error('GitHub login failed:', error.message)
    throw error
  }

  return data
}

