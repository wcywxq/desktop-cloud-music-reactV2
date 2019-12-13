import { CATEGORY_INIT, CATEGORY_ALL_SUCCESS, CATEGORY_HOT_SUCCESS, CATEGORY_FAIL } from '../constants';

interface InitAction {
    type: CATEGORY_INIT
}

interface AllSuccessAction {
    type: CATEGORY_ALL_SUCCESS,
    allData: any
}

interface HotSuccessAction {
    type: CATEGORY_HOT_SUCCESS,
    hotData: any
}

interface FailAction {
    type: CATEGORY_FAIL
}

type ActionType = InitAction | AllSuccessAction | HotSuccessAction | FailAction;

interface StateType {
    isLoading: boolean;
    isError: boolean;
    allData: any;
    hotData: any;
}

const categoryReducer = (state: StateType, action: ActionType) => {
    switch (action.type) {
        case CATEGORY_INIT:
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        case CATEGORY_ALL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                allData: action.allData
            };
        case CATEGORY_HOT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isError: false,
                hotData: action.hotData
            };
        case CATEGORY_FAIL:
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        default:
            throw new Error()
    }
};

export { categoryReducer }
