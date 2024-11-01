import AlignToolbar from '@/ui/page/post/toolbar/AlignToolbar';
import HeadingToolbar from '@/ui/page/post/toolbar/HeadingToolbar';
import StyleFontToolbar from '@/ui/page/post/toolbar/StyleFontToolbar';
import { Editor } from '@tiptap/react';

interface ToolbarProps {
  editor: Editor | null;
  type?: 'bubble';
}

const Toolbar = ({ editor, type }: ToolbarProps) => {
  if (!editor) return null;

  return (
    <div
      className={`sticky top-0 z-10 flex items-center gap-1 overflow-x-auto bg-white py-2 ${type === 'bubble' ? 'rounded-full border px-4' : 'border-b'}`}
    >
      <HeadingToolbar editor={editor} />
      <AlignToolbar editor={editor} />
      <StyleFontToolbar editor={editor} />
      {/* 
        @Todo
        에디터 색상, 배경색 색상
        <StyleToolbar editor={editor} /> 
      */}
    </div>
  );
};

export default Toolbar;
