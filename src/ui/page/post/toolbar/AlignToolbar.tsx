import ToolbarBtn from "@/ui/page/post/toolbar/ToolbarBtn";
import { RiAlignCenter, RiAlignLeft, RiAlignRight } from "react-icons/ri";
import { Editor } from "@tiptap/react";

interface AlignToolbarProps {
  editor: Editor;
}

const AlignToolbar = ({ editor }: AlignToolbarProps) => {
  return (
    <div className="flex items-center gap-1 border-l px-2">
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <RiAlignLeft />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <RiAlignCenter />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <RiAlignRight />
      </ToolbarBtn>
    </div>
  );
};

export default AlignToolbar;
