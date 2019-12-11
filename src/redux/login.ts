import { LOGIN_EMAIL_SUCCESS, LOGIN_FAIL, LOGIN_INIT, LOGIN_PHONE_SUCCESS } from './constants';

export interface LoginInitAction {
    type: LOGIN_INIT
}

export interface LoginPhoneSuccessAction {
    type: LOGIN_PHONE_SUCCESS;
}

export interface LoginEmailSuccessAction {
    type: LOGIN_EMAIL_SUCCESS;
}

export interface LoginFailAction {
    type: LOGIN_FAIL
}

export type LoginAction = LoginInitAction | LoginPhoneSuccessAction | LoginEmailSuccessAction | LoginFailAction

export interface LoginState {
    isLoading: boolean;
    isError: boolean;
}

export const loginReducer = (state: LoginState, action: LoginAction) => {
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
                isError: false,
            };
        case LOGIN_EMAIL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
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
