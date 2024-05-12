import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';

interface Props {
  onPress?: () => void;
  title: string;
  icon?: any;
  height?: number;
  width?: number;
  showIcon?: boolean;
  placeholder?: string;
  disabled?: boolean;
}
const InfoView = ({
  onPress,
  title,
  icon,
  height,
  width,
  placeholder,
  disabled,
}: Props) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={styles.infoView}>
      {title ? (
        <Text style={[styles.title, {color: COLORS.white}]}>{title}</Text>
      ) : (
        <Text style={styles.title}>{placeholder}</Text>
      )}
      {icon && (
        <TouchableOpacity onPress={onPress}>
          <AppSvgIcon icon={icon} width={height} height={width} color="black" />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default InfoView;

const styles = StyleSheet.create({
  infoView: {
    backgroundColor: COLORS.charcoal,
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.slate_blue,
    paddingHorizontal: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: COLORS.dark_gray,
    fontSize: 16,
  },
});
