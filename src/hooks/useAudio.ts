import { useEffect } from 'react'
import { useState, useReducer } from "reinspect"

import {
    MUSIC_MESSAGE_FAIL,
    MUSIC_MESSAGE_INIT,
    MUSIC_MESSAGE_SUCCESS,
    MUSIC_PROJECT_ADD,
    MUSIC_PROJECT_FILTER
} from "@/redux/constants";
import { musicUrlReducer, musicPlayListReducer } from '@/redux'
import { fetchApi } from "@/api";

// 音乐信息
export const useMusicMessage = () => {
    const [id, setID] = useState(0, '获取音乐id');
    const [listIndex, setListIndex] = useState(0, '传递给音乐播放列表的索引');
    const [duration, setDuration] = useState(0, '持续时间');
    const [musicMsgState, dispatch] = useReducer(musicUrlReducer, {
        isLoading: false,
        isError: false,
        url: [],
        picUrl: '',
        name: '',
        alia: '',
        artist: [],
        duration,
        "list.index": 0
    }, '获取音乐信息的reducer');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: MUSIC_MESSAGE_INIT });
            try {
                // 获取音乐 url
                const resMusicUrl = await fetchApi.getMusicUrl({ id });
                // 获取音乐详情，背景图片
                const resMusicDetail = await fetchApi.getMusicDetail({ ids: id });

                if (!didCancel &&
                    resMusicUrl.data.code === 200 &&
                    resMusicDetail.data.code === 200) {
                    dispatch({
                        type: MUSIC_MESSAGE_SUCCESS,
                        url: resMusicUrl.data.data.map((item: any) => {
                            return item.url
                        }),
                        picUrl: resMusicDetail.data.songs[0].al.picUrl,
                        name: resMusicDetail.data.songs[0].name,
                        alia: resMusicDetail.data.songs[0].alia,
                        artist: resMusicDetail.data.songs[0].ar.map((item: any) => {
                            return item.name
                        }),
                        duration,
                        "list.index": listIndex
                    })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: MUSIC_MESSAGE_FAIL })
                }
            }
        };
        if (id) {
            fetchData()
        }

        return () => {
            didCancel = true
        }
    }, [duration, id, listIndex]);

    return { musicMsgState, setID, setDuration, setListIndex }
};

// 音乐播放列表
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
