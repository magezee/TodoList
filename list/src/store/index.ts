import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../saga';
import userReducer from './user/reducers';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    user: userReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

// 这里的AppStore实际上是combineReducers中所有state的并类型，相当于{ user: IUserState, xxx:XXX ... }(注意这里是一个对象包含所有类型)
// 这样写的好处是可以解构出对应的state，然后直接提示该state的所有属性
export type AppStore = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootSaga);