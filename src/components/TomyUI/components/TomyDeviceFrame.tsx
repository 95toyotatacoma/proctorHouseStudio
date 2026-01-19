import type { ReactNode } from "react";

type TomyDeviceFrameProps = {
  label?: string;
  children: ReactNode;
  className?: string;
};

export default function TomyDeviceFrame({
  label,
  children,
  className,
}: TomyDeviceFrameProps) {
  return (
    <figure className={`tomy-device ${className ?? ""}`}>
      {label ? <figcaption className="tomy-device__label">{label}</figcaption> : null}

      <div className="tomy-device__shell">
        <div className="tomy-device__viewport" role="img" aria-label="Tomy UI screen">
          {children}
        </div>
      </div>
    </figure>
  );
}