import { MUSIC_MESSAGE_INIT, MUSIC_MESSAGE_SUCCESS, MUSIC_MESSAGE_FAIL } from './constants'

export interface MusicMessageInitAction {
    type: MUSIC_MESSAGE_INIT
}

export interface MusicMessageSuccessAction {
    type: MUSIC_MESSAGE_SUCCESS,
    result: any // 传递数据
}

export interface MusicMessageFailAction {
    type: MUSIC_MESSAGE_FAIL
}

export type MusicMessageAction = MusicMessageInitAction | MusicMessageSuccessAction | MusicMessageFailAction

interface MusicMessageState {
    isLoading: boolean,
    isError: boolean,
    data: any
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
                data: action.result
            }
        case "MUSIC_MESSAGE_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            throw new Error()
    }
}
