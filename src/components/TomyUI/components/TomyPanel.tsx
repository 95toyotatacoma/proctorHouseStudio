import React from "react";

type TomyPanelSize = "sm" | "md" | "lg" | "xl" | "auto";

type TomyPanelProps = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  size?: TomyPanelSize;
  "aria-label"?: string;
};

export default function TomyPanel({
  children,
  className = "",
  style,
  size = "md",
  ...rest
}: TomyPanelProps) {
  return (
    <section
      className={`tomy-panel tomy-panel--${size} ${className}`.trim()}
      style={style}
      {...rest}
    >
      {children}
    </section>
  );
}