import {ActionType} from './types';

export function actionRegisterUserSuccess(userInfo: any) {
  console.log(userInfo, 'in acttion success');
  return {
    type: ActionType.REGISTER_USER_SUCCESSS,
    payload: {
      userInfo,
    },
  };
}

export function actionUserId(userId: any) {
  return {
    type: ActionType.USER_ID,
    payload: {
      userId,
    },
  };
}

export function actionHideTabbar(HideTabbar: any) {
  return {
    type: ActionType.HIDE_TABBAR,
    payload: {
      HideTabbar,
    },
  };
}
