import clsx from 'clsx';
import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { Post } from '../../../models';
import { PostTabsSidebarRight } from '../PostTabsSidebarRight';
import './TabsSidebarRight.scss';

interface TabsSidebarRightProps {
  post: Array<Post>;
}

export const TabsSidebarRight = (props: TabsSidebarRightProps) => {
  const { post } = props;
  const [activeTab, setActiveTab] = useState('1');

  const toggle = (tab: string) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="main-tabsSidebarRight">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={clsx({ active: activeTab === '1' })}
            onClick={() => {
              toggle('1');
            }}
          >
            Tin mới
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={clsx({ active: activeTab === '2' })}
            onClick={() => {
              toggle('2');
            }}
          >
            Đọc nhiều
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            {post && post.length > 0
              ? post.map((item, i) => (
                  <Col lg="12" className="p-0" key={i}>
                    <PostTabsSidebarRight data={item} />
                  </Col>
                ))
              : [1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="content-tabs--loading"></div>
                ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {post &&
              post.length > 0 &&
              post.map((item, i) => (
                <Col lg="12" className="p-0" key={i}>
                  <PostTabsSidebarRight data={item} />
                </Col>
              ))}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};
