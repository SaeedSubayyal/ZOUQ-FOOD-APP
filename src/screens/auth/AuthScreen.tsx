import {Image, SafeAreaView, StyleSheet, Dimensions, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../styles/colors';
import AppButton from '../../components/app-buttom/AppButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../types/Types';

const AuthScreen = () => {
  const deviceWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const onPressSignIn = () => {
    navigation.navigate(SCREENS.LOGIN);
  };
  const onPressSignUp = () => {
    navigation.navigate(SCREENS.REGISTRATION);
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.zoakImg}>
        <Image
          source={require('../../../assets/images/zouq.png')}
          style={{width: '100%'}}
        />
      </View>
      <View style={styles.toyImages}>
        <View style={styles.toyContainer}>
          <View style={styles.rightToy}>
            <Image
              source={require('../../../assets/images/toy1.png')}
              style={{
                width: deviceWidth / 1.5,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={styles.leftToy}>
            <Image
              source={require('../../../assets/images/toy2.png')}
              style={{width: deviceWidth / 2, resizeMode: 'contain'}}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <AppButton
          buttonText="Sign in"
          onPress={onPressSignIn}
          btnColor={COLORS.blue_gray}
        />
        <AppButton
          buttonText="Sign up"
          onPress={onPressSignUp}
          btnColor={COLORS.blue_gray}
        />
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  zoakImg: {
    flex: 1,
  },
  toyContainer: {
    flexDirection: 'row',
    marginBottom: 100,
  },
  toyImages: {
    flex: 3,
  },
  rightToy: {
    position: 'absolute',
    left: 0,
    zIndex: 2,
  },
  leftToy: {
    position: 'absolute',
    right: 0,
  },
  buttons: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-evenly',
  },
});
