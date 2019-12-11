import { useEffect } from "react";
import { useReducer } from 'reinspect'

import { fetchApi } from '@/api'
import { bannerReducer, RecommandReducer } from '@/redux'
import {
    BANNER_FAIL,
    BANNER_INIT,
    BANNER_SUCCESS,
    RECOMMAND_INIT,
    RECOMMAND_SUCCESS,
    RECOMMAND_FAIL
} from '@/redux/constants'

// banner 轮播
export const useBanner = () => {
    const [state, dispatch] = useReducer(bannerReducer, {
        isLoading: false,
        isError: false,
        bannerUrl: []
    }, 'banner首页轮播');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: BANNER_INIT });
            try {
                const result = await fetchApi.banner();
                if (!didCancel && result.data.code === 200) {
                    dispatch({
                        type: BANNER_SUCCESS,
                        bannerUrl: result.data.banners.map((item: any) => {
                            return {
                                imgSrc: item.imageUrl,
                                typeTitle: item.typeTitle,
                                titleColor: item.titleColor
                            }
                        })
                    })
                }
            } catch (err) {
                if (!didCancel) {
                    dispatch({ type: BANNER_FAIL })
                }
            }
        };

        fetchData();

        return () => {
            didCancel = true;
        }
    }, []);

    return { state }
};

// 推荐内容
export const useRecommand = () => {
    const [recommandState, dispatch] = useReducer(RecommandReducer, {
        isLoading: false,
        isError: false,
        variety: {
            recommendSongList: [], // 推荐歌单
            exclusiveBroadcast: [], // 独家放送
            newSong: [], // 推荐最新音乐
            recommendMv: [], // 推荐MV
            djprogram: [] // 推荐电台
        }
    }, '个性推荐部分的reducer');

    useEffect(() => {
        let didCancel = false;

        const fetchData = async () => {
            dispatch({ type: RECOMMAND_INIT });

            try {
                const recommendSongList = await fetchApi.recommendSongList({ limit: 9 });
                const exclusiveBroadcast = await fetchApi.exclusiveBroadcast();
                const newSong = await fetchApi.newSong();
                const recommendMv = await fetchApi.recommendMv();
                const djprogram = await fetchApi.djprogram();

                if (!didCancel &&
                    recommendSongList.data.code === 200 &&
                    exclusiveBroadcast.data.code === 200 &&
                    newSong.data.code === 200 &&
                    recommendMv.data.code === 200 &&
                    djprogram.data.code === 200) {
                    dispatch({
                        type: RECOMMAND_SUCCESS,
                        recommendSongList: recommendSongList.data.result,
                        exclusiveBroadcast: exclusiveBroadcast.data.result,
                        newSong: newSong.data.result,
                        recommendMv: recommendMv.data.result,
                        djprogram: djprogram.data.result
                    })
                }

            } catch (error) {
                if (!didCancel) {
                    dispatch({ type: RECOMMAND_FAIL })
                }
            }
        };
        fetchData();

        return () => {
            didCancel = true;
        };
    }, []);

    return { recommandState }
};
