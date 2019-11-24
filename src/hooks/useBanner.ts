import { useEffect } from "react";
import { useReducer } from 'reinspect'

import { fetchApi } from '@/api'
import { bannerReducer } from '@/redux'
import { BANNER_FAIL, BANNER_INIT, BANNER_SUCCESS } from '@/redux/constants'

export const useBanner = () => {
    const [state, dispatch] = useReducer(bannerReducer, {
        isLoading: false,
        isError: false,
        bannerUrl: []
    }, 'banner首页轮播');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: BANNER_INIT });
            try {
                const result = await fetchApi.banner();
                if (!didCancel && result.data.code === 200) {
                    dispatch({
                        type: BANNER_SUCCESS,
                        bannerUrl: result.data.banners.map((item: any) => {
                            return {
                                imgSrc: item.imageUrl,
                                typeTitle: item.typeTitle,
                                titleColor: item.titleColor
                            }
                        })
                    })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: BANNER_FAIL })
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        }
    }, []);

    return { state }
};
