import { takeEvery } from 'redux-saga/effects';

import { login, register, logout } from './store/user/saga';
import { LOGIN, REGISTER, LOGOUT } from './store/user/types';

function* rootSaga() {
    yield takeEvery(LOGIN, login);
    yield takeEvery(LOGOUT, logout);
    yield takeEvery(REGISTER, register);
}

export default rootSaga;