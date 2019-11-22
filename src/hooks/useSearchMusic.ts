import { useEffect } from 'react'
import { useState, useReducer } from 'reinspect'
import axios from 'axios'

import { searchMusicReducer } from '@/redux'
import { SEARCH_MUSIC_INIT, SEARCH_MUSIC_SUCCESS, SEARCH_MUSIC_FAIL } from '@/redux/constants'

import { fetchApi } from '@/api'

export interface InitialParams {
    keywords: string | undefined,
    type?: number | string | undefined,
    limit: number | undefined,
    offset: number | undefined
}

// 第三个参数控制 devtools
export const useSearchMusic = (initialParams: InitialParams) => {
    const [params, setParams] = useState(initialParams, '搜索音乐请求参数');

    const [searchMusicState, dispatch] = useReducer(searchMusicReducer, {
        isLoading: false,
        isError: false,
        dataType: 'songs',
        dataObj: {
            songs: { count: 0, data: [] },
            artists: { count: 0, data: [] },
            albums: { count: 0, data: [] },
            videos: { count: 0, data: [] },
            playlists: { count: 0, data: [] },
            lyrics: { count: 0, data: [] },
            djRadios: { count: 0, data: [] },
            userprofiles: { count: 0, data: [] }
        }
    }, '音乐搜索的reducer');

    useEffect(() => {
        let didCancel = false;
        const fetchData = async () => {
            dispatch({ type: SEARCH_MUSIC_INIT });
            try {
                const result = await axios.get(fetchApi.search, { params });
                if (!didCancel && result.data.code === 200) {
                    switch (params.type) {
                        case '100': // 歌手
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.artists,
                                count: result.data.result.artistCount,
                                dataType: 'artists'
                            })
                            break;
                        case '10': // 专辑
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.albums,
                                count: result.data.result.albumCount,
                                dataType: 'albums'
                            })
                            break;
                        case '1014': // 视频
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.videos,
                                count: result.data.result.videoCount,
                                dataType: 'videos'
                            })
                            break;
                        case '1000': // 歌单
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.playlists,
                                count: result.data.result.playlistCount,
                                dataType: 'playlists'
                            })
                            break;
                        case '1006': // 歌词
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.songs,
                                count: result.data.result.songCount,
                                dataType: 'lyrics'
                            })
                            break;
                        case '1009': // 电台
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.djRadios,
                                count: result.data.result.djRadiosCount,
                                dataType: 'djRadios'
                            })
                            break;
                        case '1002': // 用户
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.userprofiles,
                                count: result.data.result.userprofileCount,
                                dataType: 'userprofiles'
                            })
                            break;
                        default: // 默认为单曲
                            dispatch({
                                type: SEARCH_MUSIC_SUCCESS,
                                payLoad: result.data.result.songs,
                                count: result.data.result.songCount,
                                dataType: 'songs'
                            })
                            break;
                    }
                }
            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: SEARCH_MUSIC_FAIL })
                }
            }
        };

        if (params.keywords) {
            fetchData()
        }

        return () => {
            didCancel = true
        };
    }, [params]);

    return { searchMusicState, setParams }
};
