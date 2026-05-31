"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function useReveal(dep?: string) {
  useEffect(() => {
    // Small delay lets the DOM update before observing
    const timeout = setTimeout(() => {
      const io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("in");
          }),
        { threshold: 0.1 },
      );
      document.querySelectorAll(".rev").forEach((el) => {
        el.classList.remove("in"); // reset so they can re-animate
        io.observe(el);
      });
      return () => io.disconnect();
    }, 50);
    return () => clearTimeout(timeout);
  }, [dep]);
}

const C = {
  navy: "#182338",
  navyDk: "#101828",
  navyLt: "#1F3A6A",
  gold: "#C4A248",
  goldLt: "#DFC05A",
  steel: "#2B5BA8",
  stone: "#F5F0E8",
  stoneDk: "#E8DDD0",
  cream: "#FDFCF9",
  white: "#FFFFFF",
  ink: "#1A1A18",
  muted: "#6B7280",
};

const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
];

// ── Services data ─────────────────────────────────
const SERVICES = [
  {
    id: "residential",
    num: "01",
    title: "Residential Construction",
    tagline: "Your dream home, expertly built from the ground up.",
    desc: "We specialise in custom residential construction — from single-storey family homes to double-storey developments and cluster housing. Every build is managed end-to-end, with full transparency on cost and timeline.",
    features: [
      "Custom home builds & architect liaisons",
      "Double-storey & multi-unit residential",
      "Cluster & estate housing developments",
      "NHBRC enrolled for all residential projects",
      "Foundations, brickwork, plastering & finishing",
      "Turnkey handover with snagging guarantee",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
        strokeLinejoin="round"
      >
        <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z" />
        <rect
          x="10"
          y="15"
          width="4"
          height="6"
          rx=".4"
          fill="#C4A248"
          opacity=".4"
        />
      </svg>
    ),
  },
  {
    id: "commercial",
    num: "02",
    title: "Commercial Builds",
    tagline: "Functional, professional spaces built to last.",
    desc: "From corporate offices and retail fit-outs to warehouses and industrial facilities, we deliver commercial construction projects that meet the highest standards — on time and within budget.",
    features: [
      "Corporate offices & open-plan fit-outs",
      "Retail, showroom & hospitality spaces",
      "Warehouses & distribution centres",
      "Industrial & manufacturing facilities",
      "Mixed-use commercial developments",
      "Full compliance with SANS building codes",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
      >
        <rect
          x="2"
          y="3"
          width="20"
          height="18"
          rx="1"
        />
        <path d="M9 21V9h6v12M2 9h20" />
        <rect
          x="5"
          y="5"
          width="3"
          height="2.5"
          rx=".3"
          fill="#C4A248"
          opacity=".4"
        />
        <rect
          x="10"
          y="5"
          width="3"
          height="2.5"
          rx=".3"
          fill="#C4A248"
          opacity=".4"
        />
        <rect
          x="15"
          y="5"
          width="3"
          height="2.5"
          rx=".3"
          fill="#C4A248"
          opacity=".4"
        />
      </svg>
    ),
  },
  {
    id: "renovations",
    num: "03",
    title: "Renovations & Upgrades",
    tagline: "Transform your existing space into something remarkable.",
    desc: "Whether it's a kitchen remodel, full interior refurbishment, or a major structural extension, our renovation team delivers exceptional results that breathe new life into any property.",
    features: [
      "Full interior & exterior renovations",
      "Kitchen & bathroom remodelling",
      "Room additions & structural extensions",
      "Open-plan conversions & knock-throughs",
      "Heritage & period property restorations",
      "Complete property refurbishments",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
      >
        <path d="M14.5 2.5c0 1.5-1.5 3-1.5 3s-1.5-1.5-1.5-3a1.5 1.5 0 013 0z" />
        <path d="M13 5.5l6.5 6.5-7 7-6.5-6.5 5.5-5.5" />
        <path d="M4 20l3-3M2 22l2-2" />
      </svg>
    ),
  },
  {
    id: "roofing",
    num: "04",
    title: "Roofing & Waterproofing",
    tagline: "Protect your investment from the elements.",
    desc: "We install, repair, and maintain all types of roofing systems — from IBR and Chromadek sheeting to tiled roofs and flat roof waterproofing. Every job comes with a workmanship guarantee.",
    features: [
      "IBR, Chromadek & corrugated sheeting",
      "Concrete & clay tiled roof installation",
      "Flat roof systems & torch-on membranes",
      "Roof repairs, leaks & storm damage",
      "Bitumen & liquid waterproofing systems",
      "Fascias, gutters & downpipes",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
      >
        <path d="M2 12L12 3L22 12" />
        <path d="M5 9.5V20h14V9.5" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    id: "project-management",
    num: "05",
    title: "Project Management",
    tagline: "Expert oversight from first brick to final handover.",
    desc: "Our dedicated project management team ensures your build stays on schedule, on budget, and on spec. We coordinate all trades, manage procurement, and provide regular progress reports throughout.",
    features: [
      "Full project planning & programming",
      "Contractor & subcontractor coordination",
      "Cost control & budget management",
      "Quality assurance at every stage",
      "Regular client progress reporting",
      "Final snag list & handover documentation",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
        />
        <path d="M16 2v4M8 2v4M3 10h18" />
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    id: "inspections",
    num: "06",
    title: "Site Inspections",
    tagline: "Know exactly what you're buying or building on.",
    desc: "Our certified inspectors provide thorough structural assessments, compliance checks, and pre-purchase property evaluations. Get the full picture before you commit to any building project.",
    features: [
      "Pre-purchase structural assessments",
      "NHBRC & municipal compliance checks",
      "Stage-by-stage construction inspections",
      "Defect identification & remediation reports",
      "Commercial & industrial facility audits",
      "Written inspection reports with photographs",
    ],
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#C4A248"
        strokeWidth="1.4"
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
      </svg>
    ),
  },
];

const PROCESS = [
  {
    n: "1",
    t: "Initial Consultation",
    d: "We meet on-site or virtually to understand your brief, assess the project scope, and answer any questions you have.",
  },
  {
    n: "2",
    t: "Quotation & Planning",
    d: "You receive a detailed, itemised quotation with timeline, materials breakdown, and all costs — no hidden extras.",
  },
  {
    n: "3",
    t: "Contract & Scheduling",
    d: "We sign a formal contract, agree on payment milestones, and schedule your project start date.",
  },
  {
    n: "4",
    t: "Build & Updates",
    d: "Construction begins. You receive regular progress reports, photos, and site access at every stage.",
  },
  {
    n: "5",
    t: "Quality Checks",
    d: "Our QA team conducts inspections at every key milestone to ensure work meets our exacting standards.",
  },
  {
    n: "6",
    t: "Handover",
    d: "Final walkthrough, snag list resolution, documentation package, and your workmanship guarantee certificate.",
  },
];

// ── Shared UI ─────────────────────────────────────
const Label = ({ text, light = false }: { text: string; light?: boolean }) => (
  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "10px",
      color: C.gold,
      fontSize: "11px",
      fontWeight: 600,
      letterSpacing: "2.5px",
      textTransform: "uppercase",
      marginBottom: "16px",
    }}
  >
    <span
      style={{
        display: "block",
        width: "28px",
        height: "1.5px",
        background: C.gold,
      }}
    />
    {text}
  </div>
);

const Btn = ({
  href,
  children,
  v = "gold",
}: {
  href: string;
  children: React.ReactNode;
  v?: "gold" | "outline" | "ol-dark";
}) => {
  const vs = {
    gold: {
      background: C.gold,
      color: C.navy,
      border: `1.5px solid ${C.gold}`,
    },
    outline: {
      background: "transparent",
      color: C.stone,
      border: "1.5px solid rgba(245,240,232,0.25)",
    },
    "ol-dark": {
      background: "transparent",
      color: C.navy,
      border: `1.5px solid rgba(24,35,56,0.28)`,
    },
  }[v];
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        textDecoration: "none",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        padding: "13px 32px",
        ...vs,
      }}
    >
      {children}
    </Link>
  );
};

const LM = ({ size = 38 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      background: `linear-gradient(135deg,${C.navyLt},${C.navy})`,
      border: "1.5px solid rgba(196,162,72,0.45)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width={size * 0.52}
      height={size * 0.52}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z"
        stroke={C.gold}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="15"
        width="4"
        height="6"
        rx=".4"
        fill={C.gold}
        opacity=".55"
      />
    </svg>
  </div>
);
const LT = ({ size = 19 }: { size?: number }) => (
  <div>
    <div
      style={{
        fontFamily: "var(--fd)",
        fontSize: size,
        fontWeight: 700,
        color: C.stone,
        letterSpacing: ".5px",
        lineHeight: 1,
      }}
    >
      Tt<span style={{ color: C.gold }}>FRECH</span>
    </div>
    <div
      style={{
        fontSize: "7px",
        fontWeight: 500,
        letterSpacing: "1.8px",
        textTransform: "uppercase",
        color: "rgba(196,162,72,.5)",
        marginTop: "1px",
      }}
    >
      Renovators & Investments
    </div>
  </div>
);




// ══ SERVICES PAGE ═════════════════════════════════
export default function ServicesPage() {
  const [active, setActive] = useState("residential");

  useReveal(active);
  const current = SERVICES.find((s) => s.id === active)!;

  return (
    <>
      

      <main>
        {/* ── HERO ── */}
        <section
          style={{
            minHeight: "55vh",
            background: C.navyDk,
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            paddingTop: "72px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(16,24,40,.96) 0%,rgba(24,35,56,.7) 55%,rgba(16,24,40,.93) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "280px",
              height: "280px",
              background: "rgba(196,162,72,.05)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "220px",
              height: "220px",
              background: "rgba(43,91,168,.05)",
              clipPath: "polygon(0 0,0 100%,100% 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              width: "90%",
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "60px 0",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "28px",
              }}
            >
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  fontSize: "12px",
                  color: "rgba(196,162,72,.5)",
                }}
              >
                Home
              </Link>
              <span style={{ color: "rgba(196,162,72,.3)", fontSize: "12px" }}>
                ›
              </span>
              <span style={{ fontSize: "12px", color: "rgba(196,162,72,.7)" }}>
                Services
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "center",
              }}
              className="hc"
            >
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "rgba(196,162,72,.07)",
                    border: "1px solid rgba(196,162,72,.22)",
                    color: C.gold,
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    padding: "7px 16px",
                    marginBottom: "24px",
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: C.gold,
                      flexShrink: 0,
                    }}
                  />
                  6 Core Services
                </div>
                <h1
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: "clamp(40px,5.5vw,68px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: C.stone,
                    marginBottom: "20px",
                  }}
                >
                  Everything You Need
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.gold,
                      fontWeight: 400,
                    }}
                  >
                    Under One Roof.
                  </em>
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(245,240,232,.55)",
                    maxWidth: "460px",
                    marginBottom: "36px",
                  }}
                >
                  From new builds to renovations, roofing to full project
                  management — TtFRECH delivers end-to-end construction
                  solutions across South Africa.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Btn
                    href="/contact"
                    v="gold"
                  >
                    Get a Free Quote
                  </Btn>
                  <Btn
                    href="/about"
                    v="outline"
                  >
                    About Us
                  </Btn>
                </div>
              </div>

              {/* Service count grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3,1fr)",
                  gap: "1px",
                  background: "rgba(196,162,72,.08)",
                  border: "1px solid rgba(196,162,72,.08)",
                }}
              >
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setActive(s.id);
                      document
                        .getElementById("service-detail")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    style={{
                      background:
                        active === s.id
                          ? "rgba(196,162,72,.1)"
                          : "rgba(255,255,255,.02)",
                      border: "none",
                      padding: "24px 20px",
                      cursor: "pointer",
                      transition: "background .25s",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "11px",
                        fontWeight: 700,
                        color:
                          active === s.id ? C.gold : "rgba(196,162,72,.35)",
                        letterSpacing: "1px",
                        marginBottom: "6px",
                      }}
                    >
                      {s.num}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 500,
                        color:
                          active === s.id ? C.stone : "rgba(245,240,232,.45)",
                        lineHeight: 1.4,
                      }}
                    >
                      {s.title}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INTERACTIVE TAB DETAIL ── */}
        <section
          id="service-detail"
          style={{ background: C.white, padding: "80px 5%" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            {/* Tab bar */}
            <div
              className="tab-bar"
              style={{
                display: "flex",
                gap: "0",
                borderBottom: `1px solid ${C.stoneDk}`,
                marginBottom: "60px",
                overflowX: "auto",
              }}
            >
              {SERVICES.map((s) => (
                <button
                  key={s.id}
                  className="tab-bar-item"
                  onClick={() => setActive(s.id)}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "16px 24px",
                    fontSize: "12px",
                    fontWeight: 500,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    color: active === s.id ? C.navy : "rgba(107,114,128,.8)",
                    borderBottom:
                      active === s.id
                        ? `2.5px solid ${C.gold}`
                        : "2.5px solid transparent",
                    transition: "color .2s,border-color .2s",
                    marginBottom: "-1px",
                    borderRight: `1px solid ${C.stoneDk}`,
                  }}
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* Detail panel */}
            <div
              className="tab-panel"
              
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "60px",
                alignItems: "start",
              }}
            >
              {/* Left — visual */}
              <div className="rev">
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "4/3",
                    background: `linear-gradient(135deg,${C.navy} 0%,${C.navyLt} 45%,${C.steel} 100%)`,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    padding: "32px",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(rgba(196,162,72,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.05) 1px,transparent 1px)",
                      backgroundSize: "52px 52px",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "130px",
                      height: "130px",
                      background: C.gold,
                      opacity: 0.15,
                      clipPath: "polygon(100% 0,100% 100%,0 100%)",
                    }}
                  />
                  {/* Icon large */}
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      background: "rgba(196,162,72,.1)",
                      border: "1px solid rgba(196,162,72,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {current.icon}
                  </div>
                  <div style={{ position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: C.gold,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        marginBottom: "8px",
                      }}
                    >
                      {current.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "32px",
                        fontWeight: 700,
                        lineHeight: 1.15,
                        color: C.stone,
                      }}
                    >
                      {current.title}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(245,240,232,.5)",
                        marginTop: "6px",
                        fontStyle: "italic",
                      }}
                    >
                      {current.tagline}
                    </div>
                  </div>
                </div>
                {/* CTA strip */}
                <div
                  style={{
                    background: C.stone,
                    border: `1px solid ${C.stoneDk}`,
                    padding: "24px 28px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "16px",
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: C.navy,
                        marginBottom: "3px",
                      }}
                    >
                      Ready to start this project?
                    </div>
                    <div style={{ fontSize: "12px", color: C.muted }}>
                      Free consultation. No obligation.
                    </div>
                  </div>
                  <Btn
                    href="/contact"
                    v="gold"
                  >
                    Get a Quote
                  </Btn>
                </div>
              </div>

              {/* Right — content */}
              <div className="rev d1">
                <Label text={current.title} />
                <h2
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: "clamp(28px,3vw,40px)",
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: C.navy,
                    marginBottom: "16px",
                  }}
                >
                  {current.tagline}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: C.muted,
                    marginBottom: "32px",
                  }}
                >
                  {current.desc}
                </p>

                <h4
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: C.navy,
                    marginBottom: "20px",
                    paddingBottom: "12px",
                    borderBottom: `1px solid ${C.stoneDk}`,
                  }}
                >
                  What&apos;s Included
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: "0 0 36px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0",
                  }}
                >
                  {current.features.map((f, i) => (
                    <li
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "12px 0",
                        borderBottom: `1px solid ${C.stoneDk}`,
                      }}
                    >
                      <div
                        style={{
                          width: "22px",
                          height: "22px",
                          background: C.navy,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      >
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 11 11"
                          fill="none"
                          stroke={C.gold}
                          strokeWidth="2.2"
                        >
                          <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" />
                        </svg>
                      </div>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: 300,
                          lineHeight: 1.6,
                          color: C.ink,
                        }}
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>

                <div
                  style={{
                    background: `rgba(196,162,72,.06)`,
                    border: `1px solid rgba(196,162,72,.18)`,
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      background: "rgba(196,162,72,.12)",
                      border: "1px solid rgba(196,162,72,.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={C.gold}
                      strokeWidth="1.8"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9,12 11,14 15,10" />
                    </svg>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 500,
                        color: C.navy,
                        marginBottom: "3px",
                      }}
                    >
                      Workmanship Guarantee Included
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 300,
                        color: C.muted,
                        lineHeight: 1.6,
                      }}
                    >
                      All TtFRECH projects come with a written workmanship
                      guarantee. If it&apos;s not right, we fix it — no questions
                      asked.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ALL SERVICES OVERVIEW ── */}
        <section style={{ background: C.navyDk, padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                textAlign: "center",
                maxWidth: "560px",
                margin: "0 auto 56px",
              }}
            >
              <div
                className="rev"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: C.gold,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "24px",
                    height: "1.5px",
                    background: C.gold,
                  }}
                />
                Everything We Offer
                <span
                  style={{
                    display: "block",
                    width: "24px",
                    height: "1.5px",
                    background: C.gold,
                  }}
                />
              </div>
              <h2
                className="rev d1"
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "clamp(30px,4vw,48px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.stone,
                }}
              >
                Our Full Range of{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.gold,
                    fontWeight: 400,
                  }}
                >
                  Services
                </em>
              </h2>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "1px",
                background: "rgba(196,162,72,.07)",
                border: "1px solid rgba(196,162,72,.07)",
              }}
              className="svc-overview-grid"
            >
              {SERVICES.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setActive(s.id);
                    document
                      .getElementById("service-detail")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`rev d${(i % 3) + 1}`}
                  style={{
                    background: "rgba(255,255,255,.02)",
                    border: "none",
                    cursor: "pointer",
                    padding: "40px 32px",
                    textAlign: "left",
                    position: "relative",
                    overflow: "hidden",
                    transition: "background .3s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(196,162,72,.07)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,.02)")
                  }
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "3px",
                      height: "100%",
                      background: active === s.id ? C.gold : "transparent",
                      transition: "background .3s",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "52px",
                      fontWeight: 700,
                      color: "rgba(196,162,72,.06)",
                      lineHeight: 1,
                      marginBottom: "4px",
                    }}
                  >
                    {s.num}
                  </div>
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      background: "rgba(196,162,72,.07)",
                      border: "1px solid rgba(196,162,72,.18)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    {s.icon}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: C.stone,
                      marginBottom: "8px",
                    }}
                  >
                    {s.title}
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,240,232,.4)",
                      marginBottom: "18px",
                    }}
                  >
                    {s.tagline}
                  </p>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      color: C.gold,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                    }}
                  >
                    View Details →
                  </span>
                </button>
              ))}
            </div>
          </div>
          <style>{`@media(max-width:900px){.svc-overview-grid{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.svc-overview-grid{grid-template-columns:1fr!important}}`}</style>
        </section>

        {/* ── PROCESS ── */}
        <section style={{ background: C.stone, padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                textAlign: "center",
                maxWidth: "560px",
                margin: "0 auto 56px",
              }}
            >
              <div
                className="rev"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                  color: C.gold,
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: "24px",
                    height: "1.5px",
                    background: C.gold,
                  }}
                />
                How We Work
                <span
                  style={{
                    display: "block",
                    width: "24px",
                    height: "1.5px",
                    background: C.gold,
                  }}
                />
              </div>
              <h2
                className="rev d1"
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "clamp(30px,4vw,48px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.navy,
                }}
              >
                Our Step-by-Step{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.steel,
                    fontWeight: 400,
                  }}
                >
                  Process
                </em>
              </h2>
              <p
                className="rev d2"
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: C.muted,
                  marginTop: "12px",
                }}
              >
                Every TtFRECH project follows the same proven process — designed
                to keep you informed, in control, and confident from start to
                finish.
              </p>
            </div>

            <div
              className="proc-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {PROCESS.map((p, i) => (
                <div
                  key={p.n}
                  className={`proc-card rev d${(i % 3) + 1}`}
                  style={{
                    background: C.white,
                    padding: "36px 28px",
                    border: `1px solid ${C.stoneDk}`,
                    borderTop: `3px solid transparent`,
                    transition: "border-color .3s,transform .3s",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "14px",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        background: C.navy,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        fontFamily: "var(--fd)",
                        fontSize: "22px",
                        fontWeight: 700,
                        color: C.gold,
                      }}
                    >
                      {p.n}
                    </div>
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                        color: C.navy,
                        lineHeight: 1.3,
                      }}
                    >
                      {p.t}
                    </h4>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: C.muted,
                    }}
                  >
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY TTFRECH ── */}
        <section style={{ background: C.white, padding: "80px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "80px",
                alignItems: "center",
              }}
              className="hc"
            >
              <div className="rev d1">
                <Label text="Why Choose Us" />
                <h2
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: "clamp(30px,3.5vw,46px)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: C.navy,
                    marginBottom: "20px",
                  }}
                >
                  Quality You Can See.
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.steel,
                      fontWeight: 400,
                    }}
                  >
                    Trust You Can Feel.
                  </em>
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: C.muted,
                    marginBottom: "32px",
                  }}
                >
                  With 320+ completed projects and 15 years in the industry,
                  TtFRECH has the experience, team, and systems to deliver
                  exceptional results — every single time.
                </p>
                {[
                  [
                    "CIDB Registered",
                    "Fully compliant with SA construction regulations.",
                  ],
                  [
                    "Transparent Quotes",
                    "Itemised, no-surprise pricing before work begins.",
                  ],
                  [
                    "Dedicated PM",
                    "A project manager assigned to your build from day one.",
                  ],
                  [
                    "Workmanship Guarantee",
                    "Written guarantee on all completed work.",
                  ],
                ].map(([title, desc]) => (
                  <div
                    key={title}
                    style={{
                      display: "flex",
                      gap: "14px",
                      padding: "13px 0",
                      borderBottom: `1px solid ${C.stoneDk}`,
                    }}
                  >
                    <div
                      style={{
                        width: "22px",
                        height: "22px",
                        background: C.navy,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke={C.gold}
                        strokeWidth="2.2"
                      >
                        <polyline points="1.5,5.5 4.5,8.5 9.5,2.5" />
                      </svg>
                    </div>
                    <p
                      style={{
                        fontSize: "14px",
                        lineHeight: 1.65,
                        color: "#374151",
                      }}
                    >
                      <strong style={{ fontWeight: 600, color: C.navy }}>
                        {title}
                      </strong>
                      {" — "}
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Stat blocks */}
              <div
                className="rev"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                {[
                  {
                    n: "320+",
                    l: "Projects Completed",
                    sub: "Residential & commercial",
                  },
                  {
                    n: "15+",
                    l: "Years Experience",
                    sub: "Est. 2010, South Africa",
                  },
                  { n: "20+", l: "Team Members", sub: "Skilled & certified" },
                  {
                    n: "98%",
                    l: "Satisfaction Rate",
                    sub: "Across all project types",
                  },
                ].map((s) => (
                  <div
                    key={s.n}
                    style={{
                      background: C.stone,
                      padding: "28px 22px",
                      border: `1px solid ${C.stoneDk}`,
                      transition: "border-color .3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.borderColor = C.gold)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.borderColor = C.stoneDk)
                    }
                  >
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "46px",
                        fontWeight: 700,
                        color: C.navy,
                        lineHeight: 1,
                        marginBottom: "4px",
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 600,
                        color: C.navy,
                        marginBottom: "3px",
                      }}
                    >
                      {s.l}
                    </div>
                    <div style={{ fontSize: "11px", color: C.muted }}>
                      {s.sub}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: C.navyDk,
            padding: "100px 5%",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%,rgba(196,162,72,.06) 0%,transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "200px",
              height: "200px",
              background: "rgba(196,162,72,.04)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "660px",
              margin: "0 auto",
            }}
          >
            <div
              className="rev"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                color: C.gold,
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}
            >
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: C.gold,
                }}
              />
              Ready to Start?
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1.5px",
                  background: C.gold,
                }}
              />
            </div>
            <h2
              className="rev d1"
              style={{
                fontFamily: "var(--fd)",
                fontSize: "clamp(34px,5vw,60px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.stone,
                marginBottom: "18px",
              }}
            >
              Let&apos;s Discuss Your
              <br />
              <em
                style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}
              >
                Next Project
              </em>
            </h2>
            <p
              className="rev d2"
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,240,232,.5)",
                marginBottom: "40px",
              }}
            >
              Contact TtFRECH for a free, no-obligation consultation and
              detailed quotation. We&apos;ll respond within 24 hours.
            </p>
            <div
              className="rev d3"
              style={{
                display: "flex",
                gap: "14px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Btn
                href="/contact"
                v="gold"
              >
                Get a Free Quote
              </Btn>
              <a
                href="tel:+270736101014"
                style={{
                  display: "inline-block",
                  textDecoration: "none",
                  background: "transparent",
                  color: C.stone,
                  padding: "13px 32px",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  border: "1.5px solid rgba(245,240,232,.22)",
                }}
              >
                Call 073 610 1014
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
