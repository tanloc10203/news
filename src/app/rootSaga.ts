import { all } from 'redux-saga/effects';
import authSaga from '../features/auth/sagaAuth';

export default function* rootSaga() {
  console.log('Root Saga');
  yield all([authSaga()]);
}
