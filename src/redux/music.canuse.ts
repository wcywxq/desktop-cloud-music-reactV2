import { MUSIC_CAN_USE } from './constants'

export interface MusicCanuseAction {
    type: MUSIC_CAN_USE;
    success: boolean;
    message: string;
}

interface MusicCanuseState {
    success: boolean;
    message: string;
}

export const musicCanuseReducer = (
    state: MusicCanuseState,
    action: MusicCanuseAction
) => {
    switch (action.type) {
        case "MUSIC_CAN_USE":
            return {
                ...state,
                success: action.success,
                message: action.message
            };
        default:
            return state;
    }
};
