// src/components/TomyUI/components/TomyIcon.tsx
import React from "react";
import { TomyIcons, TomyIconName } from "../icons";

type Props = {
  name: TomyIconName;
  size?: number;
  className?: string;
  title?: string;
};

export default function TomyIcon({ name, size = 24, className, title }: Props) {
  const Icon = TomyIcons[name];

  return (
    <Icon
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : "true"}
      role={title ? "img" : undefined}
    >
      {title ? <title>{title}</title> : null}
    </Icon>
  );
}