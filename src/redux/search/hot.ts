import { SEARCH_HOT_INIT, SEARCH_HOT_SUCCESS, SEARCH_HOT_FAIL } from '../constants'

// action creators
interface InitAction {
    type: SEARCH_HOT_INIT
}

interface SuccessAction {
    type: SEARCH_HOT_SUCCESS,
    payLoad: any[]
}

interface FailAction {
    type: SEARCH_HOT_FAIL
}

type ActionType = InitAction | SuccessAction | FailAction

interface StateType {
    isLoading: boolean,
    isError: boolean,
    data: any[]
}

export const searchHotReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case "SEARCH_HOT_INIT":
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case "SEARCH_HOT_SUCCESS":
            return {
                ...state,
                isLoading: false,
                isError: false,
                data: action.payLoad
            };
        case "SEARCH_HOT_FAIL":
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error();
    }
};
