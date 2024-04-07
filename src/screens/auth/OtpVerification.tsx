import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useRef} from 'react';
import AppSvgIcon, {Icons} from '../../components/app-svg-icon/AppSvgIcon';
import {COLORS} from '../../styles/colors';
import AppButton from '../../components/app-buttom/AppButton';
import {useNavigation} from '@react-navigation/native';
import {SCREENS} from '../../types/Types';

const OtpVerification = ({route}) => {
  // const udata = route.params.data;
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = useRef([]);
  // console.log(otp.join(''));
  const navigation = useNavigation();

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyPress = (index, event) => {
    if (event.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = ''; // Clear the value of the previous input
      setOtp(newOtp);
      inputRefs.current[index - 1].focus(); // Focus the previous input
    }
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <View style={{flex: 4}}>
        <View style={styles.labelContainer}>
          <View style={styles.backIcon}>
            <AppSvgIcon
              icon={Icons.ArrowLeft}
              width={25}
              height={25}
              color="black"
            />
          </View>
          <View style={styles.verific}>
            <Text style={styles.label}>verification</Text>
          </View>
        </View>
        <View>
          <Text style={styles.description}>
            Code has been send to moh ***** gmail.com
          </Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={digit}
                onChangeText={text => handleChange(index, text)}
                onKeyPress={event => handleKeyPress(index, event)}
                keyboardType="numeric"
                maxLength={1}
                ref={ref => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <Text style={styles.invalidTxt}>Code Invalid</Text>
          <Text style={styles.otpTxt}>Don't receive a code</Text>
          <View style={styles.time}>
            <AppSvgIcon
              icon={Icons.Time}
              width={20}
              height={20}
              color="black"
            />
            <Text style={styles.timeTxt}>00:25</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.resendTxt}>Resend Code</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <AppButton
          onPress={handleSubmit}
          buttonText="Verify"
          btnColor={COLORS.pink}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate(SCREENS.LOGIN)}
          style={styles.bottomTexts}>
          <Text style={styles.backTxt}>Back to</Text>
          <Text style={styles.signTxt}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default OtpVerification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 20,
  },
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  verific: {
    flex: 1,
  },
  label: {
    fontSize: 30,
    fontWeight: '500',
    color: COLORS.primary,
    textAlign: 'center',
  },
  description: {
    color: '#BABDC1',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#252A2E',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginTop: 50,
  },
  input: {
    borderWidth: 2,
    borderColor: '#4C555F',
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    width: '20%',
    backgroundColor: '#252A2E',
    color: 'white',
    fontSize: 30,
  },
  otpTxt: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.grayish_blue,
    marginTop: 15,
  },
  invalidTxt: {
    color: '#FF6347',
    fontSize: 16,
    textAlign: 'center',
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  timeTxt: {
    fontSize: 16,
    color: COLORS.grayish_blue,
    paddingLeft: 10,
  },
  resendTxt: {
    color: COLORS.grayish_blue,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 15,
  },
  btnContainer: {
    flex: 1,
  },
  backTxt: {
    fontSize: 16,
    color: COLORS.grayish_blue,
  },
  signTxt: {
    color: COLORS.primary,
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 18,
  },
  bottomTexts: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
