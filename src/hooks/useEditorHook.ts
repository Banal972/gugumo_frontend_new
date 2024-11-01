import { Color } from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const useEditorHook = (content?: string) => {
  return useEditor({
    content,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: '내용을 입력해주세요...',
        emptyEditorClass:
          'before:h-0 before:pointer-events-none before:float-left before:text-[#adb5bd] before:content-[attr(data-placeholder)]',
        emptyNodeClass:
          'before:h-0 before:pointer-events-none before:float-left before:text-[#adb5bd] before:content-[attr(data-placeholder)]',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
      }),
    ],
    editorProps: {
      attributes: {
        class:
          'w-full prose prose-sm sm:prose-base p-5 focus:outline-none max-w-none box-border',
      },
    },
    immediatelyRender: true,
    shouldRerenderOnTransaction: false,
  });
};

export default useEditorHook;
