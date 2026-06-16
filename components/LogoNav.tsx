// components/LogoNav.tsx
// Light (inverted) version of the logo for use on the dark navbar.
// All navy text becomes off-white; gold slash stays gold.

export default function LogoNav() {
  return (
    <div className="inline-flex items-center gap-2.5">
      {/* ── House icon ── */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Outer roof chevron */}
        <polyline
          points="4,17 18,6 32,17"
          stroke="#F5F0E8"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Inner roof chevron — steel blue */}
        <polyline
          points="7,14.5 18,5 29,14.5"
          stroke="#3A7CA5"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Window 2×2 */}
        <rect
          x="15"
          y="10"
          width="3"
          height="3"
          rx="0.4"
          fill="#3A7CA5"
        />
        <rect
          x="19"
          y="10"
          width="3"
          height="3"
          rx="0.4"
          fill="#F5F0E8"
          opacity="0.5"
        />
        <rect
          x="15"
          y="14"
          width="3"
          height="3"
          rx="0.4"
          fill="#F5F0E8"
          opacity="0.5"
        />
        <rect
          x="19"
          y="14"
          width="3"
          height="3"
          rx="0.4"
          fill="#3A7CA5"
          opacity="0.6"
        />
      </svg>

      {/* ── Wordmark ── */}
      <div
        className="flex flex-col"
        style={{ gap: 2 }}
      >
        {/* Main row */}
        <div
          className="flex items-center"
          style={{
            gap: 3,
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: 20,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#F5F0E8" }}>T</span>
          <span style={{ color: "#F5F0E8", fontWeight: 600, fontSize: 16.5 }}>
            t
          </span>

          {/* Gold diagonal slash */}
          <svg
            width="6"
            height="21"
            viewBox="0 0 7 24"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polygon
              points="7,0 7,4 0,24 0,20"
              fill="#C4A248"
            />
          </svg>

          <span style={{ color: "#F5F0E8" }}>FRECH</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 7,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(196,162,72,0.55)",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            lineHeight: 1,
          }}
        >
          Renovators &amp; Investments
        </div>
      </div>
    </div>
  );
}
