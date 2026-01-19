// src/components/TomyUI/widgets/BatteryRing.tsx
import React from "react";

type BatteryRingProps = {
  value: number; // 0-100
  size?: number; // px
};

export default function BatteryRing({ value, size = 140 }: BatteryRingProps) {
  const clamped = Math.max(0, Math.min(100, value));

  // We’ll draw a segmented tick ring using stroked dashes.
  const strokeWidth = 10;
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;

  // dashed ring feel
  const dashCount = 36;
  const dash = c / (dashCount * 2.2);
  const gap = dash * 1.2;
  const dashArray = `${dash} ${gap}`;

  return (
    <div className="tomy-battery" aria-label={`Battery ${clamped}%`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        {/* outer glow ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r + 10}
          className="tomy-battery__glow"
        />

        {/* segmented ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="tomy-battery__ticks"
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
        />
      </svg>

      <div className="tomy-battery__center">
        <div className="tomy-battery__pct">{clamped}%</div>
        <div className="tomy-battery__bolt" aria-hidden="true">
          ⚡
        </div>
      </div>
    </div>
  );
}