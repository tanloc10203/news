import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { userLoginM } from '../../models';
import { RootState } from './../../app/store';

export interface AuthState {
  userLogin: userLoginM;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  userLogin: {
    displayName: '',
    photoURL: '',
    token: '',
    uid: '',
  },
  status: 'idle',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLogin: (state, action: PayloadAction<object>) => {
      state.status = 'loading';
    },
    setUserLogin: (state, action: PayloadAction<object>) => {
      state.status = 'idle';
      state.userLogin = { ...state.userLogin, ...action.payload };
    },
    clearUserLogin: () => {
      return initialState;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { userLogin, setUserLogin, clearUserLogin } = authSlice.actions;
export default authSlice.reducer;
