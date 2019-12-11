import { useEffect } from 'react'
import { useReducer } from "reinspect";

import { LOGOUT_FAIL, LOGOUT_INIT, LOGOUT_SUCCESS } from '@/redux/constants';
import { logoutReducer } from '@/redux';
import { fetchApi } from "@/api";


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
