// src/components/TomyUI/widgets/BatteryRing.tsx
import React from "react";
import { Zap, AlertTriangle } from "lucide-react";

export type BatteryState = "critical" | "low" | "medium" | "good" | "full";

export type BatteryRingProps = {
  value: number; // 0–100
  size?: number; // px (default 100)
  className?: string;
  ariaLabel?: string;
};

const TICK_COUNT = 60;

function clamp01to100(v: number) {
  return Math.max(0, Math.min(100, v));
}

export function getBatteryState(value: number): BatteryState {
  const v = clamp01to100(value);
  if (v <= 10) return "critical";
  if (v <= 25) return "low";
  if (v <= 62) return "medium";
  if (v <= 91) return "good";
  return "full";
}

function getStateColorVar(state: BatteryState): string {
  // Use your tokens; if some aren't defined yet, you can map them later in CSS.
  const map: Record<BatteryState, string> = {
    critical: "var(--color_status_critical, var(--color_danger, #ff4d3d))",
    low: "var(--color_status_warning, var(--color_warning, #d6ff4d))",
    medium: "var(--color_status_attention, var(--color_accent_secondary, #f6c24a))",
    good: "var(--color_status_success, var(--color_success, #7dff6b))",
    full: "var(--color_white_shapes, var(--color_text_primary, #f5f6f9))",
  };
  return map[state];
}

function getGlowOpacity(state: BatteryState): number {
  // Keep subtle; CSS can override if needed.
  const map: Record<BatteryState, number> = {
    critical: 0.55,
    low: 0.45,
    medium: 0.35,
    good: 0.28,
    full: 0.22,
  };
  return map[state];
}

export default function BatteryRing({
  value,
  size = 100,
  className = "",
  ariaLabel,
}: BatteryRingProps) {
  const clamped = clamp01to100(value);
  const state = getBatteryState(clamped);

  const stateColor = getStateColorVar(state);
  const glowOpacity = getGlowOpacity(state);

  const isWarning = state === "critical" || state === "low";

  // SVG geometry in a 100x100 viewBox so it's resolution independent.
  const center = 50;
  const radius = 42;
  const tickLength = 4;
  const tickWidth = 2;
  const tickRadius = radius - tickLength / 2;

  const filledTicks = Math.round((clamped / 100) * TICK_COUNT);

  const ticks: React.ReactNode[] = [];
  for (let i = 0; i < TICK_COUNT; i++) {
    const angleDeg = (i / TICK_COUNT) * 360 - 90; // start at top
    const a = (angleDeg * Math.PI) / 180;

    const x1 = center + (tickRadius - tickLength / 2) * Math.cos(a);
    const y1 = center + (tickRadius - tickLength / 2) * Math.sin(a);
    const x2 = center + (tickRadius + tickLength / 2) * Math.cos(a);
    const y2 = center + (tickRadius + tickLength / 2) * Math.sin(a);

    const isFilled = i < filledTicks;

    ticks.push(
      <line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={isFilled ? "tomy-battery__tick is-filled" : "tomy-battery__tick is-empty"}
        strokeWidth={tickWidth}
        strokeLinecap="round"
      />
    );
  }

  return (
    <div
      className={["tomy-battery", `is-${state}`, className].filter(Boolean).join(" ")}
      style={
        {
          width: size,
          height: size,

          // component-scoped variables (CSS uses these)
          "--tomy-battery-state-color": stateColor,
          "--tomy-battery-glow-opacity": String(glowOpacity),
        } as React.CSSProperties
      }
      aria-label={ariaLabel ?? `Battery ${clamped}%`}
    >
      {/* glow halo */}
      <div className="tomy-battery__halo" aria-hidden="true" />

      <svg
        viewBox="0 0 100 100"
        className="tomy-battery__svg"
        aria-hidden="true"
      >
        {/* outer faint ring */}
        <circle
          cx={center}
          cy={center}
          r={radius + 8}
          className="tomy-battery__outerRing"
        />

        {/* inner disc */}
        <circle
          cx={center}
          cy={center}
          r={32}
          className="tomy-battery__innerDisc"
        />

        {/* ticks */}
        <g className="tomy-battery__ticks">{ticks}</g>
      </svg>

      {/* center content */}
      <div className="tomy-battery__center" aria-hidden="true">
        <div className="tomy-battery__pct">{clamped}%</div>
        <div className="tomy-battery__icon">
          {isWarning ? (
            <AlertTriangle className="tomy-battery__glyph" strokeWidth={1.5} />
          ) : (
            <Zap className="tomy-battery__glyph is-bolt" />
          )}
        </div>
      </div>
    </div>
  );
}