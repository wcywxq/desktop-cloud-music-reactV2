import { RECOMMAND_INIT, RECOMMAND_SUCCESS, RECOMMAND_FAIL } from '../constants'

interface InitAction {
    type: RECOMMAND_INIT
}

interface SuccessAction {
    type: RECOMMAND_SUCCESS,
    recommendSongList: any[], // 推荐歌单
    exclusiveBroadcast: any[], // 独家放送
    newSong: any[], // 推荐最新音乐
    recommendMv: any[], // 推荐MV
    djprogram: any[], // 推荐电台
}

interface FailAction {
    type: RECOMMAND_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction

interface StateType {
    isLoading: boolean,
    isError: boolean,
    variety: {
        recommendSongList: any[], // 推荐歌单
        exclusiveBroadcast: any[], // 独家放送
        newSong: any[], // 推荐最新音乐
        recommendMv: any[], // 推荐MV
        djprogram: any[], // 推荐电台
    }
}

const RecommandReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case RECOMMAND_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case RECOMMAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                variety: {
                    ...state.variety,
                    recommendSongList: action.recommendSongList,
                    exclusiveBroadcast: action.exclusiveBroadcast,
                    newSong: action.newSong,
                    recommendMv: action.recommendMv,
                    djprogram: action.djprogram
                }
            };
        case RECOMMAND_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};

export { RecommandReducer }