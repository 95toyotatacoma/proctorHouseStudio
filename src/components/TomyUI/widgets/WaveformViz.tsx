// src/components/TomyUI/widgets/WaveformViz.tsx
import React from "react";

type WaveformVizProps = {
  /** Total bars (center cluster + dotted tails vibe) */
  bars?: number;
};

export default function WaveformViz({ bars = 26 }: WaveformVizProps) {
  // Simple symmetric bar heights (static “designed” feel)
  // You can replace this later with real audio / animation.
  const heights = Array.from({ length: bars }, (_, i) => {
    const mid = (bars - 1) / 2;
    const d = Math.abs(i - mid) / mid; // 0..1
    // Make a “valley + peaks” shape similar to your mock
    const peak = 1 - d;
    const shaped = Math.pow(peak, 0.75);
    // scale to px (min 10, max 64)
    return Math.round(10 + shaped * 54);
  });

  return (
    <div className="tomy-waveform" aria-label="Waveform">
      {heights.map((h, idx) => (
        <span
          key={idx}
          className="tomy-waveform__bar"
          style={{ height: `${h}px` }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}