import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';
import React, {FC} from 'react';
import {COLORS} from '../../styles/colors';

interface BtnProps {
  headerText: string;
  extraStyle?: StyleProp<TextStyle>;
}
const Header: FC<BtnProps> = ({headerText, extraStyle}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.txt, extraStyle]}>{headerText}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 28,
  },
  txt: {
    color: COLORS.white,
    fontSize: 50,
    fontWeight: 'bold',
  },
});
