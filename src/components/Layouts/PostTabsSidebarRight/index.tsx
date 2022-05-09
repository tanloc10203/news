import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../../models';
import { formatLink } from '../../../utils/format';

interface PostTabsSidebarRightProps {
  data: Post;
}

export const PostTabsSidebarRight = (props: PostTabsSidebarRightProps) => {
  const { data } = props;
  return (
    <div className="main-tabsSidebarRight--post">
      <div className="col-lg-1 time text-muted">{data.time || '1h trước'}</div>
      <Link to={`/news/${data.categoryId}/${formatLink(data.title)}`} state={data}>
        {data.title}
      </Link>
    </div>
  );
};
