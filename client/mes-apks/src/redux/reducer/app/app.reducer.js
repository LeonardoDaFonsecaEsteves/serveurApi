import { AppConstants } from "../../constants/constants.redux";

export const appStore = {
    MesApks: null,
    loadingApp: false,
    loadingUser: false,
    error: null,
};

export const app = (state = appStore, action) => {
    const { type, payload } = action
    switch (type) {
        case AppConstants.APP_LOADING_PENDING: {
            return {
                ...state,
                loadingApp: true,
                error: null
            }
        }
        case AppConstants.APP_LOADING_REJECTED: {
            return {
                ...state,
                loadingApp: false,
                error: payload
            }
        }
        case AppConstants.APP_LOADING_FULFILLED: {
            return {
                ...state,
                loadingApp: false,
                error: null
            }
        }
        case AppConstants.APP_LOGIN_PENDING: {
            return {
                ...state,
                loadingUser: false,
                error: null
            }
        }
        case AppConstants.APP_LOGIN_REJECTED: {
            return {
                ...state,
                loadingUser: false,
                error: payload
            }
        }
        case AppConstants.APP_LOGIN_FULFILLED: {
            return {
                ...state,
                loadingUser: false,
                error: null,
            }
        }
        default: {
            return state;
        }
    }
};
