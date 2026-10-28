import { useState, useEffect } from "react";
import "./Login.css";
import "./animations.css";
import { supabase } from "../../lib/supabaseClient";

function RobotMascot() {
  return (
    <div className="mascot-wrapper">
      <svg
        className="login-robot"
        viewBox="0 0 100 86"
        aria-hidden="true"
      >
        <defs>
          <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22c55e" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Ambient sparkle crosses */}
        <g fill="#a855f7" className="robot-sparkles">
          {/* Top-left sparkle */}
          <path d="M 18 20 H 22 V 24 H 18 Z M 20 17 V 27 M 15 22 H 25" stroke="#9333ea" strokeWidth="1.5" />
          {/* Top-right sparkle */}
          <path d="M 80 23 H 84 V 27 H 80 Z M 82 20 V 30 M 77 25 H 87" stroke="#a855f7" strokeWidth="1.5" />
          {/* Middle-left sparkle */}
          <path d="M 14 44 H 18 V 48 H 14 Z M 16 41 V 51 M 11 46 H 21" stroke="#c084fc" strokeWidth="1.2" />
          {/* Bottom-right sparkle */}
          <path d="M 78 50 H 82 V 54 H 78 Z M 80 47 V 57 M 75 52 H 85" stroke="#8b5cf6" strokeWidth="1.2" />
        </g>

        {/* Antenna */}
        <circle cx="50" cy="11" r="4.5" fill="#22c55e" filter="url(#greenGlow)" />
        <rect x="48" y="15" width="4" height="6" fill="#475569" rx="1" />

        {/* Outer head / helmet */}
        <rect
          x="26"
          y="20"
          width="48"
          height="34"
          rx="10"
          fill="#161c2e"
          stroke="#334155"
          strokeWidth="2"
        />

        {/* Ear pads */}
        <rect x="21" y="27" width="5.5" height="19" rx="2.5" fill="#22c55e" />
        <rect x="23" y="30" width="2" height="13" fill="#4ade80" />

        <rect x="73.5" y="27" width="5.5" height="19" rx="2.5" fill="#22c55e" />
        <rect x="75" y="30" width="2" height="13" fill="#4ade80" />

        {/* Face screen */}
        <rect
          x="31"
          y="25"
          width="38"
          height="24"
          rx="5"
          fill="#060913"
          stroke="#1e293b"
          strokeWidth="1"
        />

        {/* Glowing eyes: ^  ^ */}
        <g stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#greenGlow)">
          <path d="M 37 37 L 42 32 L 47 37" />
          <path d="M 53 37 L 58 32 L 63 37" />
          {/* Cute smile */}
          <path d="M 47.5 42 L 52.5 42" strokeWidth="2.2" />
        </g>

        {/* Neck */}
        <rect x="44" y="54" width="12" height="4" fill="#0f172a" />

        {/* Shoulders / arms */}
        <rect x="22" y="60" width="8" height="16" rx="3.5" fill="#161c2e" stroke="#334155" strokeWidth="1" />
        <rect x="70" y="60" width="8" height="16" rx="3.5" fill="#161c2e" stroke="#334155" strokeWidth="1" />

        {/* Chest plate */}
        <path
          d="M 31 58 L 69 58 L 65 79 L 35 79 Z"
          fill="#192236"
          stroke="#334155"
          strokeWidth="1.5"
        />

        {/* Chest screen with </> */}
        <rect
          x="38"
          y="62"
          width="24"
          height="12"
          rx="2.5"
          fill="#060913"
          stroke="#22c55e"
          strokeWidth="1"
        />
        <text
          x="50"
          y="71"
          textAnchor="middle"
          fill="#22c55e"
          fontSize="9"
          fontFamily="'Fira Code', monospace"
          fontWeight="700"
          filter="url(#greenGlow)"
        >
          &lt;/&gt;
        </text>
      </svg>
    </div>
  );
}

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isGithubLoading, setIsGithubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(() => {
    if (typeof window === "undefined") return "";
    const hash = window.location.hash;
    const search = window.location.search;
    let errorDescription = "";

    if (hash && hash.includes("error=")) {
      const params = new URLSearchParams(hash.replace(/^#/, ""));
      errorDescription = params.get("error_description") || params.get("error");
    } else if (search && search.includes("error=")) {
      const params = new URLSearchParams(search);
      errorDescription = params.get("error_description") || params.get("error");
    }

    return errorDescription ? decodeURIComponent(errorDescription.replace(/\+/g, " ")) : "";
  });

  const [messageType, setMessageType] = useState(() => {
    if (typeof window === "undefined") return "info";
    const hash = window.location.hash;
    const search = window.location.search;
    return (hash && hash.includes("error=")) || (search && search.includes("error="))
      ? "error"
      : "info";
  });

  // Clean up URL error fragments if present so refreshing doesn't persist error
  useEffect(() => {
    if (
      (window.location.hash && window.location.hash.includes("error=")) ||
      (window.location.search && window.location.search.includes("error="))
    ) {
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleGithubLogin = async () => {
    // Prevent accidental repeated clicks while an auth request is active
    if (isGithubLoading || isGoogleLoading || isSubmitting) return;

    setIsGithubLoading(true);
    setMessage("");
    setMessageType("info");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setMessage(error.message || "Failed to initiate GitHub sign-in. Please try again.");
        setMessageType("error");
        setIsGithubLoading(false);
      }
      // On success, the browser will navigate to GitHub OAuth for authorization
    } catch (err) {
      setMessage(err.message || "An unexpected error occurred during GitHub login.");
      setMessageType("error");
      setIsGithubLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    // Prevent accidental repeated clicks while an auth request is active
    if (isGoogleLoading || isGithubLoading || isSubmitting) return;

    setIsGoogleLoading(true);
    setMessage("");
    setMessageType("info");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error("Google login failed:", error.message);
        setMessage(error.message || "Failed to initiate Google sign-in. Please try again.");
        setMessageType("error");
        setIsGoogleLoading(false);
      }
      // On success, the browser will navigate to Google OAuth for authorization
    } catch (err) {
      console.error("Google login failed:", err);
      setMessage(err.message || "An unexpected error occurred during Google login.");
      setMessageType("error");
      setIsGoogleLoading(false);
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setMessage("Enter your email and password to continue.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setMessage(error.message || "Invalid credentials.");
        setMessageType("error");
      } else if (data?.session) {
        if (onLogin) {
          onLogin(data.session);
        }
      }
    } catch (err) {
      setMessage(err.message || "An unexpected error occurred during login.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="deep-login">
      <h1 className="sr-only">Deep Source - Open Source Made Simple</h1>

      <div className="login-spacer" aria-hidden="true" />

      <section className="login-panel-wrap">
        <div className="login-panel">
          <RobotMascot />

          <h2 className="login-title">
            Welcome <span>Back!</span>
          </h2>
          <p className="login-subtitle">
            Login to continue your open source journey
          </p>

          <div className="social-login">
            <button
              type="button"
              className="social-button github-button"
              onClick={handleGithubLogin}
              disabled={isGithubLoading || isGoogleLoading || isSubmitting}
              aria-busy={isGithubLoading}
            >
              <svg viewBox="0 0 24 24" className="social-icon" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.23-1.62-1.23-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.7 1.15 1.7 1.15.99 1.69 2.6 1.2 3.23.92.1-.72.39-1.2.7-1.48-2.47-.28-5.07-1.24-5.07-5.5 0-1.22.44-2.21 1.15-2.99-.12-.28-.5-1.42.11-2.95 0 0 .94-.3 3.06 1.14a10.65 10.65 0 0 1 5.57 0c2.13-1.44 3.06-1.14 3.06-1.14.61 1.53.23 2.67.12 2.95.71.78 1.14 1.77 1.14 2.99 0 4.27-2.6 5.22-5.08 5.5.4.35.75 1.03.75 2.08v3.1c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z"
                />
              </svg>
              <span>{isGithubLoading ? "Connecting to GitHub..." : "Login with GitHub"}</span>
            </button>

            <button
              type="button"
              className="social-button google-button"
              onClick={handleGoogleLogin}
              disabled={isGoogleLoading || isGithubLoading || isSubmitting}
              aria-busy={isGoogleLoading}
            >
              <svg viewBox="0 0 48 48" className="social-icon" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5h6.6c3.9-3.6 6.1-8.8 6.1-14.9Z"
                />
                <path
                  fill="#34A853"
                  d="M24 44c5.5 0 10.1-1.8 13.5-4.7l-6.6-5c-1.8 1.2-4.1 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
                />
                <path
                  fill="#FBBC05"
                  d="M12.6 27.9a12 12 0 0 1 0-7.8v-5.2H5.8a20 20 0 0 0 0 18.2l6.8-5.2Z"
                />
                <path
                  fill="#EA4335"
                  d="M24 11.7c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.7 29.5 4 24 4A20 20 0 0 0 5.8 14.9l6.8 5.2c1.6-4.8 6.1-8.4 11.4-8.4Z"
                />
              </svg>
              <span>{isGoogleLoading ? "Connecting to Google..." : "Login with Google"}</span>
            </button>
          </div>

          <div className="login-divider">
            <span>OR</span>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <label htmlFor="login-email" className="input-label">
              Email
            </label>
            <div className="login-input-wrap">
              <svg viewBox="0 0 24 24" className="input-icon" aria-hidden="true">
                <path
                  d="M3 6h18v12H3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M3 7l9 7 9-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
              <input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>

            <label htmlFor="login-password" className="input-label">
              Password
            </label>
            <div className="login-input-wrap">
              <svg viewBox="0 0 24 24" className="input-icon" aria-hidden="true">
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="11"
                  rx="2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
                <path
                  d="M8 10V7a4 4 0 0 1 8 0v3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
              <input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg viewBox="0 0 24 24" className="eye-icon" aria-hidden="true">
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="3" fill="currentColor" />
                    <line x1="2" y1="2" x2="22" y2="22" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="eye-icon" aria-hidden="true">
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    />
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  </svg>
                )}
              </button>
            </div>

            <div className="login-options">
              <label className="remember-option">
                <input
                  type="checkbox"
                  className="pixel-checkbox"
                  checked={remember}
                  onChange={(event) => setRemember(event.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="forgot-link"
                onClick={() =>
                  setMessage(
                    "Password recovery needs to be connected to your authentication service."
                  )
                }
              >
                Forgot password?
              </button>
            </div>

            {message && (
              <p
                className={`login-message ${messageType === "error" ? "error" : ""}`}
                role={messageType === "error" ? "alert" : "status"}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              className="login-submit"
              disabled={isSubmitting || isGithubLoading || isGoogleLoading}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="signup-prompt">
            New here?{" "}
            <button
              type="button"
              className="signup-link"
              onClick={() =>
                setMessage("Account creation will be added in the next step.")
              }
            >
              Create an account
            </button>
          </p>
        </div>
      </section>
    </main>
  );
}
