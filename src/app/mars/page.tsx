"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLeft, HiX } from "react-icons/hi";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { ImageFallback } from "@/components/ui/ImageFallback";
import { ApiErrorCard } from "@/components/ui/ApiErrorCard";
import { LoadingState } from "@/components/ui/LoadingState";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useLenis } from "@/hooks/useLenis";
import { getMarsPhotos, searchNasaImages, type MarsPhoto, type NasaImageItem } from "@/lib/nasa";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

const ROVERS = [
  { id: "curiosity", label: "Curiosity" },
  { id: "perseverance", label: "Perseverance" },
  { id: "opportunity", label: "Opportunity" },
  { id: "spirit", label: "Spirit" },
];

const SOL_ATTEMPTS = [1000, 500, 200, 100, 50, 10];

interface DisplayPhoto {
  id: string;
  src: string;
  title: string;
  date: string;
  camera?: string;
  rover?: string;
}

function isMarsPhotoArray(data: MarsPhoto[] | NasaImageItem[]): data is MarsPhoto[] {
  return data.length > 0 && "img_src" in data[0];
}

function marsPhotoToDisplay(p: MarsPhoto): DisplayPhoto {
  return {
    id: `mars-${p.id}`,
    src: p.img_src,
    title: `${p.rover.name} - ${p.camera.full_name}`,
    date: p.earth_date,
    camera: p.camera.full_name,
    rover: p.rover.name,
  };
}

function nasaItemToDisplay(item: NasaImageItem, index: number): DisplayPhoto | null {
  const link = item.links?.find((l) => l.rel === "preview");
  if (!link) return null;
  const title = item.data[0]?.title || "Mars Image";
  const date = item.data[0]?.date_created?.split("T")[0] || "";
  return {
    id: `nasa-${item.data[0]?.nasa_id || index}`,
    src: link.href,
    title,
    date,
  };
}

function MarsPage() {
  useLenis();
  const [rover, setRover] = useState("curiosity");
  const [photos, setPhotos] = useState<DisplayPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<DisplayPhoto | null>(null);
  const cacheRef = useRef<Map<string, DisplayPhoto[]>>(new Map());
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const fetchPhotos = useCallback(async (roverId: string) => {
    const cacheKey = `mars_${roverId}`;
    const cached = cacheRef.current.get(cacheKey);
    if (cached) {
      setPhotos(cached);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    let results: DisplayPhoto[] = [];

    for (const sol of SOL_ATTEMPTS) {
      try {
        const data = await getMarsPhotos(roverId, sol, 1);
        if (data.photos && data.photos.length > 0) {
          results = data.photos.slice(0, 24).map(marsPhotoToDisplay);
          break;
        }
      } catch {
        continue;
      }
    }

    if (results.length === 0) {
      try {
        const searchData = await searchNasaImages(`${roverId} Mars rover`, 1);
        const items = searchData.collection?.items || [];
        results = items
          .slice(0, 24)
          .map((item: NasaImageItem, i: number) => nasaItemToDisplay(item, i))
          .filter(Boolean) as DisplayPhoto[];
      } catch {
        if (mountedRef.current) {
          setError("Unable to load Mars photos.");
          setLoading(false);
        }
        return;
      }
    }

    if (results.length === 0) {
      if (mountedRef.current) {
        setError("No Mars photos available at this time.");
        setLoading(false);
      }
      return;
    }

    cacheRef.current.set(cacheKey, results);
    if (mountedRef.current) {
      setPhotos(results);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos(rover);
  }, [rover, fetchPhotos]);

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src="/pages/mars.webp"
                alt="Mars"
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
                Mars Exploration
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-8 tracking-tight"
              >
                Surface of
                <br />
                <span className="text-white/40">Mars</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 mb-12"
              >
                {ROVERS.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRover(r.id)}
                    className={`px-4 py-2 text-sm rounded-xl transition-all duration-300 ${
                      rover === r.id
                        ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                        : "text-white/60 hover:text-white bg-black/30 border border-white/[0.08] hover:bg-black/50"
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </motion.div>

              {loading && <LoadingState count={8} aspectRatio="4/3" />}

              {error && !loading && (
                <ApiErrorCard message={error} onRetry={() => fetchPhotos(rover)} />
              )}

              {!loading && !error && photos.length === 0 && (
                <p className="text-white/50 text-sm">No photos available for this rover at this time.</p>
              )}

              <AnimatePresence mode="popLayout">
                <motion.div
                  layout
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {photos.map((photo) => (
                    <motion.div
                      key={photo.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer border border-white/[0.06]"
                      onClick={() => setSelectedPhoto(photo)}
                    >
                      <ErrorBoundary>
                        <ImageFallback
                          src={photo.src}
                          alt={photo.title}
                          fill
                          className="object-cover transition-all duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                      </ErrorBoundary>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          {photo.camera && (
                            <span className="text-xs text-white/80">{photo.camera}</span>
                          )}
                          <p className="text-xs text-white/50">{photo.date}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </section>
        </main>
      </PageTransition>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#030712]/95 backdrop-blur-2xl flex items-center justify-center p-6"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 p-2 text-white/60 hover:text-white z-10"
            >
              <HiX className="w-6 h-6" />
            </button>

            <motion.div
              key={selectedPhoto.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative max-w-5xl max-h-[85vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[16/10] rounded-2xl overflow-hidden">
                <ImageFallback
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-white">{selectedPhoto.title}</h3>
                <p className="text-sm text-white/40">{selectedPhoto.date}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default MarsPage;
