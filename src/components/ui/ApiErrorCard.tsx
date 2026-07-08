"use client";

interface ApiErrorCardProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

function ApiErrorCard({ message, onRetry, className }: ApiErrorCardProps) {
  return (
    <div className={`flex items-center justify-center min-h-[200px] rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 ${className || ""}`}>
      <div className="text-center max-w-md">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-red-500/10 flex items-center justify-center">
          <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="text-sm text-white/40 mb-1">
          {message || "Unable to load data"}
        </p>
        <p className="text-xs text-white/20 mb-4">
          The NASA service may be temporarily unavailable.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 text-sm rounded-xl bg-blue-500 text-white hover:bg-blue-400 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </div>
  );
}

export { ApiErrorCard };
