import React from 'react';
import { PageMain } from '../../Common';
import './Home.scss';
import img1 from '../../../public/img/noiBat.jpg';
import { PostOutstanding } from '../PostOutstanding';
import item1 from '../../../public/img/item1.jpg';
import { Link } from 'react-router-dom';
import { CategoryPostHome } from '../CategoryPostHome';
import { PostHomeLink } from '../PostHomeLink';
import { TabsSidebarRight } from '../TabsSidebarRight';
import { changeTitlePage } from '../../../utils';

interface HomeProps {}

export function Home(props: HomeProps) {
  const dataFirt = {
    img: img1,
    content: 'sdfsdfsdfs sdfs',
    title: 'Đề nghị dừng lưu hành MV có nội dung tiêu cực của Sơn Tùng - MTP',
  };

  React.useEffect(() => {
    changeTitlePage('Trang chủ');
  }, []);

  return (
    <>
      <PageMain>
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-9 col-md-12 content1">
              <PostOutstanding img={dataFirt.img} title={dataFirt.title} />

              {[1, 2, 3].map((i) => (
                <section className="content-wp mt-3" key={i}>
                  <div className="row">
                    <div className="col-lg-6 col-md-12 mb-3">
                      <PostHomeLink />
                    </div>
                    <div className="col-lg-6 col-md-12">
                      <PostHomeLink />
                    </div>
                  </div>
                </section>
              ))}

              <CategoryPostHome titleCategory="Kinh tế" isContentRights />
              <CategoryPostHome titleCategory="Văn hóa" isContentRights={false} />
              <CategoryPostHome titleCategory="Tin thị trường" isContentRights />
            </div>
            <div className="col-lg-3 col-md-12 content2">
              <TabsSidebarRight />
            </div>
          </div>
        </div>
      </PageMain>
    </>
  );
}
