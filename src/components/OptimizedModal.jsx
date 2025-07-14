import React, { useEffect, useRef, memo, useCallback } from "react";
import { createPortal } from "react-dom";

const OptimizedModal = memo(
  ({
    isOpen,
    onClose,
    children,
    className = "",
    closeOnEscape = true,
    closeOnOverlayClick = true,
  }) => {
    const modalRef = useRef(null);
    const overlayRef = useRef(null);

    const handleEscape = useCallback(
      (e) => {
        if (e.key === "Escape" && closeOnEscape) {
          onClose();
        }
      },
      [onClose, closeOnEscape]
    );

    const handleOverlayClick = useCallback(
      (e) => {
        if (e.target === overlayRef.current && closeOnOverlayClick) {
          onClose();
        }
      },
      [onClose, closeOnOverlayClick]
    );

    useEffect(() => {
      if (isOpen) {
        document.addEventListener("keydown", handleEscape);
        document.body.style.overflow = "hidden";

        // Focus management
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements?.length > 0) {
          focusableElements[0].focus();
        }
      } else {
        document.body.style.overflow = "";
      }

      return () => {
        document.removeEventListener("keydown", handleEscape);
        document.body.style.overflow = "";
      };
    }, [isOpen, handleEscape]);

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={overlayRef}
        className="modal-overlay fixed inset-0 flex items-center justify-center z-50 md:p-4"
        onClick={handleOverlayClick}
      >
        <div
          ref={modalRef}
          className={`${className}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>,
      document.body
    );
  }
);

OptimizedModal.displayName = "OptimizedModal";

export default OptimizedModal;
