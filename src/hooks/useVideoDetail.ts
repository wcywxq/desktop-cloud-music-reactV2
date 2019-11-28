import { useEffect } from 'react';
import { useState, useReducer } from 'reinspect';

import { videoDetailReducer } from '@/redux';
import { VIDEO_DETAIL_INIT, VIDEO_DETAIL_SUCCESS, VIDEO_DETAIL_FAIL } from '@/redux/constants';

import { fetchApi } from '@/api';

export const useVideoDetail = () => {
  const [vid, setVid] = useState('', 'video的id');

  const [state, dispatch] = useReducer(videoDetailReducer, {
    isLoading: false,
    isError: false,
    dataSource: []
  }, '视频详情的reducer');

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      dispatch({ type: VIDEO_DETAIL_INIT });
      try {
        const result = await fetchApi.videoDetail({ id: vid });
        if (!didCancel && result.data.code === 200) {
          dispatch({ type: VIDEO_DETAIL_SUCCESS, dataSource: result.data.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: VIDEO_DETAIL_FAIL });
        }
      }
    }

    if (vid) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [vid])

  return { state, setVid }
}