import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const auth = getAuth();
  const navigation = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    authCheck();
    return () => {
      authCheck();
    };
  }, [auth]);

  const authCheck = onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoading(false);
    } else {
      console.log('User is not logged in');
      navigation('/login');
    }
  });

  if (loading) return <Spinner>Loading...</Spinner>;

  return <>{children}</>;
}
