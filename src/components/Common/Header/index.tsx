import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { getAuth, signOut } from 'firebase/auth';
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { useWindowScroll } from '../../../hooks';
import { CustomLink } from '../CustomLink';
import styles from './Header.module.scss';

interface HeaderProps {}

export function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [img, setImg] = React.useState('');
  const heightWindow = useWindowScroll();
  const auth = getAuth();
  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{}');

  React.useEffect(() => {
    if (authUser && authUser.photoURL) {
      setImg(authUser.photoURL);
    }
  }, [authUser]);

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

                    {localStorage.getItem('auth_user') ? (
                      <NavItem>
                        <CustomLink
                          to="/logout"
                          onClick={() => {
                            signOut(auth);
                            localStorage.removeItem('auth_user');
                          }}
                        >
                          Đăng xuất
                        </CustomLink>
                      </NavItem>
                    ) : (
                      <NavItem>
                        <CustomLink to="/login">Đăng nhập</CustomLink>
                      </NavItem>
                    )}
                  </Nav>

                  <div className={styles.headerSearch}>
                    <input className="form-control me-2" type="search" placeholder="Tìm kiếm" />
                    <button className="btn btn-outline-light" type="submit">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                    {localStorage.getItem('auth_user') && (
                      <div className={styles.headerImg}>
                        {/* <Link to=""> */}
                        <img src={img} alt="" />
                        {/* </Link> */}
                      </div>
                    )}
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
