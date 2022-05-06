import React from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import './ReactQuillCustomProps.scss';

export interface ReactQuillCustomProps {
  text: string;
  onChangeValue?: (event: any) => void;
}

export const ReactQuillCustom = (props: ReactQuillCustomProps) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],

      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],

      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['link', 'image', 'video'],
      [{ color: [] }, { background: [] }],

      ['clean'],
    ],
    clipboard: {
      matchVisual: true,
    },
  };
  const formats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'indent',
    'size',
    'header',
    'link',
    'image',
    'video',
    'color',
    'background',
    'clean',
  ];
  const { text, onChangeValue } = props;
  const { quill, quillRef } = useQuill({ modules, formats, theme: 'snow' });

  React.useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta: any, oldDelta: any, source: any) => {
        console.log('Text change!');
        console.log(quill.getText()); // Get text only
        console.log(quill.getContents()); // Get delta contents
        console.log(quill.root.innerHTML); // Get innerHTML using quill
        console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
      });
    }
  }, [quill]);

  return (
    <>
      <div className="mb-2 react-quill">
        <div ref={quillRef} />
      </div>
    </>
  );
};
