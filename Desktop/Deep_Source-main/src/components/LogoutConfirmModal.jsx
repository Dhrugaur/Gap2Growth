import { useEffect, useRef } from "react";
import "./LogoutConfirmModal.css";

/**
 * Accessible confirmation dialog for logging out of Deep Source.
 *
 * @param {object} props
 * @param {boolean} props.isOpen
 * @param {() => void} props.onCancel
 * @param {() => void} props.onConfirm
 * @param {boolean} props.isLoggingOut
 * @param {string | null} props.errorMessage
 */
export function LogoutConfirmModal({
  isOpen,
  onCancel,
  onConfirm,
  isLoggingOut = false,
  errorMessage = null,
}) {
  const cancelBtnRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Focus cancel button on open for safe keyboard navigation
    cancelBtnRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && !isLoggingOut) {
        onCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLoggingOut, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="logout-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-desc"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLoggingOut) {
          onCancel();
        }
      }}
    >
      <div className="logout-modal-content">
        {/* Pixel corners */}
        <div className="modal-corner corner-tl" aria-hidden="true" />
        <div className="modal-corner corner-tr" aria-hidden="true" />
        <div className="modal-corner corner-bl" aria-hidden="true" />
        <div className="modal-corner corner-br" aria-hidden="true" />

        <div className="logout-modal-header">
          <div className="logout-icon-wrap" aria-hidden="true">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#f87171"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </div>
          <h2 id="logout-dialog-title" className="logout-modal-title">
            Log out of Deep Source?
          </h2>
        </div>

        <p id="logout-dialog-desc" className="logout-modal-message">
          Are you sure you want to log out? You will need to sign in again to access your account.
        </p>

        {errorMessage && (
          <div className="logout-error-banner" role="alert">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        <div className="logout-modal-actions">
          <button
            ref={cancelBtnRef}
            type="button"
            className="logout-btn logout-btn-cancel"
            onClick={onCancel}
            disabled={isLoggingOut}
          >
            Cancel
          </button>
          <button
            type="button"
            className="logout-btn logout-btn-confirm"
            onClick={onConfirm}
            disabled={isLoggingOut}
            aria-busy={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Yes, log out"}
          </button>
        </div>
      </div>
    </div>
  );
}
