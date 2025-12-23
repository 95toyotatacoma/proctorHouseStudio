export default function StudioSectionCTA({
  title,
  subtitle,
  className = "",
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={`studio-section-cta ${className}`}>
      <div className="studio-section-cta__inner">
        <h2 className="studio-section-cta__title">{title}</h2>
        {subtitle && (
          <p className="studio-section-cta__subtitle">{subtitle}</p>
        )}
      </div>
    </div>
  );
}