import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useAppSelector } from '../../../../app/hooks';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';
import { selectAuth } from '../../authSlice';

type Props = {};

export const Login = (props: Props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const authState = useAppSelector(selectAuth);
  const { status } = authState;

  React.useEffect(() => {
    changeTitlePage('Đăng nhập');
  }, []);

  const handleSigninWithGoogle = () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        // const credential = GoogleAuthProvider.credentialFromResult(response);
        // const token = credential && credential.accessToken;
        const user = response.user;

        localStorage.setItem('auth_user', JSON.stringify(user));

        user && navigate('/create-post');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <PageMain>
      <div className="main-login" style={{ height: '336px' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center p-3">
              <h5 className="">Đăng nhập với Google</h5>
              <div className="form-login">
                {status === 'loading' ? (
                  <Spinner>...Loading...</Spinner>
                ) : (
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleSigninWithGoogle}
                    disabled={authing}
                  >
                    Google
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageMain>
  );
};
