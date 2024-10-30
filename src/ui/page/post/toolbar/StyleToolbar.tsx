import ToolbarBtn from '@/ui/page/post/toolbar/ToolbarBtn';
import { Editor } from '@tiptap/react';
import { useEffect, useRef, useState } from 'react';
import { ChromePicker } from 'react-color';
import { RiMarkPenLine, RiPaletteLine } from 'react-icons/ri';

const StyleToolbar = ({ editor }: StyleToolbarProps) => {
  const [highlight, setHighlight] = useState('#000');
  const [openHighlight, setOpenHighlight] = useState<boolean>(false);
  const highlightRef = useRef<HTMLDivElement>(null);

  const [color, setColor] = useState<string>('#000');
  const [openColor, setOpenColor] = useState<boolean>(false);
  const colorRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex gap-1 border-l px-2">
      <div className="relative z-10">
        <ToolbarBtn onClick={() => setOpenHighlight(!openHighlight)}>
          <RiMarkPenLine />
        </ToolbarBtn>
        {openHighlight && (
          <div ref={highlightRef} className="top-100% absolute left-0">
            <ChromePicker
              color={highlight}
              onChange={(color) => {
                setHighlight(color.hex);
              }}
              onChangeComplete={(color) => {
                editor.chain().focus().setHighlight({ color: color.hex }).run();
              }}
            />
          </div>
        )}
      </div>
      <div className="relative z-10">
        <ToolbarBtn onClick={() => setOpenColor(!openColor)}>
          <RiPaletteLine />
        </ToolbarBtn>
        {openColor && (
          <div ref={colorRef} className="top-100% absolute left-0">
            <ChromePicker
              color={color}
              onChange={(color) => {
                setColor(color.hex);
              }}
              onChangeComplete={(color) => {
                editor.chain().focus().setColor(color.hex).run();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StyleToolbar;

interface StyleToolbarProps {
  editor: Editor;
}
