"use client";

import { useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiX } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { useLenis } from "@/hooks/useLenis";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

interface EarthImage {
  id: string;
  src: string;
  title: string;
  description: string;
}

const EARTH_IMAGES: EarthImage[] = [
  {
    id: "PIA00342",
    src: "https://images-assets.nasa.gov/image/PIA00342/PIA00342~medium.jpg",
    title: "Blue Marble — Africa and Europe",
    description: "The African and European continents as seen from space",
  },
  {
    id: "PIA00122",
    src: "https://images-assets.nasa.gov/image/PIA00122/PIA00122~small.jpg",
    title: "Earth from Apollo 17",
    description: "The iconic view of Earth captured by the Apollo 17 crew",
  },
  {
    id: "PIA00134",
    src: "https://images-assets.nasa.gov/image/PIA00134/PIA00134~medium.jpg",
    title: "Earth Rising",
    description: "Our planet suspended in the vastness of space",
  },
  {
    id: "a-sky-view-of-earth-from-suomi-npp_16611703184_o",
    src: "https://images-assets.nasa.gov/image/a-sky-view-of-earth-from-suomi-npp_16611703184_o/a-sky-view-of-earth-from-suomi-npp_16611703184_o~medium.jpg",
    title: "Earth at Night — Suomi NPP",
    description: "City lights across the globe captured by the Suomi NPP satellite",
  },
  {
    id: "PIA00729",
    src: "https://images-assets.nasa.gov/image/PIA00729/PIA00729~thumb.jpg",
    title: "Gulf of Mexico",
    description: "A view of the Gulf region from orbit",
  },
  {
    id: "PIA17542",
    src: "https://images-assets.nasa.gov/image/PIA17542/PIA17542~medium.jpg",
    title: "Earth's City Lights",
    description: "Urban illumination visible from the International Space Station",
  },
  {
    id: "PIA01967",
    src: "https://images-assets.nasa.gov/image/PIA01967/PIA01967~thumb.jpg",
    title: "South America",
    description: "The South American continent from space",
  },
  {
    id: "PIA00076",
    src: "https://images-assets.nasa.gov/image/PIA00076/PIA00076~small.jpg",
    title: "Full Earth",
    description: "A complete view of Earth's Western Hemisphere",
  },
  {
    id: "PIA10120",
    src: "https://images-assets.nasa.gov/image/PIA10120/PIA10120~thumb.jpg",
    title: "Earth from Mars",
    description: "Our planet as seen from the surface of Mars by the Spirit rover",
  },
];

const EarthCard = memo(function EarthCard({
  image,
  onSelect,
  index,
}: {
  image: EarthImage;
  onSelect: (img: EarthImage) => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.3), ease: easing }}
      className="break-inside-avoid mb-5 group cursor-pointer"
      onClick={() => onSelect(image)}
    >
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] bg-black/40 backdrop-blur-sm transition-all duration-500 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
        <ImageFallback
          src={image.src}
          alt={image.title}
          className="w-full h-auto block"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
          <h3 className="text-sm font-semibold text-white">{image.title}</h3>
          <p className="text-xs text-white/60 mt-0.5">{image.description}</p>
        </div>
      </div>
    </motion.div>
  );
});

function EarthPage() {
  useLenis();
  const [selected, setSelected] = useState<EarthImage | null>(null);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/pages/earth.webp"
                alt="Earth"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent" />
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
                Earth
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                Our
                <br />
                <span className="text-white/40">Home Planet</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easing }}
                className="text-white/70 max-w-xl mb-12"
              >
                A curated collection of Earth imagery from NASA&apos;s archives,
                showcasing the beauty and diversity of our home planet.
              </motion.p>
            </div>
          </section>

          <section className="relative py-24">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: easing }}
                className="mb-16"
              >
                <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
                  Gallery
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 tracking-tight">
                  Earth from
                  <br />
                  <span className="text-white/40">Space</span>
                </h2>
              </motion.div>

              <div
                className="gap-5"
                style={{
                  columns: "3 280px",
                  columnGap: "1.25rem",
                }}
              >
                {EARTH_IMAGES.map((image, i) => (
                  <EarthCard
                    key={image.id}
                    image={image}
                    index={i}
                    onSelect={setSelected}
                  />
                ))}
              </div>
            </div>
          </section>

          <section className="relative py-24 bg-white/[0.01] border-y border-white/[0.06]">
            <div className="mx-auto max-w-6xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easing }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <Image
                    src="/earth/blue-marble.jpeg"
                    alt="Blue Marble"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-semibold text-white">Blue Marble</h3>
                    <p className="text-sm text-white/60">The iconic view of Earth from Apollo 17</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easing, delay: 0.15 }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3]"
                >
                  <Image
                    src="/earth/earth-night.webp"
                    alt="Earth at Night"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-semibold text-white">Earth at Night</h3>
                    <p className="text-sm text-white/60">City lights visible from orbit</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easing, delay: 0.3 }}
                  className="relative overflow-hidden rounded-2xl aspect-[4/3] md:col-span-2 max-w-md mx-auto"
                >
                  <Image
                    src="/earth/moon.jpeg"
                    alt="Moon"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-lg font-semibold text-white">The Moon</h3>
                    <p className="text-sm text-white/60">Earth&apos;s only natural satellite</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#030712]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white z-10"
            >
              <HiX className="w-6 h-6" />
            </button>

            <motion.div
              key={selected.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-center rounded-2xl overflow-hidden max-h-[80vh]">
                <ImageFallback
                  src={selected.src}
                  alt={selected.title}
                  className="max-w-full max-h-[80vh] w-auto h-auto object-contain block"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-base font-semibold text-white">{selected.title}</h3>
                <p className="text-sm text-white/50 mt-1">{selected.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default EarthPage;