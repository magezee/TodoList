import { message } from 'antd';
import axios from 'axios';

import Config from '../common/config';
import {IRes} from '../common/interface'

const request = axios.create({
    baseURL: Config.API_URI,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

// 使用响应拦截器拦截响应请求并用弹出提示信息
request.interceptors.response.use((response) => {
    const res: IRes = response.data;
    if(res.error_code) {
        message.warn(res.msg);
        throw new Error(res.msg);
    }
    return response.data
});

export default request;