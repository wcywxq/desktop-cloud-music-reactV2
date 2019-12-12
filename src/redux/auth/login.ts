import { LOGIN_EMAIL_SUCCESS, LOGIN_FAIL, LOGIN_INIT, LOGIN_PHONE_SUCCESS } from '../constants';

interface InitAction {
    type: LOGIN_INIT
}

interface PhoneSuccessAction {
    type: LOGIN_PHONE_SUCCESS;
}

interface EmailSuccessAction {
    type: LOGIN_EMAIL_SUCCESS;
}

interface FailAction {
    type: LOGIN_FAIL
}

type ActionType = InitAction | PhoneSuccessAction | EmailSuccessAction | FailAction

interface StateType {
    isLoading: boolean;
    isError: boolean;
}

const loginReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case LOGIN_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case LOGIN_PHONE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case LOGIN_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        case LOGIN_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};

export { loginReducer }
