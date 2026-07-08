"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowLeft, HiMail } from "react-icons/hi";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { useLenis } from "@/hooks/useLenis";

const easing = [0.25, 0.46, 0.45, 0.94] as const;

function ContactPage() {
  useLenis();

  return (
    <>
      <Navbar />
      <PageTransition>
        <main className="relative min-h-screen">
          <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] via-transparent to-transparent" />
            <motion.div
              className="absolute inset-0 opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.2), transparent)",
              }}
              animate={{
                background: [
                  "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.2), transparent)",
                  "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(96,165,250,0.15), transparent)",
                  "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59,130,246,0.2), transparent)",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

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
                Contact
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easing }}
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white mt-3 mb-6 tracking-tight"
              >
                Let&apos;s
                <br />
                <span className="text-white/40">Connect</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: easing }}
                className="text-lg text-white/70 max-w-2xl mx-auto"
              >
                This portfolio project showcases modern web development with
                Next.js, TypeScript, and Framer Motion.
              </motion.p>
            </div>
          </section>

          <section className="relative py-24">
            <div className="mx-auto max-w-4xl px-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easing }}
                >
                  <div className="rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl p-8 h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold tracking-tight text-white">
                        NASA
                      </span>
                    </div>

                    <p className="text-white/60 leading-relaxed text-sm mb-8">
                      Built with passion for space exploration and modern web
                      technologies. This is a portfolio project and is not
                      affiliated with NASA.
                    </p>

                    <div className="space-y-4">
                      <a
                        href="mailto:mr.alireza.azarparand@gmail.com"
                        className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 group"
                      >
                        <HiMail className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm">mr.alireza.azarparand@gmail.com</span>
                      </a>

                      <a
                        href="https://github.com/mralirezaazarparand/nasa-explorer"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 group"
                      >
                        <FaGithub className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm">GitHub</span>
                      </a>

                      <a
                        href="https://www.linkedin.com/in/alireza-azarparand/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-4 rounded-xl bg-black/40 border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 transition-all duration-200 group"
                      >
                        <FaLinkedin className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
                        <span className="text-sm">LinkedIn</span>
                      </a>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: easing, delay: 0.2 }}
                >
                  <div className="rounded-2xl border border-white/[0.08] bg-black/40 backdrop-blur-xl p-8 h-full">
                    <h3 className="text-lg font-semibold text-white mb-6">
                      Send a message
                    </h3>

                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm text-white/60 mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm text-white/60 mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm text-white/60 mb-2"
                        >
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={4}
                          placeholder="Your message..."
                          className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/[0.08] text-white placeholder-white/30 text-sm focus:outline-none focus:border-blue-500/50 transition-colors resize-none"
                        />
                      </div>

                      <button
                        type="button"
                        className="w-full px-6 py-3 rounded-xl bg-blue-500 text-white font-medium text-sm hover:bg-blue-400 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#030712]"
                      >
                        Send message
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}

export default ContactPage;
