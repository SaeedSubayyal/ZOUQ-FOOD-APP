import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userReducer from './user/reducer';

const userPersistConfig = {
  key: 'userReducer',
  storage: AsyncStorage,
  whitelist: ['userLocation'], // our initial state that is persist
  blacklist: [''], //  our initial state that is Not persist
};

const RESET_STORE = 'wyzepay/app/RESET_STORE';
const rootReducer = (state: any, action: any) => {
  // console.log(state, ' this is state');
  if (action.type === RESET_STORE) {
    state = undefined;
  }
  return appReducers(state, action);
};

// here we combine all reducer
const appReducers = combineReducers({
  userReducer: persistReducer(userPersistConfig, userReducer as any),
});

export default rootReducer;
