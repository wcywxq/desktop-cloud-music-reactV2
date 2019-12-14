import { CONTENTLIST_INIT, CONTENTLIST_SUCCESS, CONTENTLIST_FAIL } from '../constants';

interface initAction {
  type: CONTENTLIST_INIT
}

interface successAction {
  type: CONTENTLIST_SUCCESS;
  data: any;
  total: number;
}

interface failAction {
  type: CONTENTLIST_FAIL
}

type ActionType = initAction | successAction | failAction;

interface StateType {
  isLoading: boolean;
  isError: boolean;
  data: any;
  total: number;
}

const contentListReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case CONTENTLIST_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case CONTENTLIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.data,
        total: action.total
      }
    case CONTENTLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true
      }
    default:
      throw new Error();
  }
}

export { contentListReducer }