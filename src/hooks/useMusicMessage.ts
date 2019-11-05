import { useEffect } from 'react'
import { useReducer, useState } from "reinspect";
import axios from 'axios'

import { MUSIC_MESSAGE_FAIL, MUSIC_MESSAGE_INIT, MUSIC_MESSAGE_SUCCESS } from "@/redux/constants";
import { musicUrlReducer } from '@/redux'
import { fetchApi } from "@/api";

export const useMusicMessage = () => {
    const [id, setID] = useState(0, '获取音乐id')
    const [duration, setDuration] = useState(0, '持续时间')
    const [musicMsgState, dispatch] = useReducer(musicUrlReducer, {
        isLoading: false,
        isError: false,
        url: [],
        picUrl: '',
        name: '',
        alia: '',
        artist: [],
        duration
    }, '获取音乐信息的reducer')

    useEffect(() => {
        let didCancel = false

        const fetchData = async () => {
            dispatch({ type: MUSIC_MESSAGE_INIT })
            try {
                // 获取音乐 url
                const resMusicUrl = await axios.get(fetchApi.getMusicUrl, {
                    params: { id }
                })
                // 获取音乐详情，背景图片
                const resMusicDetail = await axios.get(fetchApi.getMusicDetail, {
                    params: { ids: id }
                })

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
                        duration
                    })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: MUSIC_MESSAGE_FAIL })
                }
            }
        }
        if(id) {
            fetchData()
        }

        return () => {
            didCancel = true
        }
    }, [id])

    return { musicMsgState, setID, setDuration }
}
