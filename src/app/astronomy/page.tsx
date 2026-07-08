"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { ApiErrorCard } from "@/components/ui/ApiErrorCard";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useLenis } from "@/hooks/useLenis";
import { getApod } from "@/lib/nasa";
import type { ApodResponse } from "@/lib/nasa";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

function AstronomyPage() {
  useLenis();
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchApod = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getApod();
      setApod(data);
    } catch {
      setError("Unable to load today&apos;s astronomy picture.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApod();
  }, [fetchApod]);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/pages/astronomy.webp"
                alt="Astronomy"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-[#030712]/40" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-32">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easing }}
              >
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
                >
                  <HiArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: easing }}
                className="text-sm font-medium text-blue-400 tracking-widest uppercase"
              >
                Astronomy
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                Picture of
                <br />
                <span className="text-white/40">the Day</span>
              </motion.h1>

              {loading && (
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" style={{ animationDelay: "0.4s" }} />
                  <span className="text-sm text-white/50 ml-2">Loading today&apos;s image...</span>
                </div>
              )}

              {error && !loading && (
                <div className="mt-8">
                  <ApiErrorCard message={error} onRetry={fetchApod} />
                </div>
              )}

              {apod && !loading && (
                <ErrorBoundary>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: easing }}
                    className="mt-8"
                  >
                    <span className="text-sm text-white/50">{apod.date}</span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-2 mb-6">
                      {apod.title}
                    </h2>

                    <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] backdrop-blur-sm bg-white/[0.02]">
                      <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-black/60">
                        {apod.media_type === "image" ? (
                          <ImageFallback
                            src={apod.hdurl || apod.url}
                            alt={apod.title}
                            fill
                            priority
                            sizes="100vw"
                          />
                        ) : apod.url?.endsWith(".mp4") ? (
                          <video
                            src={apod.url}
                            controls
                            preload="metadata"
                            poster={apod.hdurl || undefined}
                            className="absolute inset-0 w-full h-full object-contain bg-black"
                          />
                        ) : (
                          <iframe
                            src={apod.url}
                            title={apod.title}
                            className="absolute inset-0 w-full h-full"
                            allowFullScreen
                            allow="autoplay; encrypted-media"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/60 via-transparent to-transparent pointer-events-none" />
                      </div>
                      {apod.copyright && (
                        <div className="absolute bottom-3 right-4 text-xs text-white/30">
                          &copy; {apod.copyright}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 max-w-3xl">
                      <p className="text-white/70 leading-relaxed text-sm">
                        {apod.explanation}
                      </p>
                    </div>
                  </motion.div>
                </ErrorBoundary>
              )}
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}

export default AstronomyPage;
