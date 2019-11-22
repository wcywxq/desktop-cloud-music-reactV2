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
        songs: { count: number, data: any[] },
        artists: { count: number, data: any[] },
        albums: { count: number, data: any[] },
        videos: { count: number, data: any[] },
        playlists: { count: number, data: any[] },
        lyrics: { count: number, data: any[] },
        djRadios: { count: number, data: any[] },
        userprofiles: { count: number, data: any[] }
    }
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
                    [action.dataType]: {
                        // ...state.dataObj[action.dataType as any],
                        count: action.count,
                        data: action.payLoad
                    }
                }
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
