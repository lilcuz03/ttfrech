"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoNav from "./LogoNav";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  // Menu closes via onClick on each nav link — no effect needed

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[72px]
        flex items-center justify-between px-[5%]
        border-b border-[rgba(196,162,72,.1)]
        backdrop-blur-[14px] transition-all duration-300
        ${scrolled ? "bg-[rgba(16,24,40,.99)]" : "bg-[rgba(24,35,56,.96)]"}`}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="TtFRECH Renovators & Investments — Home"
          className="no-underline shrink-0"
        >
          <LogoNav />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7 list-none m-0 p-0">
          {NAV.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`text-[12px] font-medium tracking-[1px] uppercase no-underline transition-colors duration-200
                  ${active ? "text-[#C4A248]" : "text-[rgba(245,240,232,.6)] hover:text-[#F5F0E8]"}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href="/contact"
              className="inline-block px-5.5 py-2.25 bg-[#C4A248] text-[#182338]
              text-[11px] font-semibold tracking-[1.5px] uppercase no-underline
              hover:bg-[#DFC05A] transition-colors duration-200"
            >
              Get a Quote
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden relative w-10 h-10 flex items-center justify-center shrink-0"
        >
          <span
            className={`absolute h-0.5 w-6 bg-[#F5F0E8] transition-all duration-300 ${open ? "rotate-45" : "-translate-y-2"}`}
          />
          <span
            className={`absolute h-0.5 w-6 bg-[#F5F0E8] transition-all duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute h-[2px] w-6 bg-[#F5F0E8] transition-all duration-300 ${open ? "-rotate-45" : "translate-y-2"}`}
          />
        </button>
      </nav>

      {/* ── OVERLAY ── */}
      <div
        onClick={() => setOpen(false)}
        className={`lg:hidden fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm transition-opacity duration-300
        ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* ── MOBILE MENU ── */}
      <div
        className={`lg:hidden fixed top-[72px] left-0 right-0 z-[95]
        bg-[rgba(16,24,40,.98)] backdrop-blur-[16px]
        border-b border-[rgba(196,162,72,.1)] overflow-hidden
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
                className={`block py-4 text-[15px] border-b border-[rgba(196,162,72,.08)]
                no-underline transition-colors duration-200
                ${active ? "text-[#C4A248] font-medium" : "text-[rgba(245,240,232,.65)] hover:text-[#F5F0E8]"}`}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block mt-5 text-center py-4 bg-[#C4A248] text-[#182338]
            text-[12px] font-semibold tracking-[1px] uppercase no-underline
            hover:bg-[#DFC05A] transition-colors duration-200"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </>
  );
}
