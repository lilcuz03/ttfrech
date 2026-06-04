"use client";

import Head from "next/head";
import Link from "next/link";
import { useState, useCallback, memo, type FC, useEffect } from "react";

// ─── Design tokens ──────────────────────────────────────────────────────────
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
} as const;

// ─── Data ────────────────────────────────────────────────────────────────────
type Review = {
  name: string;
  initials: string;
  role: string;
  location: string;
  service: string;
  rating: number;
  date: string;
  text: string;
  featured?: boolean;
};

const REVIEWS: Review[] = [
  {
    name: "Nompumelelo Mthembu",
    initials: "NM",
    role: "Homeowner",
    location: "Tongaat",
    service: "Residential Construction",
    rating: 5,
    date: "March 2025",
    featured: true,
    text: "TtFRECH built our family home from the ground up. From the very first meeting, Freddy and his team were professional, transparent about costs, and communicative throughout. They finished two weeks ahead of schedule and the quality of the finish absolutely exceeded our expectations. I wouldn't hesitate to recommend them to anyone.",
  },
  {
    name: "Ruan Steyn",
    initials: "RS",
    role: "Business Owner",
    location: "Ballito",
    service: "Commercial Builds",
    rating: 5,
    date: "January 2025",
    featured: true,
    text: "We contracted TtFRECH for a full office fit-out across two floors. Professional from the very first quote to final handover. Transparent pricing, excellent communication, and top-notch craftsmanship throughout. Our team loves the new space. We've already referred three other businesses to TtFRECH.",
  },
  {
    name: "Liezel Botha",
    initials: "LB",
    role: "Homeowner",
    location: "Westbrook",
    service: "Renovations & Upgrades",
    rating: 5,
    date: "November 2024",
    featured: true,
    text: "After very bad experiences with other builders, TtFRECH truly restored our faith. They renovated our entire property — kitchen, bathrooms, and an extension. They kept us updated daily with photos and the result is absolutely stunning. Well worth every rand.",
  },
  {
    name: "Sipho Ndlovu",
    initials: "SN",
    role: "Property Developer",
    location: "Stanger",
    service: "Project Management",
    rating: 5,
    date: "October 2024",
    text: "I've used TtFRECH on three separate commercial developments now. Their project management is second to none — always on budget, always on time. Zanele's team is incredibly organised and the reporting is thorough. They are my first call for every new project.",
  },
  {
    name: "Amanda van der Berg",
    initials: "AV",
    role: "Homeowner",
    location: "Palm Lakes",
    service: "Roofing & Waterproofing",
    rating: 5,
    date: "September 2024",
    text: "Had a major roof leak that two other companies couldn't fix permanently. TtFRECH identified the root cause within an hour of arriving, gave me a detailed quote, and had it fully resolved within two days. No more leaks three months on. Excellent service.",
  },
  {
    name: "Kagiso Sithole",
    initials: "KS",
    role: "Facilities Manager",
    location: "Ballito",
    service: "Site Inspections",
    rating: 5,
    date: "August 2024",
    text: "TtFRECH completed a full structural inspection of our commercial premises. The report was detailed, clearly written, and delivered on time. Their inspector was knowledgeable and flagged issues our own team hadn't spotted. Invaluable for our compliance records.",
  },
  {
    name: "Mariana Cronje",
    initials: "MC",
    role: "Homeowner",
    location: "Umhlanga",
    service: "Residential Construction",
    rating: 5,
    date: "July 2024",
    text: "Building a new home is stressful — TtFRECH made it as smooth as possible. They assigned us a dedicated project manager who was always reachable. Every milestone was met and the build quality is exceptional. Our neighbours keep asking who built our house!",
  },
  {
    name: "David Patel",
    initials: "DP",
    role: "Restaurant Owner",
    location: "Durban",
    service: "Commercial Builds",
    rating: 5,
    date: "May 2024",
    text: "TtFRECH fitted out our new restaurant from scratch. They understood the brief immediately, worked around our tight timeline, and the result is a beautiful, functional space. They also managed all the compliance inspections. Highly recommended for any hospitality project.",
  },
  {
    name: "Thandi Mokoena",
    initials: "TM",
    role: "Homeowner",
    location: "Soweto",
    service: "Renovations & Upgrades",
    rating: 5,
    date: "April 2024",
    text: "I had my entire kitchen and two bathrooms renovated. The team was punctual, respectful of my home, and cleaned up every day before leaving. The quality of the tiling and finishing is beautiful. TtFRECH delivered exactly what was promised at the agreed price.",
  },
];

const SERVICES_FILTER = [
  "All",
  "Residential Construction",
  "Commercial Builds",
  "Renovations & Upgrades",
  "Roofing & Waterproofing",
  "Project Management",
  "Site Inspections",
] as const;

const STATS = [
  { n: "320+", l: "Happy Clients" },
  { n: "98%", l: "Satisfaction Rate" },
  { n: "5★", l: "Average Rating" },
  { n: "15+", l: "Years Trusted" },
] as const;

// ─── JSON-LD structured data (Google Rich Results) ───────────────────────────
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": "https://www.ttfrech.co.za/#organization",
      name: "TtFRECH Renovators & Investments",
      url: "https://www.ttfrech.co.za",
      telephone: "+27073610101",
      email: "contact@ttfrech.co.za",
      address: {
        "@type": "PostalAddress",
        addressCountry: "ZA",
        addressRegion: "KwaZulu-Natal",
      },
      description:
        "TtFRECH Renovators & Investments – professional residential construction, commercial builds, renovations, roofing, waterproofing, project management and site inspections across South Africa.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: String(REVIEWS.length),
        bestRating: "5",
        worstRating: "1",
      },
    },
    ...REVIEWS.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      datePublished: r.date,
      reviewBody: r.text,
      reviewRating: {
        "@type": "Rating",
        ratingValue: String(r.rating),
        bestRating: "5",
        worstRating: "1",
      },
      itemReviewed: { "@id": "https://www.ttfrech.co.za/#organization" },
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.ttfrech.co.za",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Reviews",
          item: "https://www.ttfrech.co.za/reviews",
        },
      ],
    },
  ],
};

// ─── Reveal hook (IntersectionObserver, stable across renders) ───────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".rev");
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
            io.unobserve(e.target); // fire once then stop watching
          }
        }),
      { threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ─── Tiny shared components (memo to skip unnecessary re-renders) ────────────
const Stars: FC<{ n: number }> = memo(({ n }) => (
  <div
    style={{ display: "flex", gap: "2px" }}
    role="img"
    aria-label={`${n} out of 5 stars`}
  >
    {[1, 2, 3, 4, 5].map((i) => (
      <svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={i <= n ? C.gold : "rgba(196,162,72,0.2)"}
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
));
Stars.displayName = "Stars";

const Label: FC<{ text: string }> = memo(({ text }) => (
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
    aria-hidden="true"
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
));
Label.displayName = "Label";

// ─── Featured card ───────────────────────────────────────────────────────────
const FeaturedCard: FC<{ r: Review; delay: number }> = memo(({ r, delay }) => (
  <article
    className={`rev d${delay}`}
    style={{
      background: C.cream,
      border: `1px solid ${C.stoneDk}`,
      borderTop: `3px solid ${C.gold}`,
      padding: "36px 30px",
      position: "relative",
    }}
    itemScope
    itemType="https://schema.org/Review"
  >
    <meta
      itemProp="datePublished"
      content={r.date}
    />
    <div
      itemProp="reviewRating"
      itemScope
      itemType="https://schema.org/Rating"
    >
      <meta
        itemProp="ratingValue"
        content={String(r.rating)}
      />
      <meta
        itemProp="bestRating"
        content="5"
      />
    </div>
    <span
      style={{
        position: "absolute",
        top: "-1px",
        right: "24px",
        background: C.gold,
        padding: "4px 12px",
        fontSize: "9px",
        fontWeight: 600,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: C.navy,
      }}
      aria-label="Featured review"
    >
      Featured
    </span>
    <div
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: "56px",
        lineHeight: 0.6,
        color: C.gold,
        marginBottom: "16px",
      }}
      aria-hidden="true"
    >
      &ldquo;
    </div>
    <blockquote
      style={{
        fontSize: "15px",
        fontWeight: 300,
        lineHeight: 1.85,
        color: "#374151",
        fontStyle: "italic",
        marginBottom: "28px",
        margin: "0 0 28px 0",
      }}
      itemProp="reviewBody"
    >
      {r.text}
    </blockquote>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        paddingTop: "20px",
        borderTop: `1px solid ${C.stoneDk}`,
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "46px",
          height: "46px",
          borderRadius: "50%",
          background: C.navy,
          border: `2px solid rgba(196,162,72,.4)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "17px",
          fontWeight: 700,
          color: C.stone,
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {r.initials}
      </div>
      <div style={{ flex: 1, minWidth: "120px" }}>
        <Stars n={r.rating} />
        <div
          style={{
            fontSize: "14px",
            fontWeight: 600,
            color: C.navy,
            marginTop: "3px",
          }}
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <span itemProp="name">{r.name}</span>
        </div>
        <div style={{ fontSize: "12px", color: C.muted }}>
          {r.role} · {r.location}
        </div>
      </div>
      <div
        style={{
          fontSize: "10px",
          fontWeight: 500,
          color: C.gold,
          background: "rgba(196,162,72,.08)",
          border: "1px solid rgba(196,162,72,.2)",
          padding: "4px 10px",
          letterSpacing: "0.5px",
          lineHeight: 1.4,
        }}
      >
        {r.service}
      </div>
    </div>
  </article>
));
FeaturedCard.displayName = "FeaturedCard";

// ─── Review card (filterable grid) ──────────────────────────────────────────
const ReviewCard: FC<{
  r: Review;
  delay: number;
  expanded: boolean;
  onToggle: (name: string) => void;
}> = memo(({ r, delay, expanded, onToggle }) => {
  const CLAMP_THRESHOLD = 220;
  const needsClamp = r.text.length > CLAMP_THRESHOLD;

  return (
    <article
      className={`rev-card rev d${delay}`}
      style={{
        background: C.white,
        border: `1px solid ${C.stoneDk}`,
        padding: "28px 24px",
        transition: "border-color .25s, box-shadow .25s",
      }}
      itemScope
      itemType="https://schema.org/Review"
    >
      <meta
        itemProp="datePublished"
        content={r.date}
      />
      <div
        itemProp="reviewRating"
        itemScope
        itemType="https://schema.org/Rating"
      >
        <meta
          itemProp="ratingValue"
          content={String(r.rating)}
        />
        <meta
          itemProp="bestRating"
          content="5"
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <Stars n={r.rating} />
        <time
          style={{ fontSize: "10px", color: C.muted }}
          dateTime={r.date}
        >
          {r.date}
        </time>
      </div>
      <div
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "40px",
          lineHeight: 0.6,
          color: "rgba(196,162,72,.3)",
          marginBottom: "10px",
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>
      <p
        style={{
          fontSize: "14px",
          fontWeight: 300,
          lineHeight: 1.8,
          color: "#4B5563",
          marginBottom: "16px",
          display: "-webkit-box",
          WebkitLineClamp: expanded ? undefined : 4,
          WebkitBoxOrient: "vertical",
          overflow: expanded ? "visible" : "hidden",
        }}
        itemProp="reviewBody"
      >
        {r.text}
      </p>
      {needsClamp && (
        <button
          onClick={() => onToggle(r.name)}
          aria-expanded={expanded}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "12px",
            color: C.gold,
            fontWeight: 500,
            padding: 0,
            marginBottom: "16px",
            letterSpacing: "0.5px",
          }}
        >
          {expanded ? "Show less ↑" : "Read more ↓"}
        </button>
      )}
      <div
        style={{
          paddingTop: "16px",
          borderTop: `1px solid ${C.stoneDk}`,
          display: "flex",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: C.navy,
            border: `2px solid rgba(196,162,72,.3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "15px",
            fontWeight: 700,
            color: C.stone,
            flexShrink: 0,
          }}
          aria-hidden="true"
        >
          {r.initials}
        </div>
        <div
          style={{ flex: 1, minWidth: "100px" }}
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <div
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: C.navy,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <span itemProp="name">{r.name}</span>
          </div>
          <div style={{ fontSize: "11px", color: C.muted }}>
            {r.role} · {r.location}
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: "12px",
          fontSize: "10px",
          fontWeight: 500,
          color: C.gold,
          letterSpacing: "0.5px",
          background: "rgba(196,162,72,.06)",
          border: "1px solid rgba(196,162,72,.15)",
          padding: "4px 10px",
          display: "inline-block",
        }}
      >
        {r.service}
      </div>
    </article>
  );
});
ReviewCard.displayName = "ReviewCard";

// ─── Filter button ────────────────────────────────────────────────────────────
const FilterBtn: FC<{
  label: string;
  active: boolean;
  count?: number;
  onClick: () => void;
}> = memo(({ label, active, count, onClick }) => (
  <button
    onClick={onClick}
    aria-pressed={active}
    style={{
      background: active ? C.navy : "transparent",
      color: active ? C.stone : C.muted,
      border: active ? `1.5px solid ${C.navy}` : `1.5px solid ${C.stoneDk}`,
      padding: "8px 18px",
      fontSize: "12px",
      fontWeight: active ? 500 : 400,
      letterSpacing: "0.5px",
      cursor: "pointer",
      transition: "all .2s",
      whiteSpace: "nowrap",
    }}
  >
    {label}
    {count !== undefined && (
      <span
        style={{
          marginLeft: "6px",
          fontSize: "11px",
          color: active ? "rgba(245,240,232,.6)" : C.gold,
        }}
      >
        ({count})
      </span>
    )}
  </button>
));
FilterBtn.displayName = "FilterBtn";

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TestimonialsPage() {
  useReveal();

  const [filter, setFilter] = useState<string>("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = useCallback(
    (name: string) => setExpanded((prev) => (prev === name ? null : name)),
    [],
  );

  const filtered =
    filter === "All" ? REVIEWS : REVIEWS.filter((r) => r.service === filter);
  const featured = REVIEWS.filter((r) => r.featured);

  // Derive: if the expanded card isn't visible under the current filter, treat as null.
  // No effect or ref needed — pure derived state.
  const activeExpanded = filtered.some((r) => r.name === expanded)
    ? expanded
    : null;

  return (
    <>
      {/* ── SEO HEAD (Pages Router) ── */}
      <Head>
        {/* Primary */}
        <title>
          Client Reviews & Testimonials | TtFRECH Renovators & Investments
        </title>
        <meta
          name="description"
          content="Read verified client reviews for TtFRECH Renovators & Investments. 320+ happy clients across South Africa rate us 5 stars for residential construction, commercial builds, renovations, roofing, and more."
        />
        <meta
          name="robots"
          content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
        />
        <link
          rel="canonical"
          href="https://www.ttfrech.co.za/reviews"
        />

        {/* Open Graph */}
        <meta
          property="og:type"
          content="website"
        />
        <meta
          property="og:site_name"
          content="TtFRECH Renovators & Investments"
        />
        <meta
          property="og:title"
          content="Client Reviews & Testimonials | TtFRECH"
        />
        <meta
          property="og:description"
          content="320+ verified 5-star reviews from homeowners, property developers, and business owners across South Africa who have built and renovated with TtFRECH."
        />
        <meta
          property="og:url"
          content="https://www.ttfrech.co.za/reviews"
        />
        <meta
          property="og:locale"
          content="en_ZA"
        />
        {/* Replace with actual OG image */}
        <meta
          property="og:image"
          content="https://www.ttfrech.co.za/og-reviews.jpg"
        />
        <meta
          property="og:image:width"
          content="1200"
        />
        <meta
          property="og:image:height"
          content="630"
        />
        <meta
          property="og:image:alt"
          content="TtFRECH client reviews – 5 stars"
        />

        {/* Twitter / X */}
        <meta
          name="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:title"
          content="Client Reviews | TtFRECH Renovators & Investments"
        />
        <meta
          name="twitter:description"
          content="320+ verified 5-star reviews from South African homeowners and businesses who built with TtFRECH."
        />
        <meta
          name="twitter:image"
          content="https://www.ttfrech.co.za/og-reviews.jpg"
        />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        {/* Global page styles (scoped to this mount via class) */}
        <style>{`
          /* ── Reveal animation ── */
          .rev { opacity: 0; transform: translateY(22px); transition: opacity .55s ease, transform .55s ease; }
          .rev.in { opacity: 1; transform: translateY(0); }
          .rev.d1.in { transition-delay: .05s; }
          .rev.d2.in { transition-delay: .13s; }
          .rev.d3.in { transition-delay: .21s; }

          /* ── Review card hover ── */
          .rev-card:hover {
            border-color: rgba(196,162,72,.45) !important;
            box-shadow: 0 6px 24px rgba(24,35,56,.07);
          }

          /* ── Responsive grid helpers ── */
          .hero-cols { grid-template-columns: 1fr 1fr; }
          .featured-grid { grid-template-columns: repeat(3, 1fr); }
          .reviews-grid { grid-template-columns: repeat(3, 1fr); }
          .stats-bar { grid-template-columns: repeat(4, 1fr); }

          @media (max-width: 1024px) {
            .featured-grid { grid-template-columns: repeat(2, 1fr) !important; }
            .reviews-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }

          @media (max-width: 768px) {
            .hero-cols { grid-template-columns: 1fr !important; gap: 32px !important; }
            .featured-grid { grid-template-columns: 1fr !important; }
            .reviews-grid { grid-template-columns: 1fr !important; }
            .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
          }

          @media (max-width: 480px) {
            .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
            .filter-bar { gap: 6px !important; }
          }

          /* ── Reduce motion ── */
          @media (prefers-reduced-motion: reduce) {
            .rev { opacity: 1 !important; transform: none !important; transition: none !important; }
            .rev-card { transition: none !important; }
          }
        `}</style>
      </Head>

      <main id="main-content">
        {/* ── HERO ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          style={{
            minHeight: "52vh",
            background: C.navyDk,
            position: "relative",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
            paddingTop: "72px",
          }}
        >
          {/* Decorative BG layers (aria-hidden) */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(135deg,rgba(16,24,40,.96) 0%,rgba(24,35,56,.7) 55%,rgba(16,24,40,.93) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: "260px",
              height: "260px",
              background: "rgba(196,162,72,.05)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />
          <div
            aria-hidden="true"
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
            <nav
              aria-label="Breadcrumb"
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
              <span
                aria-hidden="true"
                style={{ color: "rgba(196,162,72,.3)", fontSize: "12px" }}
              >
                ›
              </span>
              <span
                aria-current="page"
                style={{ fontSize: "12px", color: "rgba(196,162,72,.7)" }}
              >
                Reviews
              </span>
            </nav>

            <div
              className="hero-cols"
              style={{ display: "grid", gap: "60px", alignItems: "center" }}
            >
              <div>
                <div
                  aria-hidden="true"
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
                  {REVIEWS.length} Verified Reviews
                </div>
                <h1
                  id="hero-heading"
                  style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: "clamp(36px,5.5vw,66px)",
                    fontWeight: 700,
                    lineHeight: 1.05,
                    color: C.stone,
                    marginBottom: "20px",
                  }}
                >
                  Real Words From{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.gold,
                      fontWeight: 400,
                    }}
                  >
                    Real Clients.
                  </em>
                </h1>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: 300,
                    lineHeight: 1.8,
                    color: "rgba(245,240,232,.55)",
                    maxWidth: "440px",
                    marginBottom: "36px",
                  }}
                >
                  Don&apos;t take our word for it. Read what our clients across
                  South Africa say about their experience building and
                  renovating with TtFRECH.
                </p>
                <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                  <Link
                    href="/contact"
                    style={{
                      display: "inline-block",
                      textDecoration: "none",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      padding: "13px 32px",
                      background: C.gold,
                      color: C.navy,
                      border: `1.5px solid ${C.gold}`,
                    }}
                  >
                    Start Your Project
                  </Link>
                  <Link
                    href="/services"
                    style={{
                      display: "inline-block",
                      textDecoration: "none",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "1.5px",
                      textTransform: "uppercase",
                      padding: "13px 32px",
                      background: "transparent",
                      color: C.stone,
                      border: "1.5px solid rgba(245,240,232,0.25)",
                    }}
                  >
                    Our Services
                  </Link>
                </div>
              </div>

              {/* Aggregate rating panel */}
              <div
                aria-label="Overall rating summary"
                style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(196,162,72,.12)",
                  padding: "36px 32px",
                }}
                itemScope
                itemType="https://schema.org/AggregateRating"
              >
                <meta
                  itemProp="ratingValue"
                  content="5.0"
                />
                <meta
                  itemProp="reviewCount"
                  content={String(REVIEWS.length)}
                />
                <div
                  style={{
                    textAlign: "center",
                    marginBottom: "28px",
                    paddingBottom: "28px",
                    borderBottom: "1px solid rgba(196,162,72,.1)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Georgia,'Times New Roman',serif",
                      fontSize: "80px",
                      fontWeight: 700,
                      color: C.stone,
                      lineHeight: 1,
                      marginBottom: "8px",
                    }}
                  >
                    5.0
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "4px",
                      marginBottom: "8px",
                    }}
                    role="img"
                    aria-label="5 out of 5 stars"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill={C.gold}
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <div
                    style={{ fontSize: "13px", color: "rgba(196,162,72,.55)" }}
                  >
                    Average across {REVIEWS.length} reviews
                  </div>
                </div>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = REVIEWS.filter((r) => r.rating === star).length;
                  const pct = Math.round((count / REVIEWS.length) * 100);
                  return (
                    <div
                      key={star}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "10px",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(245,240,232,.5)",
                          width: "8px",
                        }}
                      >
                        {star}
                      </span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill={C.gold}
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <div
                        style={{
                          flex: 1,
                          height: "4px",
                          background: "rgba(196,162,72,.12)",
                          borderRadius: "2px",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: C.gold,
                            borderRadius: "2px",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          fontSize: "12px",
                          color: "rgba(196,162,72,.55)",
                          width: "28px",
                          textAlign: "right",
                        }}
                      >
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ──────────────────────────────────────────────── */}
        <div
          role="region"
          aria-label="Key statistics"
          style={{
            background: C.navy,
            borderBottom: `1px solid rgba(196,162,72,.1)`,
          }}
        >
          <div
            className="stats-bar"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              padding: "0 5%",
              display: "grid",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.n}
                style={{
                  padding: "28px 24px",
                  textAlign: "center",
                  borderRight:
                    i < 3 ? `1px solid rgba(196,162,72,.08)` : "none",
                }}
              >
                <div
                  style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: "clamp(32px,4vw,42px)",
                    fontWeight: 700,
                    color: C.stone,
                    lineHeight: 1,
                    marginBottom: "4px",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(196,162,72,.5)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURED REVIEWS ───────────────────────────────────────── */}
        <section
          aria-labelledby="featured-heading"
          style={{ background: C.white, padding: "clamp(60px,8vw,100px) 5%" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div style={{ marginBottom: "52px" }}>
              <div className="rev">
                <Label text="Featured Reviews" />
              </div>
              <h2
                id="featured-heading"
                className="rev d1"
                style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: "clamp(28px,4vw,48px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.navy,
                }}
              >
                Client Stories That{" "}
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.steel,
                    fontWeight: 400,
                  }}
                >
                  Speak for Themselves
                </em>
              </h2>
            </div>
            <div
              className="featured-grid"
              style={{ display: "grid", gap: "24px" }}
            >
              {featured.map((r, i) => (
                <FeaturedCard
                  key={r.name}
                  r={r}
                  delay={i + 1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── ALL REVIEWS + FILTER ────────────────────────────────────── */}
        <section
          aria-labelledby="all-reviews-heading"
          style={{ background: C.stone, padding: "clamp(60px,8vw,100px) 5%" }}
        >
          <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "40px",
                flexWrap: "wrap",
                gap: "20px",
              }}
            >
              <div>
                <div className="rev">
                  <Label text="All Reviews" />
                </div>
                <h2
                  id="all-reviews-heading"
                  className="rev d1"
                  style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: "clamp(26px,3.5vw,44px)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    color: C.navy,
                  }}
                >
                  Browse by{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: C.steel,
                      fontWeight: 400,
                    }}
                  >
                    Service
                  </em>
                </h2>
              </div>
              <p style={{ fontSize: "13px", color: C.muted }}>
                Showing{" "}
                <strong style={{ color: C.navy }}>{filtered.length}</strong> of{" "}
                {REVIEWS.length} reviews
              </p>
            </div>

            {/* Filter */}
            <div
              role="group"
              aria-label="Filter reviews by service"
              className="filter-bar"
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "40px",
                flexWrap: "wrap",
              }}
            >
              {SERVICES_FILTER.map((f) => (
                <FilterBtn
                  key={f}
                  label={f}
                  active={filter === f}
                  count={f === "All" ? REVIEWS.length : undefined}
                  onClick={() => setFilter(f)}
                />
              ))}
            </div>

            {/* Grid */}
            <div
              className="reviews-grid"
              style={{ display: "grid", gap: "20px" }}
            >
              {filtered.map((r, i) => (
                <ReviewCard
                  key={r.name}
                  r={r}
                  delay={(i % 3) + 1}
                  expanded={activeExpanded === r.name}
                  onToggle={handleToggle}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  padding: "60px 20px",
                  color: C.muted,
                }}
              >
                <p
                  style={{
                    fontFamily: "Georgia,'Times New Roman',serif",
                    fontSize: "24px",
                    color: C.navy,
                    marginBottom: "8px",
                  }}
                >
                  No reviews found
                </p>
                <p style={{ fontSize: "14px" }}>
                  Try selecting a different service filter above.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ── LEAVE A REVIEW CTA ─────────────────────────────────────── */}
        <section
          aria-labelledby="review-cta-heading"
          style={{ background: C.navy, padding: "clamp(56px,7vw,80px) 5%" }}
        >
          <div
            className="hero-cols"
            style={{
              maxWidth: "1200px",
              margin: "0 auto",
              display: "grid",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div className="rev">
              <Label text="Share Your Experience" />
              <h2
                id="review-cta-heading"
                style={{
                  fontFamily: "Georgia,'Times New Roman',serif",
                  fontSize: "clamp(26px,3.5vw,44px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  color: C.stone,
                  marginBottom: "16px",
                }}
              >
                Had a Great Experience
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: C.gold,
                    fontWeight: 400,
                  }}
                >
                  With TtFRECH?
                </em>
              </h2>
              <p
                style={{
                  fontSize: "15px",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "rgba(245,240,232,.5)",
                  marginBottom: "28px",
                }}
              >
                We&apos;d love to hear from you. Your feedback helps other South
                Africans make confident decisions about their building projects.
              </p>
              <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
                <a
                  href="mailto:contact@ttfrech.co.za?subject=Review%20for%20TtFRECH"
                  style={{
                    display: "inline-block",
                    textDecoration: "none",
                    background: C.gold,
                    color: C.navy,
                    padding: "13px 32px",
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Submit a Review
                </a>
                <a
                  href="https://www.google.com/maps"
                  target="_blank"
                  rel="noopener noreferrer"
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
                  Google Review
                </a>
              </div>
            </div>

            <div
              className="rev d1"
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {[
                {
                  sym: "★",
                  t: "98% Satisfaction Rate",
                  d: "Based on all completed projects across residential and commercial builds.",
                },
                {
                  sym: "◈",
                  t: "Workmanship Guarantee",
                  d: "Every project comes with a written workmanship guarantee — your peace of mind matters.",
                },
                {
                  sym: "✓",
                  t: "CIDB Registered",
                  d: "Fully registered and compliant with South African construction industry standards.",
                },
              ].map((item) => (
                <div
                  key={item.t}
                  style={{
                    display: "flex",
                    gap: "16px",
                    padding: "20px",
                    background: "rgba(255,255,255,.04)",
                    border: "1px solid rgba(196,162,72,.1)",
                  }}
                >
                  <div
                    aria-hidden="true"
                    style={{
                      fontFamily: "Georgia,'Times New Roman',serif",
                      fontSize: "28px",
                      color: C.gold,
                      flexShrink: 0,
                      lineHeight: 1,
                      marginTop: "2px",
                    }}
                  >
                    {item.sym}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: 500,
                        color: C.stone,
                        marginBottom: "4px",
                      }}
                    >
                      {item.t}
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: "rgba(245,240,232,.45)",
                      }}
                    >
                      {item.d}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FINAL CTA ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="final-cta-heading"
          style={{
            background: C.navyDk,
            padding: "clamp(60px,8vw,100px) 5%",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 50%,rgba(196,162,72,.06) 0%,transparent 65%)",
            }}
          />
          <div
            aria-hidden="true"
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
              maxWidth: "620px",
              margin: "0 auto",
            }}
          >
            <div
              className="rev"
              aria-hidden="true"
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
              Join 320+ Happy Clients
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
              id="final-cta-heading"
              className="rev d1"
              style={{
                fontFamily: "Georgia,'Times New Roman',serif",
                fontSize: "clamp(30px,5vw,58px)",
                fontWeight: 700,
                lineHeight: 1.1,
                color: C.stone,
                marginBottom: "18px",
              }}
            >
              Ready to Become Our
              <br />
              <em
                style={{ fontStyle: "italic", color: C.gold, fontWeight: 400 }}
              >
                Next Success Story?
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
              Get in touch today for your free consultation and quotation.
              Let&apos;s build something you&apos;ll be proud of.
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
                  display: "inline-block",
                  textDecoration: "none",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  padding: "13px 32px",
                  background: C.gold,
                  color: C.navy,
                  border: `1.5px solid ${C.gold}`,
                }}
              >
                Get a Free Quote
              </Link>
              <a
                href="tel:+27073610101"
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
