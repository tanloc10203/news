import { Navigate } from 'react-router-dom';

type Props = {};

export const Logout = (props: Props) => {
  return <Navigate to="/login" />;
};
