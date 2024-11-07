'use client';

import Toolbar from '@/ui/page/post/toolbar/Toolbar';
import { Editor, EditorContent } from '@tiptap/react';

interface EditorLayoutProps {
  editor: Editor | null;
}

const EditorLayout = ({ editor }: EditorLayoutProps) => {
  return (
    <>
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default EditorLayout;
