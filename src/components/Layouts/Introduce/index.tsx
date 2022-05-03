import React from 'react';
import { changeTitlePage } from '../../../utils';
import { PageMain } from '../../Common';

type IntroduceProps = {};

export function Introduce(props: IntroduceProps) {
  React.useEffect(() => {
    changeTitlePage('Giới thiệu');
  }, []);

  return (
    <PageMain>
      <div>
        <h1 className="text-center">Trang giới thiệu</h1>
      </div>
    </PageMain>
  );
}
