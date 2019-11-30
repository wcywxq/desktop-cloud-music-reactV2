import {
    SEARCH_HOT_INIT,
    SEARCH_HOT_SUCCESS,
    SEARCH_HOT_FAIL
} from './constants'

// action creators
export interface SearchHotInitAction {
    type: SEARCH_HOT_INIT
}

export interface SearchHotSuccessAction {
    type: SEARCH_HOT_SUCCESS,
    payLoad: any[]
}

export interface SearchHotFailAction {
    type: SEARCH_HOT_FAIL
}

export type SearchHotAction = SearchHotInitAction | SearchHotSuccessAction | SearchHotFailAction

export interface SearchHotState {
    isLoading: boolean,
    isError: boolean,
    data: any[]
}

export const searchHotReducer = (
    state: SearchHotState,
    action: SearchHotAction
): SearchHotState => {
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
