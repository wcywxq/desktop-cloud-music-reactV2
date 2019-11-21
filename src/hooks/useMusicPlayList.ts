import { useEffect } from 'react'
import { useState, useReducer } from "reinspect"

import { MUSIC_PROJECT_ADD, MUSIC_PROJECT_FILTER } from '@/redux/constants'
import { musicPlayListReducer } from '@/redux'

export const useMusicPlayList = () => {
    const [record, setRecord] = useState({} as any, '双击传递的数据');
    const [state, dispatch] = useReducer(musicPlayListReducer, [], '音乐播放列表的reducer');

    useEffect(() => {
        let didCancel = false;

        if (!didCancel && record && Object.keys(record).length !== 0) {
            // 先添加
            dispatch({
                type: MUSIC_PROJECT_ADD,
                key: record.key,
                musicName: record.name,
                "artist.name": record["artists.name"],
                duration: record.duration
            });
            // 再过滤
            dispatch({ type: MUSIC_PROJECT_FILTER })
        }

        return () => {
            didCancel = true
        }
    }, [record]);

    return { state, dispatch, setRecord }
};
