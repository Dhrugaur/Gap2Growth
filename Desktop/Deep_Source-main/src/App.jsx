import { useState, useEffect, useRef } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import { supabase } from "./lib/supabaseClient";
import { getOnboardingProfile, saveOnboardingProfile } from "./lib/profileService";
import { LogoutConfirmModal } from "./components/LogoutConfirmModal";
import { AIMentorPage } from "./components/AIMentorPage";
import { DashboardPage } from "./components/DashboardPage";
import { RepoExplorerPage } from "./components/RepoExplorerPage";
import { AchievementsPage } from "./components/AchievementsPage";
import { ProfilePage } from "./components/ProfilePage";
import { OnboardingQuiz } from "./components/OnboardingQuiz";
import {
  PixelDashboard,
  PixelRepo,
  PixelTrophy,
  RobotPixelAvatar,
  PixelSettings,
  UserPixelAvatar,
  PixelSearch,
  PixelPlus,
  PixelBell,
} from "./components/PixelIcons";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activePage, setActivePage] = useState("Dashboard");
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [isSavingQuiz, setIsSavingQuiz] = useState(false);
  const [quizSaveError, setQuizSaveError] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // 1. Session check on page load & subscription (no async queries inside callback)
  useEffect(() => {
    let isMounted = true;

    supabase.auth
      .getSession()
      .then(({ data: { session: initialSession }, error }) => {
        if (!isMounted) return;
        if (error) {
          console.error("Error retrieving Supabase session:", error);
        }
        setSession(initialSession);
        if (!initialSession) {
          setAuthLoading(false);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Unexpected error retrieving Supabase session:", err);
        setAuthLoading(false);
      });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      if (!isMounted) return;
      setSession(currentSession);
      if (!currentSession) {
        setOnboardingCompleted(false);
        setUserProfile(null);
        setAuthLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  // 2. Fetch onboarding status whenever session user changes
  useEffect(() => {
    let isMounted = true;
    const user = session?.user;

    if (!user?.id) {
      return;
    }

    getOnboardingProfile(user)
      .then((profile) => {
        if (!isMounted) return;
        if (profile?.onboarding_completed) {
          setOnboardingCompleted(true);
          setUserProfile(profile);
        } else {
          setOnboardingCompleted(false);
          setUserProfile(profile);
        }
      })
      .catch((err) => {
        if (!isMounted) return;
        console.error("Failed to load user onboarding status:", err);
        setOnboardingCompleted(false);
      })
      .finally(() => {
        if (isMounted) {
          setAuthLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [session?.user]);

  // 3. Route guards & URL synchronization
  useEffect(() => {
    if (authLoading) return;
    const path = window.location.pathname;

    if (!session) {
      if (path !== "/login" && path !== "/") {
        window.history.replaceState(null, "", "/login");
      }
    } else if (!onboardingCompleted) {
      if (path !== "/onboarding") {
        window.history.replaceState(null, "", "/onboarding");
      }
    } else {
      if (path === "/login" || path === "/onboarding") {
        window.history.replaceState(null, "", "/dashboard");
      }
    }
  }, [authLoading, session, onboardingCompleted]);

  // 4. Popstate navigation guard
  useEffect(() => {
    const handlePopState = () => {
      if (authLoading) return;
      const path = window.location.pathname;

      if (!session) {
        if (path !== "/login" && path !== "/") {
          window.history.replaceState(null, "", "/login");
        }
      } else if (!onboardingCompleted) {
        if (path !== "/onboarding") {
          window.history.replaceState(null, "", "/onboarding");
        }
      } else {
        if (path === "/login" || path === "/onboarding") {
          window.history.replaceState(null, "", "/dashboard");
          setActivePage("Dashboard");
        }
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [authLoading, session, onboardingCompleted]);

  // 5. Close profile dropdown when clicking outside
  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClickOutside = (e) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(e.target)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileMenuOpen]);

  // Handlers for Logout Confirmation Modal
  const handleRequestSignOut = () => {
    setProfileMenuOpen(false);
    setLogoutError(null);
    setShowLogoutModal(true);
  };

  const handleConfirmSignOut = async () => {
    setIsLoggingOut(true);
    setLogoutError(null);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        setLogoutError(error.message || "Failed to sign out. Please try again.");
        setIsLoggingOut(false);
        return;
      }
      setSession(null);
      setUserProfile(null);
      setOnboardingCompleted(false);
      setActivePage("Dashboard");
      setShowLogoutModal(false);
      setIsLoggingOut(false);
      window.history.replaceState(null, "", "/login");
    } catch (err) {
      setLogoutError(err.message || "An unexpected error occurred during sign out.");
      setIsLoggingOut(false);
    }
  };

  // Handler for Onboarding Completion
  const handleQuizComplete = async (quizData) => {
    if (!session?.user) return;
    setIsSavingQuiz(true);
    setQuizSaveError(null);

    try {
      const savedProfile = await saveOnboardingProfile(session.user, quizData);
      setUserProfile(savedProfile);
      setOnboardingCompleted(true);
      window.history.replaceState(null, "", "/dashboard");
    } catch (err) {
      console.error("Error saving onboarding quiz:", err);
      setQuizSaveError(
        err.message || "Failed to save your preferences. Please try again."
      );
    } finally {
      setIsSavingQuiz(false);
    }
  };

  // Loading state while checking auth session on startup/redirect
  if (authLoading) {
    return (
      <div className="auth-loading-screen" role="status" aria-live="polite">
        <div className="auth-loading-spinner" />
        <p className="auth-loading-text">Connecting to Deep Source...</p>
      </div>
    );
  }

  // Not authenticated: Show login screen
  if (!session) {
    return (
      <Login
        onLogin={(userSession) => {
          setSession(userSession);
        }}
      />
    );
  }

  // Authenticated but onboarding incomplete: Show onboarding quiz
  if (!onboardingCompleted) {
    return (
      <>
        <OnboardingQuiz
          onComplete={handleQuizComplete}
          onSignOut={handleRequestSignOut}
          isSaving={isSavingQuiz}
          saveError={quizSaveError}
        />
        <LogoutConfirmModal
          isOpen={showLogoutModal}
          onCancel={() => {
            setShowLogoutModal(false);
            setLogoutError(null);
          }}
          onConfirm={handleConfirmSignOut}
          isLoggingOut={isLoggingOut}
          errorMessage={logoutError}
        />
      </>
    );
  }

  // Metadata for current authenticated user
  const userMetadata = session?.user?.user_metadata || {};
  const userDisplayName =
    userMetadata.full_name ||
    userMetadata.name ||
    session?.user?.email?.split("@")[0] ||
    "Developer";
  const userEmail = session?.user?.email || "";
  const avatarUrl = userMetadata.avatar_url || userMetadata.picture || null;
  const authProvider =
    session?.user?.app_metadata?.provider ||
    session?.user?.identities?.[0]?.provider ||
    "account";

  // =========================
  // RENDER PIXEL ICON
  // =========================

  const renderSidebarIcon = (name, isActive) => {
    switch (name) {
      case "Dashboard":
        return <PixelDashboard size={20} />;
      case "Repository Explorer":
        return <PixelRepo size={20} />;
      case "Achievements":
        return <PixelTrophy size={20} />;
      case "AI Mentor":
        return <RobotPixelAvatar size={20} animated={false} />;
      case "Settings":
        return <PixelSettings size={20} color={isActive ? "#f0f6fc" : "#8b949e"} />;
      case "Profile":
        return <UserPixelAvatar size={20} />;
      default:
        return null;
    }
  };

  // =========================
  // SIDEBAR MENU ITEMS (PIXEL ART)
  // =========================

  const menuItems = [
    {
      name: "Dashboard",
      badge: "LIVE",
      badgeType: "live",
      accent: "#22c55e",
    },
    {
      name: "Repository Explorer",
      badge: "12",
      badgeType: "count",
      accent: "#38bdf8",
    },
    {
      name: "Achievements",
      badge: "3/12",
      badgeType: "progress",
      accent: "#facc15",
    },
    {
      name: "AI Mentor",
      badge: "AI",
      badgeType: "ai",
      accent: "#c084fc",
    },
  ];

  const bottomItems = [
    {
      name: "Settings",
      badge: "v1.2",
      badgeType: "version",
      accent: "#94a3b8",
    },
    {
      name: "Profile",
      badge: "LVL 32",
      badgeType: "lvl",
      accent: "#22c55e",
    },
  ];

  // =========================
  // PAGE CHANGE
  // =========================

  const handlePageChange = (page) => {
    setActivePage(page);
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  // =========================
  const toggleSidebar = () => {
    setSidebarOpen((previous) => !previous);
  };

  return (
    <div className="app">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="header">

        {/* MENU BUTTON */}

        <button
          className="menu-button"
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          title="Menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ shapeRendering: "crispEdges" }}>
            <rect x="2" y="4" width="16" height="2" fill="#94a3b8" />
            <rect x="2" y="9" width="16" height="2" fill="#94a3b8" />
            <rect x="2" y="14" width="16" height="2" fill="#94a3b8" />
          </svg>
        </button>




        {/* SEARCH */}

        <div className="search-container">

          <div className="search-icon-left">
            <PixelSearch size={15} color="#64748b" />
          </div>

          <input
            type="text"
            placeholder="Search repositories, issues, people..."
            aria-label="Search"
          />

          <div className="search-shortcut">/</div>

        </div>


        {/* RIGHT ACTIONS */}

        <div className="header-right">

          {/* PLUS CREATE */}

          <button
            className="plus-button"
            aria-label="Create new repository or issue"
            title="Create new..."
          >
            <PixelPlus size={16} color="#e6edf3" />
          </button>


          {/* NOTIFICATION */}

          <button
            className="header-icon"
            aria-label="Notifications (3 unread)"
            title="Notifications"
          >
            <PixelBell size={20} color="#e6edf3" />

            <div className="notification-badge">
              3
            </div>

          </button>


          {/* USER PROFILE & DROPDOWN MENU */}
          <div className="header-profile-menu-container" ref={profileMenuRef}>
            <button
              className="header-profile"
              aria-label="User profile menu"
              aria-expanded={profileMenuOpen}
              type="button"
              onClick={() => setProfileMenuOpen((prev) => !prev)}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={userDisplayName}
                  className="header-avatar-img"
                />
              ) : (
                <UserPixelAvatar size={34} />
              )}
            </button>

            {profileMenuOpen && (
              <div className="header-profile-dropdown" role="menu">
                <div className="dropdown-user-header">
                  <span className="dropdown-user-name">{userDisplayName}</span>
                  <span className="dropdown-user-email">{userEmail}</span>
                  <span className="dropdown-provider-tag">{authProvider}</span>
                </div>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item"
                  role="menuitem"
                  onClick={() => {
                    setProfileMenuOpen(false);
                    handlePageChange("Profile");
                  }}
                >
                  <UserPixelAvatar size={16} />
                  <span>Your Profile</span>
                </button>
                <div className="dropdown-divider" />
                <button
                  type="button"
                  className="dropdown-item dropdown-item-logout"
                  role="menuitem"
                  onClick={handleRequestSignOut}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </header>


      {/* =====================================================
          SIDEBAR (EXACT MATCH TO REFERENCE SCREENSHOT)
      ===================================================== */}

      <aside
        className={`sidebar ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Top Brand Section */}
        <div className="sidebar-brand-header">
          <div className="brand-hex-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="2" width="20" height="20" rx="5" fill="#161b22" stroke="#30363d" strokeWidth="1.5" />
              <path
                d="M8 9.5L5.5 12L8 14.5M16 9.5L18.5 12L16 14.5M13.5 8L10.5 16"
                stroke="#3fb950"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="brand-logo-text-wrap">
            <div className="brand-logo-text">
              <span className="brand-deep">Deep</span>{" "}
              <span className="brand-source">Source</span>
            </div>
            <span className="brand-subtitle">Open Source Made Simple</span>
          </div>
        </div>

        {/* SECTION 1: NAVIGATION */}
        <div className="sidebar-section-row">
          <span className="section-name">NAVIGATION</span>
        </div>

        <nav className="sidebar-cards-list">
          {menuItems.map((item) => {
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                className={`sidebar-nav-card ${isActive ? "card-active" : ""}`}
                onClick={() => handlePageChange(item.name)}
              >
                {isActive && <div className="card-active-indicator" />}

                <div className="card-icon-box">
                  {renderSidebarIcon(item.name, isActive)}
                </div>

                <span className="card-label">
                  {item.name}
                </span>

                {/* Badges */}
                {item.name === "Dashboard" && (
                  <span className="badge-live-dot">
                    LIVE <span className="badge-green-dot">•</span>
                  </span>
                )}
                {item.name === "Repository Explorer" && (
                  <span className="badge-cyan-pill">12</span>
                )}
                {item.name === "Achievements" && (
                  <span className="badge-gold-pill">3 / 12</span>
                )}
                {item.name === "AI Mentor" && (
                  <span className="badge-purple-pill">AI</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* SECTION 2: SYSTEM */}
        <div className="sidebar-divider" />
        <div className="sidebar-section-row section-system">
          <span className="section-name">SYSTEM</span>
        </div>

        <nav className="sidebar-cards-list">
          {bottomItems.map((item) => {
            const isActive = activePage === item.name;
            return (
              <button
                key={item.name}
                className={`sidebar-nav-card ${isActive ? "card-active" : ""}`}
                onClick={() => handlePageChange(item.name)}
              >
                {isActive && <div className="card-active-indicator" />}

                <div className="card-icon-box">
                  {renderSidebarIcon(item.name, isActive)}
                </div>

                <span className="card-label">
                  {item.name}
                </span>

                {item.name === "Settings" && (
                  <span className="badge-gray-pill">v1.2</span>
                )}
                {item.name === "Profile" && (
                  <span className="badge-green-pill">LVL 32</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* BOTTOM SECTION: USER PROFILE & PROGRESS CARD */}
        <div className="sidebar-bottom-area">
          <div className="sidebar-user-hud-box">
            <div className="hud-header-line">
              <div className="hud-user-info">
                <span className="hud-role-tag">USER · DEVELOPER</span>
                <span className="hud-lvl-text">LVL 32</span>
              </div>
              <div className="hud-mascot">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ shapeRendering: "crispEdges" }}>
                  <rect x="6" y="2" width="2" height="4" fill="#3fb950" />
                  <rect x="16" y="2" width="2" height="4" fill="#3fb950" />
                  <rect x="4" y="6" width="16" height="12" fill="#21262d" stroke="#30363d" strokeWidth="1" />
                  <rect x="7" y="10" width="3" height="3" fill="#3fb950" />
                  <rect x="14" y="10" width="3" height="3" fill="#3fb950" />
                  <rect x="10" y="14" width="4" height="1" fill="#3fb950" />
                </svg>
              </div>
            </div>

            <div className="hud-progress-col">
              <div className="hud-bar-track">
                <div className="hud-bar-fill" style={{ width: "78.5%" }} />
              </div>
              <div className="hud-xp-subtext">
                <span>XP Progress</span>
                <span>785 / 1000 XP</span>
              </div>
            </div>
          </div>
        </div>

      </aside>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="main">

        <section className="main-content">

          {/* ================= DASHBOARD ================= */}

          {activePage === "Dashboard" && (
            <DashboardPage onNavigate={setActivePage} />
          )}


          {/* ================= REPOSITORY EXPLORER ================= */}

          {activePage === "Repository Explorer" && (
            <RepoExplorerPage onNavigate={setActivePage} />
          )}


          {/* ================= ACHIEVEMENTS ================= */}

          {activePage === "Achievements" && (
            <AchievementsPage onNavigate={setActivePage} />
          )}


          {/* ================= AI MENTOR ================= */}

          {activePage === "AI Mentor" && (
            <AIMentorPage />
          )}


          {/* ================= PROFILE ================= */}

          {activePage === "Profile" && (
            <ProfilePage
              onNavigate={setActivePage}
              onSignOut={handleRequestSignOut}
              currentUser={session?.user}
              userProfile={userProfile}
            />
          )}


          {/* ================= OTHER PAGES ================= */}

          {activePage !== "AI Mentor" &&
            activePage !== "Dashboard" &&
            activePage !== "Repository Explorer" &&
            activePage !== "Achievements" &&
            activePage !== "Profile" && (
            <div className="page-placeholder">

              <h1>
                {activePage}
              </h1>

              <p>
                {activePage} page content will be added here.
              </p>

              <button
                className="back-btn"
                onClick={() =>
                  setActivePage("Dashboard")
                }
              >
                Return to Dashboard
              </button>

            </div>
          )}





        </section>

      </main>

      {/* =====================================================
          LOGOUT CONFIRMATION MODAL
      ===================================================== */}
      <LogoutConfirmModal
        isOpen={showLogoutModal}
        onCancel={() => {
          setShowLogoutModal(false);
          setLogoutError(null);
        }}
        onConfirm={handleConfirmSignOut}
        isLoggingOut={isLoggingOut}
        errorMessage={logoutError}
      />
    </div>
  );
}

export default App;