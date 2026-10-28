import React from "react";

// Crisp pixel art SVG icons using pixel grids

export const RobotPixelAvatar = ({ size = 36, animated = true, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: "crispEdges", display: "block" }}
    className={`pixel-robot-avatar ${animated ? "pulse-anim" : ""} ${className}`}
  >
    {/* Antenna */}
    <rect x="11" y="0" width="2" height="4" fill="#a78bfa" />
    <rect x="10" y="0" width="4" height="2" fill="#f43f5e" />
    {/* Ears */}
    <rect x="2" y="9" width="2" height="5" fill="#8b5cf6" />
    <rect x="20" y="9" width="2" height="5" fill="#8b5cf6" />
    {/* Head Outline - Light Silver/White */}
    <rect x="4" y="4" width="16" height="15" fill="#e2e8f0" />
    <rect x="5" y="3" width="14" height="17" fill="#e2e8f0" />
    {/* Inner Border / Shadow */}
    <rect x="5" y="5" width="14" height="13" fill="#94a3b8" />
    {/* Dark Screen Face */}
    <rect x="6" y="6" width="12" height="11" fill="#070b14" />
    {/* Glowing Cyan Eyes */}
    <rect x="7" y="8" width="3" height="3" fill="#38bdf8" />
    <rect x="8" y="9" width="1" height="1" fill="#ffffff" />
    <rect x="14" y="8" width="3" height="3" fill="#38bdf8" />
    <rect x="15" y="9" width="1" height="1" fill="#ffffff" />
    {/* Cyan Mouth */}
    <rect x="8" y="13" width="8" height="2" fill="#38bdf8" />
    <rect x="9" y="14" width="6" height="1" fill="#070b14" />
    {/* Shoulders / Neck */}
    <rect x="8" y="20" width="8" height="3" fill="#6366f1" />
  </svg>
);

export const UserPixelAvatar = ({ size = 36, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ shapeRendering: "crispEdges", display: "block" }}
    className={`pixel-user-avatar ${className}`}
  >
    {/* Hair - Dark Brown/Black */}
    <rect x="5" y="1" width="14" height="5" fill="#1c1917" />
    <rect x="3" y="3" width="18" height="5" fill="#1c1917" />
    <rect x="3" y="6" width="4" height="7" fill="#1c1917" />
    <rect x="17" y="6" width="4" height="7" fill="#1c1917" />
    {/* Face Skin */}
    <rect x="7" y="6" width="10" height="10" fill="#fcd34d" />
    <rect x="6" y="8" width="12" height="7" fill="#fcd34d" />
    {/* Eyes */}
    <rect x="8" y="9" width="2" height="2" fill="#0f172a" />
    <rect x="14" y="9" width="2" height="2" fill="#0f172a" />
    {/* Mouth / Smile */}
    <rect x="10" y="13" width="4" height="1" fill="#dc2626" />
    {/* Blue Shirt */}
    <rect x="4" y="16" width="16" height="8" fill="#2563eb" />
    <rect x="7" y="16" width="10" height="3" fill="#3b82f6" />
    <rect x="10" y="16" width="4" height="3" fill="#fcd34d" />
  </svg>
);

export const PixelDashboard = ({ size = 20, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Monitor Frame */}
    <rect x="1" y="2" width="14" height="10" fill="#cbd5e1" />
    {/* Screen Interior */}
    <rect x="2" y="3" width="12" height="8" fill="#0284c7" />
    {/* Screen Elements */}
    <rect x="3" y="4" width="4" height="2" fill="#f8fafc" />
    <rect x="8" y="4" width="5" height="1" fill="#facc15" />
    <rect x="8" y="6" width="3" height="1" fill="#4ade80" />
    <rect x="3" y="7" width="10" height="3" fill="#0369a1" />
    {/* Stand & Base */}
    <rect x="7" y="12" width="2" height="2" fill="#94a3b8" />
    <rect x="4" y="14" width="8" height="2" fill="#cbd5e1" />
  </svg>
);

export const PixelRepo = ({ size = 20, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Yellow Folder Tab & Body */}
    <rect x="1" y="3" width="5" height="2" fill="#eab308" />
    <rect x="1" y="5" width="14" height="9" fill="#eab308" />
    <rect x="2" y="6" width="12" height="7" fill="#ca8a04" />
    {/* Magnifying Glass Over Folder */}
    <rect x="5" y="6" width="4" height="4" fill="#38bdf8" />
    <rect x="6" y="7" width="2" height="2" fill="#ffffff" />
    <rect x="9" y="10" width="2" height="2" fill="#0284c7" />
    <rect x="11" y="12" width="2" height="2" fill="#0284c7" />
  </svg>
);

export const PixelTrophy = ({ size = 20, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Cup Top / Body */}
    <rect x="3" y="2" width="10" height="6" fill="#facc15" />
    <rect x="4" y="1" width="8" height="1" fill="#fde047" />
    {/* Handles */}
    <rect x="1" y="3" width="2" height="4" fill="#eab308" />
    <rect x="13" y="3" width="2" height="4" fill="#eab308" />
    {/* Star / Highlight on Cup */}
    <rect x="7" y="4" width="2" height="2" fill="#ffffff" />
    {/* Stem */}
    <rect x="6" y="8" width="4" height="2" fill="#eab308" />
    <rect x="7" y="10" width="2" height="2" fill="#ca8a04" />
    {/* Base */}
    <rect x="4" y="12" width="8" height="3" fill="#78350f" />
    <rect x="5" y="13" width="6" height="1" fill="#92400e" />
  </svg>
);

export const PixelSettings = ({ size = 20, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Gear Teeth */}
    <rect x="6" y="1" width="4" height="14" fill={color} />
    <rect x="1" y="6" width="14" height="4" fill={color} />
    {/* Gear Center */}
    <rect x="3" y="3" width="10" height="10" fill={color} />
    {/* Center Hole */}
    <rect x="6" y="6" width="4" height="4" fill="#070b14" />
  </svg>
);

export const PixelProfile = ({ size = 20, color = "#94a3b8" }) => (
  <UserPixelAvatar size={size} />
);


export const PixelSearch = ({ size = 18, color = "#64748b" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="2" width="7" height="1" fill={color} />
    <rect x="2" y="8" width="7" height="1" fill={color} />
    <rect x="1" y="3" width="1" height="5" fill={color} />
    <rect x="8" y="3" width="1" height="5" fill={color} />
    <rect x="8" y="8" width="2" height="2" fill={color} />
    <rect x="10" y="10" width="2" height="2" fill={color} />
    <rect x="12" y="12" width="3" height="3" fill={color} />
  </svg>
);

export const PixelBell = ({ size = 20, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="7" y="1" width="2" height="2" fill={color} />
    <rect x="5" y="3" width="6" height="7" fill={color} />
    <rect x="3" y="10" width="10" height="2" fill={color} />
    <rect x="6" y="13" width="4" height="2" fill={color} />
  </svg>
);

export const PixelHistory = ({ size = 18, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="5" y="2" width="6" height="2" fill={color} />
    <rect x="2" y="5" width="2" height="6" fill={color} />
    <rect x="12" y="5" width="2" height="6" fill={color} />
    <rect x="5" y="12" width="6" height="2" fill={color} />
    {/* Arrow head top left */}
    <rect x="2" y="2" width="3" height="2" fill={color} />
    <rect x="2" y="2" width="2" height="4" fill={color} />
    {/* Clock hands */}
    <rect x="7" y="5" width="2" height="4" fill={color} />
    <rect x="7" y="8" width="4" height="2" fill={color} />
  </svg>
);

export const PixelDots = ({ size = 18, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="7" y="2" width="2" height="2" fill={color} />
    <rect x="7" y="7" width="2" height="2" fill={color} />
    <rect x="7" y="12" width="2" height="2" fill={color} />
  </svg>
);

export const PixelRefresh = ({ size = 16, color = "#4ade80" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="5" y="1" width="6" height="2" fill={color} />
    <rect x="2" y="4" width="2" height="5" fill={color} />
    <rect x="12" y="7" width="2" height="5" fill={color} />
    <rect x="5" y="13" width="6" height="2" fill={color} />
    {/* Arrows */}
    <rect x="11" y="2" width="3" height="2" fill={color} />
    <rect x="13" y="2" width="2" height="4" fill={color} />
    <rect x="2" y="10" width="2" height="4" fill={color} />
    <rect x="2" y="12" width="4" height="2" fill={color} />
  </svg>
);

export const PixelWarning = ({ size = 18, color = "#ef4444" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="2" width="12" height="12" fill={color} />
    <rect x="3" y="1" width="10" height="14" fill={color} />
    <rect x="1" y="3" width="14" height="10" fill={color} />
    {/* Exclamation point */}
    <rect x="7" y="4" width="2" height="5" fill="#ffffff" />
    <rect x="7" y="10" width="2" height="2" fill="#ffffff" />
  </svg>
);

export const PixelLightbulb = ({ size = 18, color = "#fbbf24" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="5" y="2" width="6" height="2" fill={color} />
    <rect x="3" y="4" width="10" height="5" fill={color} />
    <rect x="4" y="9" width="8" height="2" fill={color} />
    <rect x="5" y="11" width="6" height="2" fill="#94a3b8" />
    <rect x="6" y="13" width="4" height="2" fill="#64748b" />
    {/* Glow center */}
    <rect x="7" y="5" width="2" height="3" fill="#ffffff" />
  </svg>
);

export const PixelCode = ({ size = 18, color = "#60a5fa" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    {/* < */}
    <rect x="4" y="6" width="2" height="2" fill={color} />
    <rect x="2" y="8" width="2" height="2" fill={color} />
    <rect x="4" y="10" width="2" height="2" fill={color} />
    {/* / */}
    <rect x="9" y="4" width="2" height="2" fill={color} />
    <rect x="7" y="7" width="2" height="2" fill={color} />
    <rect x="5" y="10" width="2" height="2" fill={color} />
    {/* > */}
    <rect x="10" y="6" width="2" height="2" fill={color} />
    <rect x="12" y="8" width="2" height="2" fill={color} />
    <rect x="10" y="10" width="2" height="2" fill={color} />
  </svg>
);

export const PixelPaperclip = ({ size = 18, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="6" y="2" width="5" height="2" fill={color} />
    <rect x="4" y="4" width="2" height="8" fill={color} />
    <rect x="11" y="4" width="2" height="5" fill={color} />
    <rect x="6" y="12" width="5" height="2" fill={color} />
    <rect x="9" y="7" width="2" height="4" fill={color} />
    <rect x="7" y="6" width="3" height="2" fill={color} />
  </svg>
);

export const PixelSend = ({ size = 18, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="2" width="2" height="12" fill={color} />
    <rect x="4" y="4" width="3" height="8" fill={color} />
    <rect x="7" y="6" width="3" height="4" fill={color} />
    <rect x="10" y="7" width="4" height="2" fill={color} />
    <rect x="14" y="8" width="2" height="1" fill={color} />
  </svg>
);

export const PixelCopy = ({ size = 14, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="1" y="4" width="9" height="11" fill={color} />
    <rect x="2" y="5" width="7" height="9" fill="#0f172a" />
    <rect x="6" y="1" width="9" height="11" fill={color} />
    <rect x="7" y="2" width="7" height="9" fill="#1e293b" />
  </svg>
);

export const PixelExternalLink = ({ size = 16, color = "#94a3b8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="6" width="2" height="8" fill={color} />
    <rect x="2" y="12" width="8" height="2" fill={color} />
    <rect x="8" y="2" width="6" height="2" fill={color} />
    <rect x="12" y="2" width="2" height="6" fill={color} />
    {/* Arrow diagonal */}
    <rect x="6" y="8" width="2" height="2" fill={color} />
    <rect x="8" y="6" width="2" height="2" fill={color} />
    <rect x="10" y="4" width="2" height="2" fill={color} />
  </svg>
);

export const PixelNewChat = ({ size = 18, color = "#ffffff" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="2" width="12" height="9" fill={color} />
    <rect x="3" y="3" width="10" height="7" fill="#6d28d9" />
    <rect x="4" y="11" width="3" height="3" fill={color} />
    {/* Plus sign */}
    <rect x="7" y="5" width="2" height="3" fill="#ffffff" />
    <rect x="6" y="6" width="4" height="1" fill="#ffffff" />
  </svg>
);
export const PixelPlus = ({ size = 16, color = "#f0f6fc" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="7" y="2" width="2" height="12" fill={color} />
    <rect x="2" y="7" width="12" height="2" fill={color} />
  </svg>
);

export const PixelBranch = ({ size = 20, color = "#38bdf8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Left branch line & nodes */}
    <rect x="3" y="2" width="2" height="12" fill={color} />
    <rect x="2" y="2" width="4" height="3" fill={color} />
    <rect x="2" y="11" width="4" height="3" fill={color} />
    {/* Right branch line & node */}
    <rect x="5" y="7" width="4" height="2" fill={color} />
    <rect x="9" y="4" width="2" height="5" fill={color} />
    <rect x="8" y="3" width="4" height="3" fill={color} />
  </svg>
);

export const PixelBug = ({ size = 20, color = "#f97316" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Antennae */}
    <rect x="3" y="1" width="2" height="2" fill={color} />
    <rect x="11" y="1" width="2" height="2" fill={color} />
    {/* Head */}
    <rect x="5" y="3" width="6" height="2" fill={color} />
    {/* Body */}
    <rect x="4" y="5" width="8" height="8" fill={color} />
    <rect x="5" y="6" width="6" height="6" fill="#0f172a" />
    <rect x="7" y="5" width="2" height="8" fill={color} />
    {/* Legs */}
    <rect x="1" y="5" width="3" height="2" fill={color} />
    <rect x="12" y="5" width="3" height="2" fill={color} />
    <rect x="1" y="8" width="3" height="2" fill={color} />
    <rect x="12" y="8" width="3" height="2" fill={color} />
    <rect x="1" y="11" width="3" height="2" fill={color} />
    <rect x="12" y="11" width="3" height="2" fill={color} />
  </svg>
);

export const PixelStar = ({ size = 20, color = "#facc15" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="7" y="1" width="2" height="2" fill={color} />
    <rect x="6" y="3" width="4" height="2" fill={color} />
    <rect x="1" y="5" width="14" height="3" fill={color} />
    <rect x="3" y="8" width="10" height="2" fill={color} />
    <rect x="4" y="10" width="8" height="2" fill={color} />
    <rect x="3" y="12" width="4" height="3" fill={color} />
    <rect x="9" y="12" width="4" height="3" fill={color} />
    <rect x="7" y="5" width="2" height="4" fill="#ffffff" />
  </svg>
);

export const PixelDocument = ({ size = 20, color = "#a855f7" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Page border */}
    <rect x="3" y="1" width="7" height="14" fill={color} />
    <rect x="10" y="4" width="3" height="11" fill={color} />
    <rect x="10" y="1" width="3" height="3" fill="#cbd5e1" />
    {/* Page inner */}
    <rect x="4" y="2" width="5" height="12" fill="#0d1117" />
    <rect x="9" y="5" width="3" height="9" fill="#0d1117" />
    {/* Text lines */}
    <rect x="5" y="4" width="4" height="1" fill={color} />
    <rect x="5" y="6" width="6" height="1" fill={color} />
    <rect x="5" y="8" width="6" height="1" fill={color} />
    <rect x="5" y="10" width="4" height="1" fill={color} />
  </svg>
);

export const PixelArrowRight = ({ size = 16, color = "#8b949e" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill={color} style={{ shapeRendering: "crispEdges" }}>
    <rect x="2" y="7" width="10" height="2" fill={color} />
    <rect x="9" y="5" width="2" height="2" fill={color} />
    <rect x="11" y="6" width="2" height="2" fill={color} />
    <rect x="9" y="9" width="2" height="2" fill={color} />
    <rect x="11" y="8" width="2" height="2" fill={color} />
  </svg>
);

export const PixelHexBadge = ({ size = 36, type = "pr", color = "#a855f7" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Hexagon Outline */}
    <rect x="6" y="2" width="12" height="2" fill={color} />
    <rect x="4" y="4" width="2" height="2" fill={color} />
    <rect x="18" y="4" width="2" height="2" fill={color} />
    <rect x="2" y="6" width="2" height="12" fill={color} />
    <rect x="20" y="6" width="2" height="12" fill={color} />
    <rect x="4" y="18" width="2" height="2" fill={color} />
    <rect x="18" y="18" width="2" height="2" fill={color} />
    <rect x="6" y="20" width="12" height="2" fill={color} />
    {/* Inner Fill */}
    <rect x="4" y="6" width="16" height="12" fill="#161b22" />
    <rect x="6" y="4" width="12" height="16" fill="#161b22" />
    {/* Inner Icon */}
    {type === "pr" && (
      <>
        {/* Robot/Trophy shape inside */}
        <rect x="10" y="6" width="4" height="2" fill={color} />
        <rect x="8" y="8" width="8" height="6" fill={color} />
        <rect x="10" y="10" width="4" height="2" fill="#ffffff" />
        <rect x="7" y="14" width="10" height="3" fill={color} />
      </>
    )}
    {type === "star" && (
      <>
        {/* Star shape inside */}
        <rect x="11" y="6" width="2" height="2" fill="#4ade80" />
        <rect x="7" y="8" width="10" height="2" fill="#4ade80" />
        <rect x="9" y="10" width="6" height="4" fill="#4ade80" />
        <rect x="8" y="14" width="3" height="3" fill="#4ade80" />
        <rect x="13" y="14" width="3" height="3" fill="#4ade80" />
      </>
    )}
    {type === "community" && (
      <>
        {/* Users shape inside */}
        <rect x="10" y="7" width="4" height="3" fill="#38bdf8" />
        <rect x="8" y="11" width="8" height="5" fill="#38bdf8" />
        <rect x="6" y="10" width="3" height="2" fill="#38bdf8" />
        <rect x="15" y="10" width="3" height="2" fill="#38bdf8" />
      </>
    )}
  </svg>
);

export const PixelCodeBracket = ({ size = 20, color = "#a855f7" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Left < */}
    <rect x="5" y="4" width="2" height="2" fill={color} />
    <rect x="3" y="6" width="2" height="4" fill={color} />
    <rect x="5" y="10" width="2" height="2" fill={color} />
    {/* Right > */}
    <rect x="9" y="4" width="2" height="2" fill={color} />
    <rect x="11" y="6" width="2" height="4" fill={color} />
    <rect x="9" y="10" width="2" height="2" fill={color} />
  </svg>
);

export const PixelMobile = ({ size = 20, color = "#eab308" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    <rect x="4" y="2" width="8" height="12" fill={color} />
    <rect x="5" y="4" width="6" height="7" fill="#0d1117" />
    <rect x="7" y="12" width="2" height="1" fill="#ffffff" />
  </svg>
);

export const PixelDesign = ({ size = 20, color = "#ef4444" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    <rect x="11" y="2" width="3" height="3" fill={color} />
    <rect x="8" y="5" width="4" height="4" fill={color} />
    <rect x="5" y="8" width="4" height="4" fill={color} />
    <rect x="2" y="11" width="4" height="4" fill={color} />
    <rect x="1" y="14" width="2" height="1" fill="#ffffff" />
  </svg>
);

export const PixelTerminalComputer = ({ size = 54 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Monitor Frame */}
    <rect x="4" y="4" width="24" height="18" fill="#30363d" />
    <rect x="6" y="6" width="20" height="14" fill="#0d1117" />
    {/* Stand & Base */}
    <rect x="14" y="22" width="4" height="4" fill="#30363d" />
    <rect x="10" y="26" width="12" height="2" fill="#30363d" />
    {/* Green Screen Code */}
    <rect x="9" y="11" width="2" height="4" fill="#22c55e" />
    <rect x="11" y="10" width="1" height="2" fill="#22c55e" />
    <rect x="11" y="14" width="1" height="2" fill="#22c55e" />
    <rect x="13" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="16" y="12" width="2" height="2" fill="#22c55e" />
    <rect x="20" y="11" width="2" height="4" fill="#22c55e" />
    <rect x="19" y="10" width="1" height="2" fill="#22c55e" />
    <rect x="19" y="14" width="1" height="2" fill="#22c55e" />
    {/* Sparkles around */}
    <rect x="2" y="2" width="2" height="2" fill="#facc15" />
    <rect x="28" y="3" width="2" height="2" fill="#a855f7" />
    <rect x="1" y="22" width="2" height="2" fill="#38bdf8" />
    <rect x="29" y="24" width="2" height="2" fill="#ec4899" />
  </svg>
);

export const PixelFire = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Outer Flame (Orange-Red) */}
    <rect x="7" y="2" width="2" height="2" fill="#ea580c" />
    <rect x="6" y="4" width="4" height="2" fill="#ea580c" />
    <rect x="4" y="6" width="8" height="4" fill="#ea580c" />
    <rect x="3" y="8" width="10" height="5" fill="#ea580c" />
    <rect x="5" y="13" width="6" height="2" fill="#ea580c" />
    {/* Inner Core (Yellow) */}
    <rect x="7" y="6" width="2" height="3" fill="#facc15" />
    <rect x="6" y="9" width="4" height="4" fill="#facc15" />
  </svg>
);

export const PixelMedal = ({ size = 20, color = "#38bdf8" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Ribbons */}
    <rect x="5" y="2" width="2" height="4" fill={color} />
    <rect x="9" y="2" width="2" height="4" fill={color} />
    <rect x="6" y="5" width="4" height="2" fill={color} />
    {/* Medal Ring */}
    <rect x="5" y="7" width="6" height="6" fill="#0d1117" />
    <rect x="6" y="6" width="4" height="8" fill={color} />
    <rect x="4" y="8" width="8" height="4" fill={color} />
    <rect x="7" y="9" width="2" height="2" fill="#ffffff" />
  </svg>
);

export const PixelChatBubble = ({ size = 20, color = "#a855f7" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    <rect x="3" y="3" width="10" height="8" fill={color} />
    <rect x="4" y="11" width="3" height="2" fill={color} />
    <rect x="3" y="13" width="2" height="1" fill={color} />
    {/* 3 Dots */}
    <rect x="5" y="6" width="1" height="2" fill="#0d1117" />
    <rect x="7" y="6" width="2" height="2" fill="#0d1117" />
    <rect x="10" y="6" width="1" height="2" fill="#0d1117" />
  </svg>
);

export const PixelLock = ({ size = 16, color = "#8b949e" }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ shapeRendering: "crispEdges" }}>
    {/* Shackle */}
    <rect x="6" y="3" width="4" height="4" fill="none" stroke={color} strokeWidth="1" />
    {/* Body */}
    <rect x="4" y="7" width="8" height="6" fill={color} />
    {/* Keyhole */}
    <rect x="7" y="9" width="2" height="2" fill="#0d1117" />
  </svg>
);




