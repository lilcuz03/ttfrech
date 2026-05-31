"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Scroll Reveal Hook ─────────────────────────────
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



// ── Colour tokens ─────────────────────────────────
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

// ── FAQ Data ──────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: "general",
    label: "General",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
        />
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
        <circle
          cx="12"
          cy="17"
          r="0.5"
          fill="currentColor"
        />
      </svg>
    ),
    items: [
      {
        q: "Is TtFRECH a registered construction company?",
        a: "Yes. TtFRECH Renovators & Investments (Reg: 2025/372920/07) is a fully registered South African company and CIDB-registered contractor. We comply with all applicable construction regulations, NHBRC standards, and relevant South African building codes.",
      },
      {
        q: "What areas do you operate in?",
        a: "We operate across South Africa with a primary focus on Gauteng — including Johannesburg, Pretoria, Centurion, Midrand, and surrounding areas. For larger commercial projects we also travel to other provinces. Contact us to discuss your specific location.",
      },
      {
        q: "How long has TtFRECH been in the industry?",
        a: "Our team brings over 15 years of combined construction and renovation expertise. Our senior leadership and tradespeople carry deep experience across residential, commercial, and industrial builds in the South African market.",
      },
      {
        q: "Are your workers employed directly or subcontracted?",
        a: "We maintain a core team of 40+ skilled tradespeople, engineers, and project managers employed directly by TtFRECH. For specialist trades we engage vetted, CIDB-registered subcontractors who meet our quality and compliance standards.",
      },
    ],
  },
  {
    id: "quotes",
    label: "Quotes & Pricing",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line
          x1="16"
          y1="13"
          x2="8"
          y2="13"
        />
        <line
          x1="16"
          y1="17"
          x2="8"
          y2="17"
        />
        <line
          x1="10"
          y1="9"
          x2="8"
          y2="9"
        />
      </svg>
    ),
    items: [
      {
        q: "Is the initial consultation and quotation really free?",
        a: "Absolutely. Our initial site consultation and detailed quotation are completely free of charge with no obligation. We visit your site, assess the scope of work, discuss your vision and budget, and provide a comprehensive, itemised quote.",
      },
      {
        q: "How detailed is your quotation?",
        a: "Our quotations are fully itemised — broken down by materials, labour, plant hire, and any specialist sub-trades. We include a project timeline, payment milestones, and clearly state any exclusions. There are no hidden costs.",
      },
      {
        q: "How is pricing structured — fixed price or cost-plus?",
        a: "For most projects we provide a fixed-price contract based on an agreed scope of works. This gives you cost certainty. Where the full scope is not yet defined, we can work on a cost-plus basis with a capped budget. We discuss the best approach for your project during consultation.",
      },
      {
        q: "What payment terms do you offer?",
        a: "We typically structure payments around project milestones — foundation completion, wall plate, roofing, fit-out, and final handover. A deposit is required to secure your start date. Specific terms are outlined in your contract before any work begins.",
      },
      {
        q: "Can you work within a tight or fixed budget?",
        a: "Yes. We are experienced at value engineering — achieving your design goals within a defined budget by recommending appropriate materials and construction methods. We will always be upfront if a requested scope cannot be delivered within budget, and suggest alternatives.",
      },
    ],
  },
  {
    id: "process",
    label: "Process & Timelines",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
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
        <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    items: [
      {
        q: "How long does it take from quote acceptance to breaking ground?",
        a: "Once a contract is signed and the initial deposit received, we typically mobilise within 2–4 weeks. This includes finalising material procurement, obtaining any required building plans approvals, and scheduling our team. Timelines vary based on project size and permit requirements.",
      },
      {
        q: "How do you handle project updates and communication?",
        a: "We assign a dedicated project manager to every build. You receive daily progress updates via WhatsApp or email including photos, and weekly formal milestone reports. You are always welcome to visit the site. We believe transparent communication eliminates surprises.",
      },
      {
        q: "What happens if the project runs behind schedule?",
        a: "Our contracts include realistic, milestone-based timelines. Where delays are caused by unforeseen site conditions, municipal delays, or weather, we communicate immediately and adjust the schedule in writing. We take our timelines seriously and our track record speaks for itself.",
      },
      {
        q: "Do you manage the building plans and council approvals?",
        a: "Yes. We offer full project management including engaging registered architects or draughtsmen, submitting plans to your local municipality, and managing the approval process. This can be included as part of our service or managed by the client separately — we advise on the best approach.",
      },
    ],
  },
  {
    id: "quality",
    label: "Quality & Guarantee",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2l2.5 6.5H21l-5.5 4 2 6.5L12 15l-5.5 3.5 2-6.5L3 8.5h6.5L12 2Z" />
      </svg>
    ),
    items: [
      {
        q: "Do you offer a workmanship guarantee?",
        a: "Yes. All TtFRECH projects carry a formal workmanship guarantee. If any defect arising from our workmanship is identified within the guarantee period, we will rectify it at no cost to you. The specific guarantee terms are documented in your contract.",
      },
      {
        q: "What quality control measures are in place during construction?",
        a: "Quality control is built into every phase. Our project manager conducts daily inspections, and we use milestone sign-off sheets before proceeding to subsequent phases. For structural work, we engage independent structural engineers for inspections where required.",
      },
      {
        q: "Are you insured?",
        a: "Yes. TtFRECH carries comprehensive public liability insurance and contractor's all-risk insurance. Proof of insurance is available on request and is provided as part of your contract documentation.",
      },
      {
        q: "What standards and codes do your builds comply with?",
        a: "All our construction complies with the National Building Regulations (SANS 10400), NHBRC standards for residential builds, relevant SANS material standards, and municipal by-laws. Our team stays current with updates to South African building codes.",
      },
    ],
  },
  {
    id: "services",
    label: "Services",
    icon: (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z" />
      </svg>
    ),
    items: [
      {
        q: "Do you handle both new builds and renovations?",
        a: "Yes — both are core to what we do. We handle full new builds (residential and commercial) as well as partial renovations, extensions, additions, and refurbishments. Whether you're adding a room or building from the ground up, we have the expertise.",
      },
      {
        q: "Can you build a double-storey house?",
        a: "Absolutely. Double-storey and multi-level residential construction is well within our capability. Our structural engineers and experienced tradespeople have delivered numerous double-storey homes across Gauteng. We manage structural design, plans approval, and construction end-to-end.",
      },
      {
        q: "Do you do roofing and waterproofing as a standalone service?",
        a: "Yes. Our roofing and waterproofing division handles new roof installations, re-roofing, roof repairs, and specialised waterproofing for flat roofs, wet rooms, and basements. We work across IBR, Klip-Lok, concrete tile, clay tile, and flat roof membrane systems.",
      },
      {
        q: "Do you offer site inspections for properties I want to purchase or renovate?",
        a: "Yes. Our site inspection service provides a professional structural and compliance assessment of an existing property. This is ideal before purchasing, before a renovation, or as a dilapidation survey. You receive a written report with findings and recommendations.",
      },
    ],
  },
];

// ── Reusable pieces (matching homepage) ──────────
const SectionLabel = ({ text }: { text: string }) => (
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

const LogoMark = ({ size = 40 }: { size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      background: `linear-gradient(135deg,${C.navyLt},${C.navy})`,
      border: `1.5px solid rgba(196,162,72,0.45)`,
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
        fill="none"
      />
      <rect
        x="10"
        y="15"
        width="4"
        height="6"
        rx="0.4"
        fill={C.gold}
        opacity="0.55"
      />
    </svg>
  </div>
);

const LogoText = ({ size = 20 }: { size?: number }) => (
  <div>
    <div
      style={{
        fontFamily: "var(--font-display,Georgia,serif)",
        fontSize: size,
        fontWeight: 700,
        color: C.stone,
        letterSpacing: "0.5px",
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
        color: "rgba(196,162,72,0.5)",
        marginTop: "1px",
      }}
    >
      Renovators &amp; Investments
    </div>
  </div>
);

// ── Navbar ────────────────────────────────────────


// ── Footer ────────────────────────────────────────
function Footer() {
  const pages: [string, string][] = [
    ["/", "Home"],
    ["/about", "About"],
    ["/services", "Services"],
    ["/testimonials", "Reviews"],
    ["/faq", "FAQ"],
    ["/blog", "Blog"],
    ["/contact", "Contact"],
  ];
  const services = [
    "Residential",
    "Commercial Builds",
    "Renovations",
    "Roofing",
    "Project Management",
    "Inspections",
  ];

  return (
    <footer
      style={{
        background: "#080E18",
        borderTop: "1px solid rgba(196,162,72,0.07)",
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
          className="footer-grid"
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
              <LogoMark size={36} />
              <LogoText size={18} />
            </Link>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 300,
                lineHeight: "1.8",
                color: "rgba(245,240,232,0.3)",
                marginBottom: "16px",
                maxWidth: "280px",
              }}
            >
              Premium construction, renovation and investment services across
              South Africa. Built on trust, delivered with excellence.
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
                  color: "rgba(196,162,72,0.4)",
                  marginBottom: "5px",
                }}
              >
                {t}
              </div>
            ))}
          </div>
          <div>
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
              Pages
            </h5>
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
              {pages.map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.35)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = C.stone)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(245,240,232,0.35)")
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
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
              Services
            </h5>
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
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    style={{
                      textDecoration: "none",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(245,240,232,0.35)",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = C.stone)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = "rgba(245,240,232,0.35)")
                    }
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
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
              Get in Touch
            </h5>
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
                marginBottom: "24px",
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
                  fontWeight: 400,
                  color: "rgba(245,240,232,0.5)",
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
            borderTop: "1px solid rgba(196,162,72,0.06)",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "12px", color: "rgba(245,240,232,0.18)" }}>
            © {new Date().getFullYear()} TtFRECH Renovators &amp; Investments.
            All rights reserved.
          </span>
          <div style={{ display: "flex", gap: "20px" }}>
            {["Privacy Policy", "Terms of Service", "POPIA"].map((item) => (
              <Link
                key={item}
                href="#"
                style={{
                  fontSize: "12px",
                  color: "rgba(245,240,232,0.18)",
                  textDecoration: "none",
                }}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <style>{`.footer-grid{@media(max-width:900px){grid-template-columns:1fr 1fr!important}}@media(max-width:560px){.footer-grid{grid-template-columns:1fr!important}}`}</style>
    </footer>
  );
}

// ── Accordion Item ────────────────────────────────
function AccordionItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: `1px solid rgba(196,162,72,0.1)`,
        transition: "background 0.2s",
        background: open ? "rgba(196,162,72,0.03)" : "transparent",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          padding: "24px 28px",
          textAlign: "left",
        }}
      >
        {/* Number */}
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "13px",
            fontWeight: 700,
            color: open ? C.gold : "rgba(196,162,72,0.3)",
            flexShrink: 0,
            marginTop: "2px",
            minWidth: "24px",
            transition: "color 0.2s",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        {/* Question */}
        <span
          style={{
            flex: 1,
            fontSize: "15px",
            fontWeight: 500,
            color: open ? C.stone : "rgba(245,240,232,0.78)",
            lineHeight: 1.5,
            transition: "color 0.2s",
          }}
        >
          {q}
        </span>
        {/* Icon */}
        <span
          style={{
            flexShrink: 0,
            width: "28px",
            height: "28px",
            border: `1px solid ${open ? "rgba(196,162,72,0.5)" : "rgba(196,162,72,0.18)"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.25s",
            background: open ? "rgba(196,162,72,0.1)" : "transparent",
            marginTop: "1px",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke={C.gold}
            strokeWidth="2"
            style={{
              transform: open ? "rotate(45deg)" : "none",
              transition: "transform 0.25s",
            }}
          >
            <line
              x1="6"
              y1="1"
              x2="6"
              y2="11"
            />
            <line
              x1="1"
              y1="6"
              x2="11"
              y2="6"
            />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        style={{
          maxHeight: open ? "400px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <div
          style={{
            padding: "0 28px 24px 72px",
            fontSize: "14px",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "rgba(245,240,232,0.52)",
            borderLeft: `2px solid rgba(196,162,72,0.2)`,
            marginLeft: "28px",
            marginBottom: "4px",
          }}
        >
          {a}
        </div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════
// ── PAGE ─────────────────────────────────────────
// ══════════════════════════════════════════════════
export default function FAQPage() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState("general");

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!;

  return (
    <>
      


      <main>
        {/* ══ HERO ══════════════════════════════════ */}
        <section
          style={{
            background: C.navyDk,
            paddingTop: "72px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Grid overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(196,162,72,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,0.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          {/* Radial glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "700px",
              height: "400px",
              background:
                "radial-gradient(ellipse at 50% 0%,rgba(196,162,72,0.07) 0%,transparent 65%)",
            }}
          />
          {/* Corner accent */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "160px",
              height: "160px",
              background: "rgba(196,162,72,0.05)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "80px 5% 72px",
              textAlign: "center",
            }}
          >
            {/* Breadcrumb */}
            <div
              className="rev"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(196,162,72,0.07)",
                border: `1px solid rgba(196,162,72,0.18)`,
                color: "rgba(196,162,72,0.7)",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "7px 16px",
                marginBottom: "28px",
              }}
            >
              <Link
                href="/"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Home
              </Link>
              <span style={{ opacity: 0.4 }}>›</span>
              <span style={{ color: C.gold }}>FAQ</span>
            </div>

            <h1
              className="rev d1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(44px,6vw,74px)",
                fontWeight: 700,
                lineHeight: 1.05,
                color: C.stone,
                marginBottom: "18px",
              }}
            >
              Frequently Asked{" "}
              <em
                style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}
              >
                Questions
              </em>
            </h1>

            <p
              className="rev d2"
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.5)",
                maxWidth: "520px",
                margin: "0 auto 48px",
              }}
            >
              Everything you need to know about working with TtFRECH — from
              first consultation to final handover.
            </p>

            {/* Search-style CTA strip */}
            <div
              className="rev d3"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(196,162,72,0.16)",
                overflow: "hidden",
                maxWidth: "480px",
                width: "100%",
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: "14px 20px",
                  fontSize: "13px",
                  color: "rgba(245,240,232,0.4)",
                  letterSpacing: "0.5px",
                  textAlign: "left",
                }}
              >
                Can&apos;t find your answer?
              </div>
              <Link
                href="/contact"
                style={{
                  textDecoration: "none",
                  background: C.gold,
                  color: C.navy,
                  padding: "14px 24px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                }}
              >
                Ask Us →
              </Link>
            </div>
          </div>

          {/* Gold rule at bottom of hero */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(90deg,transparent,rgba(196,162,72,0.25),transparent)",
            }}
          />
        </section>

        {/* ══ STATS BAR ═════════════════════════════ */}
        <div
          style={{
            background: C.navy,
            borderBottom: "1px solid rgba(196,162,72,0.08)",
            padding: "28px 5%",
          }}
        >
          <div
            className="faq-stats"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1px",
              background: "rgba(196,162,72,0.06)",
            }}
          >
            {[
              { n: "5", s: " categories", l: "Topics Covered" },
              { n: "22", s: "+", l: "Questions Answered" },
              { n: "15", s: " yrs", l: "Industry Experience" },
              { n: "24h", s: "", l: "Response Time" },
            ].map((stat) => (
              <div
                key={stat.l}
                style={{
                  background: "rgba(16,24,40,0.6)",
                  padding: "22px 28px",
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "32px",
                      fontWeight: 700,
                      color: C.stone,
                      lineHeight: 1,
                      marginBottom: "3px",
                    }}
                  >
                    {stat.n}
                    <span style={{ fontSize: "14px", color: C.gold }}>
                      {stat.s}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      color: "rgba(196,162,72,0.4)",
                    }}
                  >
                    {stat.l}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FAQ BODY ══════════════════════════════ */}
        <section style={{ background: C.navyDk, padding: "80px 5% 100px" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "260px 1fr",
              gap: "48px",
              alignItems: "start",
            }}
            className="faq-layout"
          >
            {/* ── Sidebar ── */}
            <div
              className="faq-sidebar"
              style={{
                position: "sticky",
                top: "96px",
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                borderRight: "1px solid rgba(196,162,72,0.08)",
                paddingRight: "32px",
              }}
            >
              <div
                style={{
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "rgba(196,162,72,0.4)",
                  marginBottom: "12px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid rgba(196,162,72,0.08)",
                }}
                className="faq-cat-label"
              >
                Browse Topics
              </div>

              {FAQ_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="faq-cat-btn"
                  style={{
                    background:
                      activeCategory === cat.id
                        ? "rgba(196,162,72,0.1)"
                        : "transparent",
                    border: `1px solid ${activeCategory === cat.id ? "rgba(196,162,72,0.3)" : "transparent"}`,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 14px",
                    textAlign: "left",
                    width: "100%",
                    transition: "all 0.2s",
                    color:
                      activeCategory === cat.id
                        ? C.gold
                        : "rgba(245,240,232,0.45)",
                  }}
                  onMouseEnter={(e) => {
                    if (activeCategory !== cat.id) {
                      e.currentTarget.style.background =
                        "rgba(196,162,72,0.05)";
                      e.currentTarget.style.color = "rgba(245,240,232,0.75)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeCategory !== cat.id) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "rgba(245,240,232,0.45)";
                    }
                  }}
                >
                  <span style={{ flexShrink: 0 }}>{cat.icon}</span>
                  <span style={{ fontSize: "13px", fontWeight: 500 }}>
                    {cat.label}
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "10px",
                      fontWeight: 600,
                      background:
                        activeCategory === cat.id
                          ? "rgba(196,162,72,0.2)"
                          : "rgba(255,255,255,0.05)",
                      color:
                        activeCategory === cat.id
                          ? C.gold
                          : "rgba(245,240,232,0.25)",
                      padding: "2px 7px",
                      borderRadius: "2px",
                    }}
                  >
                    {cat.items.length}
                  </span>
                </button>
              ))}

              {/* Contact card in sidebar */}
              <div
                style={{
                  marginTop: "28px",
                  background: "rgba(196,162,72,0.05)",
                  border: "1px solid rgba(196,162,72,0.15)",
                  padding: "20px 16px",
                }}
                className="faq-contact-card"
              >
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: C.stone,
                    marginBottom: "8px",
                    lineHeight: 1.3,
                  }}
                >
                  Still have questions?
                </div>
                <p
                  style={{
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "rgba(245,240,232,0.4)",
                    lineHeight: 1.7,
                    marginBottom: "14px",
                  }}
                >
                  Our team is ready to help. Reach out for a free consultation.
                </p>
                <Link
                  href="/contact"
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: C.gold,
                    color: C.navy,
                    textDecoration: "none",
                    padding: "10px 14px",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                    marginBottom: "10px",
                  }}
                >
                  Get in Touch
                </Link>
                <a
                  href="tel:+270736101014"
                  style={{
                    display: "block",
                    textAlign: "center",
                    textDecoration: "none",
                    fontSize: "12px",
                    fontWeight: 500,
                    color: "rgba(196,162,72,0.6)",
                    padding: "8px 0",
                  }}
                >
                  073 610 1014
                </a>
              </div>
            </div>

            {/* ── Accordion Panel ── */}
            <div>
              {/* Category header */}
              <div
                style={{ marginBottom: "32px" }}
                className="rev"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      background: "rgba(196,162,72,0.08)",
                      border: "1px solid rgba(196,162,72,0.22)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: C.gold,
                      flexShrink: 0,
                    }}
                  >
                    {currentCategory.icon}
                  </div>
                  <div>
                    <SectionLabel
                      text={`${currentCategory.items.length} Questions`}
                    />
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(28px,3vw,40px)",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        color: C.stone,
                      }}
                    >
                      {currentCategory.label}
                    </h2>
                  </div>
                </div>
                <div
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(90deg,rgba(196,162,72,0.2),transparent)",
                  }}
                />
              </div>

              {/* Accordion */}
              <div
                style={{
                  border: "1px solid rgba(196,162,72,0.1)",
                  background: "rgba(255,255,255,0.02)",
                }}
              >
                {currentCategory.items.map((item, i) => (
                  <AccordionItem
                    key={item.q}
                    q={item.q}
                    a={item.a}
                    index={i}
                  />
                ))}
              </div>

              {/* Category nav footer */}
              <div
                style={{
                  marginTop: "40px",
                  display: "flex",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                {FAQ_CATEGORIES.filter((c) => c.id !== activeCategory).map(
                  (cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(196,162,72,0.1)",
                        color: "rgba(245,240,232,0.45)",
                        cursor: "pointer",
                        padding: "9px 18px",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.5px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(196,162,72,0.3)";
                        e.currentTarget.style.color = C.stone;
                        e.currentTarget.style.background =
                          "rgba(196,162,72,0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(196,162,72,0.1)";
                        e.currentTarget.style.color = "rgba(245,240,232,0.45)";
                        e.currentTarget.style.background =
                          "rgba(255,255,255,0.03)";
                      }}
                    >
                      <span style={{ color: C.gold, opacity: 0.7 }}>
                        {cat.icon}
                      </span>
                      {cat.label}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ══ CTA ═══════════════════════════════════ */}
        <section
          style={{
            background: C.navy,
            padding: "100px 5%",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            borderTop: "1px solid rgba(196,162,72,0.08)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%,rgba(196,162,72,0.06) 0%,transparent 65%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "200px",
              height: "200px",
              background: "rgba(196,162,72,0.04)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "200px",
              height: "200px",
              background: "rgba(43,91,168,0.05)",
              clipPath: "polygon(0 0,0 100%,100% 100%)",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "600px",
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
                  height: "1px",
                  background: C.gold,
                }}
              />
              Start Your Project
              <span
                style={{
                  display: "block",
                  width: "20px",
                  height: "1px",
                  background: C.gold,
                }}
              />
            </div>

            <h2
              className="rev d1"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px,5vw,58px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.stone,
                marginBottom: "16px",
              }}
            >
              Ready to{" "}
              <em
                style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}
              >
                Build
              </em>
              <br />
              Something Remarkable?
            </h2>

            <p
              className="rev d2"
              style={{
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(245,240,232,0.5)",
                marginBottom: "36px",
              }}
            >
              Contact TtFRECH today for a free, no-obligation consultation and
              quotation. Let&apos;s turn your vision into reality.
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
              <Link
                href="/contact"
                style={{
                  textDecoration: "none",
                  background: C.gold,
                  color: C.navy,
                  padding: "13px 32px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  display: "inline-block",
                }}
              >
                Get a Free Quote
              </Link>
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
                  border: "1.5px solid rgba(245,240,232,0.22)",
                  transition: "border-color .2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(245,240,232,0.55)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(245,240,232,0.22)")
                }
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
