import clsx from 'clsx';
import React, { useState } from 'react';
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import { PostTabsSidebarRight } from '../PostTabsSidebarRight';
import './TabsSidebarRight.scss';

interface TabsSidebarRightProps {}

export const TabsSidebarRight = (props: TabsSidebarRightProps) => {
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
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Col lg="12" key={i}>
                <PostTabsSidebarRight />
              </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Col lg="12" key={i}>
                <PostTabsSidebarRight />
              </Col>
            ))}
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
};
