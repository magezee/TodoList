import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createSagaMiddleware from 'redux-saga'
import {put,delay} from 'redux-saga/effects'

import { createStore, applyMiddleware } from 'redux'

const sagaMiddleware = createSagaMiddleware()
function* demoAsync() {
  yield delay(1000)		// 延时函数，单位ms
  yield put({ type: 'DEMO'})
}
const store = createStore(
  demoAsync,	// 这个reducer是用combineReducers综合导出的reducer
  applyMiddleware(sagaMiddleware)	// 声明使用saga中间件
)
sagaMiddleware.run(demoAsync)
const gen = demoAsync()
let g1 = gen.next() // => { done: false, value: <result of calling delay(1000)> }
let g2 = gen.next() // => { done: false, value: <result of calling put({type: 'DEMO'})> }
let g3 = gen.next() // => { done: true, value: undefined }

console.log(g1)
console.log(g2)
console.log(g3)

ReactDOM.render(
  <>
    <App />
  </>,
  document.getElementById('root')
);


