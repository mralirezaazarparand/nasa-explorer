"use client";

interface LoadingStateProps {
  count?: number;
  aspectRatio?: string;
  className?: string;
  grid?: "2" | "3" | "4";
}

function LoadingState({ count = 8, aspectRatio = "4/3", className, grid = "4" }: LoadingStateProps) {
  const gridCols = { "2": "grid-cols-2", "3": "grid-cols-3", "4": "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" };

  return (
    <div className={`grid ${gridCols[grid]} gap-4 ${className || ""}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl bg-white/[0.03] animate-pulse border border-white/[0.06]"
          style={{ aspectRatio }}
        />
      ))}
    </div>
  );
}

export { LoadingState };
