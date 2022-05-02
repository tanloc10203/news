import React from 'react';
import { PostHomeLink } from '../PostHomeLink';
import img1 from '../../../public/img/baichinh-shutterstock-1237721128-cuyl-5623.jpg';
import styles from './CategoryPostHome.module.scss';
import { Link } from 'react-router-dom';

interface CategoryPostHomeProps {
  titleCategory: string;
  isContentRights: boolean;
}

export const CategoryPostHome = (props: CategoryPostHomeProps) => {
  return (
    <section>
      <div className="row mb-4">
        <div className="col-lg-12">
          <Link to="#" className={styles.title}>
            {props.titleCategory}
          </Link>
        </div>
        {props.isContentRights ? (
          <>
            <div className="col-lg-6 col-md-12">
              <div className={styles.content}>
                <Link to="#">
                  <img src={img1} alt="" />
                  <div>
                    <h6>Ngày mới với tin tức sức khỏe: Tìm ra nguyên nhân gây đột quỵ khi tắm</h6>
                    <span className="text-muted">20 giờ trước</span>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="mb-2">
                <PostHomeLink />
              </div>
              <div className="mb-2">
                <PostHomeLink />
              </div>
              <div className="mb-2">
                <PostHomeLink />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="col-lg-6 col-md-12">
              <div className="mb-2">
                <PostHomeLink />
              </div>
              <div className="mb-2">
                <PostHomeLink />
              </div>
              <div className="mb-2">
                <PostHomeLink />
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className={styles.content}>
                <Link to="#">
                  <img src={img1} alt="" />
                  <div>
                    <h6>Ngày mới với tin tức sức khỏe: Tìm ra nguyên nhân gây đột quỵ khi tắm</h6>
                    <span className="text-muted">20 giờ trước</span>
                  </div>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
