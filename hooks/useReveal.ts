"use client";

import { useEffect } from "react";

export function useReveal(): void {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("in");
          }
        });
      },
      { threshold: 0.12 },
    );

    const els = document.querySelectorAll<HTMLElement>(".rev");
    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, []);
}
