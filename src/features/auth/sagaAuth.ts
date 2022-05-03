import { PayloadAction } from '@reduxjs/toolkit';
import { delay, put, takeLatest } from 'redux-saga/effects';
import { clearUserLogin, setUserLogin, userLogin } from './authSlice';

function* hanldeUserLogin(action: PayloadAction<object>) {
  yield delay(2000);
  yield put(setUserLogin(action.payload));
}

function* handleClearUserLogin() {
  yield clearUserLogin();
}

export default function* authSaga() {
  yield takeLatest(userLogin.toString(), hanldeUserLogin);
  yield takeLatest(clearUserLogin.toString(), handleClearUserLogin);
}
