import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { PageMain } from '../../../../components/Common';
import { changeTitlePage } from '../../../../utils';
import { selectAuth, userLogin } from '../../authSlice';

type Props = {};

export const Login = (props: Props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const dispatch = useAppDispatch();
  const authState = useAppSelector(selectAuth);
  const { status } = authState;

  React.useEffect(() => {
    changeTitlePage('Đăng nhập');
  }, []);

  const handleSigninWithGoogle = () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        console.log('check response', response.user);
        const { displayName, photoURL, refreshToken, uid } = response.user;
        const data = {
          displayName,
          photoURL,
          refreshToken,
          uid,
        };

        const responses = await dispatch(userLogin(data));
        console.log(responses);

        if (responses.payload) navigate('/create-post');
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  return (
    <PageMain>
      <div className="main-login">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="text-center">Đăng nhập</h1>
              <div className="form-login">
                {status === 'loading' ? (
                  <Spinner>...Loading...</Spinner>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleSigninWithGoogle}
                    disabled={authing}
                  >
                    Đăng nhập với Google
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
