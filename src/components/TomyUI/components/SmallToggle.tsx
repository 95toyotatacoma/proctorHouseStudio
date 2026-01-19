import React from "react";

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

function BluetoothIcon({ active }: { active: boolean }) {
  return (
    <svg className="tomy-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 3v18l6-6-6-6 6-6-6-6zm0 9 6 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* (active styling is via currentColor in CSS) */}
    </svg>
  );
}

function WifiIcon({ active }: { active: boolean }) {
  return (
    <svg className="tomy-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 9c4.5-4 9.5-4 14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8 12c3-2.5 5-2.5 8 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M11 15c1-.8 1-.8 2 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="1.2" fill="currentColor" />
    </svg>
  );
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
  const isOn = state === "on"; // strict boolean visuals

  return (
    <button
      type="button"
      className={[
        "tomy-toggle",
        `tomy-toggle--${kind}`,
        isOn ? "is-on" : "is-off",
        disabled ? "is-disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
      aria-pressed={isOn}
      disabled={disabled}
      onPointerDown={(e) => {
        e.preventDefault(); // prevents "first click focuses"
        if (disabled) return;
        onToggle?.(nextState(state));
      }}
    >
      {/* Track (styling hook) */}
      <span className="tomy-toggle__track" aria-hidden="true" />

      {/* Left icon */}
      {kind !== "basic" && (
        <span className="tomy-toggle__iconSlot" aria-hidden="true">
          {kind === "bluetooth" ? (
            <BluetoothIcon active={isOn} />
          ) : (
            <WifiIcon active={isOn} />
          )}
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