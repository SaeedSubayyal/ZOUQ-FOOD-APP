export enum SCREENS {
  AUTH_SCREEN = 'auth-screen',
  REGISTRATION = 'registration',
  LOGIN = 'login',
  OTP_VERIFICATION = 'otp-verification',
  TAB_NAVIGATOR = 'tab-navigator',
  AUTH_STACK = 'auth-stack',
  HOME_SCREEN = 'home-screen',
  TOP_VOICES_SCREEN = 'top-voices-screen',
  REVIEWS_SCREEN = 'reviews-screen',
  DISCOUNTS_SCREEN = 'discounts-screen',
  PROFILE_SCREEN = 'profile-screen',
  ADD_POST_SCREEN = 'add-post-screen',
  VOICE_TAB = 'voice-tab',
}

export interface UserState {
  userInfo: [];
  userId: string;
  HideTabbar: boolean;
}
export interface UserInfo {
  verify: boolean;
  email: string;
  isLogin: boolean;
}
export interface State {
  userReducer: UserState;
}
export interface firebaseSlider {
  id: string;
  active: boolean;
  content: string;
  link: string | null;
  order: number;
}

export interface UserPost {
  id: string;
  usersLikeId: number;
  mainComment: string;
  postImageURL: string;
  subComments?: SubComments[];
  timestamp: any;
  userId: string;
  userImage: string;
  userName: string;
}
export interface SubComments {
  subUserImage: string;
  subUserName: string;
  subComment: string;
  subCommentLike: [];
  subCommentTime: any;
}
