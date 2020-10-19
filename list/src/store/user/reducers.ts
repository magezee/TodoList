import {
    LOGIN_SUC,
    UserActionTypes,
    REGISTER_SUC,
    IUserState,
    KEEP_LOGIN,
    LOGOUT_SUC
}  from './types';

const initialState: IUserState = {
    userId: '',
    username: '',
    errMsg: '',
};

// 此reducer的功能是将用户的登入的信息和登入状态提示添加进state
export default function userReducer(
    state = initialState,
    action: UserActionTypes
) {
    switch (action.type) {
        case REGISTER_SUC:
            // 新建一个空对象，将state和payload的所有内容复制进去，返回一个全新的state
            // 虽然计划是action.payload已经包含所有的state信息，和state略为重复，但是重新传一次state表示和原有的state有联系，显得严谨
            // 后面同名的属性传值会覆盖之前的
            return {
                
                ...state,           
                ...action.payload,
            };
        case LOGIN_SUC:
            return {
                ...state,
                ...action.payload
            };
        case LOGOUT_SUC:
            return {
                ...state,
                userId: '',
                username: '',
                errMsg: '',
            };
        case KEEP_LOGIN:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state
    }
}