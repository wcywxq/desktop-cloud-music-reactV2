import { useEffect } from 'react';
import { useState, useReducer } from 'reinspect';

import { videoDetailReducer, videoCommentsReducer } from '@/redux';
import {
    VIDEO_INIT,
    VIDEO_DETAIL_SUCCESS,
    VIDEO_URL_SUCCESS,
    VIDEO_RELATED_SUCCESS,
    VIDEO_COMMENTS_SUCCESS,
    VIDEO_FAIL
} from '@/redux/constants';

import { fetchApi } from '@/api';

export interface initialParamsType {
    id: string
    limit?: number
    offset?: number
    before?: number
}

// 视频详情
export const useVideoDetail = () => {
    const [vid, setVid] = useState('', 'video的id');

    const [detailState, dispatch] = useReducer(videoDetailReducer, {
        isLoading: false,
        isError: false,
        dataSource: [],
        movieUrlsData: [],
        related: [],
    }, '视频详情的reducer');

    const { videoDetail, videoMovieUrls, videoRelated } = fetchApi;

    // 不分页的接口
    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: VIDEO_INIT });
            try {
                const result_detail = await videoDetail({ id: vid });
                const result_movieUrls = await videoMovieUrls({ id: vid });
                const result_related = await videoRelated({ id: vid });

                if (!didCancel) {
                    if (result_detail.data.code === 200) {
                        dispatch({ type: VIDEO_DETAIL_SUCCESS, dataSource: result_detail.data.data })
                    }
                    if (result_movieUrls.data.code === 200) {
                        dispatch({ type: VIDEO_URL_SUCCESS, movieUrlsData: result_movieUrls.data.urls })
                    }
                    if (result_related.data.code === 200) {
                        dispatch({ type: VIDEO_RELATED_SUCCESS, related: result_related.data.data })
                    }
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: VIDEO_FAIL });
                }
            }
        };

        if (vid) {
            fetchData();
        }

        return () => {
            didCancel = true;
        };
    }, [vid, videoDetail, videoMovieUrls, videoRelated]);

    return { detailState, setVid }
};

// 评论详情
export const useCommentsDetail = () => {
    const [params, setParams] = useState<initialParamsType>({ id: '', limit: 20, offset: 0 }, "初始化参数");

    const [commentState, dispatch] = useReducer(videoCommentsReducer, {
        isLoading: false,
        isError: false,
        comments: {
            comments: [],
            hotComments: [],
            total: 0
        }
    }, '视频评论的reducer');

    const { videoComments } = fetchApi;

    // 请求分页接口
    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: VIDEO_INIT });
            try {
                const result_comments = await videoComments({ ...params });

                if (!didCancel && result_comments.data.code === 200) {
                    dispatch({ type: VIDEO_COMMENTS_SUCCESS, comments: result_comments.data })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: VIDEO_FAIL });
                }
            }
        };

        if (params.id) {
            fetchData();
        }

        return () => {
            didCancel = true;
        };
    }, [params, videoComments]);

    return { commentState, setParams }
};
