"use client";

import { useState, useEffect } from "react";
import Link from "next/link";


// ── Scroll Reveal ──────────────────────────────────
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".rev").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ── Shared post data (single source of truth) ──────
export const POSTS = [
  {
    id: 1,
    slug: "understanding-cidb-grades-south-africa",
    cat: "Regulations",
    tag: "Must Read",
    featured: true,
    title:
      "Understanding CIDB Grading in South Africa: What It Means for Your Build",
    excerpt:
      "The Construction Industry Development Board grades contractors from Grade 1 through 9. Here's what each level means, why it matters when hiring, and how it protects you as a client.",
    date: "14 May 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg,#1F3A6A 0%,#182338 50%,#0d1d35 100%)",
  },
  {
    id: 2,
    slug: "how-to-budget-home-renovation-kzn",
    cat: "Renovations",
    tag: "Popular",
    featured: true,
    title:
      "How to Budget a Home Renovation in KwaZulu-Natal: A Realistic Guide",
    excerpt:
      "Renovation costs in KZN vary enormously. We break down typical price ranges per room, what drives overruns, and how to protect your budget from start to finish.",
    date: "28 Apr 2025",
    readTime: "8 min read",
    gradient: "linear-gradient(160deg,#2B5BA8 0%,#101828 60%,#0a1522 100%)",
  },
  {
    id: 3,
    slug: "nhbrc-enrollment-what-homeowners-need-to-know",
    cat: "Regulations",
    tag: null,
    featured: false,
    title: "NHBRC Enrolment: What Every New Homeowner Must Know",
    excerpt:
      "If you're building a new home in South Africa, NHBRC enrolment isn't optional — it's the law. We explain the process, costs, and protections it provides.",
    date: "10 Apr 2025",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg,#162030 0%,#101828 100%)",
  },
  {
    id: 4,
    slug: "double-storey-house-construction-guide",
    cat: "Project Guides",
    tag: "In-Depth",
    featured: false,
    title: "Building a Double-Storey House in Durban: A Step-by-Step Guide",
    excerpt:
      "From structural engineering and plan approval to roofing and finishing — a comprehensive walkthrough of what goes into a double-storey residential build on the KZN coast.",
    date: "22 Mar 2025",
    readTime: "11 min read",
    gradient: "linear-gradient(135deg,#1F3A6A 0%,#2B5BA8 60%,#101828 100%)",
  },
  {
    id: 5,
    slug: "flat-roof-waterproofing-options-sa",
    cat: "Construction Tips",
    tag: null,
    featured: false,
    title: "Flat Roof Waterproofing in KZN: Which System Is Right for You?",
    excerpt:
      "Bitumen torched, liquid applied, or torch-on membrane? We compare the leading flat roof waterproofing systems for KwaZulu-Natal's humid coastal conditions.",
    date: "5 Mar 2025",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg,#0e1c2e 0%,#101828 100%)",
  },
  {
    id: 6,
    slug: "kitchen-renovation-mistakes-to-avoid",
    cat: "Renovations",
    tag: "Popular",
    featured: false,
    title: "7 Costly Kitchen Renovation Mistakes Durban Homeowners Make",
    excerpt:
      "Poor ventilation planning, undersized wiring, and ignoring wet wall positions — these common mistakes can cost tens of thousands to fix. Avoid them from the start.",
    date: "18 Feb 2025",
    readTime: "6 min read",
    gradient: "linear-gradient(160deg,#1a2540 0%,#101828 100%)",
  },
  {
    id: 7,
    slug: "building-plans-approval-ethekwini-timeline",
    cat: "Regulations",
    tag: null,
    featured: false,
    title:
      "eThekwini Building Plans Approval: Realistic Timelines & Common Delays",
    excerpt:
      "Municipal plan approval in Durban can take 4 weeks or 6 months. We explain what drives the timeline, how to prepare a compliant submission, and how to avoid rejections.",
    date: "31 Jan 2025",
    readTime: "9 min read",
    gradient: "linear-gradient(135deg,#131f30 0%,#101828 100%)",
  },
  {
    id: 8,
    slug: "commercial-warehouse-construction-checklist",
    cat: "Project Guides",
    tag: null,
    featured: false,
    title:
      "Commercial Warehouse Construction: A Pre-Build Checklist for Business Owners",
    excerpt:
      "Before breaking ground on a commercial warehouse, there are 14 critical items to confirm — from zoning and fire compliance to floor load specs and security infrastructure.",
    date: "15 Jan 2025",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg,#0d1826 0%,#1a2e48 100%)",
  },
  {
    id: 9,
    slug: "kzn-construction-trends-2025",
    cat: "Industry News",
    tag: "New",
    featured: false,
    title: "KwaZulu-Natal Construction in 2025: Key Trends Shaping the Year",
    excerpt:
      "Rising material costs, North Coast development booms, green building adoption and the growing demand for affordable housing — we unpack the forces reshaping KZN construction.",
    date: "7 Jan 2025",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg,#101828 0%,#1c2e45 100%)",
  },
];

const CATEGORIES = [
  "All",
  "Construction Tips",
  "Renovations",
  "Industry News",
  "Project Guides",
  "Regulations",
];

// ── Category Pill ──────────────────────────────────
function CatPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-[18px] py-2 text-[10px] font-semibold tracking-[1.5px] uppercase
      shrink-0 transition-all duration-200 border cursor-pointer
      ${
        active
          ? "bg-[#C4A248] border-[#C4A248] text-[#182338]"
          : "bg-[rgba(255,255,255,.04)] border-[rgba(196,162,72,.14)] text-[rgba(245,240,232,.5)] hover:border-[rgba(196,162,72,.4)] hover:text-[#F5F0E8]"
      }`}
    >
      {label}
    </button>
  );
}

// ── Featured Card ──────────────────────────────────
function FeaturedCard({ post }: { post: (typeof POSTS)[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="no-underline block group h-full"
    >
      <div
        className="h-full border border-[rgba(196,162,72,.1)] group-hover:border-[rgba(196,162,72,.38)]
        group-hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      >
        {/* Visual */}
        <div
          className="h-[220px] relative overflow-hidden"
          style={{ background: post.gradient }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="absolute bottom-0 right-0 w-24 h-24 opacity-[.12]"
            style={{
              background: "#C4A248",
              clipPath: "polygon(100% 0,100% 100%,0 100%)",
            }}
          />
          {/* Category badge */}
          <div
            className="absolute top-4 left-4 bg-[#C4A248] text-[#182338] text-[9px]
            font-bold tracking-[1.5px] uppercase px-3 py-[5px]"
          >
            {post.cat}
          </div>
          {/* Tag */}
          {post.tag && (
            <div
              className="absolute top-4 right-4 bg-[rgba(16,24,40,.75)]
              border border-[rgba(196,162,72,.3)] text-[#C4A248] text-[9px]
              font-semibold tracking-[1px] uppercase px-[10px] py-[5px]"
            >
              {post.tag}
            </div>
          )}
          {/* Watermark number */}
          <div
            className="absolute bottom-[-8px] right-4 font-display text-[100px] font-bold
            text-[rgba(196,162,72,.05)] leading-none select-none"
          >
            {String(post.id).padStart(2, "0")}
          </div>
        </div>
        {/* Content */}
        <div className="p-7 bg-[rgba(255,255,255,.025)]">
          <h3
            className="font-display text-[22px] font-bold leading-[1.25]
            text-[rgba(245,240,232,.88)] group-hover:text-[#F5F0E8]
            transition-colors mb-3"
          >
            {post.title}
          </h3>
          <p className="text-[13px] font-light leading-[1.8] text-[rgba(245,240,232,.42)] mb-5">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[rgba(196,162,72,.5)]">
                {post.date}
              </span>
              <span className="text-[rgba(196,162,72,.25)]">·</span>
              <span className="text-[11px] text-[rgba(196,162,72,.5)]">
                {post.readTime}
              </span>
            </div>
            <span
              className="text-[11px] font-medium text-[#C4A248]
              opacity-60 group-hover:opacity-100 transition-opacity"
            >
              Read →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ── Regular Card ───────────────────────────────────
function PostCard({ post }: { post: (typeof POSTS)[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="no-underline block group h-full"
    >
      <div
        className="h-full flex flex-col border border-[rgba(196,162,72,.09)]
        bg-[rgba(255,255,255,.02)] group-hover:border-[rgba(196,162,72,.35)]
        group-hover:bg-[rgba(196,162,72,.03)] group-hover:-translate-y-[2px]
        transition-all duration-300"
      >
        {/* Colour strip */}
        <div
          className="h-[4px]"
          style={{ background: post.gradient }}
        />
        <div className="p-6 flex flex-col flex-1">
          {/* Meta */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className="bg-[rgba(196,162,72,.1)] border border-[rgba(196,162,72,.2)]
              text-[#C4A248] text-[9px] font-bold tracking-[1.5px] uppercase px-[9px] py-[3px]"
            >
              {post.cat}
            </span>
            {post.tag && (
              <span
                className="bg-[rgba(255,255,255,.04)] border border-[rgba(196,162,72,.12)]
                text-[rgba(245,240,232,.4)] text-[9px] font-medium tracking-[1px]
                uppercase px-2 py-[3px]"
              >
                {post.tag}
              </span>
            )}
          </div>
          <h3
            className="font-display text-[18px] font-semibold leading-[1.3] flex-1
            text-[rgba(245,240,232,.82)] group-hover:text-[#F5F0E8] transition-colors mb-3"
          >
            {post.title}
          </h3>
          <p
            className="text-[12px] font-light leading-[1.75] text-[rgba(245,240,232,.38)]
            mb-5 line-clamp-3"
          >
            {post.excerpt}
          </p>
          <div
            className="flex items-center justify-between pt-4
            border-t border-[rgba(196,162,72,.07)]"
          >
            <div className="flex flex-col gap-[2px]">
              <span className="text-[11px] text-[rgba(245,240,232,.35)]">
                {post.date}
              </span>
              <span className="text-[10px] text-[rgba(196,162,72,.35)]">
                {post.readTime}
              </span>
            </div>
            <div
              className="w-[30px] h-[30px] border border-[rgba(196,162,72,.15)]
              flex items-center justify-center
              group-hover:border-[rgba(196,162,72,.5)] group-hover:bg-[rgba(196,162,72,.1)]
              transition-all duration-200"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="#C4A248"
                strokeWidth="1.8"
              >
                <line
                  x1="2"
                  y1="6"
                  x2="10"
                  y2="6"
                />
                <polyline points="7,3 10,6 7,9" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

// ══ BLOG PAGE ══════════════════════════════════════
export default function BlogPage() {
  useReveal();
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((p) => p.cat === activeCategory);
  const featured = filtered.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <>
     


      <main className="bg-[#101828]">
        {/* ── HERO ── */}
        <section className="bg-[#101828] pt-[72px] relative overflow-hidden">
          {/* Grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          {/* Glow */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 0%,rgba(196,162,72,.06) 0%,transparent 65%)",
            }}
          />
          {/* Triangle */}
          <div
            className="absolute top-0 right-0 w-40 h-40"
            style={{
              background: "rgba(196,162,72,.05)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-[5%] pt-16 pb-12">
            {/* Breadcrumb + heading */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                {/* Breadcrumb */}
                <div
                  className="rev inline-flex items-center gap-2 px-4 py-[7px] mb-6
                  bg-[rgba(196,162,72,.07)] border border-[rgba(196,162,72,.18)]
                  text-[rgba(196,162,72,.7)] text-[10px] font-semibold tracking-[2px] uppercase"
                >
                  <Link
                    href="/"
                    className="no-underline text-[rgba(196,162,72,.6)] hover:text-[#C4A248]
                    transition-colors"
                  >
                    Home
                  </Link>
                  <span className="opacity-40">›</span>
                  <span className="text-[#C4A248]">Blog</span>
                </div>

                <h1
                  className="rev d1 font-display text-[clamp(42px,6vw,70px)] font-bold
                  leading-[1.05] text-[#F5F0E8] mb-4"
                >
                  Construction{" "}
                  <em className="italic text-[#C4A248] font-normal">
                    Insights
                  </em>
                  <br />
                  &amp; Industry News
                </h1>

                <p
                  className="rev d2 text-[15px] font-light leading-[1.8]
                  text-[rgba(245,240,232,.48)] max-w-[520px]"
                >
                  Expert guides, practical advice and industry news from the
                  TtFRECH team — helping you build smarter across Durban, KZN
                  and beyond.
                </p>
              </div>

              {/* Volume badge */}
              <div className="rev d2 shrink-0 text-right pb-1">
                <div
                  className="inline-block border border-[rgba(196,162,72,.2)]
                  bg-[rgba(196,162,72,.04)] px-5 py-4"
                >
                  <div
                    className="font-display text-[11px] text-[rgba(196,162,72,.5)]
                    tracking-[2px] uppercase mb-1"
                  >
                    Volume
                  </div>
                  <div className="font-display text-[40px] font-bold text-[#F5F0E8] leading-none">
                    01
                  </div>
                  <div
                    className="text-[9px] text-[rgba(196,162,72,.35)] tracking-[1.5px]
                    uppercase mt-1"
                  >
                    2025
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-px mt-10"
              style={{
                background:
                  "linear-gradient(90deg,rgba(196,162,72,.3),rgba(196,162,72,.1),transparent)",
              }}
            />

            {/* Category filter */}
            <div className="rev d3 pt-6">
              <div className="flex flex-wrap gap-2 items-center">
                <span
                  className="text-[9px] font-bold tracking-[2px] uppercase
                  text-[rgba(196,162,72,.35)] mr-2 shrink-0"
                >
                  Filter:
                </span>
                {CATEGORIES.map((cat) => (
                  <CatPill
                    key={cat}
                    label={cat}
                    active={activeCategory === cat}
                    onClick={() => setActiveCategory(cat)}
                  />
                ))}
              </div>
            </div>
          </div>

          <div
            className="h-px"
            style={{
              background:
                "linear-gradient(90deg,transparent,rgba(196,162,72,.15),transparent)",
            }}
          />
        </section>

        {/* ── POSTS ── */}
        <section className="bg-[#101828] px-[5%] pt-16 pb-24">
          <div className="max-w-[1200px] mx-auto">
            {/* Featured */}
            {featured.length > 0 && (
              <div className="mb-14">
                <div className="flex items-center gap-4 mb-7">
                  <span
                    className="text-[9px] font-bold tracking-[2.5px] uppercase
                    text-[#C4A248] bg-[rgba(196,162,72,.1)] border border-[rgba(196,162,72,.2)]
                    px-3 py-[5px]"
                  >
                    Featured
                  </span>
                  <div className="flex-1 h-px bg-[rgba(196,162,72,.1)]" />
                </div>
                <div
                  className={`grid gap-5 ${featured.length > 1 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 max-w-[640px]"}`}
                >
                  {featured.map((post, i) => (
                    <div
                      key={post.id}
                      className={`rev d${i}`}
                    >
                      <FeaturedCard post={post} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* All articles */}
            {regular.length > 0 && (
              <div>
                {featured.length > 0 && (
                  <div className="flex items-center gap-4 mb-7">
                    <span
                      className="text-[9px] font-bold tracking-[2.5px] uppercase
                      text-[rgba(245,240,232,.4)] py-[5px]"
                    >
                      All Articles
                    </span>
                    <div className="flex-1 h-px bg-[rgba(196,162,72,.08)]" />
                    <span className="text-[11px] text-[rgba(196,162,72,.35)]">
                      {regular.length} articles
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {regular.map((post, i) => (
                    <div
                      key={post.id}
                      className={`rev d${i % 3}`}
                    >
                      <PostCard post={post} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty state */}
            {filtered.length === 0 && (
              <div className="text-center py-20">
                <div
                  className="font-display text-[80px] font-bold
                  text-[rgba(196,162,72,.06)] leading-none mb-4"
                >
                  0
                </div>
                <p className="text-[15px] text-[rgba(245,240,232,.35)] mb-6">
                  No articles in this category yet.
                </p>
                <button
                  onClick={() => setActiveCategory("All")}
                  className="bg-[#C4A248] text-[#182338] border-none cursor-pointer
                  px-7 py-3 text-[11px] font-bold tracking-[1.5px] uppercase
                  hover:bg-[#DFC05A] transition-colors"
                >
                  View All Posts
                </button>
              </div>
            )}

            {/* Bottom strip — newsletter + CTA */}
            {filtered.length > 0 && (
              <div
                className="mt-20 pt-14 border-t border-[rgba(196,162,72,.08)]
                grid grid-cols-1 lg:grid-cols-2 gap-5"
              >
                {/* Newsletter */}
                <div
                  className="relative overflow-hidden bg-[rgba(196,162,72,.05)]
                  border border-[rgba(196,162,72,.15)] p-10"
                >
                  <div
                    className="absolute bottom-0 right-0 w-28 h-28 opacity-[.06]"
                    style={{
                      background: "#C4A248",
                      clipPath: "polygon(100% 0,100% 100%,0 100%)",
                    }}
                  />
                  <div
                    className="text-[9px] font-bold tracking-[2px] uppercase
                    text-[#C4A248] mb-3"
                  >
                    Stay Updated
                  </div>
                  <h3
                    className="font-display text-[26px] font-bold text-[#F5F0E8]
                    leading-[1.2] mb-3"
                  >
                    Get Construction Tips
                    <br />
                    <em className="italic text-[#C4A248] font-normal">
                      in Your Inbox
                    </em>
                  </h3>
                  <p
                    className="text-[13px] font-light text-[rgba(245,240,232,.42)]
                    leading-[1.7] mb-6"
                  >
                    Monthly insights on KZN construction, renovation guides, and
                    regulation updates — straight from the TtFRECH team.
                  </p>
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="flex-1 bg-[rgba(255,255,255,.05)] border border-[rgba(196,162,72,.2)]
                      border-r-0 text-[#F5F0E8] px-4 py-3 text-[13px] outline-none
                      placeholder:text-[rgba(245,240,232,.25)] font-[inherit]"
                    />
                    <button
                      className="bg-[#C4A248] text-[#182338] border-none cursor-pointer
                      px-5 py-3 text-[10px] font-bold tracking-[1.5px] uppercase shrink-0
                      hover:bg-[#DFC05A] transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <div
                  className="relative overflow-hidden border border-[rgba(196,162,72,.15)]
                  p-10 flex flex-col justify-between"
                  style={{
                    background:
                      "linear-gradient(135deg,#1F3A6A 0%,#182338 60%,#101828 100%)",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(196,162,72,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.03) 1px,transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <div
                    className="absolute top-0 right-0 w-24 h-24"
                    style={{
                      background: "rgba(196,162,72,.07)",
                      clipPath: "polygon(100% 0,100% 100%,0 0)",
                    }}
                  />
                  <div className="relative z-10">
                    <div
                      className="text-[9px] font-bold tracking-[2px] uppercase
                      text-[rgba(196,162,72,.5)] mb-3"
                    >
                      Ready to Build in KZN?
                    </div>
                    <h3
                      className="font-display text-[26px] font-bold text-[#F5F0E8]
                      leading-[1.2] mb-3"
                    >
                      Turn Your Vision
                      <br />
                      <em className="italic text-[#C4A248] font-normal">
                        Into Reality
                      </em>
                    </h3>
                    <p
                      className="text-[13px] font-light text-[rgba(245,240,232,.4)]
                      leading-[1.7] mb-7"
                    >
                      Free consultation and detailed quotation — no obligation.
                      Serving Durban, Ballito, Westbrook &amp; all of KZN.
                    </p>
                  </div>
                  <div className="relative z-10 flex flex-wrap gap-3">
                    <Link
                      href="/contact"
                      className="no-underline bg-[#C4A248] text-[#182338] px-6 py-3
                      text-[10px] font-bold tracking-[1.5px] uppercase
                      hover:bg-[#DFC05A] transition-colors"
                    >
                      Get Free Quote
                    </Link>
                    <a
                      href="tel:+270736101014"
                      className="no-underline text-[#F5F0E8] border border-[rgba(245,240,232,.2)]
                      px-5 py-3 text-[10px] font-medium tracking-[1px] uppercase
                      hover:border-[rgba(245,240,232,.5)] transition-colors"
                    >
                      073 610 1014
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

    </>
  );
}
