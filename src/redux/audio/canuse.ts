import { MUSIC_CAN_USE } from '../constants'

interface ActionType {
    type: MUSIC_CAN_USE;
    success: boolean;
    message: string;
}

interface StateType {
    success: boolean;
    message: string;
}

export const musicCanuseReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "MUSIC_CAN_USE":
            return {
                ...state,
                success: action.success,
                message: action.message
            };
        default:
            throw new Error();
    }
};
