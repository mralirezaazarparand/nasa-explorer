"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useLenis } from "@/hooks/useLenis";
import { MILESTONES } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

function HistoryPage() {
  useLenis();

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/pages/history.webp"
                alt="History of NASA"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-[#030712]/40" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
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
                History
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                A Legacy of
                <br />
                <span className="text-white/40">Discovery</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easing }}
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                From the dawn of the space age to the frontiers of deep space
                exploration, NASA&apos;s journey is humanity&apos;s story of
                reaching for the stars.
              </motion.p>
            </div>

            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 1 }}
            >
              <motion.div
                className="w-5 h-8 rounded-full border-2 border-white/20 flex justify-center pt-1.5"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                <motion.div
                  className="w-1 h-2 rounded-full bg-white/50"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </section>

          <section className="relative py-24 md:py-32">
            <div className="mx-auto max-w-5xl px-6">
              <div className="relative">
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-white/[0.06]" />

                {MILESTONES.map((milestone, i) => (
                  <MilestoneItem
                    key={milestone.year}
                    milestone={milestone}
                    index={i}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}

function MilestoneItem({
  milestone,
  index,
}: {
  milestone: (typeof MILESTONES)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row items-start gap-6 md:gap-12 mb-16 md:mb-24 last:mb-0"
    >
      <div
        className={`flex-1 w-full ${isLeft ? "md:text-right md:order-1" : "md:order-3"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isLeft ? -30 : 30 }
          }
          transition={{ duration: 0.7, ease: easing, delay: 0.1 }}
        >
          <ErrorBoundary>
            <div className="mb-4 overflow-hidden rounded-2xl">
              <Image
                src={milestone.image || ""}
                alt={milestone.title}
                width={400}
                height={250}
                className="w-full object-cover aspect-[16/10] transition-transform duration-700 hover:scale-105"
              />
            </div>
          </ErrorBoundary>
        </motion.div>
      </div>

      <div className="relative flex-shrink-0 flex items-start justify-center z-10 md:order-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, ease: easing }}
          className="w-5 h-5 rounded-full bg-blue-500 border-4 border-[#030712] shadow-lg shadow-blue-500/25"
        />
      </div>

      <div
        className={`flex-1 ${isLeft ? "md:order-3" : "md:order-1 md:text-right"}`}
      >
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 30 : -30 }}
          animate={
            isInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: isLeft ? 30 : -30 }
          }
          transition={{ duration: 0.7, ease: easing, delay: 0.2 }}
        >
            <span className="text-5xl sm:text-6xl font-bold text-white/20 select-none block leading-none mb-2">
            {milestone.year}
          </span>
          <span className="text-sm font-medium text-blue-400/80">
            {milestone.year}
          </span>
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1 mb-3">
            {milestone.title}
          </h3>
          <p className="text-white/60 leading-relaxed max-w-md">
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default HistoryPage;
