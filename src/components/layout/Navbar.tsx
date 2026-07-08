"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/constants";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = useMemo(
    () => (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4",
        "transition-all duration-500"
      )}
    >
      <nav
        className={cn(
          "flex items-center w-full max-w-5xl px-6 py-3 rounded-2xl",
          "backdrop-blur-xl border transition-all duration-500",
          scrolled
            ? "bg-[#030712]/80 border-white/[0.08] shadow-lg shadow-black/20"
            : "bg-black/30 border-white/[0.06]"
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <Link
          href="/"
          className="flex items-center gap-2 mr-auto"
          aria-label="NASA Home"
        >
          <span className="text-xl font-bold tracking-tight text-white">
            NASA
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-4 py-2 text-sm rounded-lg",
                "transition-colors duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-4 right-4 h-[1.5px] bg-blue-400"
                  transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              )}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          aria-label="Open navigation menu"
        >
          <HiMenu className="w-6 h-6" />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-[#030712]/95 backdrop-blur-2xl z-50 flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Close navigation menu"
              >
                <HiX className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center flex-1 gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "text-3xl font-medium transition-colors",
                      isActive(link.href)
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Navbar };
