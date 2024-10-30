import ToolbarBtn from '@/ui/page/post/toolbar/ToolbarBtn';
import { Editor } from '@tiptap/react';
import { LuHeading1, LuHeading2, LuHeading3 } from 'react-icons/lu';
import { PiParagraph } from 'react-icons/pi';

interface HeadingToolbarProps {
  editor: Editor;
}

const HeadingToolbar = ({ editor }: HeadingToolbarProps) => {
  return (
    <div className="flex items-center gap-1 px-2">
      <ToolbarBtn onClick={() => editor.chain().focus().setParagraph().run()}>
        <PiParagraph />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <LuHeading1 />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <LuHeading2 />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <LuHeading3 />
      </ToolbarBtn>
    </div>
  );
};

export default HeadingToolbar;
