import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../../styles/colors';

interface BtnProps {
  buttonText: string;
  onPress: () => void;
  disable?: boolean;
  btnColor: string;
}
const AppButton: FC<BtnProps> = ({buttonText, onPress, btnColor, disable}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disable}
      style={[styles.container, {backgroundColor: btnColor}]}>
      <Text style={styles.txt}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.blue_gray,
    height: 53,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '500',
  },
});
