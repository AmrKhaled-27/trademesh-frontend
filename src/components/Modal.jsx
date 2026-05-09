import React from 'react';
import { createPortal } from 'react-dom';
import { Typography } from './Typography';
import { Button } from './Button';

/**
 * A premium Modal component for Trademesh.
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible.
 * @param {Function} props.onClose - Callback when the modal should close.
 * @param {string} props.title - Modal title.
 * @param {React.ReactNode} props.children - Modal content.
 */
export const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-secondary/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-6 py-4 border-b border-surface-container-high flex justify-between items-center bg-surface-container-low">
          <Typography variant="h3" className="text-on-surface">
            {title}
          </Typography>
          <button
            onClick={onClose}
            className="text-secondary hover:text-on-surface transition-colors p-2 rounded-full hover:bg-surface-container-high cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="px-6 py-6 max-h-[80vh] overflow-y-auto">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
