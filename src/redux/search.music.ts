import {
    SEARCH_MUSIC_INIT,
    SEARCH_MUSIC_SUCCESS,
    SEARCH_MUSIC_FAIL
} from './constants'

// action creators
export interface SearchMusicInitAction {
    type: SEARCH_MUSIC_INIT
}

export interface SearchMusicSuccessAction {
    type: SEARCH_MUSIC_SUCCESS,
    dataType: string,
    count: number,
    payLoad: any[]
}

export interface SearchMusicFailAction {
    type: SEARCH_MUSIC_FAIL
}

export type SearchMusicAction = SearchMusicInitAction | SearchMusicSuccessAction | SearchMusicFailAction

// initialState
export interface SearchMusicState {
    isLoading: boolean,
    isError: boolean,
    dataType: string,
    dataObj: {
        songs: any[],
        artists: any[],
        albums: any[],
        videos: any[],
        playlists: any[],
        lyrics: any[],
        djRadios: any[],
        userprofiles: any[]
    },
    dataCount: number
}

// reducer
export const searchMusicReducer = (
    state: SearchMusicState,
    action: SearchMusicAction
): SearchMusicState => {
    switch (action.type) {
        case SEARCH_MUSIC_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case SEARCH_MUSIC_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                dataObj: {
                    ...state.dataObj,
                    [action.dataType]: action.payLoad
                },
                dataCount: action.count
            };
        case SEARCH_MUSIC_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};
