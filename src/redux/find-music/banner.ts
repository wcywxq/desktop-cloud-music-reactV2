import { BANNER_INIT, BANNER_SUCCESS, BANNER_FAIL } from '../constants'

interface InitAction {
    type: BANNER_INIT
}

interface SuccessAction {
    type: BANNER_SUCCESS,
    bannerUrl: any[]
}

interface FailAction {
    type: BANNER_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction
interface StateType {
    isLoading: boolean,
    isError: boolean,
    bannerUrl: any[]
}

const bannerReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "BANNER_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "BANNER_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                bannerUrl: action.bannerUrl
            };
        case "BANNER_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true
            }
    }
};

export { bannerReducer }