import React from 'react';
import { changeTitlePage } from '../../../utils';
import { PageMain } from '../../Common';

type ContactProps = {};

export function Contact(props: ContactProps) {
  React.useEffect(() => {
    changeTitlePage('Liên hệ');
  }, []);
  return <PageMain>Trang Liên hệ</PageMain>;
}
