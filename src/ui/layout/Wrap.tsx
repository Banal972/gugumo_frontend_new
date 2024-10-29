export default function Wrap({children,className} : {children? :React.ReactNode,className? : string}) {
  return (
    <div className={`max-w-[1200px] mx-auto w-[95%] ${className}`}>
        {children}
    </div>
  )
}
