import { AppConstants, ModalConstants } from "../../constants/constants.redux";
import { AppService } from "../../service/app.service";

/**
 *  Charge l'app avec les data
 */
const onChargeApp = () => ({
    type: AppConstants.APP_LOADING,
    payload: AppService.fetchElement(),
});

/**
 *  Connexion de l'user
 */
const onLoginUser = (user, pass) => ({
    type: AppConstants.APP_LOGIN,
    payload: AppService.loginUser({ id: user, pass: pass })
})

export const appAction = {
    onChargeApp,
    onLoginUser
};
