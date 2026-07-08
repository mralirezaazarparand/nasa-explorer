"use client";

import { useMemo, memo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { Button } from "@/components/ui/Button";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useLenis } from "@/hooks/useLenis";
import { MISSIONS } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

function MissionPage() {
  const params = useParams();
  const slug = params.slug as string;
  useLenis();

  const mission = useMemo(
    () => MISSIONS.find((m) => m.slug === slug),
    [slug]
  );

  if (!mission) {
    notFound();
  }

  const currentIndex = MISSIONS.findIndex((m) => m.slug === slug);
  const prevMission = currentIndex > 0 ? MISSIONS[currentIndex - 1] : null;
  const nextMission =
    currentIndex < MISSIONS.length - 1 ? MISSIONS[currentIndex + 1] : null;

  const relatedMissions = useMemo(
    () => mission.related.map((id) => MISSIONS.find((m) => m.id === id)).filter(Boolean),
    [mission.related]
  );

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <ImageFallback
                src={mission.heroImage}
                alt={mission.name}
                fill
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/90 via-[#030712]/70 to-[#030712]" />
            </div>

            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easing }}
              >
                <Link
                  href="/missions"
                  className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white mb-8 transition-colors"
                >
                  <HiArrowLeft className="w-4 h-4" />
                  All Missions
                </Link>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-6xl block mb-4"
              >
                {mission.icon}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: easing }}
                className="text-sm font-medium text-blue-400 tracking-widest uppercase"
              >
                {mission.year}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                {mission.name}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.35, ease: easing }}
                className="text-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
              >
                {mission.description}
              </motion.p>
            </div>
          </section>

          <OverviewSection mission={mission} />
          <TimelineSection achievements={mission.achievements} />
          <FactsSection facts={mission.facts} />

          {relatedMissions.length > 0 && (
            <RelatedMissionsSection missions={relatedMissions as typeof MISSIONS} />
          )}

          <NavSection
            prevMission={prevMission ? { slug: prevMission.slug, name: prevMission.name } : null}
            nextMission={nextMission ? { slug: nextMission.slug, name: nextMission.name } : null}
          />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}

const OverviewSection = memo(function OverviewSection({ mission }: { mission: typeof MISSIONS[0] }) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
              Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-6 tracking-tight">
              Mission
              <br />
              <span className="text-white/40">Objectives</span>
            </h2>
            <div className="space-y-4">
              {mission.objectives.map((obj, i) => (
                <div
                  key={obj.title}
                  className="flex gap-4 p-4 rounded-xl bg-black/40 border border-white/[0.08]"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 text-sm font-bold">
                    {i + 1}
                  </span>
                  <div>
                    <h4 className="text-white font-medium mb-1">{obj.title}</h4>
                    <p className="text-sm text-white/60">{obj.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <ErrorBoundary>
              <div className="rounded-2xl overflow-hidden border border-white/[0.06]">
                <ImageFallback
                  src={mission.image}
                  alt={mission.name}
                  fill={false}
                  width={600}
                  height={400}
                  className="w-full object-cover aspect-[3/2]"
                />
                <div className="p-6 bg-black/40">
                  <p className="text-white/70 leading-relaxed text-sm">
                    {mission.longDescription}
                  </p>
                </div>
              </div>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </section>
  );
});

const TimelineSection = memo(function TimelineSection({ achievements }: { achievements: typeof MISSIONS[0]['achievements'] }) {
  return (
    <section className="relative py-24 bg-white/[0.01] border-y border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16">
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
            Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 tracking-tight">
            Key
            <br />
            <span className="text-white/40">Achievements</span>
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px bg-white/[0.06]" />

          {achievements.map((achievement, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: easing }}
                className={`relative flex flex-col md:flex-row items-start gap-6 mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                  <span className="text-xs font-medium text-blue-400/60">{achievement.year}</span>
                  <h3 className="text-lg font-semibold text-white mt-1 mb-2">{achievement.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed max-w-md">{achievement.description}</p>
                </div>
                <div className="relative flex-shrink-0 flex items-center justify-center z-10">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-[#030712]" />
                </div>
                <div className="flex-1" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

const FactsSection = memo(function FactsSection({ facts }: { facts: typeof MISSIONS[0]['facts'] }) {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
            Statistics
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 tracking-tight">
            Mission
            <br />
            <span className="text-white/40">Facts</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.05, ease: easing }}
              className="rounded-2xl border border-white/[0.08] bg-black/40 p-6 text-center"
            >
              <div className="text-sm text-white/80 font-medium mb-2">{fact.value}</div>
              <div className="text-xs text-white/50">{fact.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

const RelatedMissionsSection = memo(function RelatedMissionsSection({ missions }: { missions: typeof MISSIONS }) {
  return (
    <section className="relative py-24 bg-white/[0.01] border-y border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12">
          <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">Explore</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 tracking-tight">
            Related
            <br />
            <span className="text-white/40">Missions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {missions.map((related, i) =>
            related ? (
              <motion.div
                key={related.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: easing }}
              >
                <Link href={`/missions/${related.slug}`} className="group block h-full">
                  <div className="h-full rounded-2xl border border-white/[0.08] bg-black/40 p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-black/60">
                    <span className="text-2xl block mb-3">{related.icon}</span>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {related.name}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2">{related.description}</p>
                  </div>
                </Link>
              </motion.div>
            ) : null
          )}
        </div>
      </div>
    </section>
  );
});

const NavSection = memo(function NavSection({
  prevMission,
  nextMission,
}: {
  prevMission: { slug: string; name: string } | null;
  nextMission: { slug: string; name: string } | null;
}) {
  return (
    <section className="relative py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevMission ? (
            <Link
              href={`/missions/${prevMission.slug}`}
              className="group flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <div className="text-right">
                <div className="text-xs text-white/40">Previous</div>
                <div className="text-sm">{prevMission.name}</div>
              </div>
            </Link>
          ) : <div />}

          <Button variant="secondary" size="sm" href="/missions">
            All Missions
          </Button>

          {nextMission ? (
            <Link
              href={`/missions/${nextMission.slug}`}
              className="group flex items-center gap-3 text-sm text-white/60 hover:text-white transition-colors text-right"
            >
              <div>
                <div className="text-xs text-white/40">Next</div>
                <div className="text-sm">{nextMission.name}</div>
              </div>
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : <div />}
        </div>
      </div>
    </section>
  );
});

export default MissionPage;
