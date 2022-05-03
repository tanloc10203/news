import React from 'react';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';

interface RegisterProps {}

export const Register = (props: RegisterProps) => {
  React.useEffect(() => {
    changeTitlePage('Đăng ký');
  }, []);
  return (
    <PageMain>
      <div style={{ height: '1000vh' }}>Register</div>
    </PageMain>
  );
};
