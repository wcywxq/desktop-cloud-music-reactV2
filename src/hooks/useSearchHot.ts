import {useEffect} from 'react'
import {useReducer} from 'reinspect'
import axios from 'axios'
import {searchHotReducer} from '../redux'
import {
    SEARCH_HOT_FAIL,
    SEARCH_HOT_INIT,
    SEARCH_HOT_SUCCESS
} from '../redux/constants'
import {fetchApi} from "../api";

export const useSearchHot = (initialData: any) => {
    const [state, dispatch] = useReducer(searchHotReducer, {
        isError: false,
        isLoading: false,
        data: initialData
    }, '热搜的reducer')

    useEffect(() => {
        let didCancel = false
        const fetchData = async () => {
            dispatch({type: SEARCH_HOT_INIT})
            try {
                const result = await axios.get(fetchApi.hot)
                console.log(result.data.data)
                if (!didCancel && result.data.code === 200) {
                    dispatch({
                        type: SEARCH_HOT_SUCCESS,
                        payLoad: result.data.data
                    })
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({type: SEARCH_HOT_FAIL})
                }
            }
        }
        fetchData()
        return () => {
            didCancel = true
        }
    }, [])

    return {state}
}
