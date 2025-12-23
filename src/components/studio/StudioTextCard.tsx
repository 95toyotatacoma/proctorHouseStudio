// src/components/studio/StudioTextCard.tsx
import { ReactNode } from "react";

type StudioTextCardProps = {
  title: string;
  children: ReactNode; // body copy
  className?: string;
};

export default function StudioTextCard({
  title,
  children,
  className = "",
}: StudioTextCardProps) {
  return (
    <article className={`studio-text-card ${className}`}>
      <h2 className="studio-text-card__title">{title}</h2>
      <div className="studio-text-card__body">{children}</div>
    </article>
  );
}