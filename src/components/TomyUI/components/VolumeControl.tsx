// VolumeControl.tsx
import React from "react";
import { SkeuButton } from "./SkeuButton";

// ✅ update paths to match your renamed folders/files exactly
import VolumeMuted from "../icons/Linear/VideoAudioSound/VolumeCross.svg?react";
import VolumeLoud from "../icons/Linear/VideoAudioSound/VolumeLoud.svg?react";

type Props = {
  initialVolume?: number; // 0–10
  onChange?: (volume: number) => void;
  disabled?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function VolumeControl({ initialVolume = 5, onChange, disabled = false }: Props) {
  const [volume, setVolume] = React.useState(() => clamp(initialVolume, 0, 10));

  const setAndNotify = React.useCallback(
    (next: number) => {
      const v = clamp(next, 0, 10);
      setVolume(v);
      onChange?.(v);
    },
    [onChange]
  );

  const isMuted = volume === 0;
  const Icon = isMuted ? VolumeMuted : VolumeLoud;

  return (
    <div className="tomy-vol-panel" aria-label="Volume control panel">
      <div className="tomy-vol-display" aria-label="Volume display">
        <span
          className={`tomy-vol-display__icon ${isMuted ? "is-muted" : "is-loud"}`}
          aria-hidden="true"
        >
          <Icon className="tomy-vol-display__svg" aria-hidden="true" focusable="false" />
        </span>

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
          onClick={() => setAndNotify(volume - 1)}
          disabled={disabled || volume === 0}
        />
        <SkeuButton
          ariaLabel="Volume up"
          glyph="plus"
          onClick={() => setAndNotify(volume + 1)}
          disabled={disabled || volume === 10}
        />
      </div>
    </div>
  );
}