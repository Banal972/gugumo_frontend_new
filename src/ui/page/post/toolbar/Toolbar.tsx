import AlignToolbar from '@/ui/page/post/toolbar/AlignToolbar';
import HeadingToolbar from '@/ui/page/post/toolbar/HeadingToolbar';
import StyleFontToolbar from '@/ui/page/post/toolbar/StyleFontToolbar';
import StyleToolbar from '@/ui/page/post/toolbar/StyleToolbar';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
  type?: 'bubble';
}

const Toolbar = ({ editor, type }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div
      className={`mb-5 flex items-center gap-1 bg-white py-2 ${type === 'bubble' ? 'overflow-x-auto rounded-full border px-4' : 'flex-wrap border-b'}`}
    >
      <HeadingToolbar editor={editor} />
      <AlignToolbar editor={editor} />
      <StyleFontToolbar editor={editor} />
      <StyleToolbar editor={editor} />
    </div>
  );
};

export default Toolbar;
