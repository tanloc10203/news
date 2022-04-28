import React from 'react';
import '../../public/scss/reset.scss';
import './GlobalStyles.scss';

interface GlobalStylesProps {
  children: React.ReactNode;
}

export function GlobalStyles(props: GlobalStylesProps) {
  return <>{props.children}</>;
}
