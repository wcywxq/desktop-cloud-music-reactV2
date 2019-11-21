import { BANNER_INIT, BANNER_SUCCESS, BANNER_FAIL } from './constants'

export interface BannerInitAction {
    type: BANNER_INIT
}

export interface BannerSuccessAction {
    type: BANNER_SUCCESS,
    bannerUrl: any[]
}

export interface BannerFailAction {
    type: BANNER_FAIL
}

export type BannerAction = BannerInitAction | BannerSuccessAction | BannerFailAction

interface BannerState {
    isLoading: boolean,
    isError: boolean,
    bannerUrl: any[]
}

export const bannerReducer = (
    state: BannerState,
    action: BannerAction
) => {
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
