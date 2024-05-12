import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';

interface Props {
  onPress: () => void;
  title: string;
}
const ListView = ({onPress, title}: Props) => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.titel}>{title}</Text>
      <TouchableOpacity onPress={onPress} style={styles.buttonView}>
        <Text style={styles.buttonText}>View All</Text>
        <View style={styles.imgView}>
          <AppSvgIcon
            icon={Icons.ForwardArrow}
            width={6}
            height={12}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ListView;

const styles = StyleSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titel: {
    color: COLORS.grayish_blue,
    fontSize: 16,
    fontWeight: '600',
  },
  buttonView: {
    flexDirection: 'row',
  },
  buttonText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  imgView: {
    alignSelf: 'center',
  },
});
