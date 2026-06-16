"use client";
import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  location: string;
  category: string;
  year: string;
  src: string;
  alt: string;
  highlights: string[];
}

const projects: Project[] = [
  {
    id: "ballito-residence",
    title: "Ballito Coastal Residence",
    location: "Ballito, KZN",
    category: "Residential",
    year: "2024",
    src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
    alt: "Luxury coastal residence in Ballito KZN",
    highlights: ["4-bed double storey", "Custom finishes", "On time & budget"],
  },
  {
    id: "durban-office-fitout",
    title: "Durban CBD Office Fit-Out",
    location: "Durban Central",
    category: "Commercial",
    year: "2024",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    alt: "Modern office fit-out Durban CBD",
    highlights: [
      "1 200m² open plan",
      "8-week turnaround",
      "Full MEP coordination",
    ],
  },
  {
    id: "verulam-renovation",
    title: "Verulam Home Renovation",
    location: "Verulam, KZN",
    category: "Renovation",
    year: "2024",
    src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    alt: "Complete home renovation Verulam KZN",
    highlights: [
      "Full interior & exterior",
      "Kitchen & bathrooms",
      "Structural upgrade",
    ],
  },
  {
    id: "umhlanga-cluster",
    title: "Umhlanga Cluster Development",
    location: "Umhlanga, KZN",
    category: "Residential",
    year: "2023",
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    alt: "Cluster housing development Umhlanga KZN",
    highlights: ["8-unit cluster", "NHBRC enrolled", "Gated security"],
  },
  {
    id: "tongaat-warehouse",
    title: "Tongaat Industrial Warehouse",
    location: "Tongaat, KZN",
    category: "Commercial",
    year: "2023",
    src: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=800&q=80",
    alt: "Industrial warehouse Tongaat",
    highlights: [
      "3 000m² facility",
      "Steel frame structure",
      "Fire compliance",
    ],
  },
  {
    id: "pinetown-roofing",
    title: "Pinetown Commercial Roofing",
    location: "Pinetown, KZN",
    category: "Roofing",
    year: "2023",
    src: "https://images.unsplash.com/photo-1626885930974-4b69aa21bbf9?w=800&q=80",
    alt: "Commercial roofing Pinetown",
    highlights: [
      "Full roof replacement",
      "Torch-on waterproofing",
      "10-year warranty",
    ],
  },
];

const CARD_W = 340;
const CARD_GAP = 24;

export default function ProjectSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; scrollLeft: number }>({
    x: 0,
    scrollLeft: 0,
  });

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    setIsDragging(false);
    dragStart.current = {
      x: e.clientX,
      scrollLeft: trackRef.current.scrollLeft,
    };
    const onMove = (me: MouseEvent) => {
      if (!trackRef.current) return;
      const dx = me.clientX - dragStart.current.x;
      if (Math.abs(dx) > 4) setIsDragging(true);
      trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    };
    const onUp = () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      setTimeout(() => setIsDragging(false), 100);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  };

  const scroll = useCallback((direction: "left" | "right") => {
    if (!trackRef.current) return;
    trackRef.current.scrollBy({
      left: direction === "right" ? CARD_W + CARD_GAP : -(CARD_W + CARD_GAP),
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="relative">
      {/* Arrow buttons */}
      <div className="hidden sm:flex gap-2 absolute -top-14 right-0 z-10">
        {(["left", "right"] as const).map((dir) => (
          <button
            key={dir}
            onClick={() => scroll(dir)}
            aria-label={dir === "left" ? "Previous projects" : "Next projects"}
            className="h-10 w-10 rounded-full flex items-center justify-center border border-gold/25 bg-navy-mid text-text hover:border-gold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path
                d={dir === "left" ? "M11 4L6 9L11 14" : "M7 4L12 9L7 14"}
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ))}
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        className="flex gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory select-none cursor-grab active:cursor-grabbing"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        aria-label="Project gallery"
      >
        {projects.map((p) => (
          <Link
            key={p.id}
            href={`/projects/${p.id}`}
            onClick={(e) => {
              if (isDragging) e.preventDefault();
            }}
            className="group shrink-0 snap-start w-[320px] sm:w-[340px] rounded-xl overflow-hidden border border-gold/15 bg-navy-mid hover:border-gold/50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            aria-label={`View ${p.title} project`}
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 320px, 340px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent" />
              <div className="absolute top-3 left-3 bg-navy-deep/85 backdrop-blur-sm border border-gold/30 rounded-full px-3 py-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-gold">
                  {p.category}
                </span>
              </div>
            </div>
            {/* Body */}
            <div className="p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm leading-snug text-text group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <span className="text-xs shrink-0 mt-0.5 text-dim">
                  {p.year}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-dim">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 1C4.067 1 2.5 2.567 2.5 4.5C2.5 7.5 6 11 6 11C6 11 9.5 7.5 9.5 4.5C9.5 2.567 7.933 1 6 1Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <circle
                    cx="6"
                    cy="4.5"
                    r="1"
                    fill="currentColor"
                  />
                </svg>
                {p.location}
              </div>
              <ul className="flex flex-wrap gap-1.5 mt-1">
                {p.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-gold/20 bg-navy-deep/60 text-muted"
                  >
                    {h}
                  </li>
                ))}
              </ul>
              <span className="text-xs font-medium text-gold mt-1 group-hover:translate-x-1 transition-transform inline-block">
                View project →
              </span>
            </div>
          </Link>
        ))}

        {/* See-all card */}
        <Link
          href="/projects"
          className="group shrink-0 snap-start w-[320px] sm:w-[340px] rounded-xl flex flex-col items-center justify-center gap-4 p-8 border border-dashed border-gold/20 hover:border-gold/50 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          aria-label="View all projects"
        >
          <div className="h-14 w-14 rounded-full border border-gold/30 group-hover:border-gold flex items-center justify-center transition-colors text-muted group-hover:text-gold">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 12H19M13 6L19 12L13 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-center">
            <p className="font-semibold text-sm text-text group-hover:text-gold transition-colors">
              View All Projects
            </p>
            <p className="text-xs mt-1 text-dim">320+ completed across KZN</p>
          </div>
        </Link>
      </div>

      {/* Fade edges */}
      <div
        className="absolute top-0 left-0 bottom-4 w-6 bg-gradient-to-r from-navy-deep to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-0 right-0 bottom-4 w-16 bg-gradient-to-l from-navy-deep to-transparent pointer-events-none"
        aria-hidden="true"
      />
    </div>
  );
}
