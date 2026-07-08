"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiArrowRight, HiX } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { useLenis } from "@/hooks/useLenis";
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from "@/constants";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

function GalleryPage() {
  useLenis();
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === "all"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/pages/gallery.webp"
                alt="Gallery"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#030712]/80 via-[#030712]/60 to-[#030712]" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent" />
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
                Gallery
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                Views from
                <br />
                <span className="text-white/40">the Cosmos</span>
              </motion.h1>
            </div>
          </section>

          <section className="relative py-16">
            <div className="mx-auto max-w-6xl px-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center justify-center gap-2 mb-12"
              >
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                      activeCategory === cat.id
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "text-white/60 hover:text-white bg-black/30 border border-white/[0.08] hover:bg-black/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </motion.div>

              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                <AnimatePresence mode="popLayout">
                  {filteredImages.map((image) => (
                    <motion.div
                      key={image.src}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, ease: easing }}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
                      onClick={() =>
                        setLightboxIndex(
                          GALLERY_IMAGES.findIndex(
                            (i) => i.src === image.src
                          )
                        )
                      }
                    >
                      <ImageFallback
                        src={image.src}
                        alt={image.alt}
                        fill
                        containerClassName="absolute inset-0"
                        className="object-cover transition-all duration-700 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <span className="text-xs text-blue-400/60 uppercase tracking-wider">
                            {image.category}
                          </span>
                          <h3 className="text-lg font-semibold text-white">
                            {image.title}
                          </h3>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </section>
        </main>
      </PageTransition>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#030712]/95 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <HiX className="w-6 h-6" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-5xl max-h-[85vh] w-full mx-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <ImageFallback
                  src={GALLERY_IMAGES[lightboxIndex].src}
                  alt={GALLERY_IMAGES[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-xl font-semibold text-white">
                  {GALLERY_IMAGES[lightboxIndex].title}
                </h3>
                <span className="text-sm text-white/40">
                  {GALLERY_IMAGES[lightboxIndex].category}
                </span>
              </div>

              <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between pointer-events-none">
                <button
                  onClick={() =>
                    setLightboxIndex(
                      lightboxIndex === 0
                        ? GALLERY_IMAGES.length - 1
                        : lightboxIndex - 1
                    )
                  }
                  className="pointer-events-auto p-3 -ml-12 text-white/40 hover:text-white transition-colors"
                  aria-label="Previous image"
                >
                  <HiArrowLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={() =>
                    setLightboxIndex(
                      lightboxIndex === GALLERY_IMAGES.length - 1
                        ? 0
                        : lightboxIndex + 1
                    )
                  }
                  className="pointer-events-auto p-3 -mr-12 text-white/40 hover:text-white transition-colors"
                  aria-label="Next image"
                >
                  <HiArrowRight className="w-6 h-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default GalleryPage;
