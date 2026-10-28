import React, { useState } from "react";
import {
  PixelTrophy,
  PixelStar,
  PixelBranch,
  PixelBug,
  PixelCodeBracket,
  PixelDocument,
  PixelChatBubble,
  PixelFire,
  PixelMedal,
  PixelLock,
} from "./PixelIcons";
import "./AchievementsPage.css";

export function AchievementsPage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState("OVERVIEW");

  return (
    <div className="achievements-container">
      <div className="achievements-inner">
        {/* =========================================================
           PAGE HEADER
        ========================================================= */}
        <div className="achieve-header">
          <div className="achieve-header-left">
            <div className="achieve-avatar-box">
              <PixelTrophy size={34} />
            </div>

            <div className="achieve-text-info">
              <h1 className="achieve-title">ACHIEVEMENTS</h1>
              <p className="achieve-subtitle">
                Celebrate your journey and contributions.
              </p>
            </div>
          </div>
        </div>

        {/* SUB-TABS */}
        <div className="achieve-subtabs-row">
          <button
            className={`achieve-tab-btn ${activeTab === "OVERVIEW" ? "active" : ""}`}
            onClick={() => setActiveTab("OVERVIEW")}
          >
            OVERVIEW
          </button>
          <button
            className={`achieve-tab-btn ${activeTab === "BADGES" ? "active" : ""}`}
            onClick={() => setActiveTab("BADGES")}
          >
            ☆ BADGES
          </button>
          <button
            className={`achieve-tab-btn ${activeTab === "STREAKS" ? "active" : ""}`}
            onClick={() => setActiveTab("STREAKS")}
          >
            ф STREAKS
          </button>
          <button
            className={`achieve-tab-btn ${activeTab === "MILESTONES" ? "active" : ""}`}
            onClick={() => setActiveTab("MILESTONES")}
          >
            ф MILESTONES
          </button>
        </div>

        {/* =========================================================
           MAIN 2-COLUMN GRID
        ========================================================= */}
        <div className="achieve-main-grid">
          {/* LEFT COLUMN */}
          <div className="achieve-left-col">
            {/* 1. OVERALL PROGRESS & RANK */}
            <div className="achieve-panel overall-progress-panel">
              <div className="progress-section-left">
                <span className="section-small-title cyan-title">OVERALL PROGRESS</span>
                <div className="progress-level-row">
                  <div className="level-number-wrap">
                    <span className="big-level-num">32</span>
                    <span className="level-sub-label">Level</span>
                  </div>

                  {/* Shield Badge with Laurel Wreath */}
                  <div className="shield-wreath-badge">
                    <svg className="wreath-wing wreath-left" viewBox="0 0 16 32" width="16" height="32" fill="#6366f1">
                      <rect x="10" y="4" width="3" height="3" />
                      <rect x="6" y="8" width="3" height="3" />
                      <rect x="4" y="14" width="3" height="3" />
                      <rect x="6" y="20" width="3" height="3" />
                      <rect x="10" y="25" width="3" height="3" />
                    </svg>
                    <div className="shield-hexagon-box">
                      <span className="shield-num">32</span>
                    </div>
                    <svg className="wreath-wing wreath-right" viewBox="0 0 16 32" width="16" height="32" fill="#6366f1">
                      <rect x="3" y="4" width="3" height="3" />
                      <rect x="7" y="8" width="3" height="3" />
                      <rect x="9" y="14" width="3" height="3" />
                      <rect x="7" y="20" width="3" height="3" />
                      <rect x="3" y="25" width="3" height="3" />
                    </svg>
                  </div>

                  <div className="xp-bar-group">
                    <div className="xp-text-row">
                      <span className="xp-current">2,450</span>
                      <span className="xp-max">/ 3,200 XP</span>
                    </div>
                    <div className="xp-track">
                      <div className="xp-fill" style={{ width: "76%" }} />
                    </div>
                    <span className="xp-next-sub">750 XP to next level</span>
                  </div>
                </div>
              </div>

              <div className="progress-section-right">
                <span className="section-small-title cyan-title">RANK</span>
                <span className="rank-main-text">Top 18%</span>
                <span className="rank-sub-text">Among all contributors</span>
                {/* Distribution Bar Chart Graphic */}
                <div className="rank-bars-graphic">
                  <div className="dist-bar" style={{ height: "6px" }} />
                  <div className="dist-bar" style={{ height: "10px" }} />
                  <div className="dist-bar" style={{ height: "16px" }} />
                  <div className="dist-bar dist-bar-highlight" style={{ height: "24px" }} />
                  <div className="dist-bar" style={{ height: "18px" }} />
                  <div className="dist-bar" style={{ height: "12px" }} />
                  <div className="dist-bar" style={{ height: "8px" }} />
                </div>
              </div>
            </div>

            {/* 2. CATEGORY PROGRESS */}
            <div className="achieve-panel category-panel">
              <span className="section-small-title cyan-title">CATEGORY PROGRESS</span>
              <div className="categories-grid">
                {/* CODE */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-green">
                    <PixelCodeBracket size={16} color="#22c55e" />
                  </div>
                  <span className="cat-name">CODE</span>
                  <span className="cat-score">18 / 25</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-green" style={{ width: "72%" }} />
                  </div>
                </div>

                {/* PULL REQUESTS */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-cyan">
                    <PixelBranch size={16} color="#38bdf8" />
                  </div>
                  <span className="cat-name">PULL REQUESTS</span>
                  <span className="cat-score">12 / 20</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-cyan" style={{ width: "60%" }} />
                  </div>
                </div>

                {/* ISSUES */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-orange">
                    <PixelBug size={16} color="#f97316" />
                  </div>
                  <span className="cat-name">ISSUES</span>
                  <span className="cat-score">15 / 25</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-orange" style={{ width: "60%" }} />
                  </div>
                </div>

                {/* REVIEWS */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-purple">
                    <PixelChatBubble size={16} color="#a855f7" />
                  </div>
                  <span className="cat-name">REVIEWS</span>
                  <span className="cat-score">8 / 15</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-purple" style={{ width: "53%" }} />
                  </div>
                </div>

                {/* DOCUMENTATION */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-yellow">
                    <PixelDocument size={16} color="#eab308" />
                  </div>
                  <span className="cat-name">DOCUMENTATION</span>
                  <span className="cat-score">6 / 15</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-yellow" style={{ width: "40%" }} />
                  </div>
                </div>

                {/* COMMUNITY */}
                <div className="cat-card">
                  <div className="cat-icon-badge cat-border-cyan">
                    <span style={{ fontSize: "14px" }}>👥</span>
                  </div>
                  <span className="cat-name">COMMUNITY</span>
                  <span className="cat-score">5 / 10</span>
                  <div className="cat-track">
                    <div className="cat-fill cat-fill-cyan" style={{ width: "50%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. RECENTLY UNLOCKED BADGES */}
            <div className="achieve-panel unlocked-badges-panel">
              <div className="panel-header-row">
                <span className="section-small-title cyan-title">&gt;_ RECENTLY UNLOCKED BADGES</span>
                <button className="panel-link-btn">View all badges →</button>
              </div>

              <div className="unlocked-badges-row">
                {/* BADGE 1: First PR */}
                <div className="unlocked-badge-card">
                  <div className="badge-hexagon-icon badge-hex-green">
                    <span className="badge-hex-num">10</span>
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-main-name">First PR</span>
                    <span className="badge-main-desc">Opened your first pull request</span>
                    <span className="badge-unlock-time">Unlocked 2 days ago</span>
                  </div>
                </div>

                {/* BADGE 2: Issue Solver */}
                <div className="unlocked-badge-card">
                  <div className="badge-hexagon-icon badge-hex-cyan">
                    <span className="badge-hex-num">5</span>
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-main-name">Issue Solver</span>
                    <span className="badge-main-desc">Solved 5 issues</span>
                    <span className="badge-unlock-time">Unlocked 5 days ago</span>
                  </div>
                </div>

                {/* BADGE 3: Code Reviewer */}
                <div className="unlocked-badge-card">
                  <div className="badge-hexagon-icon badge-hex-purple">
                    <PixelCodeBracket size={14} color="#a855f7" />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-main-name">Code Reviewer</span>
                    <span className="badge-main-desc">Reviewed 10 pull requests</span>
                    <span className="badge-unlock-time">Unlocked 1 week ago</span>
                  </div>
                </div>

                {/* BADGE 4: Week Streak */}
                <div className="unlocked-badge-card">
                  <div className="badge-hexagon-icon badge-hex-dark">
                    <PixelFire size={18} />
                  </div>
                  <div className="badge-text-box">
                    <span className="badge-main-name">Week Streak</span>
                    <span className="badge-main-desc">7 days of contributions</span>
                    <span className="badge-unlock-time">Unlocked 1 week ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. MILESTONE TRACKER */}
            <div className="achieve-panel milestone-panel">
              <div className="panel-header-row">
                <span className="section-small-title cyan-title">&gt;_ MILESTONE TRACKER</span>
                <button className="panel-link-btn">View all milestones →</button>
              </div>

              <div className="milestone-stepper">
                {/* 1. First Contribution */}
                <div className="milestone-step step-completed">
                  <div className="milestone-node node-checked">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="milestone-label">First Contribution</span>
                  <span className="milestone-status status-done">Completed</span>
                </div>
                <div className="milestone-connector line-active" />

                {/* 2. First PR */}
                <div className="milestone-step step-completed">
                  <div className="milestone-node node-checked">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="milestone-label">First PR</span>
                  <span className="milestone-status status-done">Completed</span>
                </div>
                <div className="milestone-connector line-active" />

                {/* 3. 5 Issues Solved */}
                <div className="milestone-step step-completed">
                  <div className="milestone-node node-checked">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="milestone-label">5 Issues Solved</span>
                  <span className="milestone-status status-done">Completed</span>
                </div>
                <div className="milestone-connector line-partial" />

                {/* 4. 25 Contributions */}
                <div className="milestone-step step-current">
                  <div className="milestone-node node-current">
                    <PixelLock size={10} color="#eab308" />
                  </div>
                  <span className="milestone-label">25 Contributions</span>
                  <span className="milestone-status status-prog">18 / 25</span>
                </div>
                <div className="milestone-connector line-inactive" />

                {/* 5. 50 Contributions */}
                <div className="milestone-step step-locked">
                  <div className="milestone-node node-locked">
                    <PixelLock size={10} color="#64748b" />
                  </div>
                  <span className="milestone-label">50 Contributions</span>
                  <span className="milestone-status status-prog">18 / 50</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="achieve-right-col">
            {/* 1. ACHIEVEMENT SUMMARY */}
            <div className="achieve-panel summary-panel">
              <div className="panel-header-row">
                <span className="section-small-title purple-title">ACHIEVEMENT SUMMARY</span>
              </div>

              <div className="summary-stats-grid">
                {/* Level */}
                <div className="summary-stat-cell">
                  <div className="summary-hex-icon">
                    <span>32</span>
                  </div>
                  <div className="summary-stat-text">
                    <span className="summary-val">32</span>
                    <span className="summary-lbl">Level</span>
                  </div>
                </div>

                {/* Total XP */}
                <div className="summary-stat-cell">
                  <PixelStar size={22} color="#facc15" />
                  <div className="summary-stat-text">
                    <span className="summary-val">2,450</span>
                    <span className="summary-lbl">Total XP</span>
                  </div>
                </div>

                {/* Badges */}
                <div className="summary-stat-cell">
                  <PixelMedal size={22} color="#38bdf8" />
                  <div className="summary-stat-text">
                    <span className="summary-val">48</span>
                    <span className="summary-lbl">Badges</span>
                  </div>
                </div>

                {/* Streak */}
                <div className="summary-stat-cell">
                  <PixelFire size={22} />
                  <div className="summary-stat-text">
                    <span className="summary-val">7</span>
                    <span className="summary-lbl">Streak (days)</span>
                  </div>
                </div>

                {/* Total PRs */}
                <div className="summary-stat-cell">
                  <PixelBranch size={22} color="#38bdf8" />
                  <div className="summary-stat-text">
                    <span className="summary-val">126</span>
                    <span className="summary-lbl">Total PRs</span>
                  </div>
                </div>

                {/* Issues Solved */}
                <div className="summary-stat-cell">
                  <PixelBug size={22} color="#f97316" />
                  <div className="summary-stat-text">
                    <span className="summary-val">78</span>
                    <span className="summary-lbl">Issues Solved</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. RECENT ACHIEVEMENTS */}
            <div className="achieve-panel recent-panel">
              <div className="panel-header-row">
                <span className="section-small-title purple-title">RECENT ACHIEVEMENTS</span>
              </div>

              <div className="recent-achieve-list">
                {/* 1. First PR */}
                <div className="recent-achieve-item">
                  <div className="badge-hexagon-icon badge-hex-green">
                    <span className="badge-hex-num">10</span>
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">First PR</span>
                    <span className="recent-desc">Opened your first pull request</span>
                    <span className="recent-time">2 days ago</span>
                  </div>
                </div>

                {/* 2. Issue Solver */}
                <div className="recent-achieve-item">
                  <div className="badge-hexagon-icon badge-hex-cyan">
                    <span className="badge-hex-num">5</span>
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">Issue Solver</span>
                    <span className="recent-desc">Solved 5 issues</span>
                    <span className="recent-time">5 days ago</span>
                  </div>
                </div>

                {/* 3. Code Reviewer */}
                <div className="recent-achieve-item">
                  <div className="badge-hexagon-icon badge-hex-purple">
                    <PixelCodeBracket size={14} color="#a855f7" />
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">Code Reviewer</span>
                    <span className="recent-desc">Reviewed 10 PRs</span>
                    <span className="recent-time">1 week ago</span>
                  </div>
                </div>

                {/* 4. Week Streak */}
                <div className="recent-achieve-item">
                  <div className="badge-hexagon-icon badge-hex-dark">
                    <PixelFire size={18} />
                  </div>
                  <div className="recent-info">
                    <span className="recent-title">Week Streak</span>
                    <span className="recent-desc">7 days of contributions</span>
                    <span className="recent-time">1 week ago</span>
                  </div>
                </div>
              </div>

              <div className="recent-footer">
                <button className="view-all-achieve-btn">View all achievements →</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
