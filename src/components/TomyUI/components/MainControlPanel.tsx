// src/components/TomyUI/components/MainControlPanel.tsx
import { useMemo, useState } from "react";
import { SkeuButton } from "./SkeuButton";
import { SmallToggle, ToggleState } from "./SmallToggle";
import { VolumeControl } from "./VolumeControl";

// ✅ Weather icon MVP (time + placeholder condition)
import { resolveWeatherIcon, type WeatherCondition } from "../icons/Weather/resolveWeatherIcon";

type Props = {
  className?: string;
};

export function MainControlPanel({ className = "" }: Props) {
  // keep volume state here so the panel can influence other UI later
  const [volume, setVolume] = useState(5);

  // boolean behavior only (you requested on/off only)
  const [bt, setBt] = useState<ToggleState>("off");
  const [wifi, setWifi] = useState<ToggleState>("off");

  const [settingsOn, setSettingsOn] = useState(false);
  const [powerOn, setPowerOn] = useState(true);

  // ✅ MVP: drive icon off local time + placeholder condition
  const now = new Date();
  const hour = now.getHours();

  // Later: replace with real weather/tomy state
  const condition: WeatherCondition = "sunny";

  const TimeIcon = useMemo(() => resolveWeatherIcon(hour, condition), [hour, condition]);

  return (
    <div className={`tomy-main-control ${className}`} aria-label="Main control panel">
      {/* Time Panel */}
      <div className="tomy-time-panel" aria-label="Time panel">
        <div className="tomy-time-panel__time">5:59</div>

        <div className="tomy-time-panel__icon" role="img" aria-label="Time and weather icon">
          <TimeIcon aria-hidden="true" />
        </div>
      </div>

      {/* Volume Panel */}
      <VolumeControl
        initialVolume={volume}
        onChange={setVolume}
      />

      {/* Toggle row */}
      <div className="tomy-toggle-row" aria-label="Connectivity toggles">
        <SmallToggle ariaLabel="Bluetooth toggle" kind="bluetooth" state={bt} onToggle={setBt} />

        <div className="tomy-toggle-row__divider" aria-hidden="true" />

        <SmallToggle ariaLabel="Wi-Fi toggle" kind="wifi" state={wifi} onToggle={setWifi} />
      </div>

      {/* Bottom control buttons */}
      <div className="tomy-control-buttons" aria-label="Settings and power">
        <SkeuButton
          ariaLabel="Settings"
          glyph="settings"
          className={settingsOn ? "is-pressed" : ""}
          onClick={() => setSettingsOn((s) => !s)}
        />

        <div className="tomy-toggle-row__divider" aria-hidden="true" />

        <SkeuButton
          ariaLabel="Power"
          glyph="power"
          className={powerOn ? "is-pressed" : ""}
          onClick={() => setPowerOn((p) => !p)}
        />
      </div>
    </div>
  );
}