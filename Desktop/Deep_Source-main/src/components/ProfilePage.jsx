import { useState } from "react";
import {
  UserPixelAvatar,
  PixelStar,
  PixelBranch,
  PixelBug,
  PixelRepo,
  PixelTrophy,
  PixelChatBubble,
  PixelCodeBracket,
} from "./PixelIcons";
import "./ProfilePage.css";

/* =========================================================
   CONTRIBUTION HEATMAP DATA (52 weeks × 7 days)
========================================================= */

const generateProfileHeatmap = () => {
  return [
    [0,0,1,0,2,0,0,1,3,0,1,2,0,0,3,1,0,2,0,1,0,3,2,0,1,0,0,0,2,1,0,0,3,0,1,2,0,1,0,0,2,0,1,3,0,1,0,0,2,0,1,3],
    [0,1,0,2,0,3,1,0,2,1,0,0,2,3,0,2,1,0,3,0,2,1,0,3,0,2,1,3,0,0,2,1,0,3,0,1,2,0,1,3,0,2,1,0,2,0,3,1,0,2,0,1],
    [2,0,3,1,0,2,0,4,1,2,3,0,1,0,3,0,2,4,0,3,1,0,2,0,4,1,0,2,3,1,0,4,2,0,1,3,0,2,4,1,0,3,2,0,1,3,0,2,4,1,0,2],
    [0,2,0,4,3,1,2,0,3,4,1,2,0,4,1,3,2,0,4,1,2,3,0,4,2,0,3,1,4,2,0,3,1,4,2,0,3,1,0,2,4,1,3,0,4,2,1,3,0,4,2,1],
    [1,0,2,0,1,3,0,2,0,1,3,0,2,1,0,3,2,1,0,3,2,0,1,3,0,2,1,0,3,2,1,0,2,3,1,0,2,3,1,0,2,3,0,1,2,3,0,1,2,3,0,1],
    [3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3,2,4,3],
    [0,0,1,0,0,2,0,1,0,0,2,1,0,0,1,2,0,1,0,0,2,1,0,1,0,2,0,1,0,0,2,1,0,1,0,0,2,1,0,1,0,2,0,1,0,0,2,1,0,1,0,0],
  ];
};

/* =========================================================
   PINNED REPOS
========================================================= */

const PINNED_REPOS = [
  { name: "openhub/frontend",      desc: "The main frontend application for OpenHub platform",        lang: "JavaScript", langColor: "#f7df1e", stars: 142, forks: 38 },
  { name: "openhub/backend",       desc: "REST API and GraphQL server powering OpenHub",               lang: "TypeScript", langColor: "#3178c6", stars: 98,  forks: 24 },
  { name: "openhub/mobile",        desc: "Cross-platform mobile app built with React Native",          lang: "TypeScript", langColor: "#3178c6", stars: 67,  forks: 15 },
  { name: "openhub/ai-mentor",     desc: "AI-powered open-source contribution mentor",                 lang: "Python",     langColor: "#3572A5", stars: 213, forks: 56 },
  { name: "openhub/design-system", desc: "Shared pixel-art design tokens and UI components",           lang: "CSS",        langColor: "#563d7c", stars: 44,  forks: 12 },
  { name: "openhub/docs",          desc: "Official documentation and guides for OpenHub",              lang: "Markdown",   langColor: "#083fa1", stars: 31,  forks: 9  },
];

/* =========================================================
   ACTIVITY FEED
========================================================= */

const ACTIVITY = [
  { type: "branch", color: "#38bdf8", title: "Merged PR #142 — Improve mobile navigation", repo: "openhub/frontend",  time: "2h ago"  },
  { type: "bug",    color: "#f97316", title: "Closed issue #97 — Fix broken auth redirect",  repo: "openhub/backend",  time: "5h ago"  },
  { type: "star",   color: "#facc15", title: "Starred repository awesome-oss-tools",         repo: "github/explore",   time: "1d ago"  },
  { type: "code",   color: "#4ade80", title: "Pushed 3 commits to feat/dark-theme",          repo: "openhub/frontend", time: "1d ago"  },
  { type: "chat",   color: "#c084fc", title: "Reviewed PR #139 — Add loading skeleton",       repo: "openhub/frontend", time: "2d ago"  },
  { type: "branch", color: "#38bdf8", title: "Opened PR #135 — Refactor auth middleware",    repo: "openhub/backend",  time: "3d ago"  },
  { type: "code",   color: "#4ade80", title: "Pushed 5 commits to fix/api-timeout",          repo: "openhub/backend",  time: "3d ago"  },
  { type: "bug",    color: "#f97316", title: "Opened issue #204 — Camera permission on iOS", repo: "openhub/mobile",   time: "4d ago"  },
];

/* =========================================================
   SKILLS
========================================================= */

const SKILLS = [
  { name: "JavaScript", level: 92, color: "#facc15" },
  { name: "TypeScript", level: 85, color: "#38bdf8" },
  { name: "React",      level: 89, color: "#61dafb" },
  { name: "Node.js",    level: 78, color: "#4ade80" },
  { name: "Python",     level: 65, color: "#c084fc" },
  { name: "CSS",        level: 80, color: "#e879f9" },
];

/* =========================================================
   PROFILE PAGE
========================================================= */

export function ProfilePage({ onSignOut, currentUser }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");
  const heatmapData = generateProfileHeatmap();
  const WEEKS = 52;

  const githubUser = currentUser?.user_metadata;
  const displayName = githubUser?.full_name || githubUser?.name || "Alex Rivera";
  const username = githubUser?.user_name ? `@${githubUser.user_name}` : "@alexrivera";

  const heatLevels = {
    0: "#161b22",
    1: "#0e4429",
    2: "#006d32",
    3: "#26a641",
    4: "#39d353",
  };

  const ActivityIcon = ({ type, color }) => {
    const s = 14;
    if (type === "branch") return <PixelBranch size={s} color={color} />;
    if (type === "bug")    return <PixelBug size={s} color={color} />;
    if (type === "star")   return <PixelStar size={s} color={color} />;
    if (type === "chat")   return <PixelChatBubble size={s} color={color} />;
    if (type === "code")   return <PixelCodeBracket size={s} color={color} />;
    return <PixelRepo size={s} color={color} />;
  };

  return (
    <div className="profile-container">
      <div className="profile-inner">

        {/* =====================================================
            HERO
        ===================================================== */}
        <div className="profile-hero">

          <div className="profile-hero-left">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar-ring">
                {githubUser?.avatar_url ? (
                  <img
                    src={githubUser.avatar_url}
                    alt={displayName}
                    style={{ width: 96, height: 96, borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <UserPixelAvatar size={96} />
                )}
              </div>
              <div className="profile-online-badge" />
            </div>

            <div className="profile-info-block">
              <div className="profile-name-row">
                <h1 className="profile-display-name">{displayName}</h1>
                <span className="profile-level-chip">LVL 32</span>
              </div>
              <p className="profile-username">{username}</p>
              <p className="profile-bio">
                Full-stack dev · Open-source enthusiast · Building tools that help developers collaborate better.
              </p>

              <div className="profile-meta-row">
                <span className="profile-meta-item">
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ shapeRendering: "crispEdges" }}>
                    <rect x="1" y="2" width="10" height="8" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                    <rect x="4" y="0" width="4" height="3" fill="#4ade80" />
                    <rect x="3" y="5" width="2" height="4" fill="#4ade80" />
                    <rect x="7" y="5" width="2" height="4" fill="#4ade80" />
                  </svg>
                  San Francisco, CA
                </span>
                <span className="profile-meta-item">
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ shapeRendering: "crispEdges" }}>
                    <rect x="1" y="3" width="10" height="7" fill="none" stroke="#38bdf8" strokeWidth="1.5" />
                    <rect x="3" y="1" width="2" height="4" fill="#38bdf8" />
                    <rect x="7" y="1" width="2" height="4" fill="#38bdf8" />
                  </svg>
                  Joined March 2021
                </span>
                <span className="profile-meta-item">
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ shapeRendering: "crispEdges" }}>
                    <rect x="1" y="1" width="10" height="10" fill="none" stroke="#c084fc" strokeWidth="1.5" />
                    <rect x="3" y="5" width="6" height="1" fill="#c084fc" />
                    <rect x="5" y="3" width="2" height="5" fill="#c084fc" />
                  </svg>
                  openhub.dev/~alexrivera
                </span>
              </div>

              <div className="profile-follow-row">
                <span className="profile-follow-stat"><strong>248</strong> followers</span>
                <span className="profile-follow-dot">·</span>
                <span className="profile-follow-stat"><strong>119</strong> following</span>
                <span className="profile-follow-dot">·</span>
                <PixelTrophy size={12} />
                <span className="profile-follow-stat"><strong>Top 18%</strong> contributor</span>
              </div>
            </div>
          </div>

          <div className="profile-hero-right">
            <div className="profile-stats-grid">
              <div className="profile-stat-card">
                <span className="stat-card-val green-val">1,247</span>
                <span className="stat-card-lbl">Contributions</span>
              </div>
              <div className="profile-stat-card">
                <span className="stat-card-val cyan-val">126</span>
                <span className="stat-card-lbl">Pull Requests</span>
              </div>
              <div className="profile-stat-card">
                <span className="stat-card-val orange-val">78</span>
                <span className="stat-card-lbl">Issues Solved</span>
              </div>
              <div className="profile-stat-card">
                <span className="stat-card-val yellow-val">48</span>
                <span className="stat-card-lbl">Badges Earned</span>
              </div>
              <div className="profile-stat-card">
                <span className="stat-card-val purple-val">2,450</span>
                <span className="stat-card-lbl">Total XP</span>
              </div>
              <div className="profile-stat-card">
                <span className="stat-card-val fire-val">🔥 7</span>
                <span className="stat-card-lbl">Day Streak</span>
              </div>
            </div>

            <div className="profile-action-btns">
              <button className="profile-edit-btn">✎ Edit Profile</button>
              <button className="profile-share-btn">⬆ Share</button>
              {onSignOut && (
                <button
                  type="button"
                  className="profile-signout-btn"
                  onClick={onSignOut}
                  title="Sign out of Deep Source"
                >
                  ⎋ Sign Out
                </button>
              )}
            </div>
          </div>

        </div>

        {/* =====================================================
            TABS
        ===================================================== */}
        <div className="profile-tabs-row">
          {["OVERVIEW", "REPOSITORIES", "ACTIVITY", "BADGES"].map((t) => (
            <button
              key={t}
              className={`profile-tab-btn ${activeTab === t ? "active" : ""}`}
              onClick={() => setActiveTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        {/* =====================================================
            MAIN GRID
        ===================================================== */}
        <div className="profile-main-grid">

          {/* LEFT COLUMN */}
          <div className="profile-left-col">

            {/* CONTRIBUTION HEATMAP */}
            <div className="profile-panel heatmap-panel">
              <div className="panel-header-row">
                <span className="section-small-title cyan-title">&gt;_ CONTRIBUTION ACTIVITY</span>
                <span className="heatmap-summary-chip">1,247 contributions this year</span>
              </div>

              <div className="heatmap-scroll-wrap">
                <div className="heatmap-grid-profile">
                  {Array.from({ length: WEEKS }).map((_, wk) => (
                    <div key={wk} className="heatmap-col-profile">
                      {heatmapData.map((row, day) => {
                        const level = row[wk] ?? 0;
                        return (
                          <div
                            key={day}
                            className="heatmap-cell-profile"
                            style={{ background: heatLevels[level] }}
                            title={`Week ${wk + 1}, ${["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][day]}: ${level * 2} contributions`}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="heatmap-legend-row">
                <span className="legend-label">Less</span>
                {[0,1,2,3,4].map((l) => (
                  <div key={l} className="legend-cell" style={{ background: heatLevels[l] }} />
                ))}
                <span className="legend-label">More</span>
              </div>
            </div>

            {/* PINNED REPOS */}
            <div className="profile-panel pinned-panel">
              <div className="panel-header-row">
                <span className="section-small-title cyan-title">&gt;_ PINNED REPOSITORIES</span>
                <button className="panel-link-btn">Customize pins →</button>
              </div>

              <div className="pinned-repos-grid">
                {PINNED_REPOS.map((repo) => (
                  <div key={repo.name} className="pinned-repo-card">
                    <div className="pinned-repo-top">
                      <PixelRepo size={14} color="#8b949e" />
                      <span className="pinned-repo-name">{repo.name}</span>
                      <span className="pinned-repo-badge">Public</span>
                    </div>
                    <p className="pinned-repo-desc">{repo.desc}</p>
                    <div className="pinned-repo-footer">
                      <span className="pinned-lang-dot" style={{ background: repo.langColor }} />
                      <span className="pinned-lang-label">{repo.lang}</span>
                      <span className="pinned-stat"><PixelStar size={11} color="#8b949e" /> {repo.stars}</span>
                      <span className="pinned-stat"><PixelBranch size={11} color="#8b949e" /> {repo.forks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT ACTIVITY */}
            <div className="profile-panel activity-panel">
              <div className="panel-header-row">
                <span className="section-small-title cyan-title">&gt;_ RECENT ACTIVITY</span>
                <button className="panel-link-btn">View all →</button>
              </div>

              <div className="activity-list">
                {ACTIVITY.map((item, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon-wrap" style={{ background: `${item.color}22`, border: `1px solid ${item.color}44` }}>
                      <ActivityIcon type={item.type} color={item.color} />
                    </div>
                    <div className="activity-text">
                      <span className="activity-title">{item.title}</span>
                      <span className="activity-repo">{item.repo}</span>
                    </div>
                    <span className="activity-time">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="profile-right-col">

            {/* SKILLS */}
            <div className="profile-panel skills-panel">
              <span className="section-small-title purple-title">SKILLS & LANGUAGES</span>
              <div className="skills-list">
                {SKILLS.map((skill) => (
                  <div key={skill.name} className="skill-row">
                    <div className="skill-name-row">
                      <span className="skill-dot" style={{ background: skill.color }} />
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>
                    <div className="skill-track">
                      <div className="skill-fill" style={{ width: `${skill.level}%`, background: skill.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* BADGES SHOWCASE */}
            <div className="profile-panel badges-panel">
              <div className="panel-header-row">
                <span className="section-small-title purple-title">BADGES</span>
                <button className="panel-link-btn">View all 48 →</button>
              </div>

              <div className="badges-showcase-grid">
                {[
                  { emoji: "🏆", name: "Top Contributor", color: "#facc15" },
                  { emoji: "🔥", name: "7-Day Streak",    color: "#f97316" },
                  { emoji: "⭐", name: "100 Stars",        color: "#38bdf8" },
                  { emoji: "🤝", name: "First PR",         color: "#4ade80" },
                  { emoji: "🐛", name: "Bug Slayer",       color: "#c084fc" },
                  { emoji: "📖", name: "Docs Hero",        color: "#e879f9" },
                ].map((badge) => (
                  <div
                    key={badge.name}
                    className="badge-showcase-card"
                    style={{ borderColor: `${badge.color}44`, background: `${badge.color}0a` }}
                  >
                    <span className="badge-showcase-emoji">{badge.emoji}</span>
                    <span className="badge-showcase-name">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* RANK */}
            <div className="profile-panel rank-panel">
              <span className="section-small-title purple-title">CONTRIBUTOR RANK</span>

              <div className="rank-display">
                <div className="rank-shield-wrap">
                  <svg viewBox="0 0 60 70" width="60" height="70" style={{ shapeRendering: "crispEdges" }}>
                    <polygon points="30,2 58,14 58,42 30,68 2,42 2,14" fill="#6366f1" stroke="#818cf8" strokeWidth="2" />
                    <polygon points="30,10 50,20 50,40 30,60 10,40 10,20" fill="#161b22" />
                    <text x="30" y="41" textAnchor="middle" fontFamily="'Press Start 2P'" fontSize="13" fill="#c084fc">32</text>
                  </svg>
                </div>
                <div className="rank-text-col">
                  <span className="rank-top-text">Top 18%</span>
                  <span className="rank-sub">Among all contributors</span>
                  <div className="rank-bar-track">
                    <div className="rank-bar-fill" style={{ width: "82%" }} />
                  </div>
                  <span className="rank-bar-label">82nd percentile</span>
                </div>
              </div>

              <div className="rank-stats-row">
                <div className="rank-mini-stat">
                  <span className="rank-mini-val">1,247</span>
                  <span className="rank-mini-lbl">Contributions</span>
                </div>
                <div className="rank-mini-stat">
                  <span className="rank-mini-val">48</span>
                  <span className="rank-mini-lbl">Repos</span>
                </div>
                <div className="rank-mini-stat">
                  <span className="rank-mini-val">6</span>
                  <span className="rank-mini-lbl">Orgs</span>
                </div>
              </div>
            </div>

            {/* ORGANIZATIONS */}
            <div className="profile-panel orgs-panel">
              <span className="section-small-title purple-title">ORGANIZATIONS</span>
              <div className="orgs-list">
                {[
                  { name: "OpenHub",         color: "#4ade80" },
                  { name: "React OSS",       color: "#38bdf8" },
                  { name: "TypeScript",      color: "#3178c6" },
                  { name: "Node Foundation", color: "#417e38" },
                  { name: "Open Collective", color: "#c084fc" },
                  { name: "Linux Fdn",       color: "#facc15" },
                ].map((org) => (
                  <div key={org.name} className="org-chip" style={{ borderColor: `${org.color}55` }}>
                    <div className="org-avatar" style={{ background: `${org.color}22`, color: org.color }}>
                      {org.name[0]}
                    </div>
                    <span className="org-name">{org.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
