"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Section } from "@/components/ui/Section";

function Contact() {
  return (
    <Section id="contact" className="bg-[#030712]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-2xl"
          >
            <span className="text-sm font-medium text-blue-400 tracking-widest uppercase">
              Contact
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-6 tracking-tight">
              Let&apos;s
              <br />
              <span className="text-white/40">Connect</span>
            </h2>
            <p className="text-white/60 leading-relaxed mb-12">
              This portfolio project was built to showcase modern web
              development with Next.js, TypeScript, and Framer Motion. Inspired
              by NASA&apos;s extraordinary contributions to space exploration.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group"
            >
              Get in touch
              <HiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}

export { Contact };
