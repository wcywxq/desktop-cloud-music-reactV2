import { MUSIC_MESSAGE_INIT, MUSIC_MESSAGE_SUCCESS, MUSIC_MESSAGE_FAIL } from '../constants'

interface InitAction {
    type: MUSIC_MESSAGE_INIT
}

interface SuccessAction {
    type: MUSIC_MESSAGE_SUCCESS,
    url: string[],
    picUrl: string,
    name: string,
    alia: string, // 别名
    artist: string[],
    duration: number,
    "list.index": number
}

interface FailAction {
    type: MUSIC_MESSAGE_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction

export interface MessageStateType {
    isLoading: boolean,
    isError: boolean,
    url: string[],
    picUrl: string,
    name: string,
    alia: string,
    artist: string[],
    duration: number,
    "list.index": number
}

const musicUrlReducer = (state: MessageStateType, action: ActionType) => {
    switch (action.type) {
        case "MUSIC_MESSAGE_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "MUSIC_MESSAGE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                url: action.url,
                picUrl: action.picUrl,
                name: action.name,
                artist: action.artist,
                duration: action.duration,
                "list.index": action["list.index"]
            };
        case "MUSIC_MESSAGE_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error()
    }
};

export { musicUrlReducer }