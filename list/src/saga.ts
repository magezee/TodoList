import { takeEvery } from 'redux-saga/effects';

import { login, register, logout } from './store/user/saga';
import { LOGIN, REGISTER, LOGOUT } from './store/user/types';

function* test(action:any) {
    console.log(action)
}

function* rootSaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(LOGOUT, logout);
    yield takeEvery(REGISTER, register);
    yield takeEvery('test', test)
}

export default rootSaga;