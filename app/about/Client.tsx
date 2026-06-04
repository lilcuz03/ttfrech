"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

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

const STATS = [
  { n: "15+", l: "Years Experience" },
  { n: "320+", l: "Projects Completed" },
  { n: "40+", l: "Team Members" },
  { n: "98%", l: "Client Satisfaction" },
];

const MILESTONES = [
  {
    year: "2010",
    title: "Company Founded",
    desc: "TtFRECH was established with a team of 5 dedicated tradespeople and a clear vision: to build structures South Africans are proud of.",
  },
  {
    year: "2013",
    title: "First Commercial Build",
    desc: "Completed our first major commercial project — a 2 000m² office park in Ballito — on time and under budget.",
  },
  // {
  //   year: "2016",
  //   title: "CIDB Registration",
  //   desc: "Achieved full CIDB registration, formalising our commitment to quality standards and professional construction practice.",
  // },
  {
    year: "2019",
    title: "Team Expansion",
    desc: "Grew to 15+ skilled tradespeople and engineers. Opened a dedicated project management division.",
  },
  {
    year: "2022",
    title: "100+ Active Projects",
    desc: "Reached the milestone of 100 concurrent active projects across Durban and surrounding Areas.",
  },
  {
    year: "2025",
    title: "Formally Registered",
    desc: "Registered as TtFRECH Renovators & Investments (Reg 2025/372920/07) with 320+ completed projects in KZN.",
  },
];

const VALUES = [
  {
    title: "Integrity",
    desc: "We say what we mean and do what we say. Transparent pricing, honest timelines, and no surprises — ever.",
    sym: "◈",
  },
  {
    title: "Craftsmanship",
    desc: "Every nail, every joint, every finish is held to the highest standard. Pride in workmanship is non-negotiable.",
    sym: "✦",
  },
  {
    title: "Reliability",
    desc: "Deadlines exist to be met. We plan meticulously, communicate proactively, and deliver on our commitments.",
    sym: "◉",
  },
  {
    title: "Innovation",
    desc: "We adopt modern building techniques and project management tools to deliver smarter, better builds.",
    sym: "◆",
  },
  {
    title: "Community",
    desc: "We hire locally, invest in skills development, and take genuine pride in uplifting the communities we build in.",
    sym: "❖",
  },
  {
    title: "Sustainability",
    desc: "Responsible sourcing and waste-conscious methods — building not just for today but for future generations.",
    sym: "◇",
  },
];

const TEAM = [
  {
    name: "Tafadzwa Chiripanyanga",
    role: "Founder & CEO",
    bio: "15+ years in construction. Founded TtFRECH with a vision to raise the standard of building in South Africa.",
    initials: "TC",
  },
  {
    name: "Freddy Chiripanyanga",
    role: "Head of Project Management",
    bio: "Certified PM with a decade of experience delivering complex multi-phase residential and commercial builds.",
    initials: "FC",
  },
  {
    name: "Tinotenda ",
    role: "Chief Engineer",
    bio: "Structural engineer with expertise in residential, commercial, and industrial building design and compliance.",
    initials: "TC",
  },
  {
    name: "Zorodzai",
    role: "Client Relations Manager",
    bio: "Ensures every client experiences seamless communication and full satisfaction from quote to final handover.",
    initials: "ZS",
  },
];

const CERTS = [
  {
    sym: "★",
    title: "CIDB Registered",
    desc: "Registered contractor compliant with South African construction industry requirements.",
  },
  {
    sym: "✓",
    title: "NHBRC Enrolled",
    desc: "Enrolled with the National Home Builders Registration Council for residential projects.",
  },
  // {
  //   sym: "◈",
  //   title: "Fully Insured",
  //   desc: "Comprehensive public liability and professional indemnity insurance on all projects.",
  // },
  // {
  //   sym: "◉",
  //   title: "VAT Registered",
  //   desc: "VAT registered entity (Reg 2025/372920/07) providing full tax invoices on all work.",
  // },
];

// ── Shared UI ─────────────────────────────────────
const Label = ({ text }: { text: string }) => (
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

// ══ ABOUT PAGE ════════════════════════════════════
export default function AboutPage() {
  useReveal();
  return (
    <>
      <main>
        {/* ── PAGE HERO ── */}
        <section
          style={{
            minHeight: "60vh",
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
                "linear-gradient(135deg,rgba(16,24,40,.96) 0%,rgba(24,35,56,.72) 55%,rgba(16,24,40,.93) 100%)",
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
              width: "250px",
              height: "250px",
              background: "rgba(196,162,72,.05)",
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
            {/* Breadcrumb */}
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
                About
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
                  Est. 2010 · South Africa
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
                  Built on Trust,
                  <br />
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.gold,
                      fontWeight: 400,
                    }}
                  >
                    Delivered
                  </em>
                  <br />
                  with Excellence.
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
                  For over 15 years, TtFRECH Renovators & Investments has been
                  the trusted building partner for homeowners, developers, and
                  businesses across South Africa.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Btn
                    href="/contact"
                    v="gold"
                  >
                    Start a Project
                  </Btn>
                  <Btn
                    href="/services"
                    v="outline"
                  >
                    Our Services
                  </Btn>
                </div>
              </div>
              {/* Stats */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1px",
                  background: "rgba(196,162,72,.08)",
                  border: "1px solid rgba(196,162,72,.08)",
                }}
              >
                {STATS.map((s) => (
                  <div
                    key={s.n}
                    style={{
                      background: "rgba(255,255,255,.02)",
                      padding: "32px 28px",
                      transition: "background .3s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(196,162,72,.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,.02)")
                    }
                  >
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "46px",
                        fontWeight: 700,
                        color: "#E8DDD0",
                        lineHeight: 1,
                        marginBottom: "5px",
                      }}
                    >
                      {s.n}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(196,162,72,.45)",
                        lineHeight: 1.5,
                      }}
                    >
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── OUR STORY ── */}
        <section style={{ background: C.white, padding: "100px 5%" }}>
          <div
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
            }}
            className="sc"
          >
            <div
              className="rev"
              style={{ position: "relative" }}
            >
              <div
                style={{
                  width: "100%",
                  aspectRatio: "4/5",
                  background: `linear-gradient(160deg,${C.navy} 0%,${C.navyLt} 50%,${C.steel} 100%)`,
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage:
                      "linear-gradient(rgba(196,162,72,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.05) 1px,transparent 1px)",
                    backgroundSize: "56px 56px",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background: C.gold,
                    opacity: 0.2,
                    clipPath: "polygon(100% 0,100% 100%,0 100%)",
                  }}
                />
                <div
                  style={{
                    position: "relative",
                    zIndex: 2,
                    padding: "28px",
                    width: "100%",
                    background:
                      "linear-gradient(to top,rgba(16,24,40,.7) 0%,transparent 100%)",
                    fontFamily: "var(--fd)",
                    fontSize: "24px",
                    fontWeight: 700,
                    lineHeight: 1.4,
                    color: "rgba(255,255,255,.9)",
                  }}
                >
                  &quot;A building is more than walls — it&apos;s someone&apos;s
                  dream made real.&quot;
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "rgba(196,162,72,.7)",
                      marginTop: "8px",
                      fontStyle: "italic",
                      fontFamily: "DM Sans,sans-serif",
                    }}
                  >
                    — Freddy Chiripanyanga, Founder
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  right: "-22px",
                  background: C.gold,
                  padding: "18px 16px",
                  textAlign: "center",
                  width: "100px",
                  border: `3px solid ${C.white}`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--fd)",
                    fontSize: "36px",
                    fontWeight: 700,
                    color: C.navy,
                    lineHeight: 1,
                  }}
                >
                  2010
                </div>
                <div
                  style={{
                    fontSize: "8px",
                    fontWeight: 600,
                    color: C.navy,
                    textTransform: "uppercase",
                    letterSpacing: ".5px",
                    marginTop: "3px",
                    opacity: 0.7,
                  }}
                >
                  Founded
                </div>
              </div>
            </div>

            <div className="rev d1">
              <Label text="Our Story" />
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
                Where It All{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.steel,
                    fontWeight: 400,
                  }}
                >
                  Began
                </em>
              </h2>
              {[
                "TtFRECH Renovators & Investments was founded in 2010 by Tafadzwa , a tradesperson with a simple but powerful belief: South Africans deserve construction services built on honesty, quality, and genuine care.",
                "Starting with a small team of five in KZN, we earned our reputation the hard way — one project at a time, never cutting corners, always delivering what we promised. Word spread, and so did we.",
                "Today, with 20+ team members, CIDB registration, and over 320 completed projects across South Africa, we remain guided by the same values that got us here: integrity, craftsmanship, and an unwavering commitment to our clients.",
              ].map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "15px",
                    fontWeight: 300,
                    lineHeight: 1.85,
                    color: C.muted,
                    marginBottom: "18px",
                  }}
                >
                  {p}
                </p>
              ))}
              <div style={{ marginTop: "12px" }}>
                <Btn
                  href="/contact"
                  v="gold"
                >
                  Work With Us
                </Btn>
              </div>
            </div>
          </div>
        </section>

        {/* ── MILESTONES / TIMELINE ── */}
        <section style={{ background: C.navy, padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                textAlign: "center",
                maxWidth: "560px",
                margin: "0 auto 64px",
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
                Our Journey
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
                15 Years of{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.gold,
                    fontWeight: 400,
                  }}
                >
                  Milestones
                </em>
              </h2>
            </div>

            <div
              style={{
                position: "relative",
                maxWidth: "900px",
                margin: "0 auto",
              }}
            >
              {/* Centre line */}
              <div
                className="tl"
                style={{
                  position: "absolute",
                  left: "50%",
                  top: 0,
                  bottom: 0,
                  width: "1px",
                  background: "rgba(196,162,72,.15)",
                  transform: "translateX(-50%)",
                }}
              />

              {MILESTONES.map((m, i) => (
                <div
                  key={m.year}
                  className={`ml-row rev d${(i % 3) + 1}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "48px",
                    marginBottom: "48px",
                    alignItems: "center",
                  }}
                >
                  {i % 2 === 0 ? (
                    <>
                      <div style={{ textAlign: "right", paddingRight: "36px" }}>
                        <div
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "50px",
                            fontWeight: 700,
                            color: "rgba(196,162,72,.1)",
                            lineHeight: 1,
                            marginBottom: "2px",
                          }}
                        >
                          {m.year}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: C.stone,
                            marginBottom: "8px",
                          }}
                        >
                          {m.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 300,
                            lineHeight: 1.75,
                            color: "rgba(245,240,232,.45)",
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            left: "-8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: C.gold,
                            border: `3px solid ${C.navy}`,
                            boxShadow: "0 0 0 4px rgba(196,162,72,.15)",
                          }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            right: "-8px",
                            top: "50%",
                            transform: "translateY(-50%)",
                            width: "16px",
                            height: "16px",
                            borderRadius: "50%",
                            background: C.gold,
                            border: `3px solid ${C.navy}`,
                            boxShadow: "0 0 0 4px rgba(196,162,72,.15)",
                          }}
                        />
                      </div>
                      <div style={{ paddingLeft: "36px" }}>
                        <div
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "50px",
                            fontWeight: 700,
                            color: "rgba(196,162,72,.1)",
                            lineHeight: 1,
                            marginBottom: "2px",
                          }}
                        >
                          {m.year}
                        </div>
                        <h3
                          style={{
                            fontFamily: "var(--fd)",
                            fontSize: "20px",
                            fontWeight: 600,
                            color: C.stone,
                            marginBottom: "8px",
                          }}
                        >
                          {m.title}
                        </h3>
                        <p
                          style={{
                            fontSize: "13px",
                            fontWeight: 300,
                            lineHeight: 1.75,
                            color: "rgba(245,240,232,.45)",
                          }}
                        >
                          {m.desc}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section style={{ background: C.stone, padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                textAlign: "center",
                maxWidth: "540px",
                margin: "0 auto 52px",
              }}
            >
              <div className="rev">
                <Label text="What We Stand For" />
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
                Our Core{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.steel,
                    fontWeight: 400,
                  }}
                >
                  Values
                </em>
              </h2>
            </div>
            <div
              className="vc"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: "20px",
              }}
            >
              {VALUES.map((v, i) => (
                <div
                  key={v.title}
                  className={`val-card rev d${(i % 3) + 1}`}
                  style={{
                    background: C.white,
                    padding: "36px 30px",
                    borderBottom: "3px solid transparent",
                    transition: "border-color .3s,transform .3s",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "32px",
                      color: C.gold,
                      marginBottom: "16px",
                      lineHeight: 1,
                    }}
                  >
                    {v.sym}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: C.navy,
                      marginBottom: "10px",
                    }}
                  >
                    {v.title}
                  </h3>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: C.muted,
                    }}
                  >
                    {v.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TEAM ── */}
        <section style={{ background: C.white, padding: "100px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "52px",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <div className="rev">
                  <Label text="The People Behind The Work" />
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
                  Meet Our{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.steel,
                      fontWeight: 400,
                    }}
                  >
                    Leadership
                  </em>
                </h2>
              </div>
              <Btn
                href="/contact"
                v="ol-dark"
              >
                Join Our Team
              </Btn>
            </div>
            <div
              className="tc"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "24px",
              }}
            >
              {TEAM.map((m, i) => (
                <div
                  key={m.name}
                  className={`rev d${(i % 3) + 1}`}
                >
                  <div
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      background: `linear-gradient(135deg,${C.navy} 0%,${C.navyLt} 50%,${C.steel} 100%)`,
                      position: "relative",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "18px",
                    }}
                  >
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "repeating-linear-gradient(-45deg,transparent,transparent 14px,rgba(255,255,255,.025) 14px,rgba(255,255,255,.025) 28px)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        right: 0,
                        width: "55px",
                        height: "55px",
                        background: C.gold,
                        opacity: 0.22,
                        clipPath: "polygon(100% 0,100% 100%,0 100%)",
                      }}
                    />
                    <div
                      style={{
                        fontFamily: "var(--fd)",
                        fontSize: "48px",
                        fontWeight: 700,
                        color: "rgba(245,240,232,.6)",
                        position: "relative",
                        zIndex: 1,
                      }}
                    >
                      {m.initials}
                    </div>
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: C.navy,
                      marginBottom: "3px",
                    }}
                  >
                    {m.name}
                  </h3>
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      color: C.gold,
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: "10px",
                    }}
                  >
                    {m.role}
                  </div>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: C.muted,
                    }}
                  >
                    {m.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CERTIFICATIONS ── */}
        <section style={{ background: C.navyDk, padding: "80px 5%" }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <div className="rev">
                <Label text="Credentials & Compliance" />
              </div>
              <h2
                className="rev d1"
                style={{
                  fontFamily: "var(--fd)",
                  fontSize: "clamp(28px,3.5vw,44px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.stone,
                }}
              >
                Registered, Certified &{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.gold,
                    fontWeight: 400,
                  }}
                >
                  Compliant
                </em>
              </h2>
            </div>
            <div
              className="cc"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "1px",
                background: "rgba(196,162,72,.07)",
                border: "1px solid rgba(196,162,72,.07)",
              }}
            >
              {CERTS.map((c, i) => (
                <div
                  key={c.title}
                  className={`cert-card rev d${(i % 3) + 1}`}
                  style={{
                    background: "rgba(255,255,255,.02)",
                    padding: "40px 28px",
                    transition: "background .3s",
                    cursor: "default",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "34px",
                      color: C.gold,
                      marginBottom: "14px",
                      lineHeight: 1,
                    }}
                  >
                    {c.sym}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--fd)",
                      fontSize: "20px",
                      fontWeight: 600,
                      color: C.stone,
                      marginBottom: "10px",
                    }}
                  >
                    {c.title}
                  </h4>
                  <p
                    style={{
                      fontSize: "13px",
                      fontWeight: 300,
                      lineHeight: 1.75,
                      color: "rgba(245,240,232,.4)",
                    }}
                  >
                    {c.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section
          style={{
            background: C.stone,
            padding: "100px 5%",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "620px", margin: "0 auto" }}>
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
              Let&apos;s Build Together
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
                fontSize: "clamp(32px,4.5vw,54px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.navy,
                marginBottom: "18px",
              }}
            >
              Your Project Starts
              <br />
              <em
                style={{ fontStyle: "italic", color: C.steel, fontWeight: 400 }}
              >
                With a Conversation
              </em>
            </h2>
            <p
              className="rev d2"
              style={{
                fontSize: "16px",
                fontWeight: 300,
                lineHeight: 1.8,
                color: C.muted,
                marginBottom: "36px",
              }}
            >
              Whether you&apos;re planning a new home, a commercial development,
              or a full renovation — we&apos;d love to hear about it. Get in
              touch for a free, no-obligation consultation.
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
              <Btn
                href="/services"
                v="ol-dark"
              >
                View Services
              </Btn>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
