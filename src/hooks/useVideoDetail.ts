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
        movieUrlsData: [],
        hotComments: [],
        comments: [],
        related: [],
    }, '视频详情的reducer');

    const { videoDetail, videoMovieUrls, videoComments, videoRelated } = fetchApi;

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: VIDEO_DETAIL_INIT });
            try {
                const result_detail = await videoDetail({ id: vid });
                const result_movieUrls = await videoMovieUrls({ id: vid });
                const result_comments = await videoComments({ id: vid });
                const result_related = await videoRelated({ id: vid });
                if (!didCancel
                    && result_detail.data.code === 200
                    && result_movieUrls.data.code === 200
                    && result_comments.data.code === 200
                    && result_related.data.code === 200) {
                    dispatch({
                        type: VIDEO_DETAIL_SUCCESS,
                        dataSource: result_detail.data.data,
                        movieUrlsData: result_movieUrls.data.urls,
                        hotComments: result_comments.data.hotComments,
                        comments: result_comments.data.comments,
                        related: result_related.data.data
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
    }, [vid, videoComments, videoDetail, videoMovieUrls, videoRelated]);

    return { videoDetailState, setVid }
};
