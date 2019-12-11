import { LOGOUT_INIT, LOGOUT_SUCCESS, LOGOUT_FAIL } from './constants';

export interface LogoutInitAction {
    type: LOGOUT_INIT
}

export interface LogoutSuccessAction {
    type: LOGOUT_SUCCESS;
}

export interface LooutFailAction {
    type: LOGOUT_FAIL
}

export type LogoutAction = LogoutInitAction | LogoutSuccessAction | LooutFailAction

export interface LogoutState {
    isLoading: boolean;
    isError: boolean;
}

export const logoutReducer = (state: LogoutState, action: LogoutAction) => {
    switch (action.type) {
        case LOGOUT_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case LOGOUT_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};
