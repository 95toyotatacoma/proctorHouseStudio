import React from "react";
import { SkeuButton } from "./SkeuButton";

type Props = {
  /** 0–10 */
  initialVolume?: number;
  /** called on every change */
  onChange?: (volume: number) => void;
  /** optional: lock it (for demos) */
  disabled?: boolean;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

export function VolumeControl({
  initialVolume = 5,
  onChange,
  disabled = false,
}: Props) {
  const [volume, setVolume] = React.useState(() => clamp(initialVolume, 0, 10));

  const setAndNotify = React.useCallback(
    (next: number) => {
      const v = clamp(next, 0, 10);
      setVolume(v);
      onChange?.(v);
      // Later: play a click/tone here based on v
    },
    [onChange]
  );

  const handleDown = () => setAndNotify(volume - 1);
  const handleUp = () => setAndNotify(volume + 1);

  const isMuted = volume === 0;

  return (
    <div className="tomy-vol-panel" aria-label="Volume control panel">
      {/* Top: volume display */}
      <div className="tomy-vol-display" aria-label="Volume display">
        {/* Placeholder icon; will swap to mute later */}
        <div
          className={`tomy-vol-display__icon ${isMuted ? "is-muted" : ""}`}
          aria-hidden="true"
        />

        <div className="tomy-vol-bars" aria-label={`Volume ${volume} of 10`}>
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={`tomy-vol-bars__bar ${i < volume ? "is-on" : "is-off"}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom: buttons */}
      <div className="tomy-vol-buttons" aria-label="Volume buttons">
        <SkeuButton
          ariaLabel="Volume down"
          glyph="minus"
          onClick={handleDown}
          disabled={disabled || volume === 0}
        />
        <SkeuButton
          ariaLabel="Volume up"
          glyph="plus"
          onClick={handleUp}
          disabled={disabled || volume === 10}
        />
      </div>
    </div>
  );
}