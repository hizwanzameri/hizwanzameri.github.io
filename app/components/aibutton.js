import React, { useId } from "react";

/**
 * <AIButton />
 * - Hollow center (fill="none")
 * - Gradient stroke
 * - Dynamic size and options
 *
 * Props:
 *  - width         : number (px)      default 320
 *  - height        : number (px)      default 96
 *  - strokeWidth   : number (px)      default 8
 *  - radius        : number | null    default (height - strokeWidth)/2  (perfect pill)
 *  - direction     : "horizontal" | "vertical" | "diagonal" | "reverse"  default "horizontal"
 *  - stops         : [{offset: "0%", color: "#..."}]  default rainbow
 *  - className     : string           (optional)
 *  - style         : React.CSSProperties (optional)
 */
export default function AIButton({
  width = 320,
  height = 96,
  strokeWidth = 8,
  radius = null,
  direction = "horizontal",
  stops = [
    { offset: "0%", color: "#FF0055" },
    { offset: "16%", color: "#FF8A00" },
    { offset: "32%", color: "#FFEE00" },
    { offset: "50%", color: "#00FF85" },
    { offset: "68%", color: "#00C2FF" },
    { offset: "84%", color: "#7A5CFF" },
    { offset: "100%", color: "#FF00E1" },
  ],
  className,
  style,
  ...rest
}) {
  const gradId = useId();

  // Guard against overly large stroke
  const sw = Math.min(strokeWidth, Math.max(1, height * 0.45));
  const inset = sw / 2;

  // Inset the rect so the stroke doesn't get clipped by the SVG bounds
  const x = inset;
  const y = inset;
  const w = Math.max(0, width - sw);
  const h = Math.max(0, height - sw);

  // For a perfect pill, radius should be half of the inner height
  const rx = Math.max(0, radius == null ? (h / 2) : radius);

  // Gradient direction as endpoints in user space
  let x1 = 0, y1 = 0, x2 = width, y2 = 0; // horizontal (left → right)
  if (direction === "vertical")      { x1 = 0;      y1 = 0;      x2 = 0;       y2 = height; }
  else if (direction === "diagonal") { x1 = 0;      y1 = 0;      x2 = width;   y2 = height; }
  else if (direction === "reverse")  { x1 = width;  y1 = 0;      x2 = 0;       y2 = 0; }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      style={style}
      {...rest}
    >
      <defs>
        <linearGradient id={`${gradId}-stroke`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
          {stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>

      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill="none"
        stroke={`url(#${gradId}-stroke)`}
        strokeWidth={sw}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
