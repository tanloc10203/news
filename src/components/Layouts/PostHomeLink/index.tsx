import React from 'react';
import { Link } from 'react-router-dom';
import item1 from '../../../public/img/item1.jpg';

interface PostHomeLinkProps {}

export const PostHomeLink = (props: PostHomeLinkProps) => {
  return (
    <Link to="" className="content-item">
      <img src={item1} alt="" />
      <div className="content-item--main">
        <p>
          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất, Mưa làm máy bay
          'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
        </p>
        <span className="text-muted">2 giờ trước</span>
      </div>
    </Link>
  );
};
