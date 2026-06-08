import React from "react";
import { motion } from "motion/react";

interface VeilLinesLogoProps {
  className?: string;
  lineColor?: string; // e.g. "#FFFFFF" or "#000000"
  bgMode?: "transparent" | "black" | "white";
  strokeWidth?: number; // default: 10
  isStatic?: boolean;
}

export default function VeilLinesLogo({
  className = "w-12 h-12",
  lineColor = "#FFFFFF",
  bgMode = "transparent",
  strokeWidth = 6,
  isStatic = false,
}: VeilLinesLogoProps) {
  const bgColor =
    bgMode === "black"
      ? "#000000"
      : bgMode === "white"
        ? "#FFFFFF"
        : "transparent";
  const r = strokeWidth / 2; // radius for rounded caps to feel refined and expensive

  // Coordinate Calculations
  // ViewBox: 0 0 512 512
  // We center the lines perfectly. x coords of centers:
  // [160, 192, 224, 256, 288, 320, 352]
  // Pitch = 32px spacing horizontally
  // To use <rect>, x = center - (strokeWidth / 2)
  const offset = strokeWidth / 2;

  // We define each line's properties.
  // dir: 1 means falls DOWN (y + h), dir: -1 means flies UP (y - h).
  const lines = [
    { id: "v-line-1", x: 160, y: 128, h: 256, dir: 1 },
    { id: "v-line-2", x: 192, y: 160, h: 224, dir: -1 },
    { id: "v-line-3", x: 224, y: 224, h: 160, dir: -1 },
    { id: "v-line-4a", x: 256, y: 128, h: 32, dir: 1 },
    { id: "v-line-4b", x: 256, y: 256, h: 128, dir: -1 },
    { id: "v-line-5", x: 288, y: 128, h: 160, dir: 1 },
    { id: "v-line-6", x: 320, y: 128, h: 224, dir: 1 },
    { id: "v-line-7", x: 352, y: 128, h: 256, dir: -1 },
  ];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      id="veil-lines-logo-container"
    >
      <svg
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
        id="veil-lines-logo-svg"
      >
        <defs>
          <clipPath id="veil-lines-logo-clip">
            {lines.map((line) => (
              <rect
                key={line.id + "-clip"}
                x={line.x - offset}
                y={line.y}
                width={strokeWidth}
                height={line.h}
                rx={r}
              />
            ))}
          </clipPath>
        </defs>

        {/* Optional Solid Matte Background Card (Perfect optical contrast) */}
        {bgMode !== "transparent" && (
          <rect
            width="512"
            height="512"
            fill={bgColor}
            rx="56"
            id="veil-logo-bg"
          />
        )}

        {isStatic ? (
          <g id="veil-rect-lines-group">
            {lines.map((line) => (
              <rect
                key={line.id}
                x={line.x - offset}
                y={line.y}
                width={strokeWidth}
                height={line.h}
                rx={r}
                fill={lineColor}
              />
            ))}
          </g>
        ) : (
          <g clipPath="url(#veil-lines-logo-clip)">
            {lines.map((line, i) => (
              <motion.rect
                key={line.id}
                x={line.x - offset}
                y={line.y}
                width={strokeWidth}
                height={line.h}
                rx={r}
                fill={lineColor}
                animate={{
                  y: [
                    0,
                    300 * line.dir,
                    300 * line.dir,
                    0,
                    0,
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.05,
                  times: [0, 0.3, 0.32, 0.62, 1],
                }}
              />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}
