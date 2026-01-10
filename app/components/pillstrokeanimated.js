import React, { useId } from "react";
import { motion } from "framer-motion";

/**
 * <PillStrokeAnimated />
 * - Hollow pill (no fill), animated gradient stroke on hover
 *
 * Props:
 *  - width       : number (px)      default 320
 *  - height      : number (px)      default 96
 *  - strokeWidth : number (px)      default 8
 *  - radius      : number | null    default (height - strokeWidth) / 2   // perfect pill
 *  - speed       : number (seconds) default 4                            // loop duration
 *  - direction   : "horizontal" | "vertical" | "diagonal" | "reverse"    default "horizontal"
 *  - stops       : [{ offset: "0%", color: "#..." }, ...]                // gradient colors
 *  - className   : string
 *  - style       : React.CSSProperties
 */
export default function PillStrokeAnimated({
  width = 320,
  height = 96,
  strokeWidth = 8,
  radius = null,
  speed = 4,
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

  // Clamp stroke width and compute inner rect (to prevent clipping)
  const sw = Math.min(strokeWidth, Math.max(1, height * 0.45));
  const inset = sw / 2;
  const x = inset;
  const y = inset;
  const w = Math.max(0, width - sw);
  const h = Math.max(0, height - sw);
  const rx = Math.max(0, radius == null ? h / 2 : radius);

  // Build animation variants for the gradient endpoints
  const start = { x1: 0, y1: 0, x2: width, y2: 0 }; // horizontal default
  let delta = { dx: width, dy: 0 };

  if (direction === "vertical") {
    Object.assign(start, { x1: 0, y1: 0, x2: 0, y2: height });
    delta = { dx: 0, dy: height };
  } else if (direction === "diagonal") {
    Object.assign(start, { x1: 0, y1: 0, x2: width, y2: height });
    delta = { dx: width, dy: height };
  } else if (direction === "reverse") {
    Object.assign(start, { x1: width, y1: 0, x2: 0, y2: 0 });
    delta = { dx: -width, dy: 0 };
  }

  const gradientVariants = {
    rest: {
      x1: start.x1,
      y1: start.y1,
      x2: start.x2,
      y2: start.y2,
    },
    animate: {
      x1: [start.x1, start.x1 + delta.dx],
      y1: [start.y1, start.y1 + delta.dy],
      x2: [start.x2, start.x2 + delta.dx],
      y2: [start.y2, start.y2 + delta.dy],
      transition: {
        duration: Math.max(0.5, speed),
        ease: "linear",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      className={className}
      style={style}
      initial="rest"
      whileHover="animate"
      {...rest}
    >
      <defs>
        {/* Framer can animate SVG elements too */}
        <motion.linearGradient
          id={`${gradId}-stroke`}
          gradientUnits="userSpaceOnUse"
          variants={gradientVariants}
        >
          {stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </motion.linearGradient>
      </defs>

      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={rx}
        fill="none"
        stroke={`url(#${`${gradId}-stroke`)}`}
        strokeWidth={sw}
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        // Make hover easier (so you don't have to hit the thin stroke precisely)
        style={{ pointerEvents: "all" }}
      />
    </motion.svg>
  );
}
