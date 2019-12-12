import {
    VIDEO_INIT,
    VIDEO_DETAIL_SUCCESS,
    VIDEO_URL_SUCCESS,
    VIDEO_RELATED_SUCCESS,
    VIDEO_COMMENTS_SUCCESS,
    VIDEO_FAIL
} from '../constants'

interface InitAction { type: VIDEO_INIT }

interface DetailSuccessAction { type: VIDEO_DETAIL_SUCCESS, dataSource: any }

interface UrlSuccessAction { type: VIDEO_URL_SUCCESS, movieUrlsData: any[] }

interface RelatedSuccessAction { type: VIDEO_RELATED_SUCCESS, related: any[] }

interface CommentsSuccessAction { type: VIDEO_COMMENTS_SUCCESS, comments: any }

interface FailAction { type: VIDEO_FAIL }

type DetailActionType =
    InitAction |
    DetailSuccessAction |
    UrlSuccessAction |
    RelatedSuccessAction |
    FailAction

type CommentsActionType =
    InitAction |
    CommentsSuccessAction |
    FailAction

// 视频信息
interface DetailStateType {
    isLoading: boolean
    isError: boolean
    dataSource: any // 详情数据
    movieUrlsData: any[] // 视频 url
    related: any[] // 相关视频
}

// 评论
interface CommentsStateType {
    isLoading: boolean
    isError: boolean,
    // 评论
    comments: {
        comments: any[],
        hotComments: any[],
        total: number
    }
}

export const videoDetailReducer = (state: DetailStateType, action: DetailActionType) => {
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

export const videoCommentsReducer = (state: CommentsStateType, action: CommentsActionType) => {
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
};
