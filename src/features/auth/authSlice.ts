import { RootState } from './../../app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  userLogin: object;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: AuthState = {
  userLogin: {},
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
      state.userLogin = action.payload;
    },
    clearUserLogin: () => {
      return initialState;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { userLogin, setUserLogin, clearUserLogin } = authSlice.actions;
export default authSlice.reducer;
