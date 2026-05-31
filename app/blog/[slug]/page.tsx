"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
// import Footer from "@/components/Footer";
import { POSTS } from "../page";
// import Navbar from "@/components/NavBar";

// ── Full article content keyed by slug ─────────────
const CONTENT: Record<
  string,
  { intro: string; sections: { heading: string; body: string }[] }
> = {
  "understanding-cidb-grades-south-africa": {
    intro:
      "The Construction Industry Development Board (CIDB) is a South African statutory body that registers all construction contractors on a grading scale from Grade 1 (smallest) to Grade 9 (largest). Understanding what these grades mean is essential before you hire any contractor — and it's one of the first questions you should ask.",
    sections: [
      {
        heading: "What the Grades Mean",
        body: "Grade 1 contractors are registered for contracts up to R200 000. Grade 9 contractors handle contracts of unlimited value. Each grade reflects proven experience, financial capacity, and past performance. A contractor's grade directly limits the size of public sector projects they can tender for.",
      },
      {
        heading: "Why It Matters for Private Clients",
        body: "Although private clients aren't legally required to use CIDB-registered contractors, grading is a reliable proxy for professionalism and capacity. A contractor with a Grade 5 or higher has demonstrated sustained business operations, financial stability, and successful project delivery.",
      },
      {
        heading: "How to Verify a Contractor's Grade",
        body: "The CIDB register is publicly searchable at cidb.org.za. You can search by company name or registration number. Always verify independently — never take a contractor's word for their grade. TtFRECH is fully CIDB registered and our registration number is available on request.",
      },
      {
        heading: "The Bottom Line",
        body: "For any construction project in South Africa, CIDB registration is a basic minimum standard. It won't guarantee quality on its own, but it's an important first filter. Combine it with reference checks, site visits, and a detailed written contract.",
      },
    ],
  },
  "how-to-budget-home-renovation-kzn": {
    intro:
      "Renovation budgets in KwaZulu-Natal are notoriously difficult to estimate — and just as easy to blow. The Durban and North Coast market has its own pricing dynamics, driven by coastal humidity, local labour rates, and material availability. Here's how to build a realistic budget before you start.",
    sections: [
      {
        heading: "Typical Room-by-Room Costs (2025)",
        body: "A full bathroom renovation in KZN runs R35 000–R90 000 depending on fittings. A kitchen remodel starts at R60 000 for modest upgrades and reaches R250 000+ for full custom cabinetry. A bedroom or living room refresh (new flooring, plastering, paint) typically costs R18 000–R45 000.",
      },
      {
        heading: "The 15% Contingency Rule",
        body: "No matter how detailed your quote, set aside 15% of the total project value as a contingency. In coastal KZN specifically, moisture-related surprises (hidden damp, rotted timber, corroded fixings) are common once walls are opened. Without contingency, these become crises.",
      },
      {
        heading: "What Drives Overruns",
        body: "The three biggest causes of budget overruns are: scope creep (adding items mid-project), unforeseen structural issues, and choosing materials after work has begun. Lock in all material selections before signing a contract. Changes mid-build cost significantly more than decisions made upfront.",
      },
      {
        heading: "Getting an Accurate Quote",
        body: "A reliable quote should be fully itemised — showing quantities, unit rates, and line totals for every trade. If a contractor gives you a single lump sum with no breakdown, ask for detail. If they refuse, walk away. TtFRECH provides fully itemised quotations on every project, no exceptions.",
      },
    ],
  },
  "building-plans-approval-ethekwini-timeline": {
    intro:
      "Getting building plans approved through eThekwini Municipality is one of the most common causes of project delays in Durban. Understanding the process — and what causes it to slow down — can save you months of frustration and holding costs.",
    sections: [
      {
        heading: "The Official Timeline",
        body: "eThekwini Municipality is legally required to process building plan submissions within 30 days for minor works and 60 days for major works. In practice, straightforward residential submissions in less congested suburbs often clear in 4–8 weeks. Complex or commercial plans can take 3–6 months.",
      },
      {
        heading: "Most Common Rejection Reasons",
        body: "The top reasons for rejection are: incomplete NHBRC enrolment documentation, incorrect zoning compliance, missing engineer's certificates, non-compliant boundary setbacks, and incomplete site plans. Any one of these restarts your timeline.",
      },
      {
        heading: "How to Prepare a Strong Submission",
        body: "Use a registered architectural draughtsperson or architect. Ensure your site plan shows all servitudes, boundaries, and neighbouring structures. Include your NHBRC enrolment, soil investigation report (if required), and structural engineer's certification before submission. A complete first submission is dramatically faster than a back-and-forth one.",
      },
      {
        heading: "The Practical Reality",
        body: "For most Durban residential builds, we advise clients to factor 8–12 weeks for plan approval when doing project scheduling. Starting construction before approval is granted — even on your own property — exposes you to stop-work orders, fines, and demolition orders. It's never worth the risk.",
      },
    ],
  },
};

// Fallback content for posts without full articles
const DEFAULT_CONTENT = {
  intro:
    "This article covers one of the most frequently asked topics in South African construction. Whether you're planning a new build, renovation, or commercial project in KwaZulu-Natal, understanding the fundamentals covered here will help you make better decisions and protect your investment.",
  sections: [
    {
      heading: "The Key Principles",
      body: "Every successful construction project in South Africa — whether in Durban, Ballito, Tongaat or Verulam — is built on the same foundation: clear scope, transparent pricing, qualified contractors, and proper documentation. Cutting corners on any of these dramatically increases your risk.",
    },
    {
      heading: "What to Watch Out For",
      body: "In the KZN market specifically, be cautious of contractors who can't provide CIDB registration details, won't give itemised quotes, or ask for large upfront payments before work begins. A reputable builder will welcome scrutiny and have nothing to hide.",
    },
    {
      heading: "Working With TtFRECH",
      body: "TtFRECH Renovators & Investments handles all project types covered in this guide — from the planning stage through to final handover. We're CIDB registered, NHBRC enrolled, and fully insured. Every project gets a dedicated project manager and a written workmanship guarantee.",
    },
    {
      heading: "Next Steps",
      body: "If you're planning a project in Durban or across KZN, the best first step is a free on-site consultation. We'll assess your site, understand your brief, and provide a fully itemised quotation — usually within 3–5 working days. No obligation.",
    },
  ],
};

// ── Related posts ──────────────────────────────────
function RelatedPosts({
  currentSlug,
  currentCat,
}: {
  currentSlug: string;
  currentCat: string;
}) {
  const related = POSTS.filter(
    (p) => p.slug !== currentSlug && p.cat === currentCat,
  ).slice(0, 2);

  const fallback = POSTS.filter((p) => p.slug !== currentSlug).slice(
    0,
    2 - related.length,
  );

  const posts = [...related, ...fallback].slice(0, 2);

  return (
    <div className="flex flex-col gap-4">
      {posts.map((p) => (
        <Link
          key={p.slug}
          href={`/blog/${p.slug}`}
          className="no-underline group block border border-[rgba(196,162,72,.1)]
          hover:border-[rgba(196,162,72,.35)] transition-colors p-4
          bg-[rgba(255,255,255,.02)] hover:bg-[rgba(196,162,72,.04)]"
        >
          <div
            className="text-[9px] font-bold tracking-[1.5px] uppercase
            text-[#C4A248] mb-2"
          >
            {p.cat}
          </div>
          <div
            className="font-display text-[15px] font-semibold leading-[1.3]
            text-[rgba(245,240,232,.75)] group-hover:text-[#F5F0E8] transition-colors mb-2"
          >
            {p.title}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[rgba(196,162,72,.4)]">
              {p.readTime}
            </span>
            <span className="text-[rgba(196,162,72,.2)]">·</span>
            <span className="text-[11px] text-[rgba(196,162,72,.4)]">
              {p.date}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}

// ══ BLOG POST PAGE ═════════════════════════════════
export default function BlogPostPage() {
  // ✅ Correct Next.js App Router pattern for client components
  const params = useParams();
  const slug =
    typeof params.slug === "string"
      ? params.slug
      : Array.isArray(params.slug)
        ? params.slug[0]
        : "";

  const post = POSTS.find((p) => p.slug === slug);
  const content = CONTENT[slug] ?? DEFAULT_CONTENT;

  // ── 404 state ──
  if (!post) {
    return (
      <>
        {/* <Navbar /> */}
        <main className="bg-[#101828] min-h-screen flex items-center justify-center pt-[72px]">
          <div className="text-center px-6">
            <div
              className="font-display text-[100px] font-bold
              text-[rgba(196,162,72,.08)] leading-none mb-4"
            >
              404
            </div>
            <h1 className="font-display text-[32px] font-bold text-[#F5F0E8] mb-4">
              Article Not Found
            </h1>
            <p className="text-[15px] text-[rgba(245,240,232,.45)] mb-8">
              This article doesn&apos;t exist or may have moved.
            </p>
            <Link
              href="/blog"
              className="no-underline inline-block bg-[#C4A248] text-[#182338]
              px-8 py-3 text-[11px] font-bold tracking-[1.5px] uppercase
              hover:bg-[#DFC05A] transition-colors"
            >
              Back to Blog
            </Link>
          </div>
        </main>
        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
        :root { --fd: 'Cormorant Garamond', Georgia, serif; }
        .font-display { font-family: var(--fd); }
      `}</style>

      {/* <Navbar /> */}

      <main className="bg-[#101828]">
        {/* ── POST HERO ── */}
        <section className="pt-[72px] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(rgba(196,162,72,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.04) 1px,transparent 1px)",
              backgroundSize: "72px 72px",
            }}
          />
          <div
            className="absolute top-0 right-0 w-48 h-48"
            style={{
              background: "rgba(196,162,72,.05)",
              clipPath: "polygon(100% 0,100% 100%,0 0)",
            }}
          />

          <div className="relative z-10 max-w-[1200px] mx-auto px-[5%] pt-14 pb-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 mb-8">
              <Link
                href="/"
                className="no-underline text-[12px] text-[rgba(196,162,72,.5)]
                hover:text-[#C4A248] transition-colors"
              >
                Home
              </Link>
              <span className="text-[rgba(196,162,72,.3)] text-[12px]">›</span>
              <Link
                href="/blog"
                className="no-underline text-[12px] text-[rgba(196,162,72,.5)]
                hover:text-[#C4A248] transition-colors"
              >
                Blog
              </Link>
              <span className="text-[rgba(196,162,72,.3)] text-[12px]">›</span>
              <span className="text-[12px] text-[rgba(196,162,72,.75)] truncate max-w-[200px]">
                {post.cat}
              </span>
            </div>

            {/* Hero card */}
            <div
              className="relative overflow-hidden border border-[rgba(196,162,72,.18)] p-8 lg:p-12"
              style={{ background: post.gradient }}
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(196,162,72,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(196,162,72,.06) 1px,transparent 1px)",
                  backgroundSize: "48px 48px",
                  opacity: 0.55,
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-40 h-40 opacity-10"
                style={{
                  background: "#C4A248",
                  clipPath: "polygon(100% 0,100% 100%,0 100%)",
                }}
              />

              <div className="relative z-10 max-w-[760px]">
                {/* Badges */}
                <div className="flex items-center gap-3 flex-wrap mb-5">
                  <span
                    className="bg-[rgba(196,162,72,.12)] border border-[rgba(196,162,72,.25)]
                    text-[#C4A248] text-[9px] font-bold tracking-[1.5px] uppercase px-3 py-[5px]"
                  >
                    {post.cat}
                  </span>
                  {post.tag && (
                    <span
                      className="bg-[rgba(16,24,40,.75)] border border-[rgba(196,162,72,.3)]
                      text-[#C4A248] text-[9px] font-semibold tracking-[1px] uppercase
                      px-[10px] py-[5px]"
                    >
                      {post.tag}
                    </span>
                  )}
                </div>

                <h1
                  className="font-display text-[clamp(32px,4.2vw,54px)] font-bold
                  leading-[1.05] text-[#F5F0E8] mb-4"
                >
                  {post.title}
                </h1>

                <p
                  className="text-[15px] font-light leading-[1.85]
                  text-[rgba(245,240,232,.55)] max-w-[680px] mb-6"
                >
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <span className="text-[12px] text-[rgba(245,240,232,.6)]">
                    {post.date}
                  </span>
                  <span className="text-[rgba(245,240,232,.2)]">·</span>
                  <span className="text-[12px] text-[rgba(245,240,232,.6)]">
                    {post.readTime}
                  </span>
                  <span className="text-[rgba(245,240,232,.2)]">·</span>
                  <span className="text-[12px] text-[rgba(196,162,72,.7)]">
                    TtFRECH Editorial
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── POST BODY ── */}
        <section className="px-[5%] py-16">
          <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-14">
            {/* Article */}
            <article>
              {/* Intro */}
              <div
                className="bg-[rgba(196,162,72,.05)] border border-[rgba(196,162,72,.14)]
                border-l-[3px] border-l-[#C4A248] px-6 py-5 mb-10"
              >
                <p
                  className="text-[16px] font-light leading-[1.9] text-[rgba(245,240,232,.7)]
                  italic"
                >
                  {content.intro}
                </p>
              </div>

              {/* Sections */}
              <div className="flex flex-col gap-10">
                {content.sections.map((section, i) => (
                  <div
                    key={i}
                    className="bg-[rgba(255,255,255,.02)]
                    border border-[rgba(196,162,72,.09)] p-7"
                  >
                    <div className="flex items-start gap-5 mb-4">
                      <div
                        className="w-8 h-8 bg-[rgba(196,162,72,.1)] border border-[rgba(196,162,72,.2)]
                        flex items-center justify-center shrink-0 mt-1
                        font-display text-[14px] font-bold text-[#C4A248]"
                      >
                        {i + 1}
                      </div>
                      <h2
                        className="font-display text-[24px] font-bold
                        text-[#F5F0E8] leading-[1.2]"
                      >
                        {section.heading}
                      </h2>
                    </div>
                    <p
                      className="text-[15px] font-light leading-[1.9]
                      text-[rgba(245,240,232,.58)] pl-[52px]"
                    >
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA inline */}
              <div
                className="mt-10 bg-[rgba(196,162,72,.06)] border border-[rgba(196,162,72,.18)]
                p-7 flex flex-col sm:flex-row items-start sm:items-center
                justify-between gap-6"
              >
                <div>
                  <div
                    className="text-[11px] font-bold tracking-[2px] uppercase
                    text-[#C4A248] mb-2"
                  >
                    Need Expert Advice?
                  </div>
                  <p className="text-[14px] font-light text-[rgba(245,240,232,.55)] leading-[1.6]">
                    TtFRECH serves Durban, Ballito, Westbrook, Tongaat &amp;
                    Verulam. Free consultation — no obligation.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <Link
                    href="/contact"
                    className="no-underline bg-[#C4A248] text-[#182338] px-6 py-3
                    text-[11px] font-bold tracking-[1.5px] uppercase
                    hover:bg-[#DFC05A] transition-colors whitespace-nowrap"
                  >
                    Get a Free Quote
                  </Link>
                  <a
                    href="tel:+270736101014"
                    className="no-underline text-[#F5F0E8] border border-[rgba(245,240,232,.2)]
                    px-5 py-3 text-[11px] font-medium tracking-[1px] uppercase
                    hover:border-[rgba(245,240,232,.5)] transition-colors whitespace-nowrap"
                  >
                    073 610 1014
                  </a>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8 pt-6 border-t border-[rgba(196,162,72,.08)]">
                <Link
                  href="/blog"
                  className="no-underline inline-flex items-center gap-2
                  text-[#C4A248] text-[12px] font-medium tracking-[1px] uppercase
                  hover:gap-3 transition-all"
                >
                  ← Back to Blog
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5">
              {/* Article meta */}
              <div className="bg-[rgba(255,255,255,.03)] border border-[rgba(196,162,72,.1)] p-5">
                <div
                  className="text-[10px] font-bold tracking-[2px] uppercase
                  text-[#C4A248] mb-4"
                >
                  Article Details
                </div>
                {[
                  { label: "Category", value: post.cat },
                  { label: "Published", value: post.date },
                  { label: "Read time", value: post.readTime },
                  { label: "Author", value: "TtFRECH Team" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center
                    py-3 border-b border-[rgba(196,162,72,.07)] last:border-b-0"
                  >
                    <span className="text-[12px] text-[rgba(196,162,72,.45)]">
                      {item.label}
                    </span>
                    <span className="text-[12px] font-medium text-[rgba(245,240,232,.7)]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div className="bg-[rgba(255,255,255,.02)] border border-[rgba(196,162,72,.1)] p-5">
                <div
                  className="text-[10px] font-bold tracking-[2px] uppercase
                  text-[#C4A248] mb-4"
                >
                  Quick Actions
                </div>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      label: "Get a Free Quote",
                      href: "/contact",
                      primary: true,
                    },
                    {
                      label: "View Our Services",
                      href: "/services",
                      primary: false,
                    },
                    { label: "Read the FAQ", href: "/faq", primary: false },
                    {
                      label: "See Our Reviews",
                      href: "/testimonials",
                      primary: false,
                    },
                  ].map((action) => (
                    <Link
                      key={action.href}
                      href={action.href}
                      className={`no-underline block px-4 py-3 text-[12px] font-semibold
                      tracking-[0.5px] transition-colors text-center
                      ${
                        action.primary
                          ? "bg-[#C4A248] text-[#182338] hover:bg-[#DFC05A]"
                          : "bg-transparent border border-[rgba(196,162,72,.14)] text-[rgba(245,240,232,.65)] hover:border-[rgba(196,162,72,.4)] hover:text-[#F5F0E8]"
                      }`}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related posts */}
              <div className="bg-[rgba(255,255,255,.02)] border border-[rgba(196,162,72,.1)] p-5">
                <div
                  className="text-[10px] font-bold tracking-[2px] uppercase
                  text-[#C4A248] mb-4"
                >
                  Related Articles
                </div>
                <RelatedPosts
                  currentSlug={post.slug}
                  currentCat={post.cat}
                />
              </div>

              {/* Contact card */}
              <div
                className="relative overflow-hidden border border-[rgba(196,162,72,.15)] p-5"
                style={{
                  background: "linear-gradient(135deg,#1F3A6A 0%,#182338 100%)",
                }}
              >
                <div
                  className="absolute top-0 right-0 w-20 h-20"
                  style={{
                    background: "rgba(196,162,72,.08)",
                    clipPath: "polygon(100% 0,100% 100%,0 0)",
                  }}
                />
                <div className="relative z-10">
                  <div className="font-display text-[20px] font-bold text-[#F5F0E8] mb-2">
                    Talk to a Builder
                  </div>
                  <p
                    className="text-[13px] font-light text-[rgba(245,240,232,.45)]
                    leading-[1.6] mb-5"
                  >
                    Serving Durban, Ballito, Tongaat, Verulam &amp; all of KZN.
                  </p>
                  <a
                    href="tel:+270736101014"
                    className="no-underline block text-center bg-[#C4A248] text-[#182338]
                    py-3 text-[11px] font-bold tracking-[1.5px] uppercase
                    hover:bg-[#DFC05A] transition-colors mb-2"
                  >
                    073 610 1014
                  </a>
                  <a
                    href="mailto:contact@ttfrech.co.za"
                    className="no-underline block text-center border border-[rgba(245,240,232,.15)]
                    text-[rgba(245,240,232,.55)] py-3 text-[11px] font-medium tracking-[1px]
                    uppercase hover:border-[rgba(245,240,232,.4)] transition-colors"
                  >
                    Send an Email
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* <Footer /> */}
    </>
  );
}
