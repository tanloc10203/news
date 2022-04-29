import React, { ReactNode } from 'react';
import { BackToTop } from '../BackToTop';
import { Footer } from '../Footer';
import { Header } from '../Header';

interface PageMainProps {
  children: ReactNode;
}

export function PageMain(props: PageMainProps) {
  return (
    <>
      <Header />
      {props.children}
      <BackToTop />
      <Footer />
    </>
  );
}
