import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const auth = getAuth();
  const navigation = useNavigate();
  const authUser = Boolean(localStorage.getItem('auth_user'));

  useEffect(() => {
    const authCheck = onAuthStateChanged(auth, (user) => {
      if (!authUser && !user) {
        console.log('User is not logged in');
        navigation('/login');
      }
    });
    authCheck();
    return () => {
      authCheck();
    };
  }, [auth, authUser, navigation]);

  return <>{children}</>;
}
