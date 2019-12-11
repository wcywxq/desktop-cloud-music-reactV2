import { useEffect } from 'react'
import { useReducer, useState } from 'reinspect'

import { MUSIC_CAN_USE } from '@/redux/constants'
import { musicCanuseReducer } from '@/redux'
import { fetchApi } from '@/api'

// 是否可播放
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
                const result = await fetchApi.check({ id: mid });
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

    return { canUseState, setMid }
};
