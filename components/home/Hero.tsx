"use client";

import Link from "next/link";
import { Stat } from "@/types/home";

interface HeroProps {
  stats: Stat[];
}

export default function Hero({ stats }: HeroProps) {
  return (
    <section className="relative min-h-screen bg-[#101828] flex items-center overflow-hidden">
      <div className="relative z-10 w-[90%] max-w-[1200px] mx-auto grid lg:grid-cols-2 gap-14 py-20">
        <div>
          <h1 className="text-[clamp(46px,6vw,76px)] font-bold text-[#F5F0E8] leading-[1.1]">
            We Build <br />
            <span className="text-[#C4A248] italic font-light">Structures</span>
            <br />
            That Endure.
          </h1>

          <p className="mt-6 text-[#B8B2A8] max-w-[420px] leading-[1.7]">
            Premium construction across KwaZulu-Natal.
          </p>

          <div className="flex gap-3 mt-8">
            <Link
              href="/contact"
              className="bg-[#C4A248] px-6 py-3 text-sm uppercase font-semibold"
            >
              Get Quote
            </Link>
            <Link
              href="/services"
              className="border border-white/20 px-6 py-3 text-sm uppercase"
            >
              Services
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {stats.map((s) => (
            <div
              key={s.n}
              className="bg-white/5 p-6 border border-white/10"
            >
              <div className="text-4xl text-[#E8DDD0] font-bold">
                {s.n}
                <span className="text-[#C4A248] text-xl">{s.s}</span>
              </div>
              <p className="text-xs text-[#C4A248]/60 whitespace-pre-line">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
