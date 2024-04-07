import {UserState} from '../../types/Types';
import {ActionType} from './types';

const initialState: UserState = {
  userInfo: [],
  userId: '',
  HideTabbar: false,
};

export default function reducer(state = initialState, action: any = {}) {
  switch (action.type) {
    case ActionType.REGISTER_USER_SUCCESSS:
      console.log(action?.payload?.userInfo, 'api response in reducer');
      return {
        ...state,
        userInfo: action?.payload?.userInfo,
      };
    case ActionType.USER_ID:
      return {
        ...state,
        userId: action?.payload?.userId,
      };
    case ActionType.HIDE_TABBAR:
      return {
        ...state,
        HideTabbar: action?.payload?.HideTabbar,
      };
    default:
      return state;
  }
}
