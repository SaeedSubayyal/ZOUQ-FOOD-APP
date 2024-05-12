import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppInput from '../../components/app-inputs/AppInput';
import {Icons} from '../../utils/helper/svg';
import AppButton from '../../components/app-buttom/AppButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../types/Types';
import AppSvgIcon from '../../components/app-svg-icon/AppSvgIcon';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {googleAuthConfig} from '../../utils/helper/auth';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {actionUserId} from '../../redux/user/action';

const Regisration = () => {
  const initialState = {
    gmail: '',
    password: '',
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const validation = data.gmail == '' || data.password == '';
  const dispatch = useDispatch();
  useEffect(() => {
    googleAuthConfig();
  }, []);
  const onPressGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.log(await GoogleSignin.hasPlayServices());
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo, 'this is google info ');
    } catch (error) {
      if (error === statusCodes.SIGN_IN_CANCELLED) {
        console.log('user cancel ');
      } else if (error === statusCodes.IN_PROGRESS) {
        console.log('user sign in proogress');
      } else if (error === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('google services not avialable');
      } else {
        console.log('in else part', error);
      }
    }
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();
    //   console.log(userInfo, 'this is user info');
    // } catch (error) {
    //   if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //     // user cancelled the login flow
    //     console.log('error');
    //   } else if (error.code === statusCodes.IN_PROGRESS) {
    //     // operation (e.g. sign in) is in progress already
    //     console.log('in progress');
    //   } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //     // play services not available or outdated
    //     console.log('not avaible');
    //   } else {
    //     // some other error happened
    //     console.log('in elsee ', error);
    //   }
    // }
  };

  const onChangeText = (key: string, val: string) => {
    setData(prevState => ({...prevState, [key]: val}));
  };

  const onPressRegistration = async () => {
    if (data.password.length < 6) {
      return Alert.alert(
        'Alert',
        'Password length must be at least 6 characters!',
      );
    }
    if (!validation) {
      setLoading(true);
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          data.gmail,
          data.password,
        );
        // Send email verification
        await userCredential.user.sendEmailVerification();
        setLoading(false);
        Alert.alert(
          'Alert',
          'User account created successfully! Please verify your email. and then login ',
        );
        const currentUser: any = {
          displayName: '',
          email: firebase().currentUser?.email,
          uId: firebase().currentUser?.uid,
          userImage: '',
          location: '',
          gender: '',
          date: '',
        };
        const usersCollection = firestore().collection('users');
        usersCollection
          .doc(firebase().currentUser?.uid)
          .set(currentUser)
          .then(docRef => {
            console.log('Document written with ID: ', docRef);
          })
          .catch(error => {
            console.error('Error adding document: ', error);
          });
        dispatch(actionUserId(firebase().currentUser?.uid));
        // Navigate to another screen if needed
        navigation.navigate(SCREENS.LOGIN);
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/email-already-in-use') {
          return Alert.alert('Alert', 'That email address is already in use!');
        } else if (error.code === 'auth/invalid-email') {
          return Alert.alert('Alert', 'That email address is invalid!');
        }
        console.error(error);
        Alert.alert(
          'Error',
          'Failed to create user account. Please try again later.',
        );
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.topContainer} />
      <View style={styles.mainContainer}>
        <Text style={styles.loginTxt}>Registration</Text>
        <View style={styles.inputs}>
          <AppInput
            placeholder="name@domain.com"
            onChangeText={(val: string) => onChangeText('gmail', val)}
            value={data.gmail}
            rightIcon={Icons.Message}
            style={{color: 'white'}}
          />
          <View style={styles.inputs}>
            <AppInput
              placeholder="*********"
              secureTextEntry={true}
              onChangeText={(val: string) => onChangeText('password', val)}
              value={data.password}
              rightIcon={Icons.User}
              style={{color: 'white'}}
            />
          </View>
        </View>
        {loading && <ActivityIndicator size={'large'} color={'white'} />}
        <View>
          <View style={styles.signBtn}>
            <AppButton
              buttonText="Register"
              btnColor={validation ? COLORS.pink : COLORS.primary}
              disable={validation}
              onPress={onPressRegistration}
            />
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bothLine}>
              <View style={styles.line} />
              <Text style={styles.withGoogleTxt}>Or sign up with</Text>
              <View style={styles.line} />
            </View>
            <TouchableOpacity onPress={onPressGoogle} style={styles.googleIcon}>
              <AppSvgIcon
                icon={Icons.Google}
                width={25}
                height={25}
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.bottomTxt}
              onPress={() => navigation.navigate(SCREENS.LOGIN)}>
              <Text style={styles.accountTxt}>Have an account?</Text>
              <Text style={styles.signupTxt}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Regisration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  topContainer: {
    marginTop: 100,
  },
  mainContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  loginTxt: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: '600',
    textAlign: 'center',
  },
  inputs: {
    marginTop: 32,
  },
  signBtn: {
    marginTop: 200,
  },
  bottomContainer: {
    width: '100%',
    height: 100,
    marginTop: 30,
  },
  bothLine: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  line: {
    width: '33%',
    backgroundColor: '#6D6C69',
    height: 1,
    marginTop: 10,
  },
  bottomTxt: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  accountTxt: {
    color: '#BABDC1',
    fontSize: 16,
  },
  googleIcon: {
    // backgroundColor: 'pink',
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.white,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  signupTxt: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
    paddingLeft: 5,
  },
  withGoogleTxt: {
    color: '#6D6C69',
  },
});
