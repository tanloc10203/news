import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { useWindowScroll } from '../../../hooks';
import { CustomLink } from '../CustomLink';
import styles from './Header.module.scss';

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const heightWindow = useWindowScroll();

  return (
    <div
      className={clsx(styles.headerFixed, {
        [styles.active]: heightWindow >= 10,
      })}
    >
      <div className={styles.header}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">
              {/* Start Nav */}
              <Navbar light expand="lg">
                <NavbarBrand className={styles.headerWpLogo} tag="div">
                  <Link to="/">LOGO.</Link>
                </NavbarBrand>
                <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar className={styles.headerNav}>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                      <CustomLink to="/">Trang chủ</CustomLink>
                    </NavItem>
                    <NavItem>
                      <CustomLink to="/introduce">Giới thiệu</CustomLink>
                    </NavItem>
                    <NavItem>
                      <CustomLink to="/contact">Liên hệ</CustomLink>
                    </NavItem>
                    <NavItem>
                      <CustomLink to="/create-post">Viết bài</CustomLink>
                    </NavItem>
                    {/* <NavItem>
                      <CustomLink to="/login">Đăng xuất</CustomLink>
                    </NavItem> */}
                    <NavItem>
                      <CustomLink to="/login">Đăng nhập</CustomLink>
                    </NavItem>
                    <NavItem>
                      <CustomLink to="/register">Đăng ký</CustomLink>
                    </NavItem>
                  </Nav>
                  <div className={styles.headerSearch}>
                    <input className="form-control me-2" type="search" placeholder="Tìm kiếm" />
                    <button className="btn btn-outline-light" type="submit">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    <div className={styles.headerImg}>
                      <Link to="">
                        <img
                          src="https://kiemtientuweb.com/ckfinder/userfiles/images/avatar-cute/avatar-cute-12.jpg"
                          alt=""
                        />
                      </Link>
                    </div>
                  </div>
                </Collapse>
              </Navbar>
              {/* End Nav */}
            </div>
          </div>
        </div>
        <Outlet />
      </div>

      <div className={styles.headerCategory}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="" className={styles.active}>
                Kinh tế
              </Link>
              <Link to="">Văn hóa</Link>
              <Link to="">Chính trị</Link>
              <Link to="">Xã hội</Link>
              <Link to="">Giải trí</Link>
              <Link to="">Môi trường</Link>
              <Link to="">Thể thao</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
