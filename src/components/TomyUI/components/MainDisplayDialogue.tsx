// src/components/TomyUI/components/MainDisplayDialogue.tsx
import React from "react";

export type DialogueVariant =
  | "titleSubtext"
  | "multiline"
  | "loading"
  | "subtextOnly";

export type ConnectionState =
  | "connected"
  | "connecting"
  | "disconnected";

type Props = {
  ariaLabel: string;

  /** Which of the 4 layouts to render */
  variant: DialogueVariant;

  /** Title line (variant: titleSubtext) */
  title?: string;

  /** Main message / subtext lines */
  subtext?: string | string[];

  /** Right-side connection indicator (variant: loading) */
  connectionState?: ConnectionState;

  disabled?: boolean;
  className?: string;
};

function ConnectionDots({ state }: { state: ConnectionState }) {
  const onCount =
    state === "connected" ? 3 :
    state === "connecting" ? 2 :
    1;

  return (
    <span
      className={`tomy-dialogue__conn is-${state}`}
      aria-hidden="true"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className={`tomy-dialogue__dot ${i < onCount ? "is-on" : "is-off"}`}
        />
      ))}
    </span>
  );
}

export function MainDisplayDialogue({
  ariaLabel,
  variant,
  title,
  subtext,
  connectionState = "connecting",
  disabled = false,
  className = "",
}: Props) {
  const lines =
    Array.isArray(subtext)
      ? subtext
      : typeof subtext === "string" && subtext.length
        ? [subtext]
        : [];

  return (
    <section
      className={[
        "tomy-dialogue",
        `tomy-dialogue--${variant}`,
        disabled ? "is-disabled" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      aria-label={ariaLabel}
    >
      {/* 1️⃣ Title + subtext */}
      {variant === "titleSubtext" && (
        <>
          {title && (
            <h3 className="tomy-dialogue__title">
              {title}
            </h3>
          )}
          {lines[0] && (
            <p className="tomy-dialogue__subtext">
              {lines[0]}
            </p>
          )}
        </>
      )}

      {/* 2️⃣ Multiline subtext */}
      {variant === "multiline" && (
        <div className="tomy-dialogue__stack">
          {lines.map((line, idx) => (
            <p
              key={idx}
              className="tomy-dialogue__subtext"
            >
              {line}
            </p>
          ))}
        </div>
      )}

      {/* 3️⃣ Loading + connection indicator */}
      {variant === "loading" && (
        <div className="tomy-dialogue__row">
          <p className="tomy-dialogue__subtext">
            {lines[0] ?? "Searching the web…"}
          </p>
          <ConnectionDots state={connectionState} />
        </div>
      )}

      {/* 4️⃣ Subtext only */}
      {variant === "subtextOnly" && (
        <p className="tomy-dialogue__subtext">
          {lines[0] ?? ""}
        </p>
      )}
    </section>
  );
}