"use client";

import { useState } from "react";

interface RetryButtonProps {
  onRetry: () => Promise<void> | void;
  label?: string;
  className?: string;
}

function RetryButton({ onRetry, label = "Retry", className }: RetryButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      await onRetry();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`px-4 py-2 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${className || ""}`}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {label}
    </button>
  );
}

export { RetryButton };
