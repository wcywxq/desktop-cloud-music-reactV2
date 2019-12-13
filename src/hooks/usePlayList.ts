import { useEffect } from 'react';
import { useReducer } from 'reinspect';

import { categoryReducer } from '@/redux';
import { CATEGORY_INIT, CATEGORY_ALL_SUCCESS, CATEGORY_HOT_SUCCESS, CATEGORY_FAIL } from '@/redux/constants';
import { fetchApi } from "@/api";

export const useCategory = () => {
    const [categoryState, dispatch] = useReducer(categoryReducer, {
        isLoading: false,
        isError: false,
        allData: [],
        hotData: []
    }, "歌单分类的reducer");

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: CATEGORY_INIT });

            try {
                const res_all = await fetchApi.categoryCatList();
                const res_hot = await fetchApi.categoryHot();
                if (!didCancel && res_all.data.code === 200) {
                    dispatch({
                        type: CATEGORY_ALL_SUCCESS,
                        allData: res_all.data
                    });
                }
                if(!didCancel && res_hot.data.code === 200) {
                    dispatch({
                        type: CATEGORY_HOT_SUCCESS,
                        hotData: res_hot.data.tags
                    });
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: CATEGORY_FAIL });
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        }
    }, []);

    return { categoryState }
};
