import {
    VIDEO_INIT,
    VIDEO_DETAIL_SUCCESS,
    VIDEO_URL_SUCCESS,
    VIDEO_RELATED_SUCCESS,
    VIDEO_COMMENTS_SUCCESS,
    VIDEO_FAIL
} from './constants'

export interface VideoDetailInitAction {
    type: VIDEO_INIT
}

export interface VideoDetailSuccessAction { type: VIDEO_DETAIL_SUCCESS, dataSource: any }
export interface VideoUrlSuccessAction { type: VIDEO_URL_SUCCESS, movieUrlsData: any[] }
export interface VideoRelatedSuccessAction { type: VIDEO_RELATED_SUCCESS, related: any[] }

export interface VideoCommentsSuccessAction { type: VIDEO_COMMENTS_SUCCESS, comments: any }

export interface VideoDetailFailAction {
    type: VIDEO_FAIL
}

export type VideoDetailAction =
    VideoDetailInitAction |
    VideoDetailSuccessAction |
    VideoUrlSuccessAction |
    VideoRelatedSuccessAction |
    VideoDetailFailAction

export type VideoCommentsAction = VideoDetailInitAction | VideoCommentsSuccessAction | VideoDetailFailAction

// 视频信息
interface VideoDetailState {
    isLoading: boolean
    isError: boolean
    dataSource: any // 详情数据
    movieUrlsData: any[] // 视频 url
    related: any[] // 相关视频
}

// 评论
interface VideoCommentsState {
    isLoading: boolean
    isError: boolean,
    // 评论
    comments: {
        comments: any[],
        hotComments: any[],
        total: number
    }
}

export const videoDetailReducer = (state: VideoDetailState, action: VideoDetailAction): VideoDetailState => {
    switch (action.type) {
        case VIDEO_INIT:
            return { ...state, isLoading: true, isError: false };
        case VIDEO_DETAIL_SUCCESS:
            return { ...state, isLoading: false, isError: false, dataSource: action.dataSource };
        case VIDEO_URL_SUCCESS:
            return { ...state, isLoading: false, isError: false, movieUrlsData: action.movieUrlsData };
        case VIDEO_RELATED_SUCCESS:
            return { ...state, isLoading: false, isError: false, related: action.related };
        case VIDEO_FAIL:
            return { ...state, isLoading: false, isError: true };
        default:
            throw new Error();
    }
};

export const videoCommentsReducer = (state: VideoCommentsState, action: VideoCommentsAction): VideoCommentsState => {
    switch (action.type) {
        case VIDEO_INIT:
            return { ...state, isLoading: true, isError: false };
        case VIDEO_COMMENTS_SUCCESS:
            return { ...state, isLoading: false, isError: false, comments: action.comments };
        case VIDEO_FAIL:
            return { ...state, isLoading: false, isError: true };
        default:
            throw new Error();
    }
}