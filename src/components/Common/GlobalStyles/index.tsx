import React from 'react';
import './GlobalStyles.scss';
import 'bootstrap/dist/css/bootstrap.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface GlobalStylesProps {
  children: React.ReactNode;
}

export function GlobalStyles(props: GlobalStylesProps) {
  return <>{props.children}</>;
}
