import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../types/Types';
import TopVoicesScreen from '../screens/top-voices/TopVoicesScreen';
import AddPostScreen from '../screens/add-post/AddPostScreen';

const VoiceStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={SCREENS.TOP_VOICES_SCREEN}>
      <Stack.Screen
        name={SCREENS.TOP_VOICES_SCREEN}
        component={TopVoicesScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.ADD_POST_SCREEN}
        component={AddPostScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default VoiceStack;
