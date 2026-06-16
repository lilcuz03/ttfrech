"use client";

// components/HeroSlider.tsx
// Your existing hero design — image carousel plays behind the overlay/content.
// Text, layout, fonts, colours all preserved exactly as you had them.

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const SLIDES = [
  {
    src: "https://images.unsplash.com/photo-1634586648651-f1fb9ec10d90?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Residential construction in KwaZulu-Natal",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1681597884536-aee8e933f68d?q=80&w=1924&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Commercial building construction Durban",
  },
  {
    src: "https://images.unsplash.com/photo-1758101755915-462eddc23f57?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Property renovation KwaZulu-Natal",
  },
  {
    src: "https://images.unsplash.com/photo-1768321915339-b88858824bc6?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Roofing and waterproofing Durban",
  },
  {
    src: "https://images.unsplash.com/photo-1753893558304-8b1b4b47348c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Completed luxury residential project KZN",
  },
];

const STATS = [
  { n: "15", s: "+", l: "Years of\nExperience" },
  { n: "320", s: "+", l: "Projects\nCompleted" },
  { n: "98", s: "%", l: "Client\nSatisfaction" },
  { n: "40", s: "+", l: "Skilled\nCraftspeople" },
];

const AUTOPLAY_MS = 5500;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );
  const goTo = useCallback((i: number) => setCurrent(i), []);

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [next, current]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  return (
    <section className="relative min-h-screen bg-[#101828] flex items-center overflow-hidden">
      {/* ── Background image slider ─────────────────────────────────── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          aria-hidden={i !== current}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            i === current ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            priority={i === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      ))}

      {/* ── Overlays (your original stack, unchanged) ───────────────── */}

      {/* Heavy dark overlay so text is always legible over any photo */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "rgba(16,24,40,0.72)" }}
      />

      {/* Directional gradient — strong left for text, lighter right */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(135deg,rgba(16,24,40,.97) 0%,rgba(24,35,56,.55) 55%,rgba(16,24,40,.75) 100%)",
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 z-[3]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Gold corner triangle */}
      <div
        className="absolute top-0 right-0 w-44 h-44 opacity-60 z-[3]"
        style={{
          background: "rgba(196,162,72,.06)",
          clipPath: "polygon(100% 0,100% 100%,0 0)",
        }}
      />

      {/* Radial glow top-right */}
      <div
        className="absolute top-0 right-0 w-96 h-96 z-[3]"
        style={{
          background:
            "radial-gradient(circle at top right,rgba(196,162,72,.08) 0%,transparent 70%)",
        }}
      />

      {/* ── Slide arrow controls ─────────────────────────────────────── */}
      
      <div className="hidden sm:flex absolute inset-y-0 left-0 right-0 items-center justify-between px-4 sm:px-6 z-[5] pointer-events-none">
        {(["prev", "next"] as const).map((dir) => (
          <button
            key={dir}
            onClick={dir === "prev" ? prev : next}
            aria-label={dir === "prev" ? "Previous slide" : "Next slide"}
            className="pointer-events-auto w-10 h-10 flex items-center justify-center border border-[rgba(196,162,72,.3)] bg-[rgba(16,24,40,.55)] text-[#C4A248] hover:border-[#C4A248] hover:bg-[rgba(196,162,72,.1)] transition-all backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C4A248]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={dir === "prev" ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* ── Dot nav + progress bar ───────────────────────────────────── */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2 z-[5]">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === current}
            className={`transition-all duration-300 rounded-full focus:outline-none ${
              i === current
                ? "w-8 h-[3px] bg-[#C4A248]"
                : "w-[6px] h-[6px] bg-[rgba(196,162,72,.3)] hover:bg-[rgba(196,162,72,.6)]"
            }`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgba(196,162,72,.1)] z-[5]"
        aria-hidden="true"
      >
        <div
          key={current}
          className="h-full bg-[#C4A248] animate-progress-bar"
          style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
        />
      </div>

      {/* ── YOUR ORIGINAL CONTENT — untouched ───────────────────────── */}
      <div
        className="relative z-[4] w-[90%] max-w-[1200px] mx-auto pt-[72px]
        grid grid-cols-1 lg:grid-cols-2 gap-14 items-center py-20"
      >
        {/* Left */}
        <div>
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-[7px] mb-7
            border border-[rgba(196,162,72,.22)] bg-[rgba(196,162,72,.07)]
            text-[#C4A248] text-[10px] font-semibold tracking-[2px] uppercase"
          >
            <span className="w-[6px] h-[6px] rounded-full bg-[#C4A248] shrink-0" />
            CIDB Registered · Durban, KZN
          </div>

          <h1
            className="font-display text-[clamp(40px,6vw,76px)] font-bold leading-[1.05]
            text-[#F5F0E8] mb-6"
          >
            We Build
            <br />
            <em className="not-italic text-[#C4A248] font-light italic">
              Structures
            </em>
            <br />
            <span className="text-[#E8DDD0]">That Endure.</span>
          </h1>

          <p
            className="text-[16px] font-light leading-[1.8] text-[rgba(245,240,232,.62)]
            max-w-[440px] mb-10"
          >
            TtFRECH Renovators &amp; Investments delivers premium residential
            and commercial construction across Durban and KwaZulu-Natal —
            crafted with precision, on time and on budget.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-block px-8 py-[13px] bg-[#C4A248] text-[#182338]
              text-[11px] font-semibold tracking-[1.5px] uppercase
              hover:bg-[#DFC05A] transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/services"
              className="inline-block px-8 py-[13px] border border-[rgba(245,240,232,.25)]
              text-[#F5F0E8] text-[11px] font-medium tracking-[1.5px] uppercase
              hover:border-[rgba(245,240,232,.5)] transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>

        {/* Right — Stats grid */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div
                key={s.n}
                className="bg-[rgba(255,255,255,.03)] border border-[rgba(196,162,72,.09)]
                p-6 hover:border-[rgba(196,162,72,.35)] hover:bg-[rgba(196,162,72,.04)]
                transition-all duration-300"
              >
                <div className="font-display text-[50px] font-bold text-[#E8DDD0] leading-none mb-1">
                  {s.n}
                  <sup className="text-[20px] text-[#C4A248]">{s.s}</sup>
                </div>
                <div className="text-[12px] text-[rgba(196,162,72,.55)] leading-[1.5] whitespace-pre-line">
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* CIDB strip */}
          <div
            className="flex items-center gap-4 p-4
            bg-[rgba(196,162,72,.05)] border border-[rgba(196,162,72,.14)]"
          >
            <div
              className="w-[42px] h-[42px] shrink-0 flex items-center justify-center
              bg-[rgba(196,162,72,.08)] border border-[rgba(196,162,72,.28)]"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C4A248"
                strokeWidth="1.5"
              >
                <path d="M12 2l2.5 6.5H21l-5.5 4 2 6.5L12 15l-5.5 3.5 2-6.5L3 8.5h6.5L12 2Z" />
              </svg>
            </div>
            <div>
              <div className="text-[13px] font-medium text-[#E8DDD0] mb-[2px]">
                CIDB Registered Contractor
              </div>
              <div className="text-[11px] text-[rgba(196,162,72,.55)]">
                Fully licensed &amp; insured · KwaZulu-Natal
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll nudge */}
      <div
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[5]"
        style={{ animation: "floatDown 2s ease-in-out infinite" }}
      >
        <span className="text-[9px] tracking-[2px] uppercase text-[rgba(196,162,72,.35)]">
          Scroll
        </span>
        <div
          className="w-px h-9"
          style={{
            background:
              "linear-gradient(to bottom,rgba(196,162,72,.35),transparent)",
          }}
        />
      </div>
    </section>
  );
}
