import React from 'react';
import { changeTitlePage } from '../../../utils';
import { PageMain } from '../../Common';

type IntroduceProps = {};

export function Introduce(props: IntroduceProps) {
  React.useEffect(() => {
    changeTitlePage('Giới thiệu');
  }, []);

  return <PageMain>Trang giới thiệu</PageMain>;
}
