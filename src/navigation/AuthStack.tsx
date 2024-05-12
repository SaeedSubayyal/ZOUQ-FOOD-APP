import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS} from '../types/Types';
import AuthScreen from '../screens/auth/AuthScreen';
import Registration from '../screens/auth/Registration';
import Login from '../screens/auth/Login';
import OtpVerification from '../screens/auth/OtpVerification';

const AuthStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={SCREENS.REGISTRATION}>
      <Stack.Screen
        name={SCREENS.AUTH_SCREEN}
        component={AuthScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.REGISTRATION}
        component={Registration}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={SCREENS.OTP_VERIFICATION}
        component={OtpVerification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
// import {StyleSheet, Text, View} from 'react-native';
// import React from 'react';

// const AuthStack = () => {
//   return (
//     <View>
//       <Text>AuthStack</Text>
//     </View>
//   );
// };

// export default AuthStack;

// const styles = StyleSheet.create({});
