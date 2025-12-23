type TomyFrameProps = {
  children: React.ReactNode;
};

export function TomyFrame({ children }: TomyFrameProps) {
  return (
    <div className="tomy-frame tomy-frame--square">
      {children}
    </div>
  );
}