import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './PostOutstanding.module.scss';

interface PostOutstandingProps {
  img: string;
  title: string;
}

export const PostOutstanding = (props: PostOutstandingProps) => {
  return (
    <div className={styles.postOutstanding}>
      <Link to="">
        <img src={props.img} alt="" />
        <div className={styles.postOutstandingContent}>
          <h2>{props.title}</h2>
          <span className="text-muted">1 giờ trước</span>
        </div>
      </Link>
      <Outlet />
    </div>
  );
};
