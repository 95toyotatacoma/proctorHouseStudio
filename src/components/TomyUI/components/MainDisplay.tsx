// main display component
import React from "react";
import BatteryRing from "../widgets/BatteryRing";
import VoiceWaveform from "../widgets/VoiceWaveform.tsx";

type Props = {
  ariaLabel?: string;
  title?: string; // "TOMY 2000"
  micOn?: boolean; // indicator dot (placeholder)
  className?: string;
};

function WifiIcon() {
  return (
    <svg
      className="tomy-main-display__wifi"
      viewBox="0 0 16 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2 5.2c3.6-3.2 8.4-3.2 12 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M4.3 7.6c2.3-2 5.1-2 7.4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M6.8 9.7c.8-.7 1.6-.7 2.4 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function MainDisplay({
  ariaLabel = "Main display",
  title = "TOMY 2000",
  micOn = true,
  className = "",
}: Props) {
  return (
    <section
      className={["tomy-main-display", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      <header className="tomy-main-display__header" aria-label="Status header">
        <div className="tomy-main-display__headerLeft" aria-label="Network status">
          <WifiIcon />
          <span className="tomy-main-display__title">{title}</span>
        </div>

        <div
          className={["tomy-main-display__mic", micOn ? "is-on" : "is-off"].join(" ")}
          aria-label={micOn ? "Microphone on" : "Microphone off"}
        />
      </header>

      <div className="tomy-main-display__content" aria-hidden="true">
        <div className="tomy-main-display__voice">
          <VoiceWaveform />
        </div>

        <div className="tomy-main-display__power">
          <BatteryRing value={62} size={100} />
        </div>

        <div className="tomy-main-display__chips" />
      </div>
    </section>
  );
}
