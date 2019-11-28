import { RECOMMAND_INIT, RECOMMAND_SUCCESS, RECOMMAND_FAIL } from './constants'

export interface RecommandInitAction {
  type: RECOMMAND_INIT
}

export interface RecommandSuccessAction {
  type: RECOMMAND_SUCCESS,
  recommendSongList: any[], // 推荐歌单
  exclusiveBroadcast: any[], // 独家放送
  newSong: any[], // 推荐最新音乐
  recommendMv: any[], // 推荐MV
  djprogram: any[], // 推荐电台
}

export interface RecommandFailAction {
  type: RECOMMAND_FAIL
}

export type RecommandAction = RecommandInitAction | RecommandSuccessAction | RecommandFailAction

interface RecommandState {
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

export const RecommandReducer = (
  state: RecommandState,
  action: RecommandAction
) => {
  switch (action.type) {
    case RECOMMAND_INIT:
      return {
        ...state,
        isLaoding: true,
        isError: false
      }
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
          djprogram: action.djprogram,
        }
      }
    case RECOMMAND_FAIL:
      return {
        ...state,
        isLaoding: false,
        isError: true
      }
    default:
      throw new Error();
  }
}