import React, { useState } from "react";
import {
  PixelDashboard,
  PixelRepo,
  PixelBranch,
  PixelBug,
  PixelStar,
  PixelSearch,
  RobotPixelAvatar,
  PixelArrowRight,
  PixelDocument,
  PixelHexBadge,
} from "./PixelIcons";
import "./DashboardPage.css";

// Generate 26 weeks of heatmap data matching the reference image
const generateHeatmap = () => {
  const levelsPattern = [
    // MON
    [0, 0, 0, 0, 1, 0, 0, 2, 0, 3, 0, 1, 0, 2, 0, 3, 0, 0, 2, 0, 1, 3, 0, 1, 0, 0],
    // TUE
    [0, 0, 0, 1, 0, 2, 0, 0, 3, 0, 2, 0, 3, 0, 1, 2, 0, 3, 0, 1, 0, 2, 0, 2, 1, 0],
    // WED
    [0, 0, 0, 0, 2, 0, 3, 1, 0, 2, 0, 3, 0, 2, 0, 0, 2, 0, 1, 3, 0, 1, 3, 0, 2, 0],
    // THU
    [0, 0, 1, 0, 3, 2, 0, 4, 2, 1, 3, 0, 2, 0, 3, 2, 0, 2, 0, 0, 2, 0, 2, 1, 0, 0],
    // FRI
    [0, 0, 0, 2, 1, 0, 3, 1, 0, 2, 0, 2, 1, 4, 0, 1, 2, 0, 0, 1, 0, 3, 1, 0, 2, 0],
    // SAT
    [0, 0, 3, 2, 4, 3, 2, 0, 4, 3, 1, 2, 4, 0, 2, 3, 4, 1, 0, 2, 4, 0, 2, 3, 0, 0],
    // SUN
    [0, 0, 0, 0, 1, 0, 2, 1, 0, 3, 2, 0, 1, 2, 0, 0, 3, 0, 0, 0, 2, 1, 0, 3, 0, 0],
  ];

  return levelsPattern;
};


export function DashboardPage({ onNavigate }) {
  const [timeRange, setTimeRange] = useState("Last 12 weeks");
  const [hoveredCell, setHoveredCell] = useState(null);
  const heatmapData = generateHeatmap();

  const days = ["MON", "", "WED", "", "FRI", "", "SUN"];
  const months = ["FEB", "MAR", "APR", "MAY"];

  const handleAction = (destination) => {
    if (onNavigate) {
      onNavigate(destination);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-inner">
        {/* =========================================================
           PAGE HEADER
        ========================================================= */}
        <div className="dashboard-header">

        <div className="dashboard-title-group">
          <div className="dashboard-avatar-box">
            <PixelDashboard size={36} />
          </div>

          <div className="dashboard-text-info">
            <h1 className="dashboard-title">DASHBOARD</h1>
            <p className="dashboard-subtitle">
              Your open-source contribution command center.
            </p>
          </div>
        </div>

        {/* WELCOME BANNER */}
        <div className="welcome-card">
          <span className="welcome-heading">HELLO, DEVELOPER! 👋</span>
          <span className="welcome-subtext">Ready to make an impact today?</span>
        </div>
      </div>

      {/* =========================================================
         METRICS / KPI ROW (4 CARDS)
      ========================================================= */}
      <div className="metrics-row">
        {/* REPOSITORIES */}
        <div className="metric-card">
          <div className="metric-card-inner">
            <div className="metric-icon-wrap">
              <PixelRepo size={28} />
            </div>
            <div className="metric-details">
              <span className="metric-label metric-label-green">REPOSITORIES</span>
              <span className="metric-value">12</span>
              <span className="metric-delta">↑ 2 this month</span>
            </div>
          </div>
        </div>

        {/* PULL REQUESTS */}
        <div className="metric-card">
          <div className="metric-card-inner">
            <div className="metric-icon-wrap">
              <PixelBranch size={28} color="#38bdf8" />
            </div>
            <div className="metric-details">
              <span className="metric-label metric-label-cyan">PULL REQUESTS</span>
              <span className="metric-value">28</span>
              <span className="metric-delta">↑ 6 this month</span>
            </div>
          </div>
        </div>

        {/* ISSUES SOLVED */}
        <div className="metric-card">
          <div className="metric-card-inner">
            <div className="metric-icon-wrap">
              <PixelBug size={28} color="#f97316" />
            </div>
            <div className="metric-details">
              <span className="metric-label metric-label-cyan">ISSUES SOLVED</span>
              <span className="metric-value">16</span>
              <span className="metric-delta">↑ 3 this month</span>
            </div>
          </div>
        </div>

        {/* CONTRIBUTIONS */}
        <div className="metric-card">
          <div className="metric-card-inner">
            <div className="metric-icon-wrap">
              <PixelStar size={28} color="#facc15" />
            </div>
            <div className="metric-details">
              <span className="metric-label metric-label-purple">CONTRIBUTIONS</span>
              <span className="metric-value">84</span>
              <span className="metric-delta">↑ 15 this month</span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
         MIDDLE ROW: HEATMAP + QUICK ACTIONS
      ========================================================= */}
      <div className="middle-row">
        {/* CONTRIBUTION ACTIVITY */}
        <div className="activity-card dash-panel">
          <div className="panel-header">
            <span className="panel-title green-tag">&gt;_ CONTRIBUTION ACTIVITY</span>
            <div className="panel-header-right">
              <select
                className="pixel-select"
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <option>Last 12 weeks</option>
                <option>Last 6 months</option>
                <option>Last year</option>
              </select>
            </div>
          </div>

          <div className="heatmap-wrapper">
            {/* Months row */}
            <div className="heatmap-months-row">
              <span className="month-spacer"></span>
              <div className="months-labels">
                {months.map((m, i) => (
                  <span key={i} className="month-label">
                    {m}
                  </span>
                ))}
              </div>
            </div>

            {/* Grid with Day labels */}
            <div className="heatmap-grid-container">
              <div className="day-labels">
                {days.map((d, i) => (
                  <span key={i} className="day-label">
                    {d}
                  </span>
                ))}
              </div>

              <div className="heatmap-matrix">
                {heatmapData.map((row, rowIdx) => (
                  <div key={rowIdx} className="heatmap-row">
                    {row.map((level, colIdx) => (
                      <div
                        key={colIdx}
                        className={`heatmap-cell level-${level}`}
                        onMouseEnter={() =>
                          setHoveredCell({ row: rowIdx, col: colIdx, level })
                        }
                        onMouseLeave={() => setHoveredCell(null)}
                        title={`${level * 2 + (level > 0 ? 1 : 0)} contributions`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Legend */}
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="legend-cells">
                <span className="legend-cell level-0" />
                <span className="legend-cell level-1" />
                <span className="legend-cell level-2" />
                <span className="legend-cell level-3" />
                <span className="legend-cell level-4" />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="actions-card dash-panel">
          <div className="panel-header">
            <span className="panel-title green-tag">&gt;_ QUICK ACTIONS</span>
          </div>

          <div className="quick-actions-list">
            <button
              className="quick-action-item"
              onClick={() => handleAction("Repository Explorer")}
            >
              <div className="action-icon-box action-icon-search">
                <PixelSearch size={18} color="#38bdf8" />
              </div>
              <div className="action-text-group">
                <span className="action-name">Explore Repositories</span>
                <span className="action-sub">Find your next contribution</span>
              </div>
              <PixelArrowRight size={14} color="#64748b" />
            </button>

            <button
              className="quick-action-item"
              onClick={() => handleAction("Repository Explorer")}
            >
              <div className="action-icon-box action-icon-bug">
                <PixelBug size={18} color="#a855f7" />
              </div>
              <div className="action-text-group">
                <span className="action-name">Find Good First Issues</span>
                <span className="action-sub">Beginner-friendly issues</span>
              </div>
              <PixelArrowRight size={14} color="#64748b" />
            </button>

            <button
              className="quick-action-item"
              onClick={() => handleAction("AI Mentor")}
            >
              <div className="action-icon-box action-icon-robot">
                <RobotPixelAvatar size={20} animated={false} />
              </div>
              <div className="action-text-group">
                <span className="action-name">Ask AI Mentor</span>
                <span className="action-sub">Get contribution guidance</span>
              </div>
              <PixelArrowRight size={14} color="#64748b" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================
         BOTTOM ROW: RECENT CONTRIBUTIONS + SCORE + BADGES
      ========================================================= */}
      <div className="bottom-row">
        {/* RECENT CONTRIBUTIONS */}
        <div className="recent-contribs-card dash-panel">
          <div className="panel-header">
            <span className="panel-title green-tag">&gt;_ RECENT CONTRIBUTIONS</span>
            <button
              className="view-all-link"
              onClick={() => handleAction("Repository Explorer")}
            >
              View all →
            </button>
          </div>

          <div className="contribs-list">
            <div className="contrib-item">
              <div className="contrib-icon-wrap">
                <PixelBranch size={16} color="#a855f7" />
              </div>
              <div className="contrib-info">
                <span className="contrib-repo">openhub/frontend</span>
                <span className="contrib-title">
                  Improve mobile navigation experience
                </span>
                <span className="contrib-meta">Pull Request • 2 hours ago</span>
              </div>
              <span className="status-pill pill-merged">MERGED</span>
            </div>

            <div className="contrib-item">
              <div className="contrib-icon-wrap">
                <PixelBug size={16} color="#f97316" />
              </div>
              <div className="contrib-info">
                <span className="contrib-repo">openhub/backend</span>
                <span className="contrib-title">Fix authentication response</span>
                <span className="contrib-meta">Issue • Yesterday</span>
              </div>
              <span className="status-pill pill-open">OPEN</span>
            </div>

            <div className="contrib-item">
              <div className="contrib-icon-wrap">
                <PixelDocument size={16} color="#a855f7" />
              </div>
              <div className="contrib-info">
                <span className="contrib-repo">openhub/docs</span>
                <span className="contrib-title">Update contribution guide</span>
                <span className="contrib-meta">Documentation • 3 days ago</span>
              </div>
              <span className="status-pill pill-merged">MERGED</span>
            </div>
          </div>
        </div>

        {/* CONTRIBUTOR SCORE */}
        <div className="score-card dash-panel">
          <div className="panel-header">
            <span className="panel-title green-tag">&gt;_ CONTRIBUTOR SCORE</span>
          </div>

          <div className="score-content">
            {/* Donut Score Gauge */}
            <div className="gauge-wrapper">
              <svg className="score-gauge" viewBox="0 0 100 100">
                {/* Background Ring Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#162234"
                  strokeWidth="10"
                />
                {/* Green Segment (75% - 12 o'clock clockwise to 9 o'clock) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="10"
                  strokeDasharray="176 238.76"
                  strokeDashoffset="-2"
                  transform="rotate(-90 50 50)"
                  strokeLinecap="butt"
                />
                {/* Purple Segment (25% - 9 o'clock to 12 o'clock) */}
                <circle
                  cx="50"
                  cy="50"
                  r="38"
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="10"
                  strokeDasharray="57 238.76"
                  strokeDashoffset="-180"
                  transform="rotate(-90 50 50)"
                  strokeLinecap="butt"
                />
              </svg>
              <div className="gauge-center-text">
                <span className="gauge-score">87</span>
                <span className="gauge-max">/100</span>
              </div>
            </div>


            {/* Score Breakdown Bars */}
            <div className="score-breakdown">
              <div className="bar-row">
                <div className="bar-labels">
                  <span className="bar-name">Code</span>
                  <span className="bar-pct">88%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-fill-green" style={{ width: "88%" }} />
                </div>
              </div>

              <div className="bar-row">
                <div className="bar-labels">
                  <span className="bar-name">Issues</span>
                  <span className="bar-pct">76%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-fill-purple" style={{ width: "76%" }} />
                </div>
              </div>

              <div className="bar-row">
                <div className="bar-labels">
                  <span className="bar-name">Reviews</span>
                  <span className="bar-pct">92%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-fill-cyan" style={{ width: "92%" }} />
                </div>
              </div>

              <div className="bar-row">
                <div className="bar-labels">
                  <span className="bar-name">Community</span>
                  <span className="bar-pct">64%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill bar-fill-orange" style={{ width: "64%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RECENT BADGES */}
        <div className="badges-card dash-panel">
          <div className="panel-header">
            <span className="panel-title green-tag">&gt;_ RECENT BADGES</span>
            <button
              className="view-all-link"
              onClick={() => handleAction("Achievements")}
            >
              View all →
            </button>
          </div>

          <div className="badges-list">
            <div className="badge-item">
              <div className="badge-icon-box">
                <PixelHexBadge size={34} type="pr" color="#a855f7" />
              </div>
              <div className="badge-info">
                <span className="badge-title">First Pull Request</span>
                <span className="badge-desc">Opened your first PR</span>
                <span className="badge-time">2 days ago</span>
              </div>
            </div>

            <div className="badge-item">
              <div className="badge-icon-box">
                <PixelHexBadge size={34} type="star" color="#22c55e" />
              </div>
              <div className="badge-info">
                <span className="badge-title">Issue Solver</span>
                <span className="badge-desc">Solved 10 issues</span>
                <span className="badge-time">1 week ago</span>
              </div>
            </div>

            <div className="badge-item">
              <div className="badge-icon-box">
                <PixelHexBadge size={34} type="community" color="#0284c7" />
              </div>
              <div className="badge-info">
                <span className="badge-title">Community Helper</span>
                <span className="badge-desc">Reviewed 5 PRs</span>
                <span className="badge-time">2 weeks ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}



