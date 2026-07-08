"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/layout/PageTransition";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { useLenis } from "@/hooks/useLenis";

const Hero = dynamic(
  () => import("@/components/sections/Hero").then((mod) => ({ default: mod.Hero })),
  { ssr: false }
);

const History = dynamic(() =>
  import("@/components/sections/History").then((mod) => ({ default: mod.History }))
);

const Missions = dynamic(() =>
  import("@/components/sections/Missions").then((mod) => ({ default: mod.Missions }))
);

const Gallery = dynamic(() =>
  import("@/components/sections/Gallery").then((mod) => ({ default: mod.Gallery }))
);

const About = dynamic(() =>
  import("@/components/sections/About").then((mod) => ({ default: mod.About }))
);

const ContactSection = dynamic(() =>
  import("@/components/sections/Contact").then((mod) => ({ default: mod.Contact }))
);

export default function Home() {
  useLenis();

  return (
    <>
      <LoadingScreen />
      <Navbar />
      <PageTransition>
        <main className="flex flex-col">
          <Hero />
          <History />
          <Missions />
          <Gallery />
          <About />
          <ContactSection />
        </main>
      </PageTransition>
      <Footer />
    </>
  );
}
