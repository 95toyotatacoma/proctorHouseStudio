import React from "react";

type Glyph =
  | "plus"
  | "minus"
  | "settings"
  | "power";

type Props = {
  ariaLabel: string;
  glyph?: Glyph;
  variant?: "default" | "active" | "settings" | "power";
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

function PlusIcon() {
  return (
    <svg
      className="tomy-skeu-icon"
      viewBox="0 0 13.0801 13.0801"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M6.54005 1.04004V12.0401M1.04004 6.54005H12.0401"
        stroke="currentColor"
        strokeWidth="2.08013"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg
      className="tomy-skeu-icon"
      viewBox="0 0 13.0801 13.0801"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.04004 6.54005H12.0401"
        stroke="currentColor"
        strokeWidth="2.08013"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SettingsIcon() {
  // simple sliders icon (matches your mock vibe)
  return (
    <svg className="tomy-skeu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 4v16M17 4v16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="9" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17" cy="15" r="2" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function PowerIcon() {
  return (
    <svg className="tomy-skeu-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2v10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M7 5.5a9 9 0 1 0 10 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SkeuButton({
  ariaLabel,
  glyph = "plus",
  className = "",
  disabled = false,
  onClick,
}: Props) {
  const icon =
    glyph === "plus" ? <PlusIcon /> :
    glyph === "minus" ? <MinusIcon /> :
    glyph === "settings" ? <SettingsIcon /> :
    <PowerIcon />;
  return (
    <button
      type="button"
      className={`tomy-skeu-btn ${className}`}
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
    >
      {/* Figma-like concentric construction */}
      <span className="tomy-skeu-layers" aria-hidden="true">
        <span className="tomy-skeu-outer" />
        <span className="tomy-skeu-mid" />
        <span className="tomy-skeu-inner" />
        <span className="tomy-skeu-inner-reflect" />
      </span>

      {/* Icon */}
        <span className="tomy-skeu-iconWrap" aria-hidden="true">
        {glyph === "plus" ? (
            <PlusIcon />
        ) : glyph === "minus" ? (
            <MinusIcon />
        ) : glyph === "settings" ? (
            <SettingsIcon />
        ) : (
            <PowerIcon />
        )}
        </span>
    </button>
  );
}