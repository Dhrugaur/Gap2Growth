import React, { useState, useRef, useEffect } from "react";

import {
  RobotPixelAvatar,
  UserPixelAvatar,
  PixelHistory,
  PixelDots,
  PixelRefresh,
  PixelWarning,
  PixelLightbulb,
  PixelCode,
  PixelPaperclip,
  PixelSend,
  PixelCopy,
  PixelExternalLink,
  PixelDashboard,
  PixelNewChat,
} from "./PixelIcons";

import "./AIMentorPage.css";

/* =========================================================
   INITIAL CHAT
========================================================= */

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: "ai",
    senderName: "AI Mentor",
    time: "10:30 AM",
    text: "Hey! I can help you understand repositories, pick issues, and plan your contribution. What would you like to know?",
  },
  {
    id: 2,
    sender: "user",
    senderName: "You",
    time: "10:31 AM",
    text: "How do I start contributing to this repository?",
  },
  {
    id: 3,
    sender: "ai",
    senderName: "AI Mentor",
    time: "10:31 AM",
    text: `Great question! Here's a quick path to get started:

1. Read the CONTRIBUTING.md to understand guidelines
2. Check beginner-friendly issues labeled "good first issue"
3. Ask questions in the thread if anything is unclear
4. Fork the repo and create your first PR 🚀`,
    actions: [
      {
        label: "Show good first issues",
        type: "show_issues",
      },
      {
        label: "Open contributing guide",
        type: "open_guide",
      },
    ],
  },
];


/* =========================================================
   REPOSITORIES
========================================================= */

const SAMPLE_REPOS = [
  {
    name: "openhub/frontend",
    tech: "React  •  JavaScript  •  MIT License",
  },
  {
    name: "openhub/backend",
    tech: "Node.js  •  Express  •  MIT License",
  },
  {
    name: "openhub/mobile",
    tech: "React Native  •  TypeScript  •  MIT License",
  },
];


/* =========================================================
   ISSUES
========================================================= */

const SAMPLE_ISSUES = [
  {
    id: "#142",
    title: "Improve mobile navigation experience",
    time: "opened 2 days ago",
    tag: "good first issue",

    suggestedSteps: [
      "Review the Navbar component",
      "Check existing responsive styles",
      "Implement mobile menu behavior",
      "Test on different screen sizes",
    ],

    files: [
      {
        path: "src/components/Navbar.jsx",
        lang: "JS",
        code: `// src/components/Navbar.jsx

import React, { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mobile-toggle"
      >
        <span className="menu-icon" />
      </button>

      {/* Navigation items */}
    </nav>
  );
};`,
      },
      {
        path: "src/components/MobileMenu.jsx",
        lang: "JS",
        code: `// src/components/MobileMenu.jsx

import React from "react";

export const MobileMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="mobile-menu-overlay" onClick={onClose}>
      <div className="mobile-menu">Menu Content</div>
    </div>
  );
};`,
      },
      {
        path: "src/styles/navigation.css",
        lang: "CSS",
        code: `/* src/styles/navigation.css */

.navbar {
  display: flex;
  align-items: center;
  background: #0d1117;
  border-bottom: 1px solid #30363d;
}

@media (max-width: 768px) {
  .mobile-menu-overlay {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(9, 14, 20, 0.9);
  }
}`,
      },
    ],
  },
];


/* =========================================================
   AI MENTOR
========================================================= */

export function AIMentorPage() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  const [inputVal, setInputVal] = useState("");

  const [isTyping, setIsTyping] = useState(false);

  const [activeRepoIndex, setActiveRepoIndex] = useState(0);

  const [activeIssueIndex, setActiveIssueIndex] = useState(0);

  const [completedSteps, setCompletedSteps] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [toastMessage, setToastMessage] = useState("");

  const [previewFile, setPreviewFile] = useState(null);

  const [showGuideModal, setShowGuideModal] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const messagesEndRef = useRef(null);


  /* =======================================================
     CURRENT DATA
  ======================================================= */

  const currentRepo = SAMPLE_REPOS[activeRepoIndex];

  const currentIssue =
    SAMPLE_ISSUES[activeIssueIndex] || SAMPLE_ISSUES[0];


  /* =======================================================
     AUTO SCROLL
  ======================================================= */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isTyping]);


  /* =======================================================
     TOAST
  ======================================================= */

  const showToast = (message) => {
    setToastMessage(message);

    setTimeout(() => {
      setToastMessage("");
    }, 2500);
  };


  /* =======================================================
     SEND MESSAGE
  ======================================================= */

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputVal;

    if (!text.trim()) return;


    const userMessage = {
      id: Date.now(),

      sender: "user",

      senderName: "You",

      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),

      text: text,
    };


    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);


    if (!textToSend) {
      setInputVal("");
    }


    setIsTyping(true);


    setTimeout(() => {
      const lower = text.toLowerCase();

      let replyText = "";

      let replyActions = null;


      /* ---------------------------------------------------
         ISSUES
      --------------------------------------------------- */

      if (
        lower.includes("good first issue") ||
        lower.includes("issues")
      ) {
        replyText = `Here are recommended beginner issues for ${currentRepo.name}:

1. #142: Improve mobile navigation experience
2. #156: Add dark theme toggle state handler

Select issue #142 in the right context panel to inspect the suggested implementation steps.`;

        replyActions = [
          {
            label: "Analyze #142 Mobile Nav",
            type: "analyze_142",
          },
        ];
      }


      /* ---------------------------------------------------
         CONTRIBUTING GUIDE
      --------------------------------------------------- */

      else if (
        lower.includes("contributing") ||
        lower.includes("guide")
      ) {
        replyText = `Quick Start Guide for ${currentRepo.name}:

Setup: Node.js 18+
Install: npm install → npm run dev
Branches: feature/issue-number-description
Pull Requests: Reference the issue number and pass the linter.`;

        replyActions = [
          {
            label: "Open contributing guide",
            type: "open_guide",
          },
        ];
      }


      /* ---------------------------------------------------
         NAVBAR / MOBILE
      --------------------------------------------------- */

      else if (
        lower.includes("navbar") ||
        lower.includes("mobile")
      ) {
        replyText = `The Navbar component (src/components/Navbar.jsx) manages header navigation.

To improve mobile behavior:

1. Add mobile toggle state to Navbar.jsx
2. Apply media queries in navigation.css
3. Verify the menu overlay closes correctly`;

        replyActions = [
          {
            label: "Preview Navbar.jsx",
            type: "preview_navbar",
          },
        ];
      }


      /* ---------------------------------------------------
         DEFAULT
      --------------------------------------------------- */

      else {
        replyText = `Understood. I'm analyzing ${currentRepo.name} and issue ${currentIssue.id}.

Check the Contribution Context panel on the right for the repository, issue, suggested approach, and related files.`;
      }


      const aiMessage = {
        id: Date.now() + 1,

        sender: "ai",

        senderName: "OpenHub Mentor",

        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        text: replyText,

        actions: replyActions,
      };


      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setIsTyping(false);

    }, 1000);
  };


  /* =======================================================
     MESSAGE ACTIONS
  ======================================================= */

  const handleActionClick = (action) => {
    if (action.type === "show_issues") {
      handleSendMessage(
        "Show beginner-friendly issues"
      );
    }

    else if (action.type === "open_guide") {
      setShowGuideModal(true);
    }

    else if (action.type === "analyze_142") {
      setActiveIssueIndex(0);

      handleSendMessage(
        "How do I solve issue #142?"
      );
    }

    else if (action.type === "preview_navbar") {
      setPreviewFile(
        currentIssue.files[0]
      );
    }
  };


  /* =======================================================
     NEW CONVERSATION
  ======================================================= */

  const handleNewConversation = () => {
    setMessages([
      {
        id: Date.now(),

        sender: "ai",

        senderName: "OpenHub Mentor",

        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),

        text: `New conversation started for ${currentRepo.name}.

How can I help you with your open-source contribution today?`,
      },
    ]);

    showToast("New conversation started");
  };


  /* =======================================================
     REFRESH CONTEXT
  ======================================================= */

  const handleRefreshContext = () => {
    setRefreshing(true);

    showToast(
      "Re-scanning repository context..."
    );

    setTimeout(() => {
      setRefreshing(false);

      showToast("Context updated");
    }, 700);
  };


  /* =======================================================
     STEP TOGGLE
  ======================================================= */

  const handleStepToggle = (index) => {
    const updated = [
      ...completedSteps,
    ];

    updated[index] =
      !updated[index];

    setCompletedSteps(updated);
  };


  /* =======================================================
     COPY CODE
  ======================================================= */

  const handleCopyCode = (file) => {
    navigator.clipboard?.writeText(
      file.code || file.path
    );

    showToast(
      `Copied ${file.path} to clipboard!`
    );
  };


  /* =======================================================
     INSERT CODE
  ======================================================= */

  const insertCodeSnippet = () => {
    setInputVal(
      (prev) =>
        prev +
        "```js\n// Add snippet\n```"
    );
  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="ai-mentor-container">


      {/* ===================================================
          TOAST
      =================================================== */}

      {toastMessage && (
        <div className="pixel-toast">
          {toastMessage}
        </div>
      )}


      {/* ===================================================
          HEADER
      =================================================== */}

      <div className="mentor-header">

        <div className="mentor-title-group">


          {/* ROBOT */}

          <div className="mentor-avatar-box">

            <RobotPixelAvatar
              size={42}
              animated={true}
              className="mentor-avatar-img"
            />

          </div>


          {/* TITLE */}

          <div className="mentor-text-info">

            <h1 className="mentor-title">
              AI MENTOR
            </h1>

            <p className="mentor-subtitle">
              Your coding companion for open-source contributions.
            </p>

          </div>

        </div>


        {/* NEW CONVERSATION */}

        <button
          className="new-conv-btn"
          onClick={handleNewConversation}
        >

          <PixelNewChat
            size={16}
            color="#e9d5ff"
          />

          <span>
            NEW CONVERSATION
          </span>

        </button>

      </div>



      {/* ===================================================
          WORKSPACE
      =================================================== */}

      <div className="mentor-workspace">


        {/* =================================================
            CHAT PANEL
        ================================================= */}

        <div className="chat-panel dev-panel">


          {/* CHAT HEADER */}

          <div className="chat-header">

            <div className="chat-bot-info">

              <RobotPixelAvatar
                size={27}
                animated={false}
                className="chat-avatar-small"
              />

              <span className="chat-bot-title">
                OpenHub Mentor
              </span>

              <div className="status-online">

                <span className="online-dot" />

                <span>
                  Online
                </span>

              </div>

            </div>


            {/* HEADER ACTIONS */}

            <div className="chat-header-actions">

              <button
                className="dev-icon-btn"
                title="Conversation History"

                onClick={() =>
                  showToast(
                    "Conversation history"
                  )
                }
              >

                <PixelHistory
                  size={16}
                  color="#8b949e"
                />

              </button>


              <button
                className="dev-icon-btn"
                title="More"

                onClick={() =>
                  setMenuOpen(
                    (prev) => !prev
                  )
                }
              >

                <PixelDots
                  size={16}
                  color="#8b949e"
                />

              </button>


              {/* MENU */}

              {menuOpen && (

                <div className="pixel-dropdown">

                  <button
                    className="dropdown-item"

                    onClick={() => {
                      setMessages([]);

                      setMenuOpen(false);

                      showToast(
                        "Chat cleared"
                      );
                    }}
                  >
                    Clear Chat
                  </button>


                  <button
                    className="dropdown-item"

                    onClick={() => {
                      setShowGuideModal(
                        true
                      );

                      setMenuOpen(false);
                    }}
                  >
                    Contributing Guide
                  </button>


                  <button
                    className="dropdown-item"

                    onClick={() => {

                      setActiveRepoIndex(
                        (prev) =>
                          (prev + 1) %
                          SAMPLE_REPOS.length
                      );

                      setMenuOpen(false);

                      showToast(
                        "Repository switched"
                      );

                    }}
                  >
                    Switch Repository
                  </button>

                </div>

              )}

            </div>

          </div>


          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="messages-container">


            {messages.map((msg) => (

              <div
                key={msg.id}
                className={`message-block ${
                  msg.sender === "user"
                    ? "user-block"
                    : "ai-block"
                }`}
              >

                <div className="message-row-inner">


                  {/* AI AVATAR */}

                  {msg.sender === "ai" && (

                    <div className="message-avatar ai-message-avatar">

                      <RobotPixelAvatar
                        size={28}
                        animated={false}
                      />

                    </div>

                  )}


                  {/* CONTENT */}

                  <div className="message-content">

                    <div className="msg-header">

                      <span className="msg-author">
                        {msg.senderName}
                      </span>

                      <span className="msg-time">
                        {msg.time}
                      </span>

                    </div>


                    <div className="msg-body">

                      <div className="msg-text">
                        {msg.text}
                      </div>


                      {/* ACTIONS */}

                      {msg.actions?.length > 0 && (

                        <div className="msg-actions">

                          {msg.actions.map(
                            (action, index) => (

                              <button
                                key={index}
                                className="msg-action-btn"

                                onClick={() =>
                                  handleActionClick(
                                    action
                                  )
                                }
                              >

                                {action.label}

                              </button>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  </div>


                  {/* USER AVATAR */}

                  {msg.sender === "user" && (

                    <div className="message-avatar user-message-avatar">

                      <UserPixelAvatar
                        size={28}
                      />

                    </div>

                  )}

                </div>

              </div>

            ))}


            {/* =================================================
                TYPING
            ================================================= */}

            {isTyping && (

              <div className="message-block ai-block">

                <div className="message-row-inner">

                  <div className="message-avatar ai-message-avatar">

                    <RobotPixelAvatar
                      size={28}
                      animated={true}
                    />

                  </div>


                  <div className="message-content">

                    <div className="msg-header">

                      <span className="msg-author">
                        OpenHub Mentor
                      </span>

                      <span className="msg-time">
                        typing...
                      </span>

                    </div>


                    <div className="msg-body typing-body">

                      <span className="typing-dot" />

                      <span className="typing-dot" />

                      <span className="typing-dot" />

                    </div>

                  </div>

                </div>

              </div>

            )}


            <div ref={messagesEndRef} />

          </div>


          {/* =================================================
              INPUT
          ================================================= */}

          <form
            className="chat-input-area"

            onSubmit={(event) => {
              event.preventDefault();

              handleSendMessage();
            }}
          >

            <div className="input-field-wrapper">

              <input
                type="text"
                className="chat-text-input"

                placeholder="Ask anything about this repository, issues, or contributions..."

                value={inputVal}

                onChange={(event) =>
                  setInputVal(
                    event.target.value
                  )
                }
              />


              <div className="input-toolbar">

                <button
                  type="button"
                  className="toolbar-btn"

                  title="Attach file"

                  onClick={() =>
                    showToast(
                      "File attachment coming soon"
                    )
                  }
                >

                  <PixelPaperclip
                    size={16}
                    color="#8b949e"
                  />

                </button>


                <button
                  type="button"
                  className="toolbar-btn"

                  title="Insert code"

                  onClick={
                    insertCodeSnippet
                  }
                >

                  <PixelCode
                    size={16}
                    color="#8b949e"
                  />

                </button>

              </div>

              <button
                type="submit"
                className="send-btn"
                title="Send message"
              >

                <PixelSend
                  size={16}
                  color="#ffffff"
                />

              </button>

            </div>

          </form>

        </div>


        {/* =================================================
            CONTRIBUTION CONTEXT
        ================================================= */}

        <div className="context-panel dev-panel">


          {/* CONTEXT HEADER */}

          <div className="context-header">

            <div className="context-header-left">

              <h2 className="context-title">
                CONTRIBUTION CONTEXT
              </h2>

            </div>


            <button
              className={`refresh-btn ${
                refreshing
                  ? "spinning"
                  : ""
              }`}
              onClick={
                handleRefreshContext
              }
              title="Refresh context"
            >
              <PixelRefresh
                size={16}
                color="#e6edf3"
              />
            </button>

          </div>



          {/* CONTEXT CONTENT */}

          <div className="context-content">


            {/* =================================================
                REPOSITORY
            ================================================= */}

            <div className="context-section">

              <div className="section-label-row">

                <PixelDashboard
                  size={14}
                  color="#58a6ff"
                />

                <span className="section-label">
                  Repository
                </span>

              </div>


              <button
                className="repo-name"

                onClick={() => {

                  setActiveRepoIndex(
                    (prev) =>
                      (prev + 1) %
                      SAMPLE_REPOS.length
                  );

                  showToast(
                    "Repository switched"
                  );

                }}
              >
                {currentRepo.name}
              </button>


              <div className="repo-meta">
                {currentRepo.tech}
              </div>

            </div>


            {/* =================================================
                CURRENT ISSUE
            ================================================= */}

            <div className="context-section">

              <div className="section-label-row">

                <PixelWarning
                  size={14}
                  color="#ef4444"
                />

                <span className="section-label">
                  Current Issue
                </span>

              </div>


              <button
                className="issue-title"

                onClick={() => {

                  setActiveIssueIndex(
                    (prev) =>
                      (prev + 1) %
                      SAMPLE_ISSUES.length
                  );

                  showToast(
                    "Issue switched"
                  );

                }}
              >
                {currentIssue.title}
              </button>


              <div className="issue-meta-row">

                <span className="issue-subtext">
                  {currentIssue.id}  •  {currentIssue.time}
                </span>

                <span className="issue-badge">
                  {currentIssue.tag}
                </span>

              </div>

            </div>


            {/* =================================================
                SUGGESTED APPROACH
            ================================================= */}

            <div className="context-section">

              <div className="section-label-row">

                <PixelLightbulb
                  size={14}
                  color="#fbbf24"
                />

                <span className="section-label">
                  Suggested Approach
                </span>

              </div>


              <div className="steps-list">

                {currentIssue.suggestedSteps.map(
                  (step, index) => (

                    <button
                      key={index}

                      className={`step-row ${
                        completedSteps[index]
                          ? "completed"
                          : ""
                      }`}

                      onClick={() =>
                        handleStepToggle(
                          index
                        )
                      }
                    >

                      <span className="step-num">
                        {index + 1}
                      </span>

                      <span className="step-text">
                        {step}
                      </span>

                    </button>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                RELEVANT FILES
            ================================================= */}

            <div className="context-section">

              <div className="section-label-row">

                <PixelCode
                  size={14}
                  color="#38bdf8"
                />

                <span className="section-label">
                  Relevant Files
                </span>

              </div>


              <div className="files-list">

                {currentIssue.files.map(
                  (file, index) => (

                    <div
                      key={index}
                      className="file-item"
                    >

                      <button
                        className="file-path"

                        onClick={() =>
                          setPreviewFile(
                            file
                          )
                        }
                      >
                        {file.path}
                      </button>


                      <div className="file-item-right">

                        <span className={`file-lang file-lang-${file.lang.toLowerCase()}`}>
                          {file.lang}
                        </span>


                        <button
                          className="copy-btn"

                          onClick={() =>
                            handleCopyCode(
                              file
                            )
                          }

                          title="Copy code"
                        >

                          <PixelCopy
                            size={13}
                            color="#94a3b8"
                          />

                        </button>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =================================================
                GITHUB
            ================================================= */}

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="github-btn"
            >

              <span>
                View Issue on GitHub
              </span>

              <PixelExternalLink
                size={14}
                color="#8b949e"
              />

            </a>

          </div>

        </div>

      </div>


      {/* ===================================================
          FILE PREVIEW MODAL
      =================================================== */}

      {previewFile && (

        <div
          className="pixel-modal-backdrop"

          onClick={() =>
            setPreviewFile(null)
          }
        >

          <div
            className="pixel-modal-content"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <span className="modal-title">
                {previewFile.path}
              </span>


              <button
                className="modal-close-btn"

                onClick={() =>
                  setPreviewFile(null)
                }
              >
                ✕
              </button>

            </div>


            <div className="modal-body">

              <pre className="code-preview">
                {previewFile.code}
              </pre>

            </div>


            <div className="modal-footer">

              <button
                className="modal-btn primary"

                onClick={() =>
                  handleCopyCode(
                    previewFile
                  )
                }
              >
                Copy Code
              </button>


              <button
                className="modal-btn secondary"

                onClick={() =>
                  setPreviewFile(null)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}


      {/* ===================================================
          CONTRIBUTING GUIDE
      =================================================== */}

      {showGuideModal && (

        <div
          className="pixel-modal-backdrop"

          onClick={() =>
            setShowGuideModal(false)
          }
        >

          <div
            className="pixel-modal-content"

            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <span className="modal-title">
                CONTRIBUTING GUIDE
              </span>


              <button
                className="modal-close-btn"

                onClick={() =>
                  setShowGuideModal(false)
                }
              >
                ✕
              </button>

            </div>


            <div className="modal-body guide-body">

              <h4>
                1. Clone & Setup
              </h4>

              <p>
                Fork the repository,
                clone locally, and run{" "}
                <code>
                  npm install
                </code>.
              </p>


              <h4>
                2. Pick an Issue
              </h4>

              <p>
                Find issues labeled{" "}
                <code>
                  GOOD FIRST ISSUE
                </code>{" "}
                to begin.
              </p>


              <h4>
                3. Create Branch
              </h4>

              <p>
                <code>
                  git checkout -b feature/issue-142-mobile-nav
                </code>
              </p>


              <h4>
                4. Submit PR
              </h4>

              <p>
                Push your branch and
                create a PR linking issue
                #142.
              </p>

            </div>


            <div className="modal-footer">

              <button
                className="modal-btn primary"

                onClick={() =>
                  setShowGuideModal(false)
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AIMentorPage;