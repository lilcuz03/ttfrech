"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// ── Logo pieces ───────────────────────────────────
const LogoMark = () => (
  <div
    className="w-10 h-10 flex items-center justify-center shrink-0 border border-[rgba(196,162,72,.45)]"
    style={{ background: "linear-gradient(135deg,#1F3A6A,#182338)" }}
  >
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3 9.5L12 3L21 9.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5Z"
        stroke="#C4A248"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect
        x="10"
        y="15"
        width="4"
        height="6"
        rx=".4"
        fill="#C4A248"
        opacity=".55"
      />
    </svg>
  </div>
);

const LogoText = () => (
  <div>
    <div
      className="text-[19px] font-bold text-[#F5F0E8] tracking-[.5px] leading-none"
      style={{ fontFamily: "var(--fd,'Cormorant Garamond',Georgia,serif)" }}
    >
      Tt<span className="text-[#C4A248]">FRECH</span>
    </div>
    <div className="text-[7px] font-medium tracking-[1.8px] uppercase text-[rgba(196,162,72,.5)] mt-[1px]">
      Renovators &amp; Investments
    </div>
  </div>
);

// ── Navbar ────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Close menu when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ───────────────── NAVBAR ───────────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[72px]
        flex items-center justify-between px-[5%]
        border-b border-[rgba(196,162,72,.1)]
        backdrop-blur-[14px]
        transition-all duration-300
        ${scrolled ? "bg-[rgba(16,24,40,.99)]" : "bg-[rgba(24,35,56,.96)]"}`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-[10px] no-underline"
        >
          <LogoMark />
          <LogoText />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
          {NAV.map(({ href, label }) => {
            const active = pathname === href;

            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-[12px] font-medium tracking-[1px]
                  uppercase no-underline transition-colors duration-200
                  ${
                    active
                      ? "text-[#C4A248]"
                      : "text-[rgba(245,240,232,.6)] hover:text-[#F5F0E8]"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}

          {/* CTA */}
          <li>
            <Link
              href="/contact"
              className="inline-block px-[22px] py-[9px]
              bg-[#C4A248]
              text-[#182338]
              text-[11px]
              font-semibold
              tracking-[1.5px]
              uppercase
              no-underline
              hover:bg-[#DFC05A]
              transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile Hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center"
        >
          <span
            className={`absolute h-[2px] w-6 bg-[#F5F0E8]
            transition-all duration-300
            ${open ? "rotate-45" : "-translate-y-2"}`}
          />

          <span
            className={`absolute h-[2px] w-6 bg-[#F5F0E8]
            transition-all duration-300
            ${open ? "opacity-0" : "opacity-100"}`}
          />

          <span
            className={`absolute h-[2px] w-6 bg-[#F5F0E8]
            transition-all duration-300
            ${open ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </nav>

      {/* ───────────────── OVERLAY ───────────────── */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-[90]
        bg-black/50 backdrop-blur-sm
        transition-opacity duration-300
        ${
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* ───────────────── MOBILE MENU ───────────────── */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 z-[95]
        bg-[rgba(16,24,40,.98)]
        backdrop-blur-[16px]
        border-b border-[rgba(196,162,72,.1)]
        overflow-hidden
        transition-all duration-300 ease-in-out
        ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-[5%] py-5">
          {NAV.map(({ href, label }) => {
            const active = pathname === href;

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-4 text-[15px]
                border-b border-[rgba(196,162,72,.08)]
                no-underline transition-colors duration-200
                ${
                  active
                    ? "text-[#C4A248] font-medium"
                    : "text-[rgba(245,240,232,.65)] hover:text-[#F5F0E8]"
                }`}
              >
                {label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-5 text-center py-4
            bg-[#C4A248]
            text-[#182338]
            text-[12px]
            font-semibold
            tracking-[1px]
            uppercase
            no-underline
            hover:bg-[#DFC05A]
            transition-colors duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
