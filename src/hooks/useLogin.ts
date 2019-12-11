import { useEffect } from 'react';

import { fetchApi } from '@/api';
import { setAuthToken } from '@/api/setAuthToken';
import { LoginPhoneParams, LoginEmailParams } from '@/api/types';
import { LOGIN_EMAIL_SUCCESS, LOGIN_FAIL, LOGIN_INIT, LOGIN_PHONE_SUCCESS } from '@/redux/constants';
import { loginReducer } from '@/redux';
import { useReducer, useState } from 'reinspect';

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
