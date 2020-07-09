import { Context } from 'koa'   // 引入Context接口用于规范ctx的类型
import { StatusCode } from './enum'

// 规范返回数据类型
interface IRes {
    ctx: Context;
    statusCode?: number;
    data?: any;
    errorCode?: number;
    msg?: string;
}

const createRes = (params: IRes) => {
    params.ctx.status = params.statusCode! || StatusCode.OK // !表示非空断言，加在可能为空的变量后面，空则为flase
    params.ctx.body = {
        error_code: params.errorCode || 0,
        data: params.data || null,
        msg: params.msg || ''
    }
}

export default createRes