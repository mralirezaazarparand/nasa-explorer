"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { useLenis } from "@/hooks/useLenis";
import { MISSIONS } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

function MissionsPage() {
  useLenis();

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent" />

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
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
                Missions
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                Pioneering
                <br />
                <span className="text-blue-300/70">the Unknown</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easing }}
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                From the Moon to Mars and beyond, NASA&apos;s missions have
                transformed our understanding of the cosmos.
              </motion.p>
            </div>
          </section>

          <section className="relative py-24">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {MISSIONS.map((mission) => (
                  <motion.div key={mission.id} variants={cardVariants}>
                    <Link
                      href={`/missions/${mission.slug}`}
                      className="group block h-full"
                    >
                      <div className="relative h-full rounded-2xl border border-white/[0.08] bg-black/40 overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
                        <div className="relative h-48 overflow-hidden">
                          <ImageFallback
                            src={mission.image}
                            alt={mission.name}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent" />
                          <div className="absolute top-4 right-4">
                            <span className="text-xs font-medium text-white/60 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-sm border border-white/[0.06]">
                              {mission.year}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{mission.icon}</span>
                            <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors duration-300">
                              {mission.name}
                            </h3>
                          </div>

                          <p className="text-sm text-white/60 leading-relaxed line-clamp-2">
                            {mission.description}
                          </p>

                          <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                            <span className="text-xs text-white/40">
                              View mission
                            </span>
                            <HiArrowRight className="w-4 h-4 text-white/40 group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}

export default MissionsPage;
