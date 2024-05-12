import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS, State} from '../types/Types';
import TabNavigator from './TabNavigator';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';

const MainStack = () => {
  const RootStack = createStackNavigator();
  const isLogin = useSelector(
    (state: State) => state.userReducer?.userInfo?.isLogin,
  );

  return (
    <RootStack.Navigator>
      {isLogin ? (
        <RootStack.Screen
          name={SCREENS.TAB_NAVIGATOR}
          component={TabNavigator}
          options={{headerShown: false}}
        />
      ) : (
        <RootStack.Screen
          name={SCREENS.AUTH_STACK}
          component={AuthStack}
          options={{headerShown: false}}
        />
      )}
    </RootStack.Navigator>
  );
};
export default MainStack;
