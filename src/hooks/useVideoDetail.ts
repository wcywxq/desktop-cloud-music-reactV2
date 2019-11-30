import { useEffect } from 'react';
import { useState, useReducer } from 'reinspect';

import { videoDetailReducer } from '@/redux';
import { VIDEO_DETAIL_INIT, VIDEO_DETAIL_SUCCESS, VIDEO_DETAIL_FAIL } from '@/redux/constants';

import { fetchApi } from '@/api';

export const useVideoDetail = () => {
    const [vid, setVid] = useState('', 'video的id');

    const [videoDetailState, dispatch] = useReducer(videoDetailReducer, {
        isLoading: false,
        isError: false,
        dataSource: [],
        movieUrlsData: []
    }, '视频详情的reducer');

    const { videoDetail, videoMovieUrls } = fetchApi;

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: VIDEO_DETAIL_INIT });
            try {
                const result_detail = await videoDetail({ id: vid });
                const result_movieUrls = await videoMovieUrls({ id: vid });
                if (!didCancel && result_detail.data.code === 200 && result_movieUrls.data.code === 200) {
                    dispatch({
                        type: VIDEO_DETAIL_SUCCESS,
                        dataSource: result_detail.data.data,
                        movieUrlsData: result_movieUrls.data.urls
                    });
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: VIDEO_DETAIL_FAIL });
                }
            }
        };

        if (vid) {
            fetchData();
        }

        return () => {
            didCancel = true;
        };
    }, [vid, videoDetail, videoMovieUrls]);

    return { videoDetailState, setVid }
};
