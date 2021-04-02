import { ActionType } from 'redux-promise-middleware';

const AppLoading = 'app/loading';
const AppLogin = 'app/login';

export const AppConstants = {
    APP_LOADING: AppLoading,
    APP_LOADING_PENDING: `${AppLoading}_${ActionType.Pending}`,
    APP_LOADING_FULFILLED: `${AppLoading}_${ActionType.Fulfilled}`,
    APP_LOADING_REJECTED: `${AppLoading}_${ActionType.Rejected}`,

    APP_LOGIN: AppLogin,
    APP_LOGIN_PENDING: `${AppLogin}_${ActionType.Pending}`,
    APP_LOGIN_FULFILLED: `${AppLogin}_${ActionType.Fulfilled}`,
    APP_LOGIN_REJECTED: `${AppLogin}_${ActionType.Rejected}`,
}