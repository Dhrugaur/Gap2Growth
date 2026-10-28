import React, { useState } from "react";
import {
  PixelRepo,
  PixelSearch,
  PixelBranch,
  PixelStar,
  PixelCodeBracket,
  PixelMobile,
  PixelDesign,
  PixelDocument,
  PixelBug,
  PixelTerminalComputer,
} from "./PixelIcons";
import "./RepoExplorerPage.css";

const REPO_DATA = [
  {
    id: "frontend",
    name: "openhub / frontend",
    desc: "React components and UI library for OpenHub platform",
    iconType: "code",
    iconColor: "#a855f7",
    tags: [
      { name: "React", type: "blue" },
      { name: "JavaScript", type: "yellow" },
      { name: "UI Library", type: "purple" },
    ],
    goodFirstIssue: true,
    stars: 324,
    forks: 48,
    updated: "Updated 2 hours ago",
    statusDot: "green",
  },
  {
    id: "backend",
    name: "openhub / backend",
    desc: "Node.js API server for OpenHub platform",
    iconType: "js",
    iconColor: "#22c55e",
    tags: [
      { name: "Node.js", type: "green" },
      { name: "Express", type: "blue" },
      { name: "API", type: "purple" },
    ],
    goodFirstIssue: false,
    stars: 278,
    forks: 36,
    updated: "Updated yesterday",
    statusDot: "green",
  },
  {
    id: "docs",
    name: "openhub / docs",
    desc: "Documentation and guides for OpenHub",
    iconType: "doc",
    iconColor: "#38bdf8",
    tags: [
      { name: "Markdown", type: "blue" },
      { name: "Docs", type: "purple" },
    ],
    goodFirstIssue: false,
    stars: 156,
    forks: 22,
    updated: "Updated 3 days ago",
    statusDot: "blue",
  },
  {
    id: "mobile",
    name: "openhub / mobile",
    desc: "React Native mobile app for OpenHub",
    iconType: "mobile",
    iconColor: "#eab308",
    tags: [
      { name: "React Native", type: "blue" },
      { name: "TypeScript", type: "blue" },
      { name: "Mobile", type: "purple" },
    ],
    goodFirstIssue: true,
    stars: 189,
    forks: 28,
    updated: "Updated 5 hours ago",
    statusDot: "green",
  },
  {
    id: "design-system",
    name: "openhub / design-system",
    desc: "Design system and assets for OpenHub",
    iconType: "design",
    iconColor: "#ef4444",
    tags: [
      { name: "Figma", type: "red" },
      { name: "Design", type: "purple" },
    ],
    goodFirstIssue: false,
    stars: 95,
    forks: 14,
    updated: "Updated 1 week ago",
    statusDot: "blue",
  },
  {
    id: "ai-mentor",
    name: "openhub / ai-mentor",
    desc: "AI mentor service for contributor assistance",
    iconType: "robot",
    iconColor: "#a855f7",
    tags: [
      { name: "Python", type: "blue" },
      { name: "FastAPI", type: "cyan" },
      { name: "AI", type: "purple" },
    ],
    goodFirstIssue: false,
    stars: 201,
    forks: 31,
    updated: "Updated 2 days ago",
    statusDot: "green",
  },
];

export function RepoExplorerPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("EXPLORE");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("Language");
  const [selectedTopic, setSelectedTopic] = useState("Topic");
  const [sortOption, setSortOption] = useState("Sort: Recently Updated");
  const [currentPage, setCurrentPage] = useState(1);

  const renderRepoIcon = (type, color) => {
    switch (type) {
      case "code":
        return <PixelCodeBracket size={18} color={color} />;
      case "js":
        return (
          <span style={{ fontFamily: "monospace", fontWeight: "900", fontSize: "11px", color }}>
            JS
          </span>
        );
      case "doc":
        return <PixelDocument size={18} color={color} />;
      case "mobile":
        return <PixelMobile size={18} color={color} />;
      case "design":
        return <PixelDesign size={18} color={color} />;
      case "robot":
        return <PixelBug size={18} color={color} />;
      default:
        return <PixelCodeBracket size={18} color={color} />;
    }
  };

  const filteredRepos = REPO_DATA.filter((repo) => {
    if (activeTab === "GOOD FIRST ISSUES" && !repo.goodFirstIssue) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const matchName = repo.name.toLowerCase().includes(q);
      const matchDesc = repo.desc.toLowerCase().includes(q);
      const matchTags = repo.tags.some((t) => t.name.toLowerCase().includes(q));
      return matchName || matchDesc || matchTags;
    }
    return true;
  });

  return (
    <div className="repo-explorer-container">
      <div className="repo-explorer-inner">
        {/* =========================================================
           PAGE HEADER
        ========================================================= */}
        <div className="repo-header">
          <div className="repo-header-left">
            <div className="repo-avatar-box">
              <PixelRepo size={36} />
            </div>

            <div className="repo-text-info">
              <h1 className="repo-title">REPOSITORY EXPLORER</h1>
              <p className="repo-subtitle">
                Discover repositories and find the perfect place to contribute.
              </p>
            </div>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="repo-subtabs-row">
          <button
            className={`repo-tab-btn ${activeTab === "EXPLORE" ? "active" : ""}`}
            onClick={() => setActiveTab("EXPLORE")}
          >
            [+] EXPLORE
          </button>
          <button
            className={`repo-tab-btn ${activeTab === "TRENDING" ? "active" : ""}`}
            onClick={() => setActiveTab("TRENDING")}
          >
            ☆ TRENDING
          </button>
          <button
            className={`repo-tab-btn ${activeTab === "GOOD FIRST ISSUES" ? "active" : ""}`}
            onClick={() => setActiveTab("GOOD FIRST ISSUES")}
          >
            ф GOOD FIRST ISSUES
          </button>
          <button
            className={`repo-tab-btn ${activeTab === "SAVED" ? "active" : ""}`}
            onClick={() => setActiveTab("SAVED")}
          >
            ☆ SAVED
          </button>
        </div>

        {/* =========================================================
           MAIN 2-COLUMN LAYOUT
        ========================================================= */}
        <div className="repo-main-grid">
          {/* LEFT: REPOSITORY LIST & FILTERS */}
          <div className="repo-list-col">
            {/* Filter Bar */}
            <div className="repo-filter-bar">
              <div className="repo-search-wrap">
                <PixelSearch size={14} color="#64748b" />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="repo-search-input"
                />
              </div>

              <div className="repo-dropdowns-group">
                <select
                  className="repo-select"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                >
                  <option>Language</option>
                  <option>JavaScript</option>
                  <option>TypeScript</option>
                  <option>Python</option>
                  <option>React</option>
                </select>

                <select
                  className="repo-select"
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                >
                  <option>Topic</option>
                  <option>Frontend</option>
                  <option>Backend</option>
                  <option>Docs</option>
                  <option>Mobile</option>
                </select>

                <select
                  className="repo-select"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option>Sort: Recently Updated</option>
                  <option>Sort: Most Stars</option>
                  <option>Sort: Most Forks</option>
                </select>

                <button className="repo-view-toggle" title="Toggle Grid/List">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="#8b949e" style={{ shapeRendering: "crispEdges" }}>
                    <rect x="2" y="2" width="5" height="5" />
                    <rect x="9" y="2" width="5" height="5" />
                    <rect x="2" y="9" width="5" height="5" />
                    <rect x="9" y="9" width="5" height="5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Repositories List Cards */}
            <div className="repos-card-list">
              {filteredRepos.map((repo) => (
                <div key={repo.id} className="repo-item-card">
                  <div className="repo-item-left">
                    <div
                      className="repo-icon-badge"
                      style={{ borderColor: repo.iconColor, background: "#0d1117" }}
                    >
                      {renderRepoIcon(repo.iconType, repo.iconColor)}
                    </div>

                    <div className="repo-info-content">
                      <div className="repo-title-row">
                        <span className="repo-main-name">{repo.name}</span>
                        {repo.goodFirstIssue && (
                          <span className="good-issue-pill">GOOD FIRST ISSUE</span>
                        )}
                      </div>

                      <p className="repo-item-desc">{repo.desc}</p>

                      <div className="repo-tags-row">
                        {repo.tags.map((t, idx) => (
                          <span key={idx} className={`repo-tag tag-${t.type}`}>
                            {t.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="repo-item-right">
                    <div className="repo-stats-row">
                      <span className="stat-item">
                        <PixelStar size={14} color="#facc15" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="stat-item">
                        <PixelBranch size={14} color="#8b949e" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>

                    <div className="repo-update-row">
                      <span className={`status-dot dot-${repo.statusDot}`} />
                      <span className="update-text">{repo.updated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="repo-pagination">
              <button className="page-btn page-nav" disabled>
                &lt; Prev
              </button>
              <button className="page-btn page-num active">1</button>
              <button className="page-btn page-num">2</button>
              <button className="page-btn page-num">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn page-num">8</button>
              <button className="page-btn page-nav">Next &gt;</button>
            </div>
          </div>

          {/* RIGHT SIDEBAR WIDGETS */}
          <div className="repo-sidebar-col">
            {/* 1. BROWSE BY TOPIC */}
            <div className="side-widget-card">
              <div className="widget-header">
                <span className="widget-title">BROWSE BY TOPIC</span>
              </div>
              <div className="topic-list">
                <div className="topic-item">
                  <div className="topic-name-wrap">
                    <span className="topic-icon-badge badge-purple">
                      <PixelCodeBracket size={12} color="#c084fc" />
                    </span>
                    <span className="topic-name">Frontend</span>
                  </div>
                  <span className="topic-count">128</span>
                </div>
                <div className="topic-item">
                  <div className="topic-name-wrap">
                    <span className="topic-icon-badge badge-green">
                      <span style={{ fontSize: "9px", fontWeight: "900", color: "#22c55e" }}>JS</span>
                    </span>
                    <span className="topic-name">Backend</span>
                  </div>
                  <span className="topic-count">96</span>
                </div>
                <div className="topic-item">
                  <div className="topic-name-wrap">
                    <span className="topic-icon-badge badge-cyan">
                      <PixelDocument size={12} color="#38bdf8" />
                    </span>
                    <span className="topic-name">Documentation</span>
                  </div>
                  <span className="topic-count">64</span>
                </div>
                <div className="topic-item">
                  <div className="topic-name-wrap">
                    <span className="topic-icon-badge badge-purple">
                      <PixelDesign size={12} color="#c084fc" />
                    </span>
                    <span className="topic-name">UI / UX</span>
                  </div>
                  <span className="topic-count">42</span>
                </div>
                <div className="topic-item">
                  <div className="topic-name-wrap">
                    <span className="topic-icon-badge badge-cyan">
                      <PixelBug size={12} color="#38bdf8" />
                    </span>
                    <span className="topic-name">DevOps</span>
                  </div>
                  <span className="topic-count">38</span>
                </div>

              </div>
              <div className="widget-footer">
                <button className="widget-link">View all topics →</button>
              </div>
            </div>

            {/* 2. POPULAR LANGUAGES */}
            <div className="side-widget-card">
              <div className="widget-header">
                <span className="widget-title">POPULAR LANGUAGES</span>
              </div>
              <div className="lang-bars-list">
                <div className="lang-bar-item">
                  <div className="lang-name-row">
                    <span className="lang-label">JavaScript</span>
                    <div className="lang-track">
                      <div className="lang-fill fill-js" style={{ width: "85%" }} />
                    </div>
                    <span className="lang-count">124</span>
                  </div>
                </div>

                <div className="lang-bar-item">
                  <div className="lang-name-row">
                    <span className="lang-label">TypeScript</span>
                    <div className="lang-track">
                      <div className="lang-fill fill-ts" style={{ width: "68%" }} />
                    </div>
                    <span className="lang-count">98</span>
                  </div>
                </div>

                <div className="lang-bar-item">
                  <div className="lang-name-row">
                    <span className="lang-label">Python</span>
                    <div className="lang-track">
                      <div className="lang-fill fill-python" style={{ width: "55%" }} />
                    </div>
                    <span className="lang-count">76</span>
                  </div>
                </div>

                <div className="lang-bar-item">
                  <div className="lang-name-row">
                    <span className="lang-label">Java</span>
                    <div className="lang-track">
                      <div className="lang-fill fill-java" style={{ width: "35%" }} />
                    </div>
                    <span className="lang-count">45</span>
                  </div>
                </div>

                <div className="lang-bar-item">
                  <div className="lang-name-row">
                    <span className="lang-label">Go</span>
                    <div className="lang-track">
                      <div className="lang-fill fill-go" style={{ width: "25%" }} />
                    </div>
                    <span className="lang-count">32</span>
                  </div>
                </div>
              </div>
              <div className="widget-footer">
                <button className="widget-link">View all languages →</button>
              </div>
            </div>

            {/* 3. QUICK STATS */}
            <div className="side-widget-card quick-stats-card">
              <div className="widget-header">
                <span className="widget-title">QUICK STATS</span>
              </div>
              <div className="stats-body">
                <div className="stats-graphic">
                  <PixelTerminalComputer size={56} />
                </div>
                <div className="stats-metrics-list">
                  <div className="stat-metric-block">
                    <span className="metric-num stat-green">532</span>
                    <span className="metric-desc">Total Repositories</span>
                  </div>
                  <div className="stat-metric-block">
                    <span className="metric-num stat-cyan">1,248</span>
                    <span className="metric-desc">Total Contributors</span>
                  </div>
                  <div className="stat-metric-block">
                    <span className="metric-num stat-purple">218</span>
                    <span className="metric-desc">Good First Issues</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
