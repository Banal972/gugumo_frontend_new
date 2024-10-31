interface HeadingsProps {
  order: string;
  label: string;
}

const Headings = ({ order, label }: HeadingsProps) => {
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <p className="flex size-[23px] flex-none items-center justify-center rounded-full bg-primary text-lg font-semibold text-white md:size-[34px] md:text-2xl">
        {order}
      </p>
      <h3 className="break-keep text-lg font-medium md:text-2xl">{label}</h3>
    </div>
  );
};

export default Headings;
