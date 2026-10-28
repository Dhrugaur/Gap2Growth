import { useState } from "react";
import "./OnboardingQuiz.css";

// Technologies list for Step 1
const TECH_OPTIONS = [
  { id: "js", name: "JavaScript", icon: "JS", color: "#f7df1e", bg: "#f7df1e22" },
  { id: "ts", name: "TypeScript", icon: "TS", color: "#3178c6", bg: "#3178c622" },
  { id: "python", name: "Python", icon: "🐍", color: "#38bdf8", bg: "#38bdf822" },
  { id: "java", name: "Java", icon: "☕", color: "#f97316", bg: "#f9731622" },
  { id: "cpp", name: "C++", icon: "C++", color: "#3b82f6", bg: "#3b82f622" },
  { id: "react", name: "React", icon: "⚛", color: "#61dafb", bg: "#61dafb22" },
  { id: "nextjs", name: "Next.js", icon: "N", color: "#ffffff", bg: "#ffffff22" },
  { id: "nodejs", name: "Node.js", icon: "JS", color: "#22c55e", bg: "#22c55e22" },
  { id: "html", name: "HTML", icon: "5", color: "#ea580c", bg: "#ea580c22" },
  { id: "css", name: "CSS", icon: "3", color: "#38bdf8", bg: "#38bdf822" },
  { id: "tailwind", name: "Tailwind CSS", icon: "🌊", color: "#38bdf8", bg: "#38bdf822" },
  { id: "github", name: "Git & GitHub", icon: "🐙", color: "#e2e8f0", bg: "#e2e8f022" },
  { id: "docker", name: "Docker", icon: "🐳", color: "#0ea5e9", bg: "#0ea5e922" },
  { id: "databases", name: "Databases", icon: "🗄️", color: "#a855f7", bg: "#a855f722" },
  { id: "other_tech", name: "Other", icon: "•••", color: "#94a3b8", bg: "#94a3b822" },
];

// Primary areas of interest for Step 1
const INTEREST_OPTIONS = [
  { id: "frontend", name: "Frontend Development", icon: "🖥️" },
  { id: "backend", name: "Backend Development", icon: "🗄️" },
  { id: "fullstack", name: "Full Stack", icon: "🥞" },
  { id: "devops", name: "DevOps", icon: "♾️" },
  { id: "uiux", name: "UI / UX", icon: "🎨" },
  { id: "ai", name: "Data Science / AI", icon: "🧠" },
  { id: "mobile", name: "Mobile Development", icon: "📱" },
  { id: "oss", name: "Open Source", icon: "🐙" },
  { id: "other_interest", name: "Other", icon: "•••" },
];

// 11 Detailed Interest Areas for Step 2
const STEP2_INTEREST_AREAS = [
  {
    id: "web_dev",
    title: "Web Development",
    desc: "Build websites and web applications",
    iconType: "code",
    iconColor: "#c084fc",
    iconBg: "rgba(192, 132, 252, 0.12)",
    iconBorder: "#c084fc55",
  },
  {
    id: "mobile_dev",
    title: "Mobile Development",
    desc: "Create mobile apps for iOS and Android",
    iconType: "mobile",
    iconColor: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.12)",
    iconBorder: "#38bdf855",
  },
  {
    id: "ds_ai",
    title: "Data Science / AI",
    desc: "Analyze data and build intelligent systems",
    iconType: "brain",
    iconColor: "#fb923c",
    iconBg: "rgba(251, 146, 60, 0.12)",
    iconBorder: "#fb923c55",
  },
  {
    id: "cloud",
    title: "Cloud Computing",
    desc: "Deploy, manage and scale cloud solutions",
    iconType: "cloud",
    iconColor: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.12)",
    iconBorder: "#38bdf855",
  },
  {
    id: "security",
    title: "Cyber Security",
    desc: "Protect systems and build secure apps",
    iconType: "shield",
    iconColor: "#f59e0b",
    iconBg: "rgba(245, 158, 11, 0.12)",
    iconBorder: "#f59e0b55",
  },
  {
    id: "gamedev",
    title: "Game Development",
    desc: "Create games and interactive experiences",
    iconType: "gamepad",
    iconColor: "#c084fc",
    iconBg: "rgba(192, 132, 252, 0.12)",
    iconBorder: "#c084fc55",
  },
  {
    id: "open_source",
    title: "Open Source",
    desc: "Contribute to open source projects",
    iconType: "opensource",
    iconColor: "#22c55e",
    iconBg: "rgba(34, 197, 94, 0.12)",
    iconBorder: "#22c55e55",
  },
  {
    id: "ui_ux",
    title: "UI / UX Design",
    desc: "Design beautiful and usable interfaces",
    iconType: "palette",
    iconColor: "#ec4899",
    iconBg: "rgba(236, 72, 153, 0.12)",
    iconBorder: "#ec489955",
  },
  {
    id: "embedded",
    title: "Embedded Systems",
    desc: "Work with hardware and embedded devices",
    iconType: "chip",
    iconColor: "#eab308",
    iconBg: "rgba(234, 179, 8, 0.12)",
    iconBorder: "#eab30855",
  },
  {
    id: "devops",
    title: "DevOps",
    desc: "Automate, deploy and improve workflows",
    iconType: "chart",
    iconColor: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.12)",
    iconBorder: "#38bdf855",
  },
  {
    id: "other",
    title: "Other",
    desc: "Something else that interests you",
    iconType: "dots",
    iconColor: "#94a3b8",
    iconBg: "rgba(148, 163, 184, 0.12)",
    iconBorder: "#94a3b855",
  },
];

// 4 Detailed Experience Levels for Step 3
const STEP3_EXPERIENCE_LEVELS = [
  {
    id: "beginner",
    title: "Beginner",
    subtitle: "New to open source and just getting started.",
    iconType: "sprout",
    iconColor: "#22c55e",
    iconBg: "rgba(34, 197, 94, 0.12)",
    iconBorder: "#22c55e55",
    bullets: [
      "New to coding or open source",
      "Need step-by-step guidance",
      "Learn the basics",
    ],
    recommended: true,
  },
  {
    id: "intermediate",
    title: "Intermediate",
    subtitle: "Have some experience and want to contribute more.",
    iconType: "rocket",
    iconColor: "#38bdf8",
    iconBg: "rgba(56, 189, 248, 0.12)",
    iconBorder: "#38bdf855",
    bullets: [
      "Some coding experience",
      "Made a few contributions",
      "Ready to take bigger tasks",
    ],
    recommended: false,
  },
  {
    id: "advanced",
    title: "Advanced",
    subtitle: "Comfortable with open source and complex projects.",
    iconType: "mountain",
    iconColor: "#c084fc",
    iconBg: "rgba(192, 132, 252, 0.12)",
    iconBorder: "#c084fc55",
    bullets: [
      "Regular contributor",
      "Work on complex projects",
      "Mentor others",
    ],
    recommended: false,
  },
  {
    id: "expert",
    title: "Expert",
    subtitle: "Open source veteran and community leader.",
    iconType: "trophy",
    iconColor: "#f97316",
    iconBg: "rgba(249, 115, 22, 0.12)",
    iconBorder: "#f9731655",
    bullets: [
      "Extensive experience",
      "Project maintainer",
      "Community leader",
    ],
    recommended: false,
  },
];

export function OnboardingQuiz({
  onComplete,
  onSkip,
  onSignOut = null,
  isSaving = false,
  saveError = null,
}) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // Step 1 Selections (start unselected so user can pick)
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [primaryInterest, setPrimaryInterest] = useState(null);

  // Step 2 Selections (start unselected so user can pick)
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Step 3 Selections (start unselected so user can pick)
  const [selectedExp, setSelectedExp] = useState(null);

  const toggleTech = (id) => {
    setSelectedTechs((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleInterest = (id) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    } else {
      if (onComplete && !isSaving) {
        onComplete({
          techs: selectedTechs,
          interest: primaryInterest,
          interests: selectedInterests,
          experience: selectedExp,
        });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Render SVG icons for Step 2 Cards
  const renderInterestIcon = (type, color) => {
    switch (type) {
      case "code":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        );
      case "mobile":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
            <line x1="12" y1="18" x2="12.01" y2="18" />
          </svg>
        );
      case "brain":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-5.04z" />
            <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-5.04z" />
          </svg>
        );
      case "cloud":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
          </svg>
        );
      case "shield":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        );
      case "gamepad":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="6" y1="12" x2="10" y2="12" />
            <line x1="8" y1="10" x2="8" y2="14" />
            <line x1="15" y1="13" x2="15.01" y2="13" />
            <line x1="18" y1="11" x2="18.01" y2="11" />
            <rect x="2" y="6" width="20" height="12" rx="2" />
          </svg>
        );
      case "opensource":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
            <path d="M2 12h20" />
          </svg>
        );
      case "palette":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="13.5" cy="6.5" r=".5" fill={color} />
            <circle cx="17.5" cy="10.5" r=".5" fill={color} />
            <circle cx="8.5" cy="7.5" r=".5" fill={color} />
            <circle cx="6.5" cy="12.5" r=".5" fill={color} />
            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
          </svg>
        );
      case "chip":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
            <rect x="9" y="9" width="6" height="6" />
            <line x1="9" y1="1" x2="9" y2="4" />
            <line x1="15" y1="1" x2="15" y2="4" />
            <line x1="9" y1="20" x2="9" y2="23" />
            <line x1="15" y1="20" x2="15" y2="23" />
            <line x1="20" y1="9" x2="23" y2="9" />
            <line x1="20" y1="14" x2="23" y2="14" />
            <line x1="1" y1="9" x2="4" y2="9" />
            <line x1="1" y1="14" x2="4" y2="14" />
          </svg>
        );
      case "chart":
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
        );
      case "dots":
      default:
        return (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="1" fill={color} />
            <circle cx="19" cy="12" r="1" fill={color} />
            <circle cx="5" cy="12" r="1" fill={color} />
          </svg>
        );
    }
  };

  // Render SVG icons for Step 3 Experience Cards
  const renderExpIcon = (type, color) => {
    switch (type) {
      case "sprout":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 20h10" />
            <path d="M10 20c0-6 4-9 8-9-1.5 5-5.5 8-8 9z" />
            <path d="M14 20c0-6-4-9-8-9 1.5 5 5.5 8 8 9z" />
          </svg>
        );
      case "rocket":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        );
      case "mountain":
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
            <path d="M4 15h6" />
            <path d="M14 15h4" />
          </svg>
        );
      case "trophy":
      default:
        return (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.45 1-1 1H7v2h10v-2h-2c-.55 0-1-.45-1-1v-2.34" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
          </svg>
        );
    }
  };

  const getExpLabel = (id) => {
    switch (id) {
      case "beginner": return "Beginner";
      case "intermediate": return "Intermediate";
      case "advanced": return "Advanced";
      case "expert": return "Expert";
      case "not_sure": return "Not sure / Undecided";
      default: return "Not selected";
    }
  };

  return (
    <div className="quiz-overlay">
      {/* Top Navbar */}
      <header className="quiz-topbar">
        <div className="quiz-logo-group">
          <div className="quiz-brand-emblem" aria-hidden="true">
            <svg viewBox="0 0 50 58">
              <path d="M25 2L47 15V42L25 55L3 42V15Z" fill="none" stroke="#22c55e" strokeWidth="2.5" />
              <text x="25" y="34" textAnchor="middle" fontSize="15" fill="#22c55e" fontFamily="'Fira Code', monospace" fontWeight="bold">&lt;/&gt;</text>
            </svg>
          </div>
          <div className="quiz-logo-text-group">
            <span className="quiz-logo-text">
              Deep <span className="logo-accent">Source</span>
            </span>
            <span className="quiz-logo-sub">Open Source Made Simple</span>
          </div>
        </div>

        <div className="quiz-topbar-right">
          <span className="quiz-tagline">Open Source Made Simple</span>
          <span className="quiz-status-dot" />
          {onSignOut && (
            <button
              className="quiz-skip-btn"
              onClick={onSignOut}
              title="Sign out of Deep Source"
              type="button"
            >
              ⎋ Sign Out
            </button>
          )}
          {onSkip && (
            <button className="quiz-skip-btn" onClick={onSkip}>
              Skip to Dashboard →
            </button>
          )}
        </div>
      </header>

      {/* Main Container */}
      <div className="quiz-content-wrapper">
        <div className="quiz-main-modal">
          
          {/* Pixel Corner Accents */}
          <div className="modal-corner corner-tl" />
          <div className="modal-corner corner-tr" />
          <div className="modal-corner corner-bl" />
          <div className="modal-corner corner-br" />

          {/* Header with Robot & Speech Bubble / Thumbs Up on Step 4 */}
          <div className="quiz-header-section">
            <div className="quiz-robot-wrap">
              {/* Confetti / Sparkles */}
              <div className="pixel-sparkle">✦</div>
              {currentStep === 4 && (
                <>
                  <div className="confetti-sparkle c-pink">◆</div>
                  <div className="confetti-sparkle c-yellow">■</div>
                  <div className="confetti-sparkle c-cyan">▲</div>
                  <div className="confetti-sparkle c-purple">★</div>
                </>
              )}

              {/* Pixel Robot Avatar */}
              <div className="quiz-pixel-robot">
                <svg
                  width={currentStep === 4 ? "64" : "54"}
                  height={currentStep === 4 ? "56" : "48"}
                  viewBox="0 0 100 86"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <filter id="greenGlowQuiz" x="-20%" y="-20%" width="140%" height="140%">
                      <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22c55e" floodOpacity="0.8" />
                    </filter>
                  </defs>

                  {/* Sparkles */}
                  <g fill="#a855f7" className="quiz-sparkles">
                    <path d="M 18 20 H 22 V 24 H 18 Z M 20 17 V 27 M 15 22 H 25" stroke="#9333ea" strokeWidth="1.5" />
                    <path d="M 80 23 H 84 V 27 H 80 Z M 82 20 V 30 M 77 25 H 87" stroke="#a855f7" strokeWidth="1.5" />
                  </g>

                  {/* Antenna */}
                  <circle cx="50" cy="11" r="4.5" fill="#22c55e" filter="url(#greenGlowQuiz)" />
                  <rect x="48" y="15" width="4" height="6" fill="#475569" rx="1" />

                  {/* Helmet */}
                  <rect x="26" y="20" width="48" height="34" rx="10" fill="#161c2e" stroke="#334155" strokeWidth="2" />

                  {/* Ear pads */}
                  <rect x="21" y="27" width="5.5" height="19" rx="2.5" fill="#22c55e" />
                  <rect x="73.5" y="27" width="5.5" height="19" rx="2.5" fill="#22c55e" />

                  {/* Face screen */}
                  <rect x="31" y="25" width="38" height="24" rx="5" fill="#060913" stroke="#1e293b" strokeWidth="1" />

                  {/* Glowing eyes: ^  ^ */}
                  <g stroke="#22c55e" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#greenGlowQuiz)">
                    <path d="M 37 37 L 42 32 L 47 37" />
                    <path d="M 53 37 L 58 32 L 63 37" />
                    <path d="M 47.5 42 L 52.5 42" strokeWidth="2.2" />
                  </g>

                  {/* Neck */}
                  <rect x="44" y="54" width="12" height="4" fill="#0f172a" />

                  {/* Shoulders */}
                  <rect x="22" y="60" width="8" height="16" rx="3.5" fill="#161c2e" stroke="#334155" strokeWidth="1" />
                  <rect x="70" y="60" width="8" height="16" rx="3.5" fill="#161c2e" stroke="#334155" strokeWidth="1" />

                  {/* Chest */}
                  <path d="M 31 58 L 69 58 L 65 79 L 35 79 Z" fill="#192236" stroke="#334155" strokeWidth="1.5" />
                  <rect x="38" y="62" width="24" height="12" rx="2.5" fill="#060913" stroke="#22c55e" strokeWidth="1" />
                  <text x="50" y="71" textAnchor="middle" fill="#22c55e" fontSize="9" fontFamily="'Fira Code', monospace" fontWeight="700" filter="url(#greenGlowQuiz)">&lt;/&gt;</text>
                </svg>
              </div>

              {/* Step 4 Checkmark Badge on Right */}
              {currentStep === 4 ? (
                <div className="step4-big-check-badge">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
              ) : (
                /* Speech Bubble on Steps 1, 2, 3 */
                <div className="quiz-speech-bubble">
                  {currentStep === 1 && (
                    <span className="bubble-text">Let's get started!</span>
                  )}
                  {currentStep === 2 && (
                    <div className="bubble-multi-lines">
                      <span className="bubble-text">Almost there!</span>
                      <span className="bubble-text">What interests <span className="text-highlight-green">you</span>?</span>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="bubble-multi-lines">
                      <span className="bubble-text">Nice! Let's level</span>
                      <span className="bubble-text">up your experience.</span>
                    </div>
                  )}
                  <div className="bubble-tail" />
                </div>
              )}
            </div>

            {/* Dynamic Step Title */}
            <h1 className="quiz-hero-title">
              {currentStep === 1 && (
                <>TELL US ABOUT YOUR <span className="title-green">SKILLS</span></>
              )}
              {currentStep === 2 && (
                <>WHAT ARE YOUR <span className="title-green">INTERESTS?</span></>
              )}
              {currentStep === 3 && (
                <>WHAT'S YOUR <span className="title-green">EXPERIENCE LEVEL?</span></>
              )}
              {currentStep === 4 && (
                <div className="step4-congrats-header">
                  <span className="congrats-line-1">CONGRATULATIONS!</span>
                  <span className="congrats-line-2">YOU'RE ALL SET!</span>
                </div>
              )}
            </h1>

            <p className="quiz-hero-subtitle">
              {currentStep === 1 && "This helps us find the best repositories and issues for you."}
              {currentStep === 2 && "Choose the areas you're most interested in. This helps us personalize your journey."}
              {currentStep === 3 && "This helps us personalize the best learning path and recommendations for you."}
              {currentStep === 4 && "Your profile is ready and your open source journey begins now."}
            </p>

            {/* Stepper Bar */}
            <div className="quiz-stepper">
              {/* Step 1 */}
              <div className={`step-item ${currentStep >= 1 ? "step-active" : ""}`}>
                <div className="step-circle">
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <span className="step-label">Skills</span>
              </div>
              <div className={`step-line ${currentStep >= 2 ? "line-active" : ""}`} />

              {/* Step 2 */}
              <div className={`step-item ${currentStep >= 2 ? "step-active" : ""}`}>
                <div className="step-circle">
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <span className="step-label">Interests</span>
              </div>
              <div className={`step-line ${currentStep >= 3 ? "line-active" : ""}`} />

              {/* Step 3 */}
              <div className={`step-item ${currentStep >= 3 ? "step-active" : ""}`}>
                <div className="step-circle">
                  {currentStep > 3 ? "✓" : "3"}
                </div>
                <span className="step-label">Experience</span>
              </div>
              <div className={`step-line ${currentStep >= 4 ? "line-active" : ""}`} />

              {/* Step 4 */}
              <div className={`step-item ${currentStep >= 4 ? "step-active" : ""}`}>
                <div className="step-circle">
                  {currentStep === 4 ? "✓" : "4"}
                </div>
                <span className="step-label">Complete</span>
              </div>
            </div>
          </div>

          {/* =========================================================
              STEP 1: SKILLS
          ========================================================= */}
          {currentStep === 1 && (
            <div className="quiz-step-content">
              <div className="quiz-question-block">
                <div className="question-header-row">
                  <span className="question-prompt">&gt;_ Select the technologies you are familiar with</span>
                  <span className="question-hint">(You can choose multiple)</span>
                </div>

                <div className="tech-chips-grid">
                  {TECH_OPTIONS.map((t) => {
                    const isSelected = selectedTechs.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        className={`tech-chip-btn ${isSelected ? "chip-selected" : ""}`}
                        onClick={() => toggleTech(t.id)}
                      >
                        <span
                          className="tech-icon-box"
                          style={{
                            color: t.color,
                            backgroundColor: t.bg,
                          }}
                        >
                          {t.icon}
                        </span>
                        <span className="tech-name">{t.name}</span>
                        {isSelected && <span className="tech-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="quiz-question-block">
                <div className="question-header-row">
                  <span className="question-prompt">&gt;_ What's your primary area of interest?</span>
                </div>

                <div className="interest-chips-grid">
                  {INTEREST_OPTIONS.map((i) => {
                    const isSelected = primaryInterest === i.id;
                    return (
                      <button
                        key={i.id}
                        className={`interest-chip-btn ${isSelected ? "interest-selected" : ""}`}
                        onClick={() => setPrimaryInterest((prev) => (prev === i.id ? null : i.id))}
                      >
                        <span className="interest-icon">{i.icon}</span>
                        <span className="interest-name">{i.name}</span>
                        {isSelected && <span className="interest-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 2: INTERESTS
          ========================================================= */}
          {currentStep === 2 && (
            <div className="quiz-step-content">
              <div className="quiz-question-block">
                <div className="question-header-row">
                  <span className="question-prompt">
                    <span className="terminal-chevron">&gt;</span> Select the areas that excite you <span className="question-hint-inline">(You can choose multiple)</span>
                  </span>
                </div>

                <div className="step2-interests-grid">
                  {STEP2_INTEREST_AREAS.map((item) => {
                    const isSelected = selectedInterests.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`step2-card ${isSelected ? "step2-card-selected" : ""}`}
                        onClick={() => toggleInterest(item.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            toggleInterest(item.id);
                          }
                        }}
                      >
                        <div
                          className="step2-icon-box"
                          style={{
                            backgroundColor: item.iconBg,
                            border: `1px solid ${item.iconBorder}`,
                          }}
                        >
                          {renderInterestIcon(item.iconType, item.iconColor)}
                        </div>

                        <div className="step2-card-text">
                          <span className="step2-card-title">{item.title}</span>
                          <span className="step2-card-desc">{item.desc}</span>
                        </div>

                        <div className={`step2-checkbox ${isSelected ? "step2-checked" : ""}`}>
                          {isSelected && <span>✓</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="step2-selection-counter">
                  <span className="counter-check-icon">✓</span>
                  <span>
                    You've selected <strong className="counter-number">{selectedInterests.length}</strong> interests
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 3: EXPERIENCE
          ========================================================= */}
          {currentStep === 3 && (
            <div className="quiz-step-content">
              <div className="quiz-question-block">
                <div className="question-header-row">
                  <span className="question-prompt">
                    <span className="terminal-chevron">&gt;</span> Select your experience level
                  </span>
                </div>

                <div className="step3-exp-cards-grid">
                  {STEP3_EXPERIENCE_LEVELS.map((exp) => {
                    const isSelected = selectedExp === exp.id;
                    return (
                      <div
                        key={exp.id}
                        className={`step3-exp-card ${isSelected ? "step3-exp-selected" : ""}`}
                        onClick={() => setSelectedExp((prev) => (prev === exp.id ? null : exp.id))}
                      >
                        <div className="step3-card-top">
                          <div
                            className="step3-icon-box"
                            style={{
                              backgroundColor: exp.iconBg,
                              border: `1px solid ${exp.iconBorder}`,
                            }}
                          >
                            {renderExpIcon(exp.iconType, exp.iconColor)}
                          </div>

                          <div className={`step3-radio ${isSelected ? "step3-radio-checked" : ""}`}>
                            {isSelected && <div className="step3-radio-inner" />}
                          </div>
                        </div>

                        <h3 className="step3-title" style={{ color: isSelected ? exp.iconColor : "#f1f5f9" }}>
                          {exp.title}
                        </h3>
                        <p className="step3-subtitle">{exp.subtitle}</p>

                        <ul className="step3-bullets">
                          {exp.bullets.map((b, idx) => (
                            <li key={idx}>
                              <span className="bullet-dot" style={{ color: exp.iconColor }}>•</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>

                        {exp.recommended && (
                          <div className="step3-recommended-badge">
                            Recommended for you
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div
                  className={`step3-notsure-box ${selectedExp === "not_sure" ? "notsure-selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedExp((prev) => (prev === "not_sure" ? null : "not_sure"))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedExp((prev) => (prev === "not_sure" ? null : "not_sure"));
                    }
                  }}
                >
                  <span className="notsure-star">★</span>
                  <div className="notsure-text">
                    <strong className="notsure-title">Not sure?</strong>
                    <span className="notsure-desc">You can update your experience level later in Settings.</span>
                  </div>
                  {selectedExp === "not_sure" && <span className="notsure-check">✓</span>}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================
              STEP 4: COMPLETE & SUMMARY (Exact match to screenshot)
          ========================================================= */}
          {currentStep === 4 && (
            <div className="quiz-step-content">
              <div className="quiz-question-block">
                <div className="question-header-row">
                  <span className="question-prompt">
                    <span className="terminal-chevron">&gt;</span> Here's your summary
                  </span>
                </div>

                {/* 4 Summary Cards Grid */}
                <div className="step4-summary-cards-grid">
                  {/* Card 1: Skills */}
                  <div className="step4-summary-card card-skills">
                    <div className="step4-card-header">
                      <div className="step4-icon-circle circle-green">
                        <span>&lt;/&gt;</span>
                      </div>
                      <span className="step4-card-title title-green-accent">Skills</span>
                    </div>
                    <div className="step4-card-main-val">
                      {selectedTechs.length}
                    </div>
                    <span className="step4-card-val-label">Technologies Selected</span>
                    <button className="step4-card-link-btn link-green" onClick={() => setCurrentStep(1)}>
                      View Skills →
                    </button>
                  </div>

                  {/* Card 2: Interests */}
                  <div className="step4-summary-card card-interests">
                    <div className="step4-card-header">
                      <div className="step4-icon-circle circle-purple">
                        <span>💜</span>
                      </div>
                      <span className="step4-card-title title-purple-accent">Interests</span>
                    </div>
                    <div className="step4-card-main-val">
                      {selectedInterests.length}
                    </div>
                    <span className="step4-card-val-label">Areas Selected</span>
                    <button className="step4-card-link-btn link-purple" onClick={() => setCurrentStep(2)}>
                      View Interests →
                    </button>
                  </div>

                  {/* Card 3: Experience */}
                  <div className="step4-summary-card card-experience">
                    <div className="step4-card-header">
                      <div className="step4-icon-circle circle-cyan">
                        <span>📊</span>
                      </div>
                      <span className="step4-card-title title-cyan-accent">Experience</span>
                    </div>
                    <div className="step4-card-main-text">
                      {getExpLabel(selectedExp)}
                    </div>
                    <span className="step4-card-val-label">Experience Level Selected</span>
                    <button className="step4-card-link-btn link-cyan" onClick={() => setCurrentStep(3)}>
                      View Details →
                    </button>
                  </div>

                  {/* Card 4: Profile Score */}
                  <div className="step4-summary-card card-score">
                    <div className="step4-card-header">
                      <div className="step4-icon-circle circle-yellow">
                        <span>⭐</span>
                      </div>
                      <span className="step4-card-title title-yellow-accent">Profile Score</span>
                    </div>
                    <div className="step4-card-score-row">
                      <span className="score-num">85</span>
                      <span className="score-max">/100</span>
                    </div>
                    <span className="step4-card-val-label">Great start!</span>
                    <button className="step4-card-link-btn link-yellow">
                      Improve Score →
                    </button>
                  </div>
                </div>

                {/* "What's next?" Banner */}
                <div className="step4-whats-next-banner">
                  <div className="whats-next-icon-box">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                  </div>
                  <div className="whats-next-text-group">
                    <strong className="whats-next-title">What's next?</strong>
                    <p className="whats-next-desc">
                      Start exploring repositories, solve beginner-friendly issues, and track your progress with Deep Source.
                    </p>
                  </div>
                </div>

                {/* Save Error Alert */}
                {saveError && (
                  <div className="quiz-save-error-banner" role="alert">
                    <span className="quiz-error-icon" aria-hidden="true">⚠️</span>
                    <span>{saveError}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================
              FOOTER ACTIONS (Matching Screenshot)
          ========================================================= */}
          <div className="quiz-footer-action-area">
            <div className="footer-nav-row">
              {/* Back Button */}
              {currentStep > 1 ? (
                <button
                  className="quiz-back-pill-btn"
                  onClick={handleBack}
                  disabled={isSaving}
                >
                  ← Back: {currentStep === 2 ? "Skills" : currentStep === 3 ? "Interests" : "Experience"}
                </button>
              ) : (
                <div className="back-btn-spacer" />
              )}

              {/* 5 Dots Indicator */}
              <div className="quiz-dots-stepper">
                <div className={`quiz-dot ${currentStep === 1 ? "dot-active" : ""}`} />
                <div className={`quiz-dot ${currentStep === 2 ? "dot-active" : ""}`} />
                <div className={`quiz-dot ${currentStep === 3 ? "dot-active" : ""}`} />
                <div className={`quiz-dot ${currentStep === 4 ? "dot-active" : ""}`} />
                <div className="quiz-dot" />
              </div>

              {/* Next / Go to Dashboard Button */}
              <button
                className={`quiz-glowing-green-btn ${currentStep === 1 ? "btn-purple-gradient" : ""}`}
                onClick={handleNext}
                disabled={isSaving}
                aria-busy={isSaving}
              >
                <span>
                  {currentStep === 1 && "Next: Interests →"}
                  {currentStep === 2 && "Next: Experience →"}
                  {currentStep === 3 && "Next: Complete →"}
                  {currentStep === 4 && (isSaving ? "Saving your profile..." : "Go to Dashboard →")}
                </span>
              </button>
            </div>

            <span className="quiz-settings-notice">
              You can change this later in Settings
            </span>
          </div>

        </div>

        {/* =========================================================
            RIGHT SIDEBAR
        ========================================================= */}
        <aside className="quiz-right-sidebar-col">
          {/* Card 1: YOUR JOURNEY */}
          <div className="quiz-journey-card">
            <div className="journey-corner corner-tl" />
            <div className="journey-corner corner-tr" />
            <div className="journey-corner corner-bl" />
            <div className="journey-corner corner-br" />

            <div className="journey-header-row">
              <span className="journey-target-icon">🎯</span>
              <span className="journey-title">YOUR JOURNEY</span>
            </div>

            <div className="journey-steps-list">
              <div className="journey-step-row">
                <div className={`journey-node ${currentStep > 1 ? "node-done" : currentStep === 1 ? "node-current" : "node-pending"}`}>
                  {currentStep > 1 ? "✓" : "1"}
                </div>
                <div className="journey-node-text">
                  <span className={`node-title ${currentStep >= 1 ? "node-title-done" : "node-title-pending"}`}>Skills</span>
                  <span className="node-status">{currentStep > 1 ? "Completed" : currentStep === 1 ? "In Progress" : "Pending"}</span>
                </div>
              </div>
              <div className="journey-step-row">
                <div className={`journey-node ${currentStep > 2 ? "node-done" : currentStep === 2 ? "node-current" : "node-pending"}`}>
                  {currentStep > 2 ? "✓" : "2"}
                </div>
                <div className="journey-node-text">
                  <span className={`node-title ${currentStep >= 2 ? "node-title-done" : "node-title-pending"}`}>Interests</span>
                  <span className="node-status">{currentStep > 2 ? "Completed" : currentStep === 2 ? "In Progress" : "Pending"}</span>
                </div>
              </div>
              <div className="journey-step-row">
                <div className={`journey-node ${currentStep > 3 ? "node-done" : currentStep === 3 ? "node-current" : "node-pending"}`}>
                  {currentStep > 3 ? "✓" : "3"}
                </div>
                <div className="journey-node-text">
                  <span className={`node-title ${currentStep >= 3 ? "node-title-done" : "node-title-pending"}`}>Experience</span>
                  <span className="node-status">{currentStep > 3 ? "Completed" : currentStep === 3 ? "In Progress" : "Pending"}</span>
                </div>
              </div>
              <div className="journey-step-row">
                <div className={`journey-node ${currentStep === 4 ? "node-done" : "node-pending"}`}>
                  {currentStep === 4 ? "✓" : "4"}
                </div>
                <div className="journey-node-text">
                  <span className={`node-title ${currentStep === 4 ? "node-title-done" : "node-title-pending"}`}>Complete</span>
                  <span className="node-status">{currentStep === 4 ? "Completed" : "Pending"}</span>
                </div>
              </div>
            </div>

            {currentStep === 4 && (
              <div className="step4-ready-text">
                You're ready to go! 🎉
              </div>
            )}
          </div>

          {/* Card 2: YOUR STATS (Only on Step 4) */}
          {currentStep === 4 ? (
            <>
              <div className="quiz-stats-sidebar-card">
                <div className="journey-corner corner-tl" />
                <div className="journey-corner corner-tr" />
                <div className="journey-corner corner-bl" />
                <div className="journey-corner corner-br" />

                <div className="stats-sidebar-header">
                  <span className="stats-sidebar-icon">📊</span>
                  <span className="stats-sidebar-title">YOUR STATS</span>
                </div>

                <div className="stats-sidebar-grid">
                  <div className="stat-sidebar-box">
                    <strong className="stat-num">0</strong>
                    <span className="stat-label">Repositories Explored</span>
                  </div>
                  <div className="stat-sidebar-box">
                    <strong className="stat-num">0</strong>
                    <span className="stat-label">Issues Solved</span>
                  </div>
                  <div className="stat-sidebar-box">
                    <strong className="stat-num">0</strong>
                    <span className="stat-label">Pull Requests Opened</span>
                  </div>
                  <div className="stat-sidebar-box">
                    <strong className="stat-num">0</strong>
                    <span className="stat-label">Contributions Made</span>
                  </div>
                </div>
              </div>

              {/* Card 3: NEXT STEPS */}
              <div className="quiz-next-steps-sidebar-card">
                <div className="journey-corner corner-tl" />
                <div className="journey-corner corner-tr" />
                <div className="journey-corner corner-bl" />
                <div className="journey-corner corner-br" />

                <div className="next-steps-header">
                  <span className="next-steps-icon">🚀</span>
                  <span className="next-steps-title">NEXT STEPS</span>
                </div>

                <div className="next-steps-links-list">
                  <div className="next-step-link-item">
                    <span>Explore repositories</span>
                    <span className="next-step-arrow">›</span>
                  </div>
                  <div className="next-step-link-item">
                    <span>Find good first issues</span>
                    <span className="next-step-arrow">›</span>
                  </div>
                  <div className="next-step-link-item">
                    <span>Ask AI Mentor</span>
                    <span className="next-step-arrow">›</span>
                  </div>
                  <div className="next-step-link-item">
                    <span>Track your progress</span>
                    <span className="next-step-arrow">›</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Card 2: WHY WE ASK? on other steps */
            <div className="quiz-why-card">
              <div className="why-corner corner-tl" />
              <div className="why-corner corner-tr" />
              <div className="why-corner corner-bl" />
              <div className="why-corner corner-br" />

              <div className="why-header-row">
                <span className="why-bulb-icon">💡</span>
                <span className="why-title">WHY WE ASK?</span>
              </div>

              <ul className="why-checklist">
                {currentStep === 3 ? (
                  <>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Personalized learning path</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Relevant project suggestions</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Right level of challenges</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Better mentorship recommendations</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Step-by-step growth tracking</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Personalized project recommendations</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Tailored learning resources</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Relevant open source opportunities</span>
                    </li>
                    <li className="why-item">
                      <span className="why-check">✓</span>
                      <span className="why-text">Better guidance from AI Mentor</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}


