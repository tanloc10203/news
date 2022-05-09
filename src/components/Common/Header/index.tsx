import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { getAuth, signOut } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap';
import { db } from '../../../config';
import { useWindowScroll } from '../../../hooks';
import { cutNameUrl } from '../../../utils/format';
import { CustomLink } from '../CustomLink';
import styles from './Header.module.scss';

interface HeaderProps {}

export interface Category {
  id: string;
  name: string;
  link: string;
}

export function Header(props: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState('');
  const heightWindow = useWindowScroll();
  const auth = getAuth();
  const authUser = JSON.parse(localStorage.getItem('auth_user') || '{}');
  const categoryCollectionRef = collection(db, 'category');
  const [category, setCategory] = useState(Array<Category>());
  const location = useLocation();

  useEffect(() => {
    if (authUser && authUser.photoURL) {
      setImg(authUser.photoURL);
    }
  }, [authUser]);

  useEffect(() => {
    const getCategory = async () => {
      const data = await getDocs(categoryCollectionRef);
      if (data) {
        const newDate = data.docs.map((docs) => {
          return { ...docs.data(), id: docs.id } as Category;
        });
        setCategory(newDate);
      }
    };
    getCategory();
  }, [categoryCollectionRef]);

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
              {category && category.length ? (
                category.map((item, i) => (
                  <Link
                    key={i}
                    to={`/news/${item.link}-${item.id}`}
                    style={{
                      color:
                        location &&
                        location.pathname &&
                        cutNameUrl(location.pathname, 6) === item.link
                          ? 'black'
                          : '',
                    }}
                  >
                    {item.name}
                  </Link>
                ))
              ) : (
                <div className={styles.loading}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
