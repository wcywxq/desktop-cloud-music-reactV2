import { LOGOUT_INIT, LOGOUT_SUCCESS, LOGOUT_FAIL } from '../constants';

interface InitAction {
    type: LOGOUT_INIT
}

interface SuccessAction {
    type: LOGOUT_SUCCESS;
}

interface FailAction {
    type: LOGOUT_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction

interface StateType {
    isLoading: boolean;
    isError: boolean;
}

export const logoutReducer = (state: StateType, action: ActionType) => {
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
