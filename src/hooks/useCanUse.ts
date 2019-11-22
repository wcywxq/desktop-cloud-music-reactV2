import { useEffect } from 'react'
import { useReducer, useState } from 'reinspect'
import axios from 'axios'

import { MUSIC_CAN_USE } from '@/redux/constants'
import { musicCanuseReducer } from '@/redux'
import { fetchApi } from '@/api'

export const useCanUse = () => {
    const [mid, setMid] = useState(33894312, '音乐id');
    const [canUseState, dispatch] = useReducer(musicCanuseReducer, {
        success: true,
        message: ''
    }, '音乐是否可播放的reducer');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            try {
                const result = await axios.get(fetchApi.check, {
                    params: { id: mid }
                });
                if (!didCancel && result.status === 200) {
                    dispatch({
                        type: MUSIC_CAN_USE,
                        success: true,
                        message: 'ok'
                    })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({
                        type: MUSIC_CAN_USE,
                        success: false,
                        message: '亲爱的,暂无版权'
                    })
                }
            }
        };
        fetchData();

        return () => {
            didCancel = true
        }
    }, [mid]);

    return {canUseState, setMid}
};
