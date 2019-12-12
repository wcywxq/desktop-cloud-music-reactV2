import { SEARCH_MUSIC_INIT, SEARCH_MUSIC_SUCCESS, SEARCH_MUSIC_FAIL } from '../constants'

// action creators
interface InitAction {
    type: SEARCH_MUSIC_INIT
}

interface SuccessAction {
    type: SEARCH_MUSIC_SUCCESS,
    dataType: string,
    count: number,
    payLoad: any[]
}

interface FailAction {
    type: SEARCH_MUSIC_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction

// initialState
interface StateType {
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
export const searchMusicReducer = (state: StateType, action: ActionType) => {
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
