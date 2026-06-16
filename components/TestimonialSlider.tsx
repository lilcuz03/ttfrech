"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";

interface Testimonial {
  initials: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
  project: string;
  avatarClass: string;
}

const testimonials: Testimonial[] = [
  {
    initials: "NM",
    name: "Nompumelelo Mthembu",
    role: "Homeowner",
    location: "Ballito",
    rating: 5,
    quote:
      "TtFRECH built our home in Ballito from the ground up. Quality exceeded expectations and they finished two weeks early. Every detail was handled with care and professionalism.",
    project: "Custom Residential Build · Ballito",
    avatarClass: "bg-steel",
  },
  {
    initials: "RS",
    name: "Ruan Steyn",
    role: "Business Owner",
    location: "Durban",
    rating: 5,
    quote:
      "We contracted TtFRECH for a full office fit-out in Durban. Professional from quote to handover — transparent pricing, daily updates and top-notch craftsmanship throughout.",
    project: "Commercial Fit-Out · Durban CBD",
    avatarClass: "bg-navy-light",
  },
  {
    initials: "LB",
    name: "Liezel Botha",
    role: "Homeowner",
    location: "Verulam",
    rating: 5,
    quote:
      "After bad experiences elsewhere, TtFRECH restored our faith. They renovated our Verulam property, kept us updated daily and the result is stunning. Highly recommend.",
    project: "Full Home Renovation · Verulam",
    avatarClass: "bg-gold-muted",
  },
  {
    initials: "TN",
    name: "Thabo Nkosi",
    role: "Property Developer",
    location: "Umhlanga",
    rating: 5,
    quote:
      "We've worked with TtFRECH on three separate cluster developments. Consistent quality, CIDB compliant on every project, and a team that genuinely cares about the outcome.",
    project: "Cluster Development · Umhlanga",
    avatarClass: "bg-navy-mid",
  },
  {
    initials: "SA",
    name: "Siphiwe Absalom",
    role: "Warehouse Manager",
    location: "Tongaat",
    rating: 5,
    quote:
      "Our industrial facility in Tongaat was completed on schedule and within the agreed budget. The structural quality is exceptional — we have zero concerns about the build.",
    project: "Industrial Warehouse · Tongaat",
    avatarClass: "bg-steel",
  },
];

const AUTOPLAY_MS = 6000;

function Stars({ count }: { count: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? "#B8A46A" : "none"}
          stroke={i < count ? "#B8A46A" : "#5A6278"}
          aria-hidden="true"
        >
          <path d="M7 1L8.73 5.2L13.25 5.57L9.9 8.46L10.9 12.88L7 10.54L3.1 12.88L4.1 8.46L0.75 5.57L5.27 5.2L7 1Z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setAnimKey((k) => k + 1);
  }, []);
  const next = useCallback(
    () => goTo((current + 1) % testimonials.length),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + testimonials.length) % testimonials.length),
    [current, goTo],
  );

  useEffect(() => {
    timerRef.current = setTimeout(next, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [next]);

  const t = testimonials[current];

  return (
    <div>
      {/* Card */}
      <div
        key={animKey}
        className="rounded-2xl p-8 sm:p-10 border border-gold/15 bg-navy-deep animate-fade-in-up"
      >
        <div
          className="text-7xl font-serif leading-none mb-4 -mt-2 select-none text-gold/20"
          aria-hidden="true"
        >
          &ldquo;
        </div>
        <blockquote className="text-base sm:text-lg leading-relaxed mb-8 max-w-3xl text-text">
          {t.quote}
        </blockquote>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-4">
            <div
              className={`h-12 w-12 rounded-full flex items-center justify-center shrink-0 ${t.avatarClass}`}
              aria-hidden="true"
            >
              <span className="text-white font-bold text-sm">{t.initials}</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-text">{t.name}</p>
              <p className="text-xs text-muted">
                {t.role} · {t.location}
              </p>
              <p className="text-[10px] mt-0.5 text-dim">{t.project}</p>
            </div>
          </div>
          <Stars count={t.rating} />
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-6">
        <div
          className="flex gap-2"
          role="tablist"
          aria-label="Testimonial navigation"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`View testimonial ${i + 1}`}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full focus:outline-none ${i === current ? "w-8 h-2 bg-gold" : "w-2 h-2 bg-gold/20 hover:bg-gold/40"}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-3">
          {(["left", "right"] as const).map((dir) => (
            <button
              key={dir}
              onClick={dir === "left" ? prev : next}
              aria-label={
                dir === "left" ? "Previous testimonial" : "Next testimonial"
              }
              className="h-9 w-9 rounded-full flex items-center justify-center border border-gold/25 bg-navy-mid text-text hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d={dir === "left" ? "M10 3L5 8L10 13" : "M6 3L11 8L6 13"}
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          ))}
          <Link
            href="/testimonials"
            className="text-sm font-medium text-gold underline underline-offset-4 hover:text-gold-light transition-colors ml-2"
          >
            All reviews
          </Link>
        </div>
      </div>
    </div>
  );
}
