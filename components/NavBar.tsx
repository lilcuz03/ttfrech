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
  { href: "/contact", label: "contact" },
];

// ── Logo pieces ───────────────────────────────────
const LogoMark = () => (
  <div
    className="w-10 h-10 flex items-center justify-center shrink-0
    border border-[rgba(196,162,72,.45)]"
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
    <div
      className="text-[7px] font-medium tracking-[1.8px] uppercase
      text-[rgba(196,162,72,.5)] mt-[1px]"
    >
      Renovators &amp; Investments
    </div>
  </div>
);

// ── Navbar ────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* ── Desktop / Mobile Bar ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[72px]
        flex items-center justify-between px-[5%]
        border-b border-[rgba(196,162,72,.1)]
        backdrop-blur-[14px] transition-colors duration-300
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

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
          {NAV.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-[12px] font-medium tracking-[1px] uppercase
                  no-underline transition-colors duration-200
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

          {/* CTA button */}
          <li>
            <Link
              href="/contact"
              className="inline-block px-[22px] py-[9px] no-underline
              bg-[#C4A248] text-[#182338] text-[11px] font-semibold
              tracking-[1.5px] uppercase hover:bg-[#DFC05A] transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          className="lg:hidden flex flex-col justify-center w-9 h-9
          bg-transparent border-none cursor-pointer p-1 gap-0"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-6 h-[1.5px] bg-[#F5F0E8] my-[5px]
              transition-all duration-300 origin-center"
              style={{
                transform: open
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 1
                      ? "scaleX(0)"
                      : "rotate(-45deg) translate(5px,-5px)"
                  : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* ── Mobile Drawer ── */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 z-[99]
        bg-[rgba(16,24,40,.98)] backdrop-blur-[16px]
        border-b border-[rgba(196,162,72,.1)]
        flex flex-col transition-all duration-300 overflow-hidden
        ${open ? "max-h-screen py-5 px-[5%] pb-7" : "max-h-0 py-0 px-[5%]"}`}
      >
        {NAV.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block text-[15px] py-3 no-underline
              border-b border-[rgba(196,162,72,.06)] transition-colors duration-200
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
          className="block text-center mt-3 py-[14px] no-underline
          bg-[#C4A248] text-[#182338] text-[12px] font-semibold
          tracking-[1px] uppercase hover:bg-[#DFC05A] transition-colors duration-200"
        >
          Get a Free Quote
        </Link>
      </div>
    </>
  );
}
