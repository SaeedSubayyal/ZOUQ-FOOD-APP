import {COLORS} from '../../styles/colors';

export const Icons = {
  Home: 'HOME',
  TopVoices: 'TOP-VOICES',
  Reviews: 'REVIEWS',
  Discount: 'DISCOUNT',
  ProfileSetting: 'PROFILE-SETTING',
  Message: 'MESSAGE',
  User: 'USER',
  Google: 'GOOGLE',
  ArrowLeft: 'ARROW-LEFT',
  Time: 'TIME',
  YellowStar: 'YellowStar',
  Repost: 'Repost',
  Heart: 'Heart',
  GreyStar: 'GreyStar',
  ForwardArrow: 'ForwardArrow',
  Comments: 'Comments',
  FillHeart: 'FillHeart',
  Attachdoc: 'Attachdoc',
  Close: 'Close',
  HomeTab: 'HomeTab',
  VoiceTab: 'VoiceTab',
  ReviewTab: 'ReviewTab',
  DiscountTab: 'DiscountTab',
  ProfileTab: 'ProfileTab',
  Map: 'Map',
  Calendar: 'Calendar',
  DownArrow: 'DownArrow',
  AddComment: 'ADD-COMMENT',
};
export const Colors = {
  [Icons.Home]: {color: COLORS.grayish_blue},
  [Icons.TopVoices]: {color: COLORS.grayish_blue},
  [Icons.Message]: {color: COLORS.grayish_blue},
  [Icons.User]: {color: COLORS.grayish_blue},
  [Icons.Google]: {color: COLORS.grayish_blue},
  [Icons.ArrowLeft]: {color: COLORS.grayish_blue},
  [Icons.Time]: {color: COLORS.grayish_blue},
  [Icons.Heart]: {color: COLORS.primary},
  [Icons.AddComment]: {color: COLORS.primary},
};
const SvgIcons: any = {};

SvgIcons[Icons.Home] = require('../../../assets/icons/homes').default;
SvgIcons[Icons.TopVoices] = require('../../../assets/icons/topVoice').default;
SvgIcons[Icons.Message] = require('../../../assets/icons/message').default;
SvgIcons[Icons.User] = require('../../../assets/icons/user').default;
SvgIcons[Icons.Google] = require('../../../assets/icons/google').default;
SvgIcons[Icons.ArrowLeft] = require('../../../assets/icons/arraowLeft').default;
SvgIcons[Icons.Time] = require('../../../assets/icons/time').default;
SvgIcons[Icons.YellowStar] =
  require('../../../assets/icons/yellowStar').default;
SvgIcons[Icons.Repost] = require('../../../assets/icons/repost').default;
SvgIcons[Icons.Heart] = require('../../../assets/icons/heart').default;
SvgIcons[Icons.GreyStar] = require('../../../assets/icons/greyStar').default;
SvgIcons[Icons.ForwardArrow] =
  require('../../../assets/icons/forwardArrow').default;
SvgIcons[Icons.Comments] = require('../../../assets/icons/comment').default;
SvgIcons[Icons.FillHeart] = require('../../../assets/icons/fillHeart').default;
SvgIcons[Icons.Attachdoc] = require('../../../assets/icons/attachdoc').default;
SvgIcons[Icons.Close] = require('../../../assets/icons/close').default;
SvgIcons[Icons.HomeTab] = require('../../../assets/icons/homeTabIcon').default;
SvgIcons[Icons.VoiceTab] =
  require('../../../assets/icons/voiceTabIcon').default;
SvgIcons[Icons.ReviewTab] =
  require('../../../assets/icons/reviewTabIcon').default;
SvgIcons[Icons.DiscountTab] =
  require('../../../assets/icons/discountTabIcon').default;
SvgIcons[Icons.ProfileTab] =
  require('../../../assets/icons/profileTabIcon').default;
SvgIcons[Icons.Calendar] = require('../../../assets/icons/calendar').default;
SvgIcons[Icons.Map] = require('../../../assets/icons/map').default;
SvgIcons[Icons.DownArrow] = require('../../../assets/icons/downArrow').default;
SvgIcons[Icons.AddComment] =
  require('../../../assets/icons/addComment').default;

export const getSvgIcon = (icon: string, color: string | boolean = false) => {
  const SvgIcon = SvgIcons[icon];
  if (typeof SvgIcon === 'function' && color) {
    return SvgIcon(color);
  }
  return SvgIcon;
};
