"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// export const metadata = {
//   title:
//     "TtFRECH Renovators & Investments - Premium Construction Services in South Africa",
//   description:
//     "TtFRECH Renovators & Investments offers top-tier construction, renovation, and investment services across South Africa. From custom residential builds to commercial projects and property investments, we deliver exceptional quality, transparency, and value. Contact us for a free consultation and quote.",
// };
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".rev").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
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

export default function Footer() {
  const pages = [
    ["/", "Home"],
    ["/about", "About"],
    ["/services", "Services"],
    ["/testimonials", "Reviews"],
    ["/faq", "FAQ"],
    ["/blog", "Blog"],
    ["/contact", "Contact"],
  ];
  const svcs = [
    "Residential",
    "Commercial Builds",
    "Renovations",
    "Roofing",
    "Project Management",
    "Inspections",
  ];
  const FL = ({ href, c }: { href: string; c: React.ReactNode }) => (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        fontSize: "13px",
        fontWeight: 300,
        color: "rgba(245,240,232,.35)",
        transition: "color .2s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = C.stone)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.color = "rgba(245,240,232,.35)")
      }
    >
      {c}
    </Link>
  );
  const FH = ({ c }: { c: React.ReactNode }) => (
    <h5
      style={{
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "2.5px",
        textTransform: "uppercase",
        color: C.gold,
        margin: "0 0 18px",
      }}
    >
      {c}
    </h5>
  );
  return (
    <footer
      style={{
        background: "#080E18",
        borderTop: "1px solid rgba(196,162,72,.07)",
        padding: "72px 5% 32px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
            gap: "48px",
            marginBottom: "56px",
          }}
          className="fg"
        >
          <div>
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                textDecoration: "none",
                marginBottom: "18px",
              }}
            >
              <LM size={36} />
              <LT />
            </Link>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,240,232,.3)",
                marginBottom: "16px",
                maxWidth: "280px",
              }}
            >
              Premium construction, renovation and investment services across
              South Africa.
            </p>
            {[
              "0736101014 / 081 353 2248",
              "contact@ttfrech.co.za",
              "Reg: 2025/372920/07",
            ].map((t) => (
              <div
                key={t}
                style={{
                  fontSize: "12px",
                  color: "rgba(196,162,72,.4)",
                  marginBottom: "5px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div>
            {/* <FH c="Pages" /> */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >
              {pages.map(([h, l]) => (
                <li key={h}>
                  <FL
                    href={h}
                    c={l}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* <FH c="Services" /> */}
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "9px",
              }}
            >
              {svcs.map((s) => (
                <li key={s}>
                  <FL
                    href="/services"
                    c={s}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div>
            {/* <FH c="Get in Touch" /> */}
            <Link
              href="/contact"
              style={{
                display: "inline-block",
                background: C.gold,
                color: C.navy,
                textDecoration: "none",
                padding: "12px 24px",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: "20px",
              }}
            >
              Free Quote →
            </Link>
            <div>
              <a
                href="tel:+270736101014"
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: C.stone,
                  textDecoration: "none",
                  marginBottom: "4px",
                }}
              >
                073 610 1014
              </a>
              <a
                href="tel:+270813532248"
                style={{
                  display: "block",
                  fontSize: "14px",
                  color: "rgba(245,240,232,.45)",
                  textDecoration: "none",
                }}
              >
                081 353 2248
              </a>
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "24px",
            borderTop: "1px solid rgba(196,162,72,.06)",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(245,240,232,.18)" }}>
            © {new Date().getFullYear()} TtFRECH Renovators & Investments. All
            rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms", "POPIA"].map((i) => (
              <Link
                key={i}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "rgba(245,240,232,.18)",
                  textDecoration: "none",
                }}
              >
                {i}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.fg{grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.fg{grid-template-columns:1fr!important}}`}</style>
      <div className="flex items-center justify-left mt-6 text-xs text-[#C4A248]">
        <Link
          href="https://tafadzwa.site/"
          className="no-underline hover:text-[#DFC05A] transition-colors duration-200 w-full text-center"
        >
          Created by <span>Tafadzwa</span>
        </Link>
      </div>
    </footer>
  );
}
