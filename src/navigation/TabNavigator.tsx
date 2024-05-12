import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SCREENS} from '../types/Types';
import HomeScreen from '../screens/home/HomeScreen';
import ReviewsScreen from '../screens/review/ReviewsScreen';
import DiscountScreen from '../screens/discounts/DiscountScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import VoiceStack from './VoiceStack';
import AppSvgIcon, {Icons} from '../components/app-svg-icon/AppSvgIcon';
import {COLORS} from '../styles/colors';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {useKeyboardVisibility} from '../utils/hooks';
import {useSelector} from 'react-redux';
import {State} from 'react-native-gesture-handler';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const isKeyboardVisible = useKeyboardVisibility();

  const hideTabbar = useSelector(
    (state: State) => state.userReducer.HideTabbar,
  );

  const ActiveTabButton = (props: {
    focused: boolean;
    color?: string;
    size?: number;
    icon: any;
    title: string;
  }) => {
    return (
      <>
        {props.focused ? (
          <View style={styles.tabButtonView}>
            <View style={styles.iconView}>
              <AppSvgIcon
                icon={props.icon}
                width={24}
                height={24}
                color="black"
              />
            </View>
            <Text style={styles.tabTitle}>{props.title}</Text>
          </View>
        ) : (
          <AppSvgIcon icon={props.icon} width={24} height={24} color="black" />
        )}
      </>
    );
  };

  const HomeTabIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <ActiveTabButton
        focused={props.focused}
        icon={Icons.HomeTab}
        title={'Home'}
      />
    );
  };

  const VoiceTabIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <ActiveTabButton
        focused={props.focused}
        icon={Icons.VoiceTab}
        title={'Top voices'}
      />
    );
  };

  const ReviewTabIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <ActiveTabButton
        focused={props.focused}
        icon={Icons.ReviewTab}
        title={'REVIEWS'}
      />
    );
  };

  const DiscountTabIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <ActiveTabButton
        focused={props.focused}
        icon={Icons.DiscountTab}
        title={'Discounts'}
      />
    );
  };

  const ProfileTabIcon = (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => {
    return (
      <ActiveTabButton
        focused={props.focused}
        icon={Icons.ProfileTab}
        title={'Profile Settings'}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle:
            (Platform.OS === 'android' && isKeyboardVisible) || hideTabbar
              ? {display: 'none'}
              : {
                  backgroundColor: COLORS.slate_blue,
                  margin: 5,
                  borderRadius: 12,
                  height: 65,
                  borderTopWidth: 0,
                },

          tabBarShowLabel: false,
        }}
        initialRouteName={SCREENS.HOME_SCREEN}>
        <Tab.Screen
          name={SCREENS.HOME_SCREEN}
          options={{
            tabBarIcon: HomeTabIcon,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name={SCREENS.VOICE_TAB}
          component={VoiceStack}
          options={{
            tabBarIcon: VoiceTabIcon,
          }}
        />
        <Tab.Screen
          name={SCREENS.REVIEWS_SCREEN}
          component={ReviewsScreen}
          options={{
            tabBarIcon: ReviewTabIcon,
          }}
        />
        <Tab.Screen
          name={SCREENS.DISCOUNTS_SCREEN}
          component={DiscountScreen}
          options={{
            tabBarIcon: DiscountTabIcon,
          }}
        />
        <Tab.Screen
          name={SCREENS.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{
            tabBarIcon: ProfileTabIcon,
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  tabButtonView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  iconView: {
    position: 'absolute',
    top: -20,
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabTitle: {
    marginTop: 30,
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
});
