import { MUSIC_MESSAGE_INIT, MUSIC_MESSAGE_SUCCESS, MUSIC_MESSAGE_FAIL } from './constants'

export interface MusicMessageInitAction {
    type: MUSIC_MESSAGE_INIT
}

export interface MusicMessageSuccessAction {
    type: MUSIC_MESSAGE_SUCCESS,
    url: string[],
    picUrl: string,
    name: string,
    alia: string, // 别名
    artist: string[],
    duration: number
}

export interface MusicMessageFailAction {
    type: MUSIC_MESSAGE_FAIL
}

export type MusicMessageAction = MusicMessageInitAction | MusicMessageSuccessAction | MusicMessageFailAction

interface MusicMessageState {
    isLoading: boolean,
    isError: boolean,
    url: string[],
    picUrl: string,
    name: string,
    alia: string,
    artist: string[],
    duration: number
}

export const musicUrlReducer = (
    state: MusicMessageState,
    action: MusicMessageAction,
) => {
    switch (action.type) {
        case "MUSIC_MESSAGE_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case "MUSIC_MESSAGE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                url: action.url,
                picUrl: action.picUrl,
                name: action.name,
                artist: action.artist,
                duration: action.duration
            }
        case "MUSIC_MESSAGE_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        // case ""
        default:
            throw new Error()
    }
}
