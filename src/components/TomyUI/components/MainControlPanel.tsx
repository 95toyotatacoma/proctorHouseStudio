import { useState } from "react";
import { SkeuButton } from "./SkeuButton";
import { SmallToggle, ToggleState } from "./SmallToggle";

type Props = {
  className?: string;
};

export function MainControlPanel({ className = "" }: Props) {
  const [volume, setVolume] = useState(5);

  // boolean behavior only (you requested on/off only)
  const [bt, setBt] = useState<ToggleState>("off");
  const [wifi, setWifi] = useState<ToggleState>("off");

  const [settingsOn, setSettingsOn] = useState(false);
  const [powerOn, setPowerOn] = useState(true);

  return (
    <div className={`tomy-main-control ${className}`} aria-label="Main control panel">
      {/* Time Panel */}
      <div className="tomy-time-panel" aria-label="Time panel">
        <div className="tomy-time-panel__time">5:59</div>
        <div className="tomy-time-panel__icon" role="img" aria-label="Time of day icon" />
      </div>

      {/* Volume Panel */}
      <div className="tomy-vol-panel" aria-label="Volume control panel">
        <div className="tomy-vol-display" aria-label="Volume display">
          <div className={`tomy-vol-display__icon ${volume === 0 ? "is-muted" : ""}`} aria-hidden="true" />

          <div className="tomy-vol-bars" aria-label={`Volume ${volume} of 10`}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className={`tomy-vol-bars__bar ${i < volume ? "is-on" : "is-off"}`} />
            ))}
          </div>
        </div>

        <div className="tomy-vol-buttons" aria-label="Volume buttons">
          <SkeuButton
            ariaLabel="Volume down"
            glyph="minus"
            onClick={() => setVolume((v) => Math.max(0, v - 1))}
            disabled={volume === 0}
          />
          <SkeuButton
            ariaLabel="Volume up"
            glyph="plus"
            onClick={() => setVolume((v) => Math.min(10, v + 1))}
            disabled={volume === 10}
          />
        </div>
      </div>

      {/* Toggle row */}
      <div className="tomy-toggle-row" aria-label="Connectivity toggles">
        <SmallToggle
          ariaLabel="Bluetooth toggle"
          kind="bluetooth"
          state={bt}
          onToggle={(next) => setBt(next === "off" ? "on" : "off")}
        />

        <div className="tomy-toggle-row__divider" aria-hidden="true" />

        <SmallToggle
          ariaLabel="Wi-Fi toggle"
          kind="wifi"
          state={wifi}
          onToggle={(next) => setWifi(next === "off" ? "on" : "off")}
        />
      </div>

      {/* Bottom control buttons */}
      <div className="tomy-control-buttons" aria-label="Settings and power">
        <SkeuButton
          ariaLabel="Settings"
          glyph="settings"
          className={settingsOn ? "is-accent" : ""}
          onClick={() => setSettingsOn((s) => !s)}
        />

        <div className="tomy-toggle-row__divider" aria-hidden="true" />

        <SkeuButton
          ariaLabel="Power"
          glyph="power"
          className={powerOn ? "is-accent" : ""}
          onClick={() => setPowerOn((p) => !p)}
        />
      </div>
    </div>
  );
}