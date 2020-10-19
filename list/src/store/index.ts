import {applyMiddleware, combineReducers, createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../saga';
import userReducer from './user/reducers';

const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
    userReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);