import {useEffect} from 'react'
import {useState, useReducer} from 'reinspect'
import axios from 'axios'
import {searchMusicReducer} from '../redux'
import {
    SEARCH_MUSIC_INIT,
    SEARCH_MUSIC_SUCCESS,
    SEARCH_MUSIC_FAIL
} from '../redux/constants'

import {fetchApi} from '../api'

export interface InitialParams {
    keywords: string | undefined,
    limit: number,
    offset: number | undefined
}

// 第三个参数控制 devtools
export const useSearchMusic = (initialParams: InitialParams, initialData: any[]) => {
    const [params, setParams] = useState(initialParams, '搜索音乐请求参数')

    const [state, dispatch] = useReducer(searchMusicReducer, {
        isLoading: false,
        isError: false,
        data: initialData,
        count: 0
    }, '音乐搜索的reducer')

    useEffect(() => {
        let didCancel = false
        const fetchData = async () => {
            dispatch({type: SEARCH_MUSIC_INIT})
            try {
                const result = await axios.get(fetchApi.search, {params})
                if (!didCancel && result.data.code === 200) {
                    dispatch({
                        type: SEARCH_MUSIC_SUCCESS,
                        payLoad: result.data.result.songs,
                        count: result.data.result.songCount,
                    })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({type: SEARCH_MUSIC_FAIL})
                }
            }
        }
        if (params.keywords) {
            fetchData()
        }
        return () => {
            didCancel = true
        };
    }, [params])

    return {state, setParams}
}
