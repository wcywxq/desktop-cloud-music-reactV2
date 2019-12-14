import { useEffect } from 'react';
import { useState, useReducer } from 'reinspect';

import { categoryReducer, contentListReducer } from '@/redux';
import {
    CATEGORY_INIT,
    CATEGORY_ALL_SUCCESS,
    CATEGORY_HOT_SUCCESS,
    CATEGORY_FAIL,
    CONTENTLIST_INIT,
    CONTENTLIST_SUCCESS,
    CONTENTLIST_FAIL
} from '@/redux/constants';
import { fetchApi } from "@/api";
import { ContentListParams } from '@/api/types';

// 获取分类
export const useCategory = () => {
    const [categoryState, dispatch] = useReducer(categoryReducer, {
        isLoading: false,
        isError: false,
        allData: {
            all: {},
            sub: [],
            categories: {}
        },
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
                        allData: {
                            all: res_all.data.all,
                            sub: res_all.data.sub,
                            categories: res_all.data.categories
                        }
                    });
                }
                if (!didCancel && res_hot.data.code === 200) {
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

// 获取分类具体内容
export const useContentList = () => {
    const [params, setParams] = useState<ContentListParams>({
        limit: 100,
        offset: 0
    }, "分类内容的参数");
    const [contentListState, dispatch] = useReducer(contentListReducer, {
        isLoading: false,
        isError: false,
        data: [],
        total: 0
    });

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: CONTENTLIST_INIT });
            try {
                if (params) {
                    const result = await fetchApi.contentList(params);
                    if (!didCancel && result.data.code === 200) {
                        dispatch({
                            type: CONTENTLIST_SUCCESS,
                            data: result.data.playlists,
                            total: result.data.total
                        });
                    }
                }
            } catch (err) {
                dispatch({ type: CONTENTLIST_FAIL })
            }
        }
        fetchData();

        return () => {
            didCancel = true;
        }
    }, [params]);

    return { contentListState, setParams }
}
