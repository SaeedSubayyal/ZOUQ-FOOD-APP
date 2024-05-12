import {StyleSheet, TextInput, View, TextInputProps} from 'react-native';
import React, {FC} from 'react';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';
import {COLORS} from '../../styles/colors';

interface InputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: () => void;
  rightIcon?: any;
  leftIcon?: any;
  secureTextEntry?: boolean;
}

const AppInput: FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  rightIcon,
  leftIcon,
  secureTextEntry,
  ...props
}) => {
  return (
    <View style={styles.container}>
      {rightIcon && (
        <View style={styles.leftIcon}>
          <AppSvgIcon icon={rightIcon} width={25} height={25} color="black" />
        </View>
      )}
      <View style={styles.input}>
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor={COLORS.dark_gray}
          style={{color: COLORS.white}}
          secureTextEntry={secureTextEntry}
          {...props}
        />
      </View>
      {leftIcon && (
        <View style={styles.rightIcon}>
          <AppSvgIcon icon={leftIcon} width={25} height={25} color="black" />
        </View>
      )}
    </View>
  );
};

export default AppInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.charcoal,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate_blue,
  },
  leftIcon: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 5,
  },
  rightIcon: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
