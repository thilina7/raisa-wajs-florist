"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ToastItem } from "./ToastProvider";

interface ToastProps {
  toast: ToastItem;
  onClose: () => void;
}

const AUTO_DISMISS_MS = 5000;

export function Toast({ toast, onClose }: ToastProps) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Enter animation
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Auto-dismiss after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setExiting(true);
    setTimeout(() => {
      onClose();
    }, 200); // match exit animation duration
  }

  const isSuccess = toast.type === "success";

  return (
    <div
      role="alert"
      className={cn(
        "pointer-events-auto flex w-80 items-start gap-3 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black/5 transition-all duration-200",
        visible && !exiting
          ? "translate-x-0 opacity-100"
          : "translate-x-4 opacity-0",
        isSuccess ? "border-l-4 border-[#4A7C59]" : "border-l-4 border-[#dc2626]",
      )}
    >
      {/* Icon */}
      <span
        className={cn(
          "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white text-xs",
          isSuccess ? "bg-[#4A7C59]" : "bg-[#dc2626]",
        )}
        aria-hidden="true"
      >
        {isSuccess ? "✓" : "✕"}
      </span>

      {/* Message */}
      <p className="flex-1 text-sm text-gray-800">{toast.message}</p>

      {/* Close button */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Close notification"
        className="shrink-0 rounded p-1 text-gray-400 transition-colors hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
