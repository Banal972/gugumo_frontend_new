import { MouseEventHandler, ReactNode } from "react";

interface ToolbarBtnProps {
  onClick?: MouseEventHandler;
  children: ReactNode;
}

const ToolbarBtn = ({ onClick, children }: ToolbarBtnProps) => {
  return (
    <button
      className="flex size-7 items-center justify-center rounded-md text-lg transition-colors hover:bg-gray-300"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default ToolbarBtn;
