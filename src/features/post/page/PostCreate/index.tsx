import React from 'react';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';

interface PostCreateProps {}

export function PostCreate(props: PostCreateProps) {
  React.useEffect(() => {
    changeTitlePage('Viêt bài');
  }, []);
  return <PageMain>Trang tạo bài viết</PageMain>;
}
