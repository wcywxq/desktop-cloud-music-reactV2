import { useEffect } from 'react'
import { useReducer, useState } from "reinspect";
import axios from 'axios'

import { MUSIC_MESSAGE_FAIL, MUSIC_MESSAGE_INIT, MUSIC_MESSAGE_SUCCESS } from "@/redux/constants";
import { musicUrlReducer } from '@/redux'
import { fetchApi } from "@/api";

export const useMusicMessage = (initialId: number, initialData: any) => {
    const [id, setID] = useState(initialId, '获取音乐id')
    const [state, dispatch] = useReducer(musicUrlReducer, initialData, '获取音乐信息的reducer')

    useEffect(() => {
        let didCancel = false

        const fetchData = async () => {
            dispatch({ type: MUSIC_MESSAGE_INIT })
            try {
                const result = await axios.get(fetchApi.getMusicUrl, {
                    params: { id }
                })
                if (!didCancel && result.data.code === 200) {
                    dispatch({ type: MUSIC_MESSAGE_SUCCESS, result: result.data.data })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: MUSIC_MESSAGE_FAIL })
                }
            }
        }
        fetchData()

        return () => {
            didCancel = true
        }
    })

    return { state, setID }
}
