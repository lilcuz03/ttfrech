"use client";

import { useEffect } from "react";
import Link from "next/link";
import HeroSlider from "@/components/HeroSlider";
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
        {/* <section className="relative min-h-screen bg-[#101828] flex items-center overflow-hidden"> */}
        {/* Gradient overlay */}
        <HeroSlider />
        {/* </section> */}

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
        {/* ══ SERVICES ══════════════════════════════════════════════════════ */}
        <section className="bg-[#0D1520] py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto">
            {/* Header row */}
            <div className="flex justify-between items-end mb-12 flex-wrap gap-5">
              <div>
                <div className="inline-flex items-center gap-3 text-[#C4A248] text-[11px] font-semibold tracking-[2.5px] uppercase mb-4">
                  <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                  What We Do
                </div>
                <h2 className="font-display text-[clamp(32px,4vw,50px)] font-bold leading-[1.1] text-[#F5F0E8] mb-2">
                  Our Core{" "}
                  <em className="italic text-[#C4A248] font-normal">
                    Services
                  </em>
                </h2>
                <p className="text-[15px] font-light text-[rgba(245,240,232,.55)]">
                  End-to-end construction and renovation across Durban &amp;
                  KZN.
                </p>
              </div>
              <Link
                href="/services"
                className="inline-block px-8 py-3.5 border border-[rgba(196,162,72,.35)]
        text-[#C4A248] text-[11px] font-medium tracking-[1.5px] uppercase
        hover:bg-[rgba(196,162,72,.08)] hover:border-[#C4A248] transition-all"
              >
                View All Services
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-[rgba(196,162,72,.12)]">
              {SERVICES.map((svc, i) => (
                <Link
                  key={svc.n}
                  href="/services"
                  className={`group svc-card rev relative flex flex-col p-9 bg-[#111D2E]
          hover:bg-[#152035] transition-all duration-300 overflow-hidden
          ${["", "d1", "d2", "", "d1", "d2"][i]}`}
                >
                  {/* Gold top border — slides in on hover */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[2px] bg-[#C4A248]
            scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  />

                  {/* Watermark number */}
                  <div
                    className="font-display text-[72px] font-bold leading-none mb-3
            text-[rgba(196,162,72,.08)] group-hover:text-[rgba(196,162,72,.14)]
            transition-colors duration-300 select-none"
                  >
                    {svc.n}
                  </div>

                  {/* Icon box */}
                  <div
                    className="w-12 h-12 flex items-center justify-center mb-6
            bg-[rgba(196,162,72,.07)] border border-[rgba(196,162,72,.2)]
            group-hover:bg-[rgba(196,162,72,.14)] group-hover:border-[rgba(196,162,72,.45)]
            transition-all duration-300"
                  >
                    {SVC_ICONS[i]}
                  </div>

                  {/* Title */}
                  <div
                    className="font-display text-[20px] font-semibold text-[#F5F0E8] mb-3
            group-hover:text-[#C4A248] transition-colors duration-200"
                  >
                    {svc.title}
                  </div>

                  {/* Body */}
                  <p
                    className="text-[13.5px] font-light leading-[1.8]
            text-[rgba(245,240,232,.62)] mb-6 flex-1"
                  >
                    {svc.desc}
                  </p>

                  {/* CTA */}
                  <span
                    className="inline-flex items-center gap-2 text-[#C4A248]
            text-[11px] font-semibold tracking-[1.5px] uppercase
            group-hover:gap-3 transition-all duration-200"
                  >
                    Learn More
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 7h10M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>

                  {/* Subtle corner glow on hover */}
                  <div
                    className="absolute bottom-0 right-0 w-32 h-32 rounded-full
            opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "radial-gradient(circle at bottom right, rgba(196,162,72,.06), transparent 70%)",
                    }}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ WHY US ════════════════════════════════ */}
        {/* ══ WHY CHOOSE US ═════════════════════════════════════════════════ */}
        <section className="bg-[#0D1520] py-24 px-[5%]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* ── Left: real photo panel ── */}
            <div className="rev relative order-2 lg:order-1">
              <div className="w-full aspect-[3/4] relative overflow-hidden">
                {/* Real construction photo */}
                <img
                  src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="TtFRECH construction team on site in KwaZulu-Natal"
                  className="w-full h-full object-cover object-center"
                />
                {/* Dark gradient so bottom text is readable */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(13,21,32,.92) 0%, rgba(13,21,32,.3) 55%, transparent 100%)",
                  }}
                />
                {/* Bottom-left text */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="font-display text-[26px] font-bold leading-[1.35] text-[#F5F0E8]">
                    Your Vision.
                    <br />
                    Our Expertise.
                    <br />
                    <em className="not-italic text-[#C4A248]">One Result.</em>
                  </p>
                </div>
                {/* Gold corner accent */}
                <div
                  className="absolute top-0 left-0 w-20 h-20"
                  style={{
                    background: "rgba(196,162,72,.12)",
                    clipPath: "polygon(0 0,100% 0,0 100%)",
                  }}
                />
              </div>

              {/* CIDB badge — replaces the A+ which has no verifiable authority */}
              <div
                className="absolute -bottom-5 -right-3 bg-[#C4A248] p-5 text-center w-[124px]
        border-[3px] border-[#0D1520]"
              >
                <strong className="block font-display text-[13px] font-bold text-[#182338] leading-tight mb-1">
                  CIDB
                </strong>
                <span className="block text-[9px] font-semibold text-[#182338] uppercase tracking-[0.8px] opacity-80 leading-snug">
                  Registered
                  <br />
                  Contractor
                </span>
                <div className="mt-2 w-6 h-[1.5px] bg-[#182338]/40 mx-auto" />
                <span className="block text-[8px] text-[#182338]/60 mt-1 tracking-[0.5px]">
                  Est. 2010
                </span>
              </div>

              {/* Vertical gold line accent */}
              <div className="absolute -left-4 top-8 bottom-8 w-[2px] bg-gradient-to-b from-transparent via-[#C4A248] to-transparent hidden lg:block" />
            </div>

            {/* ── Right: reasons ── */}
            <div className="order-1 lg:order-2">
              <div className="rev inline-flex items-center gap-3 text-[#C4A248] text-[11px] font-semibold tracking-[2.5px] uppercase mb-4">
                <span className="block w-7 h-[1.5px] bg-[#C4A248]" />
                Why Choose Us
              </div>

              <h2 className="rev d1 font-display text-[clamp(32px,3.8vw,48px)] font-bold leading-[1.1] text-[#F5F0E8] mb-8">
                The TtFRECH{" "}
                <em className="italic text-[#C4A248] font-normal">
                  Difference
                </em>
              </h2>

              <div className="flex flex-col">
                {WHY.map((r, i) => (
                  <div
                    key={r.t}
                    className={`rev d${Math.min(i + 1, 4)} group flex gap-6 py-6 border-b border-[rgba(196,162,72,.1)]
            hover:border-[rgba(196,162,72,.3)] transition-colors duration-300 last:border-0`}
                  >
                    {/* Number */}
                    <div
                      className="font-display text-[28px] font-bold text-[#C4A248]/30
              group-hover:text-[#C4A248]/70 transition-colors duration-300
              shrink-0 leading-[1.2] w-9 text-right pt-0.5"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {/* Gold dot */}
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C4A248]/40 group-hover:bg-[#C4A248] transition-colors duration-300 shrink-0" />
                        <h4 className="text-[15px] font-semibold text-[#F5F0E8]">
                          {r.t}
                        </h4>
                      </div>
                      <p
                        className="text-[13.5px] font-light leading-[1.75] text-[rgba(245,240,232,.55)]
                group-hover:text-[rgba(245,240,232,.75)] transition-colors duration-300 pl-[18px]"
                      >
                        {r.d}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom CTA strip */}
              <div className="mt-10 flex items-center gap-5 flex-wrap">
                <Link
                  href="/about"
                  className="inline-block px-7 py-3 bg-[#C4A248] text-[#182338]
          text-[11px] font-semibold tracking-[1.5px] uppercase
          hover:bg-[#DFC05A] transition-colors"
                >
                  Our Full Story
                </Link>
                <div className="flex items-center gap-3 text-[rgba(245,240,232,.4)] text-[12px]">
                  <span className="block w-4 h-[1px] bg-[rgba(196,162,72,.4)]" />
                  15+ years · 320+ projects · KZN
                </div>
              </div>
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
