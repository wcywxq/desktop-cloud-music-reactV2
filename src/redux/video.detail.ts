import {
    VIDEO_DETAIL_INIT,
    VIDEO_DETAIL_SUCCESS,
    VIDEO_DETAIL_FAIL
} from './constants'

export interface VideoDetailInitAction {
    type: VIDEO_DETAIL_INIT
}

export interface VideoDetailSuccessAction {
    type: VIDEO_DETAIL_SUCCESS,
    dataSource: any[]
    movieUrlsData: any[]
}

export interface VideoDetailFailAction {
    type: VIDEO_DETAIL_FAIL
}

export type VideoDetailAction = VideoDetailInitAction | VideoDetailSuccessAction | VideoDetailFailAction

interface VideoDetailState {
    isLoading: boolean,
    isError: boolean,
    dataSource: any[],
    movieUrlsData: any[]
}

export const videoDetailReducer = (
    state: VideoDetailState,
    action: VideoDetailAction
): VideoDetailState => {
    switch (action.type) {
        case VIDEO_DETAIL_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case VIDEO_DETAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataSource: action.dataSource,
                movieUrlsData: action.movieUrlsData
            };
        case VIDEO_DETAIL_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};
