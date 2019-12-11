import { useEffect } from 'react';
import { useReducer, useState } from 'reinspect';

import {
    LOGIN_EMAIL_SUCCESS,
    LOGIN_FAIL,
    LOGIN_INIT,
    LOGIN_PHONE_SUCCESS,
    LOGOUT_FAIL,
    LOGOUT_INIT,
    LOGOUT_SUCCESS
} from '@/redux/constants';
import { loginReducer, logoutReducer } from '@/redux';
import { fetchApi } from '@/api';
import { setAuthToken } from '@/api/setAuthToken';
import { LoginPhoneParams, LoginEmailParams } from '@/api/types';

// 登陆
export const useLogin = () => {
    const [phoneParams, setPhoneParams] = useState<LoginPhoneParams>(
        { phone: '', password: '', countrycode: 86 },
        '手机登陆参数'
    );
    const [emailParams, setEmailParams] = useState<LoginEmailParams>(
        { email: '', password: '' },
        '邮箱登陆参数'
    );

    const [loginState, dispatch] = useReducer(loginReducer, { isLoading: false, isError: false }, '登陆信息');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: LOGIN_INIT });
            try {
                // 手机登陆
                if (phoneParams.phone) {
                    const resPhone = await fetchApi.login_phone(phoneParams);
                    if (!didCancel && resPhone.data.code === 200) {
                        // 登陆成功后设置 token 请求头
                        setAuthToken(resPhone.data.token);
                        dispatch({ type: LOGIN_PHONE_SUCCESS });
                    }
                }
                // 邮箱登陆
                if (emailParams.email) {
                    const resEmail = await fetchApi.login_email(emailParams);
                    if (!didCancel && resEmail.data.code === 200) {
                        // 登陆成功后设置 token 请求头
                        setAuthToken(resEmail.data.token);
                        dispatch({ type: LOGIN_EMAIL_SUCCESS });
                    }
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: LOGIN_FAIL });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true
        }
    }, [emailParams, phoneParams]);

    return { loginState, setPhoneParams, setEmailParams }
};

// 登出
export const useLogout = () => {
    const [logoutState, dispatch] = useReducer(logoutReducer,{
        isLoading: false,
        isError: false,
    }, '退出登陆的reducer');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: LOGOUT_INIT });
            try {
                const res = await fetchApi.logout();
                if(!didCancel && res.data.code === 200) {
                    dispatch({ type: LOGOUT_SUCCESS });
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: LOGOUT_FAIL })
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        }
    }, []);

    return { logoutState }
};

