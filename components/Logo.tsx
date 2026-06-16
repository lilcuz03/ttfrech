// components/Logo.tsx
// Pure code recreation of the TtFRECH logo — no image file needed.
// Use <Logo /> anywhere. Pass size="sm" | "md" | "lg" to scale.

interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Logo({ size = "md", className = "" }: LogoProps) {
  // Scale multiplier
  const scale = size === "sm" ? 0.75 : size === "lg" ? 1.35 : 1;

  const iconSize = Math.round(36 * scale);
  const mainSize = Math.round(22 * scale);
  const subSize = Math.round(7.5 * scale);
  const gap = Math.round(10 * scale);

  return (
    <div
      className={`inline-flex items-center ${className}`}
      style={{ gap }}
    >
      {/* ── House icon ── */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 36 36"
        fill="none"
        aria-hidden="true"
        style={{ flexShrink: 0 }}
      >
        {/* Roof lines — double chevron */}
        <polyline
          points="4,17 18,6 32,17"
          stroke="#1B2A4A"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <polyline
          points="7,14.5 18,5 29,14.5"
          stroke="#3A7CA5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Window squares — 2×2 grid */}
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
          fill="#1B2A4A"
          opacity="0.6"
        />
        <rect
          x="15"
          y="14"
          width="3"
          height="3"
          rx="0.4"
          fill="#1B2A4A"
          opacity="0.6"
        />
        <rect
          x="19"
          y="14"
          width="3"
          height="3"
          rx="0.4"
          fill="#3A7CA5"
          opacity="0.5"
        />
      </svg>

      {/* ── Wordmark ── */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: Math.round(2 * scale),
        }}
      >
        {/* Main text row: Tt | slash | FRECH */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: Math.round(3 * scale),
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: mainSize,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {/* Tt */}
          <span style={{ color: "#1B2A4A" }}>T</span>
          <span
            style={{
              color: "#1B2A4A",
              fontWeight: 600,
              fontSize: mainSize * 0.82,
            }}
          >
            t
          </span>

          {/* Diagonal gold slash */}
          <svg
            width={Math.round(7 * scale)}
            height={Math.round(mainSize * 1.05)}
            viewBox="0 0 7 24"
            fill="none"
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polygon
              points="7,0 7,4 0,24 0,20"
              fill="#B8A46A"
            />
          </svg>

          {/* FRECH */}
          <span style={{ color: "#1B2A4A" }}>FRECH</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: subSize,
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#1B2A4A",
            opacity: 0.65,
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
