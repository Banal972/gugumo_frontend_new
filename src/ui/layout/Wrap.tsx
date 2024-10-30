export default function Wrap({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-[95%] max-w-[1200px] ${className}`}>
      {children}
    </div>
  );
}
