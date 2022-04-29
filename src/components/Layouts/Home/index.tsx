import React from 'react';
import { PageMain } from '../../Common';
import './Home.scss';
import img1 from '../../../public/img/noiBat.jpg';
import { PostOutstanding } from '../PostOutstanding';
import item1 from '../../../public/img/item1.jpg';
import { Link } from 'react-router-dom';

interface HomeProps {}

export function Home(props: HomeProps) {
  const dataFirt = {
    img: img1,
    content: 'sdfsdfsdfs sdfs',
    title: 'Đề nghị dừng lưu hành MV có nội dung tiêu cực của Sơn Tùng - MTP',
  };

  return (
    <>
      <PageMain>
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-8 col-md-12 content1">
              <PostOutstanding img={dataFirt.img} title={dataFirt.title} />

              {/* Start Section */}
              <section className="content-wp mt-3">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="content-wp mt-3">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="content-wp mt-3">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="content-wp mt-3">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section className="content-wp mt-3">
                <div className="row">
                  <div className="col-lg-6 col-md-12 mb-3">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất,
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Link to="" className="content-item">
                      <img src={item1} alt="" />
                      <div className="content-item--main">
                        <p>
                          Mưa làm máy bay 'tắc' trên trời, Tân Sơn Nhất căng mình giảm ùn ứ mặt đất
                        </p>
                        <span className="text-muted">2 giờ trước</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </section>
              {/* End Section */}
            </div>
            <div className="col-lg-4 col-md-12 content2">Nội dung 2</div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
