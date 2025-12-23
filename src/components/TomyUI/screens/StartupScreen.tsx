

type StartupScreenProps = {
  /** 0–100 */
  progress?: number;
  /** Optional override */
  title?: string;
  /** Optional small label above the stage (like your mock “TOMY-startup-UI”) */
  label?: string;
};

export default function StartupScreen({
  progress = 22,
  title = "Tomy 2000",
  label,
}: StartupScreenProps) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <section className="tomy-startup-screen" aria-label="Tomy startup screen">
      {label ? <div className="tomy-startup-screen__label">{label}</div> : null}

      <div className="tomy-startup-stage" role="img" aria-label="Startup stage">
        <div className="tomy-startup-stage__inner">
<h2 className="tomy-startup-title tomy-startup-title--ripple">{title}</h2>
            <div className="tomy-loading" aria-label="Loading">
            <div className="tomy-loading__track" aria-hidden="true">
                <div
                className="tomy-loading__fill"
                style={{ width: `${clamped}%` }}
                />
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}