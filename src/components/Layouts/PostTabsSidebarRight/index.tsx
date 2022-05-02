import React from 'react';
import { Link } from 'react-router-dom';

interface PostTabsSidebarRightProps {}

export const PostTabsSidebarRight = (props: PostTabsSidebarRightProps) => {
  return (
    <div className="main-tabsSidebarRight--post">
      <div className="col-lg-1 time text-muted">16:00</div>
      <Link to="#">
        Dù đã là mẹ ba con, Jessica Alba vẫn ngoạn mục trong những bộ bikini tuyệt phẩm
      </Link>
    </div>
  );
};
