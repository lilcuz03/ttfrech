"use client";
// components/LocationTicker.tsx
const locations = [
  "Durban",
  "Ballito",
  "Westbrook",
  "Tongaat",
  "Verulam",
  "Umhlanga",
  "La Lucia",
  "Pinetown",
  "KwaDukuza",
  "Hillcrest",
  "Amanzimtoti",
];

export default function LocationTicker() {
  const items = [...locations, ...locations, ...locations];
  return (
    <div
      className="overflow-hidden py-3 bg-gold border-y border-gold-light"
      aria-label="Areas we serve in KwaZulu-Natal"
    >
      <div
        className="flex gap-0 whitespace-nowrap"
        style={{ animation: "ticker 28s linear infinite" }}
      >
        {items.map((loc, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] px-6 text-navy-deep"
            aria-hidden={i >= locations.length}
          >
            {loc}
            <span
              className="text-base leading-none opacity-40"
              aria-hidden="true"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
