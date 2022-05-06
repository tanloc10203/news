import React from 'react';
import { useQuill } from 'react-quilljs';

import './ReactQuillCustomProps.scss';

export interface ReactQuillCustomProps {
  quillRef: any;
}

export const ReactQuillCustom = (props: ReactQuillCustomProps) => {
  const { quillRef } = props;

  return (
    <>
      <div className="mb-2 react-quill">
        <div ref={quillRef} />
      </div>
    </>
  );
};
