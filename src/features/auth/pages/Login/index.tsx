import React from 'react';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';

type Props = {};

export const Login = (props: Props) => {
  React.useEffect(() => {
    changeTitlePage('Đăng nhập');
  }, []);

  return (
    <PageMain>
      <div style={{ height: '1000vh' }}>Login</div>
    </PageMain>
  );
};
