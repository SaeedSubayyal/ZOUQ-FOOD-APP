import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppInput from '../../components/app-inputs/AppInput';
import {Icons} from '../../utils/helper/svg';
import AppButton from '../../components/app-buttom/AppButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS, State} from '../../types/Types';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {actionRegisterUserSuccess} from '../../redux/user/action';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/auth';
import {actionUserId} from '../../redux/user/action';

const Login = () => {
  const initialState = {
    gmail: '',
    password: '',
  };
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onChangeText = (key: string, val: string) => {
    setData(prevState => ({...prevState, [key]: val}));
  };

  const validation = data?.gmail == '' || data.password == '';
  console.log(validation);
  const onPressLogin = async () => {
    if (!validation) {
      setLoading(true);
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          data.gmail,
          data.password,
        );
        setLoading(false);
        if (userCredential.user.emailVerified) {
          console.log(userCredential.user.emailVerified, 'inside');
          // navigation.navigate(SCREENS.TAB_NAVIGATOR);
          let response = {
            verify: true,
            email: data?.gmail,
            isLogin: true,
          };
          dispatch(actionRegisterUserSuccess(response));
          const currentUser = {
            displayName: userCredential?.user?.displayName,
            email: userCredential?.user?.email,
            uId: userCredential?.user?.uid,
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
          dispatch(actionUserId(userCredential?.user?.uid));
        } else {
          return Alert.alert('Alert', 'Please verify email to login');
        }
      } catch (error) {
        setLoading(false);
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Alert', 'User not found. Please sign up.');
        } else if (error.code === 'auth/wrong-password') {
          return Alert.alert('Alert', 'Incorrect password. Please try again.');
        }
        console.error(error);
        Alert.alert('Error', error.message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={styles.topContainer} />
      <View style={styles.mainContainer}>
        <Text style={styles.loginTxt}>Login</Text>
        <View style={styles.inputs}>
          <AppInput
            placeholder="name@domain.com"
            onChangeText={(val: string) => onChangeText('gmail', val)}
            value={data.gmail}
            style={{color: 'white'}}
          />
          <View style={styles.inputs}>
            <AppInput
              placeholder="*********"
              secureTextEntry={true}
              onChangeText={(val: string) => onChangeText('password', val)}
              value={data.password}
              style={{color: 'white'}}
            />
          </View>
        </View>
        <View style={styles.signBtn}>
          <AppButton
            buttonText="Sign in"
            btnColor={validation ? COLORS.pink : COLORS.primary}
            disable={validation}
            onPress={onPressLogin}
          />
        </View>
        <View style={styles.bottomContainer}>
          <View style={styles.bothLine}>
            <View style={styles.line} />
            <View style={styles.line} />
          </View>
          <TouchableOpacity
            style={styles.bottomTxt}
            onPress={() => navigation.navigate(SCREENS.REGISTRATION)}>
            <Text style={styles.accountTxt}>Don't have an account?</Text>
            <Text style={styles.signupTxt}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'pink',
  },
  mainContainer: {
    flex: 2,
    paddingHorizontal: 20,
  },
  loginTxt: {
    color: COLORS.primary,
    fontSize: 30,
    fontWeight: '600',
  },
  inputs: {
    marginTop: 32,
  },
  signBtn: {
    marginTop: 100,
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
    width: '45%',
    backgroundColor: 'white',
    height: 1,
  },
  bottomTxt: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  accountTxt: {
    color: '#BABDC1',
    fontSize: 16,
  },
  signupTxt: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: '700',
    paddingLeft: 5,
  },
});
