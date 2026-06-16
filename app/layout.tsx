// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import Navbar from "@/components/NavBar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TtFRECH Renovators & Investments | Durban Construction Company",
  description:
    "CIDB-registered construction company in Durban, KwaZulu-Natal. Residential builds, commercial projects, renovations & roofing. 15+ years · 320+ projects.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <Navbar />
        <div className="pt-18 flex flex-col flex-1">{children}</div>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
