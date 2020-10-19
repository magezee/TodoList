import {
    IAuthState,
    IUserState,
    LOGIN,
    REGISTER,
    LOGIN_SUC,
    KEEP_LOGIN,
} from './types';

export const login = (authState: IAuthState) => ({
    type: LOGIN,
    payload: authState,
});

export const register = (authState: IAuthState) => ({
    type: REGISTER,
    payload: authState,
});

export const logout = () => ({
    type: LOGIN,
});

export const keepLogin = (userState: IUserState) => ({
    type: KEEP_LOGIN,
    payload: userState,
});