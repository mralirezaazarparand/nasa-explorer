import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ProvidersWrapper } from "@/providers/ProvidersWrapper";
import { GalaxyBackground } from "@/components/ui/GalaxyBackground";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NASA — Explore Beyond Earth",
  description:
    "Discover the history, missions and future of humanity's greatest space agency.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "NASA — Explore Beyond Earth",
    description:
      "Discover the history, missions and future of humanity's greatest space agency.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-[#030712] font-sans relative">
        <GalaxyBackground starCount={80} />
        <div className="relative z-10">
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </div>
      </body>
    </html>
  );
}
