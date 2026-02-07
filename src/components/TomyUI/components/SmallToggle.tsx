import React from "react";

import BluetoothSvg from "../icons/ControlPanel/bluetooth.svg?react";
import BluetoothConnectedSvg from "../icons/ControlPanel/bluetooth_connected.svg?react";
import WifiSvg from "../icons/ControlPanel/wifi.svg?react";
import WifiOnSvg from "../icons/ControlPanel/wifiOn.svg?react";

export type ToggleState = "off" | "on" | "connected";

type Props = {
  ariaLabel: string;
  state: ToggleState;
  onToggle?: (next: ToggleState) => void;

  /** Which icon to show on the left side */
  kind?: "bluetooth" | "wifi" | "basic";

  /**
   * Ignored for now.
   * We are ONLY doing boolean toggle: off <-> on.
   * (The system can set "connected" later.)
   */
  allowConnected?: boolean;

  disabled?: boolean;
  className?: string;
};

// Boolean only: off <-> on
const nextState = (current: ToggleState): ToggleState => {
  return current === "off" ? "on" : "off";
};

function ToggleIcon({
  kind,
  state,
}: {
  kind: "bluetooth" | "wifi";
  state: ToggleState;
}) {
  // If the system ever sets "connected", show the connected icon.
  // Otherwise: off uses base icon, on uses "On" icon where available.
  if (kind === "bluetooth") {
    if (state === "connected") return <BluetoothConnectedSvg aria-hidden="true" focusable="false" />;
    return <BluetoothSvg aria-hidden="true" focusable="false" />;
  }

  // wifi
  if (state === "connected" || state === "on") {
    return <WifiOnSvg aria-hidden="true" focusable="false" />;
  }
  return <WifiSvg aria-hidden="true" focusable="false" />;
}

export function SmallToggle({
  ariaLabel,
  state,
  onToggle,
  kind = "basic",
  // allowConnected intentionally ignored
  disabled = false,
  className = "",
}: Props) {
  const isOn = state === "on" || state === "connected"; // visuals

  const handleToggle = () => {
    if (disabled) return;
    onToggle?.(nextState(state));
  };

  return (
    <button
      type="button"
      className={[
        "tomy-toggle",
        `tomy-toggle--${kind}`,
        isOn ? "is-on" : "is-off",
        state === "connected" ? "is-connected" : "",
        disabled ? "is-disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
      aria-pressed={isOn}
      disabled={disabled}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* Track (styling hook) */}
      <span className="tomy-toggle__track" aria-hidden="true" />

      {/* Left icon */}
      {kind !== "basic" && (
        <span className="tomy-toggle__iconSlot" aria-hidden="true">
          <span className="tomy-toggle__icon" aria-hidden="true">
            <ToggleIcon kind={kind} state={state} />
          </span>
        </span>
      )}

      {/* Knob */}
      <span className="tomy-toggle__knob" aria-hidden="true">
        <span className="tomy-toggle__knobInner" aria-hidden="true" />
        <span className="tomy-toggle__pin" aria-hidden="true" />
      </span>
    </button>
  );
}