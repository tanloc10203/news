import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Post } from '../../../models';
import { formatLink } from '../../../utils/format';
import styles from './PostOutstanding.module.scss';

interface PostOutstandingProps {
  data: Post;
  categoryName?: string;
}

export const PostOutstanding = (props: PostOutstandingProps) => {
  return (
    <div className={styles.postOutstanding}>
      <Link
        to={`/news/${props.data.categoryId}/${formatLink(props.data.title)}`}
        state={props.data}
      >
        <img src={props.data.imgTitle} alt="" />
        <div className={styles.postOutstandingContent}>
          <h2>{props.data.title}</h2>
          <span className="text-muted me-4">{props.data.time} trước</span>
          <span># {props.categoryName}</span>
        </div>
      </Link>
      <Outlet />
    </div>
  );
};
