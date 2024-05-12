import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';
import {Colors} from '../../utils/helper/svg';

const DiscountCard = ({item, onPressLike}: any) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 100,
          borderRadius: 8,
        }}>
        <ImageBackground
          imageStyle={{borderRadius: 8}}
          style={{height: '100%', width: '100%'}}
          source={{uri: item?.image}}>
          <TouchableOpacity
            onPress={() => onPressLike(item.like, item.id)}
            style={styles.heartView}>
            {!item.like ? (
              <AppSvgIcon
                icon={Icons.Heart}
                height={12}
                width={14}
                color="red"
              />
            ) : (
              <AppSvgIcon
                icon={Icons.FillHeart}
                height={12}
                width={14}
                color="red"
              />
            )}
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Text style={styles.title}>{item?.restaurantName}</Text>
      <View style={styles.ratingView}>
        <AppSvgIcon
          icon={Icons.YellowStar}
          height={14}
          width={14}
          color="red"
        />
        <Text style={styles.ratingText}>{item?.rating}</Text>
      </View>
      <Text style={styles.discountText}>{item?.discount}</Text>
    </View>
  );
};

export default DiscountCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark,
    padding: 8,
    borderRadius: 12,
    width: '46%',
    marginRight: 30,
    marginTop: 20,
  },
  title: {
    color: COLORS.grayish_blue,
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  heartView: {
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: COLORS.dark,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 5,
    top: 5,
  },
  ratingView: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 12,
    color: COLORS.grayish_blue,
  },
  discountText: {
    marginTop: 5,
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
