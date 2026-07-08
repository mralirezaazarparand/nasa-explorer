import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#030712] px-6">
      <div className="text-center max-w-lg">
        <span className="text-8xl font-bold text-white/5 select-none">404</span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4 tracking-tight">
          Lost in Space
        </h1>
        <p className="text-white/40 leading-relaxed mb-8">
          The page you&apos;re looking for has drifted beyond our sensors. Let&apos;s
          get you back to mission control.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-400 transition-colors duration-200"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
