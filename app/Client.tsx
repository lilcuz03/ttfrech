"use client";

import { useEffect } from "react";
import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// ── Scroll Reveal ──────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".rev").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Data ───────────────────────────────────────────
const STATS = [
  { n: "15", s: "+", l: "Years of\nExperience" },
  { n: "320", s: "+", l: "Projects\nCompleted" },
  { n: "98", s: "%", l: "Client\nSatisfaction" },
  { n: "40", s: "+", l: "Skilled\nCraftspeople" },
];

const SERVICES = [
  {
    n: "01",
    title: "Residential Construction",
    desc: "Custom home builds, double-storey houses and residential developments crafted to your exact specifications.",
  },
  {
    n: "02",
    title: "Commercial Builds",
    desc: "Offices, warehouses, retail spaces and industrial facilities built to the highest commercial standards.",
  },
  {
    n: "03",
    title: "Renovations & Upgrades",
    desc: "Breathe new life into existing structures with our comprehensive renovation and refurbishment services.",
  },
  {
    n: "04",
    title: "Project Management",
    desc: "Full-service project oversight from planning and procurement to quality control and final client handover.",
  },
  {
    n: "05",
    title: "Roofing & Waterproofing",
    desc: "Specialist roofing installation, repair and waterproofing solutions for all residential and commercial types.",
  },
  {
    n: "06",
    title: "Site Inspections",
    desc: "Professional assessments, structural inspections and compliance checks by certified construction experts.",
  },
];

const WHY = [
  {
    t: "Transparent Pricing",
    d: "No hidden costs. Detailed itemised quotations upfront so you know exactly what you're investing in.",
  },
  {
    t: "On-Time Delivery",
    d: "We set realistic timelines and commit to them. Delays cost money and trust — we protect both.",
  },
  {
    t: "Skilled Local Workforce",
    d: "20+ CIDB-registered tradespeople, engineers and managers with deep KwaZulu-Natal expertise.",
  },
  {
    t: "Guaranteed Workmanship",
    d: "All work carries a formal workmanship guarantee. If it's not right, we make it right.",
  },
];

const PROCESS = [
  {
    n: "1",
    t: "Free Consultation",
    d: "Tell us your vision. We visit your site and understand your scope and budget.",
  },
  {
    n: "2",
    t: "Detailed Quotation",
    d: "A transparent, itemised quote covering all materials, labour and timeline.",
  },
  {
    n: "3",
    t: "Construction Begins",
    d: "Our team gets to work with daily updates and milestone sign-offs.",
  },
  {
    n: "4",
    t: "Final Handover",
    d: "Full walkthrough, documentation package and workmanship guarantee.",
  },
];

const TESTIMONIALS = [
  {
    q: "TtFRECH built our home in Ballito from the ground up. Quality exceeded expectations and they finished two weeks early. We couldn't be happier.",
    name: "Nompumelelo Mthembu",
    role: "Homeowner · Ballito",
    i: "NM",
  },
  {
    q: "We contracted TtFRECH for a full office fit-out in Durban. Professional from quote to handover — transparent pricing and top-notch craftsmanship.",
    name: "Ruan Steyn",
    role: "Business Owner · Durban",
    i: "RS",
  },
  {
    q: "After bad experiences elsewhere, TtFRECH restored our faith. They renovated our Verulam property, kept us updated daily, and the result is stunning.",
    name: "Liezel Botha",
    role: "Homeowner · Verulam",
    i: "LB",
  },
];

const AREAS = [
  "Durban",
  "Ballito",
  "Westbrook",
  "Tongaat",
  "Verulam",
  "Umhlanga",
  "La Lucia",
  "Pinetown",
  "KwaDukuza",
];

// ── Service icon SVGs ──────────────────────────────
const SVC_ICONS = [
  <svg
    key={0}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z" />
  </svg>,
  <svg
    key={1}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <rect
      x="2"
      y="3"
      width="20"
      height="18"
      rx="1"
    />
    <path d="M9 21V9h6v12M2 9h20" />
  </svg>,
  <svg
    key={2}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line
      x1="9"
      y1="12"
      x2="15"
      y2="12"
    />
    <line
      x1="9"
      y1="16"
      x2="13"
      y2="16"
    />
  </svg>,
  <svg
    key={3}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <rect
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
    />
    <path d="M16 2v4M8 2v4M3 10h18" />
    <path d="M8 14h.01M12 14h.01M16 14h.01" />
  </svg>,
  <svg
    key={4}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <path d="M2 12L12 3L22 12M5 9.5V20h14V9.5M9 20v-6h6v6" />
  </svg>,
  <svg
    key={5}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#C4A248"
    strokeWidth="1.5"
  >
    <circle
      cx="11"
      cy="11"
      r="8"
    />
    <line
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
    />
    <line
      x1="11"
      y1="8"
      x2="11"
      y2="14"
    />
    <line
      x1="8"
      y1="11"
      x2="14"
      y2="11"
    />
  </svg>,
];

// ══════════════════════════════════════════════════
export default function HomePage() {
  useReveal();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        :root { --fd: 'Cormorant Garamond', Georgia, serif; }
        .rev { opacity:0; transform:translateY(28px); transition:opacity .7s ease, transform .7s ease; }
        .rev.in { opacity:1; transform:none; }
        .d1{transition-delay:.1s} .d2{transition-delay:.2s} .d3{transition-delay:.3s} .d4{transition-delay:.4s}
        .font-display { font-family: var(--fd); }
        .svc-card::before { content:''; position:absolute; top:0; left:0; width:3px; height:0; background:#C4A248; transition:height .4s ease; }
        .svc-card:hover::before { height:100%; }
        @keyframes floatDown { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(7px)} }
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .marquee-track { animation: marquee 28s linear infinite; }
      `}</style>

      {/* <Navbar /> */}

      <main className="font-body">
        {/* ══ HERO ══════════════════════════════════ */}
        <section className="relative min-h-screen bg-[#101828] flex items-center overflow-hidden">
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg,rgba(16,24,40,.97) 0%,rgba(24,35,56,.65) 55%,rgba(16,24,40,.92) 100%)",
            }}
          />
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          {/* Gold corner */}
          <div
            className="absolute top-0 right-0 w-44 h-44 opacity-60"
            style={{
              background: "rgba(196,162,72,.06)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96"
            style={{
              background:
                "radial-gradient(circle at top right,rgba(196,162,72,.07) 0%,transparent 70%)",
            }}
          />

          <div
            className="relative z-10 w-[90%] max-w-[1200px] mx-auto pt-[72px]
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
                className="font-display text-[clamp(46px,6vw,76px)] font-bold leading-[1.05]
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
                className="text-[16px] font-light leading-[1.8] text-[rgba(245,240,232,.58)]
                max-w-[440px] mb-10"
              >
                TtFRECH Renovators &amp; Investments delivers premium
                residential and commercial construction across Durban and
                KwaZulu-Natal — crafted with precision, on time and on budget.
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

            {/* Right — Stats */}
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
                    <div className="text-[12px] text-[rgba(196,162,72,.45)] leading-[1.5] whitespace-pre-line">
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
                  <div className="text-[11px] text-[rgba(196,162,72,.45)]">
                    Fully licensed &amp; insured · KwaZulu-Natal
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll nudge */}
          <div
            className="absolute bottom-9 left-1/2 flex flex-col items-center gap-2"
            style={{ animation: "floatDown 2s ease-in-out infinite" }}
          >
            <span className="text-[9px] tracking-[2px] uppercase text-[rgba(196,162,72,.3)]">
              Scroll
            </span>
            <div
              className="w-px h-9"
              style={{
                background:
                  "linear-gradient(to bottom,rgba(196,162,72,.3),transparent)",
              }}
            />
          </div>
        </section>

        {/* ══ AREAS WE SERVE (marquee) ══════════════ */}
        <div className="bg-[#182338] border-b border-[rgba(196,162,72,.1)] py-4 overflow-hidden">
          <div className="flex items-center gap-3 mb-0">
            <div className="flex shrink-0 items-center gap-2 px-5 bg-[#C4A248] h-10">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#182338"
                strokeWidth="2.5"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle
                  cx="12"
                  cy="10"
                  r="3"
                />
              </svg>
              <span className="text-[10px] font-bold tracking-[2px] uppercase text-[#182338]">
                Serving
              </span>
            </div>
            <div className="overflow-hidden flex-1">
              <div className="marquee-track flex gap-12 w-max">
                {[...AREAS, ...AREAS].map((area, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-12 text-[11px] font-medium
                    tracking-[1.5px] uppercase text-[rgba(196,162,72,.6)] whitespace-nowrap"
                  >
                    {area}
                    <span className="w-px h-4 bg-[rgba(196,162,72,.2)]" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ══ TRUST BAR ═════════════════════════════ */}
        <div className="bg-[#F5F0E8] border-t border-b border-[#E8DDD0] py-6 px-[5%] overflow-hidden">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "Residential Construction",
              "Commercial Builds",
              "Renovations & Upgrades",
              "Roofing & Waterproofing",
              "CIDB Registered",
            ].map((item, i, arr) => (
              <div
                key={item}
                className="flex items-center gap-8"
              >
                <span
                  className="text-[11px] font-medium tracking-[1.5px] uppercase
                  text-[#2B5BA8] opacity-65"
                >
                  {item}
                </span>
                {i < arr.length - 1 && (
                  <div className="w-px h-[18px] bg-[#C4A248] opacity-25" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ══ ABOUT ═════════════════════════════════ */}
        <section className="bg-white py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <div className="rev relative">
              <div
                className="w-full aspect-[4/3] relative overflow-hidden flex items-end"
                style={{
                  background:
                    "linear-gradient(135deg,#182338 0%,#1F3A6A 50%,#2B5BA8 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(196,162,72,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.05) 1px,transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-28 h-28 opacity-20"
                  style={{
                    background: "#C4A248",
                    clipPath: "polygon(100% 0,100% 100%,0 100%)",
                  }}
                />
                <div
                  className="relative z-10 p-6 w-full font-display text-[28px] font-bold
                  leading-[1.35] text-white/90"
                  style={{
                    background:
                      "linear-gradient(to top,rgba(16,24,40,.65) 0%,transparent 100%)",
                  }}
                >
                  Building KwaZulu-Natal&apos;s
                  <br />
                  Future.
                </div>
              </div>
              {/* Badge */}
              <div
                className="absolute -right-5 top-7 bg-[#C4A248] p-4 text-center w-[104px]
                border-[3px] border-white shadow-[0_4px_20px_rgba(196,162,72,.28)]"
              >
                <div className="font-display text-[40px] font-bold text-[#182338] leading-none">
                  15
                </div>
                <div
                  className="text-[8px] font-semibold text-[#182338] tracking-[0.5px]
                  uppercase mt-1 opacity-70"
                >
                  Years of
                  <br />
                  Excellence
                </div>
              </div>
            </div>

            {/* Text */}
            <div className="rev d1">
              <div
                className="inline-flex items-center gap-3 text-[#C4A248] text-[11px]
                font-semibold tracking-[2.5px] uppercase mb-4"
              >
                <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                About TtFRECH
              </div>
              <h2
                className="font-display text-[clamp(32px,3.8vw,48px)] font-bold leading-[1.1]
                text-[#182338] mb-4"
              >
                Durban&apos;s Trusted Name in{" "}
                <em className="italic text-[#2B5BA8] font-normal">
                  Construction
                </em>
              </h2>
              <p className="text-[16px] font-light leading-[1.8] text-[#6B7280] mb-6">
                Founded on integrity, craftsmanship and reliability, TtFRECH
                Renovators &amp; Investments has delivered exceptional building
                solutions across Durban and KwaZulu-Natal. From foundations to
                finishing, every project reflects our commitment to quality.
              </p>
              {[
                [
                  "CIDB Registered",
                  "Fully compliant with SA construction regulations and NHBRC standards.",
                ],
                [
                  "Experienced Team",
                  "20+ skilled tradespeople, engineers and project managers on every build.",
                ],
                [
                  "On Time, Every Time",
                  "Transparent timelines, milestone updates and strict budget management.",
                ],
                [
                  "Local KZN Expertise",
                  "Deep knowledge of Durban building codes, materials, climate and terrain.",
                ],
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="flex gap-4 py-3 border-b border-[#E8DDD0]"
                >
                  <div className="w-6 h-6 bg-[#182338] flex items-center justify-center shrink-0 mt-[2px]">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="#C4A248"
                      strokeWidth="2.2"
                    >
                      <polyline points="2,6 5,9 10,3" />
                    </svg>
                  </div>
                  <p className="text-[14px] leading-[1.65] text-[#374151]">
                    <strong className="font-semibold text-[#182338]">
                      {title}
                    </strong>
                    {" — "}
                    {desc}
                  </p>
                </div>
              ))}
              <div className="mt-8">
                <Link
                  href="/about"
                  className="inline-block px-8 py-3.25 bg-[#C4A248] text-[#182338]
                  text-[11px] font-semibold tracking-[1.5px] uppercase hover:bg-[#DFC05A] transition-colors"
                >
                  Our Full Story
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ SERVICES ══════════════════════════════ */}
        <section className="bg-[#101828] py-24 px-[5%]">
          <div className="max-w-300 mx-auto">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-5">
              <div>
                <div
                  className="inline-flex items-center gap-3 text-[#C4A248] text-[11px]
                  font-semibold tracking-[2.5px] uppercase mb-4"
                >
                  <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                  What We Do
                </div>
                <h2
                  className="font-display text-[clamp(32px,4vw,50px)] font-bold
                  leading-[1.1] text-[#F5F0E8] mb-2"
                >
                  Our Core{" "}
                  <em className="italic text-[#C4A248] font-normal">
                    Services
                  </em>
                </h2>
                <p className="text-[15px] font-light text-[rgba(245,240,232,.5)]">
                  End-to-end construction and renovation across Durban &amp;
                  KZN.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-block px-8 py-3.25 border border-[rgba(245,240,232,.22)]
                text-[#F5F0E8] text-[11px] font-medium tracking-[1.5px] uppercase
                hover:border-[rgba(245,240,232,.5)] transition-colors"
              >
                View All Services
              </Link>
            </div>

            {/* Grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px
              bg-[rgba(196,162,72,.07)] border border-[rgba(196,162,72,.07)]"
            >
              {SERVICES.map((svc, i) => (
                <div
                  key={svc.n}
                  className={`svc-card rev bg-[rgba(255,255,255,.02)] p-10 relative overflow-hidden
                  hover:bg-[rgba(196,162,72,.07)] transition-colors cursor-default
                  ${["", "d1", "d2", "", "d1", "d2"][i]}`}
                >
                  <div className="font-display text-[58px] font-bold text-[rgba(196,162,72,.05)] leading-none mb-1">
                    {svc.n}
                  </div>
                  <div
                    className="w-11.5 h-[46px] flex items-center justify-center mb-5
                    bg-[rgba(196,162,72,.07)] border border-[rgba(196,162,72,.18)]"
                  >
                    {SVC_ICONS[i]}
                  </div>
                  <div className="font-display text-[21px] font-semibold text-[#F5F0E8] mb-2">
                    {svc.title}
                  </div>
                  <p className="text-[13px] font-light leading-[1.75] text-[rgba(245,240,232,.42)] mb-5">
                    {svc.desc}
                  </p>
                  <Link
                    href="/services"
                    className="text-[#C4A248] text-[11px] font-medium tracking-[1px] uppercase
                    hover:tracking-[2px] transition-all"
                  >
                    Learn More →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ════════════════════════════════ */}
        <section className="bg-[#F5F0E8] py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Visual */}
            <div className="rev relative order-2 lg:order-1">
              <div
                className="w-full aspect-[3/4] relative overflow-hidden flex items-end"
                style={{
                  background: "linear-gradient(160deg,#182338 0%,#2B5BA8 100%)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(-45deg,transparent,transparent 20px,rgba(255,255,255,.025) 20px,rgba(255,255,255,.025) 40px)",
                  }}
                />
                <div
                  className="absolute bottom-0 right-0 w-36 h-36"
                  style={{
                    background: "#C4A248",
                    clipPath: "polygon(100% 0,100% 100%,0 100%)",
                  }}
                />
                <div
                  className="relative z-10 p-8 font-display text-[27px] font-bold
                  leading-[1.35] text-white/90"
                >
                  Your Vision.
                  <br />
                  Our Expertise.
                  <br />
                  One Result.
                </div>
              </div>
              <div
                className="absolute -bottom-5 -right-3 bg-[#C4A248] p-5 text-center
                w-[118px] border-[3px] border-[#F5F0E8]"
              >
                <strong className="block font-display text-[36px] font-bold text-[#182338] leading-none">
                  A+
                </strong>
                <span className="text-[9px] font-semibold text-[#182338] uppercase tracking-[0.5px] opacity-70">
                  Quality
                  <br />
                  Rating
                </span>
              </div>
            </div>

            {/* Reasons */}
            <div className="order-1 lg:order-2">
              <div
                className="rev inline-flex items-center gap-3 text-[#C4A248] text-[11px]
                font-semibold tracking-[2.5px] uppercase mb-4"
              >
                <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                Why Choose Us
              </div>
              <h2
                className="rev d1 font-display text-[clamp(32px,3.8vw,48px)] font-bold
                leading-[1.1] text-[#182338] mb-4"
              >
                The TtFRECH{" "}
                <em className="italic text-[#2B5BA8] font-normal">
                  Difference
                </em>
              </h2>
              {WHY.map((r, i) => (
                <div
                  key={r.t}
                  className={`rev d${i + 1} flex gap-6 py-5 border-b border-[#E8DDD0]`}
                >
                  <div
                    className="font-display text-[30px] font-bold text-[#C4A248] opacity-45
                    shrink-0 leading-[1.2] w-8 text-right"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-semibold text-[#182338] mb-1">
                      {r.t}
                    </h4>
                    <p className="text-[14px] font-light leading-[1.7] text-[#6B7280]">
                      {r.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ PROCESS ═══════════════════════════════ */}
        <section className="bg-white py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center max-w-[520px] mx-auto mb-16">
              <div
                className="rev flex items-center justify-center gap-3 text-[#C4A248]
                text-[11px] font-semibold tracking-[2.5px] uppercase mb-4"
              >
                <span className="block w-6 h-[1.5px] bg-[#C4A248]" />
                How It Works
                <span className="block w-6 h-[1.5px] bg-[#C4A248]" />
              </div>
              <h2
                className="rev d1 font-display text-[clamp(32px,4vw,48px)] font-bold
                leading-[1.1] text-[#182338]"
              >
                Simple, Structured{" "}
                <em className="italic text-[#2B5BA8] font-normal">Process</em>
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {/* Connector line — desktop only */}
              <div
                className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%]
                h-px bg-[#E8DDD0]"
              />
              {PROCESS.map((p, i) => (
                <div
                  key={p.n}
                  className={`rev d${i} text-center px-2`}
                >
                  <div
                    className="w-16 h-16 border-[1.5px] border-[#C4A248] bg-white
                    flex items-center justify-center mx-auto mb-6 relative z-10
                    font-display text-[28px] font-bold text-[#182338]"
                  >
                    {p.n}
                  </div>
                  <h4 className="text-[14px] font-semibold text-[#182338] mb-2">
                    {p.t}
                  </h4>
                  <p className="text-[13px] font-light leading-[1.75] text-[#6B7280]">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ TESTIMONIALS ══════════════════════════ */}
        <section className="bg-[#182338] py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex justify-between items-end mb-12 flex-wrap gap-5">
              <div>
                <div
                  className="rev inline-flex items-center gap-3 text-[#C4A248]
                  text-[11px] font-semibold tracking-[2.5px] uppercase mb-4"
                >
                  <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                  Client Reviews
                </div>
                <h2
                  className="rev d1 font-display text-[clamp(32px,4vw,50px)] font-bold
                  leading-[1.1] text-[#F5F0E8]"
                >
                  What Our KZN Clients{" "}
                  <em className="italic text-[#C4A248] font-normal">Say</em>
                </h2>
              </div>
              <Link
                href="/testimonials"
                className="inline-block px-8 py-[13px] border border-[rgba(245,240,232,.22)]
                text-[#F5F0E8] text-[11px] font-medium tracking-[1.5px] uppercase
                hover:border-[rgba(245,240,232,.5)] transition-colors"
              >
                All Reviews
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={t.name}
                  className={`rev d${i} bg-[rgba(255,255,255,.04)] border border-[rgba(196,162,72,.1)]
                  p-8 hover:border-[rgba(196,162,72,.38)] hover:bg-[rgba(255,255,255,.07)]
                  transition-all duration-300 cursor-default`}
                >
                  <div className="font-display text-[60px] leading-[.6] text-[#C4A248] mb-4">
                    &ldquo;
                  </div>
                  <p
                    className="text-[14px] font-light leading-[1.8] text-[rgba(245,240,232,.72)]
                    italic mb-7"
                  >
                    {t.q}
                  </p>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-11 h-11 rounded-full bg-[#1F3A6A] border-2
                      border-[rgba(196,162,72,.35)] flex items-center justify-center
                      font-display text-[15px] font-bold text-[#E8DDD0] shrink-0"
                    >
                      {t.i}
                    </div>
                    <div>
                      <div className="text-[#C4A248] text-[12px] tracking-[2px] mb-[2px]">
                        ★★★★★
                      </div>
                      <div className="text-[13px] font-medium text-[#F5F0E8]">
                        {t.name}
                      </div>
                      <div className="text-[11px] text-[rgba(196,162,72,.45)] mt-[1px]">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ SERVICE AREA MAP STRIP ════════════════ */}
        <section className="bg-[#F5F0E8] py-16 px-[5%] border-t border-[#E8DDD0]">
          <div className="max-w-[1200px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="inline-flex items-center gap-3 text-[#C4A248] text-[11px]
                  font-semibold tracking-[2.5px] uppercase mb-4"
                >
                  <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                  Where We Work
                </div>
                <h2
                  className="font-display text-[clamp(28px,3.5vw,42px)] font-bold
                  leading-[1.1] text-[#182338] mb-4"
                >
                  Proudly Serving Durban
                  <br />
                  <em className="italic text-[#2B5BA8] font-normal">
                    & KwaZulu-Natal
                  </em>
                </h2>
                <p className="text-[15px] font-light leading-[1.8] text-[#6B7280] mb-6">
                  Based in Durban, we operate across the greater KZN region.
                  Whether you&apos;re on the North Coast, in the city, or
                  further inland — we come to you.
                </p>
                <div className="flex flex-wrap gap-2">
                  {AREAS.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-[6px] text-[11px] font-medium tracking-[0.5px]
                      border border-[#E8DDD0] text-[#182338] bg-white hover:border-[#C4A248]
                      hover:text-[#C4A248] transition-colors cursor-default"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              {/* Visual area block */}
              <div className="relative">
                <div
                  className="w-full aspect-[4/3] relative overflow-hidden flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg,#182338 0%,#1F3A6A 60%,#2B5BA8 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(196,162,72,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.05) 1px,transparent 1px)",
                      backgroundSize: "48px 48px",
                    }}
                  />
                  <div
                    className="absolute bottom-0 right-0 w-28 h-28 opacity-20"
                    style={{
                      background: "#C4A248",
                      clipPath: "polygon(100% 0,100% 100%,0 100%)",
                    }}
                  />
                  {/* KZN pin icon */}
                  <div className="relative z-10 text-center">
                    <svg
                      className="mx-auto mb-4"
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#C4A248"
                      strokeWidth="1.2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle
                        cx="12"
                        cy="10"
                        r="3"
                      />
                    </svg>
                    <div className="font-display text-[32px] font-bold text-white/90 leading-none">
                      Durban
                    </div>
                    <div className="text-[12px] text-[rgba(196,162,72,.6)] tracking-[2px] uppercase mt-1">
                      KwaZulu-Natal
                    </div>
                    <div className="mt-4 flex flex-wrap justify-center gap-2 max-w-[240px] mx-auto">
                      {AREAS.slice(0, 5).map((a) => (
                        <span
                          key={a}
                          className="text-[10px] text-[rgba(245,240,232,.5)] border
                          border-[rgba(196,162,72,.15)] px-2 py-1"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════ */}
        <section className="bg-[#101828] py-28 px-[5%] text-center relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%,rgba(196,162,72,.06) 0%,transparent 65%)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-48 h-48 opacity-60"
            style={{
              background: "rgba(196,162,72,.04)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-48 h-48 opacity-60"
            style={{
              background: "rgba(43,91,168,.05)",
              clipPath: "polygon(0 0,0 100%,100% 100%)",
            }}
          />

          <div className="relative z-10 max-w-[660px] mx-auto">
            <div
              className="rev flex items-center justify-center gap-3 text-[#C4A248]
              text-[11px] font-semibold tracking-[2.5px] uppercase mb-4"
            >
              <span className="block w-5 h-px bg-[#C4A248]" />
              Start Your Project
              <span className="block w-5 h-px bg-[#C4A248]" />
            </div>
            <h2
              className="rev d1 font-display text-[clamp(36px,5vw,60px)] font-bold
              leading-[1.1] text-[#F5F0E8] mb-5"
            >
              Ready to{" "}
              <em className="italic text-[#C4A248] font-normal">Build</em>
              <br />
              Something Remarkable?
            </h2>
            <p
              className="rev d2 text-[16px] font-light leading-[1.8]
              text-[rgba(245,240,232,.5)] max-w-[500px] mx-auto mb-10"
            >
              Contact TtFRECH Durban today for a free, no-obligation
              consultation and quotation. We serve Ballito, Westbrook, Tongaat,
              Verulam and all of KZN.
            </p>
            <div className="rev d3 flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-[13px] bg-[#C4A248] text-[#182338]
                text-[11px] font-semibold tracking-[1.5px] uppercase
                hover:bg-[#DFC05A] transition-colors"
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+270736101014"
                className="inline-block px-8 py-3.25 border border-[rgba(245,240,232,.22)]
                text-[#F5F0E8] text-[11px] font-medium tracking-[1.5px] uppercase
                hover:border-[rgba(245,240,232,.5)] transition-colors"
              >
                Call 073 610 1014
              </a>
            </div>
          </div>
        </section>
      </main>
      {/* <Footer /> */}
    </>
  );
}
