import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import styles from './Footer.module.scss';

type FooterProps = {};

export const Footer = (props: FooterProps) => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className={styles.footerLogo}>LOGO.</div>
            <span>
              &copy; 2022 Bản quyền thuộc về{' '}
              <Link to="//github.com/tanloc10203" target="_blank">
                END COOL
              </Link>
              . Cấm sao chép dưới mọi hình thức nếu không có sự chấp thuận bằng văn bản. Phát triển
              bởi END COOL.
            </span>
          </div>
          <div className="col-md-12 col-lg-6 mt-2">
            <div className={styles.footerRight}>
              <nav className="site-footer__tool">
                <NavLink target="_blank" to="//datbao.thanhnien.vn" title="Đặt báo">
                  Đặt báo
                </NavLink>
                <Link target="_blank" to="//banggia.thanhnien.vn/" title="Quảng cáo">
                  Quảng cáo
                </Link>
                <Link target="_blank" to="//thanhnien.vn/rss.html" title="RSS">
                  RSS
                </Link>
                <Link target="_blank" to="//thanhnien.vn/toa-soan.html" title="Thông tin tòa soạn">
                  Tòa soạn
                </Link>
                <Link target="_blank" to="//thanhnien.vn/policy.html">
                  Chính sách bảo mật
                </Link>
              </nav>
              <p>
                Tổng biên tập: <strong>Nguyễn Ngọc Toàn</strong>
              </p>
              <p>
                Phó tổng biên tập: <strong>Hải Thành</strong>
              </p>
              <p>
                Phó tổng biên tập: <strong>Đặng Thị Phương Thảo</strong>
              </p>
              <p>
                Ủy viên Ban biên tập - Tổng Thư ký tòa soạn: <strong>Trần Việt Hưng</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
