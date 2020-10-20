import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';

import App from './App';
import { store } from './store';


ReactDOM.render(
	<Provider store={store}>
		<ConfigProvider locale={zhCN}>
			<App />
		</ConfigProvider>
	</Provider>,
	document.getElementById('root')
);


