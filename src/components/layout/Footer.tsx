"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NAV_LINKS } from "@/constants";

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-[#030712]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold tracking-tight text-white">
                NASA
              </span>
            </Link>
            <p className="max-w-sm text-sm text-white/40 leading-relaxed">
              This portfolio showcase project is inspired by NASA&apos;s
              extraordinary contributions to space exploration and scientific
              discovery.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/30 hover:text-white/60 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 mb-4">Connect</h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/mralirezaazarparand/nasa-explorer"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="GitHub"
              >
                <FaGithub className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/alireza-azarparand/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-xl border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Portfolio Project. Not affiliated
            with NASA.
          </p>
          <p className="text-xs text-white/20">
            Built with Next.js, TypeScript &amp; Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
