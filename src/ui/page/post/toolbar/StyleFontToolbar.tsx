import ToolbarBtn from '@/ui/page/post/toolbar/ToolbarBtn';
import { Editor } from '@tiptap/react';
import { useCallback } from 'react';
import {
  RiBold,
  RiItalic,
  RiLinksLine,
  RiLinkUnlink,
  RiStrikethrough,
  RiUnderline,
} from 'react-icons/ri';

interface StyleFontToolbarProps {
  editor: Editor;
}
const StyleFontToolbar = ({ editor }: StyleFontToolbarProps) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const unLink = useCallback(() => {
    editor.chain().focus().unsetLink().run();
  }, [editor]);

  return (
    <div className="flex items-center gap-1 border-l px-2">
      <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()}>
        <RiBold />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()}>
        <RiItalic />
      </ToolbarBtn>
      <ToolbarBtn
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <RiUnderline />
      </ToolbarBtn>
      <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()}>
        <RiStrikethrough />
      </ToolbarBtn>
      {!editor.isActive('link') && (
        <ToolbarBtn onClick={setLink}>
          <RiLinksLine />
        </ToolbarBtn>
      )}
      {editor.isActive('link') && (
        <ToolbarBtn onClick={unLink}>
          <RiLinkUnlink />
        </ToolbarBtn>
      )}
    </div>
  );
};

export default StyleFontToolbar;
