import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';

const ReviewsCard = ({item}: any) => {
  const [selectedRaating, setSelectedRating] = useState<any>();
  const ratingArray = [1, 2, 3, 4, 5];

  // const onPressRating = (item: any) => {
  //   if (item === selectedRaating) {
  //     setSelectedRating(item - 1);
  //   } else {
  //     setSelectedRating(item);
  //   }
  // };

  const firstDigitString = item.rating.toString()[0];

  const firstDigit = parseInt(firstDigitString);
  return (
    <View style={styles.container}>
      <View
        style={{
          height: 75,
          width: 100,
          borderRadius: 8,
        }}>
        <Image
          style={{height: '100%', width: '100%', borderRadius: 8}}
          source={{uri: item.image}}
        />
      </View>
      <View style={{justifyContent: 'flex-end', marginLeft: 10}}>
        <Text style={styles.title}>{item?.restaurantName}</Text>
        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
          {ratingArray.map(item => {
            return (
              <>
                {firstDigit >= item ? (
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     onPressRating(item);
                  //   }}>
                  <AppSvgIcon
                    icon={Icons.YellowStar}
                    height={22}
                    width={22}
                    style={{marginRight: 5}}
                    color="red"
                  />
                ) : (
                  // </TouchableOpacity>
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     onPressRating(item);
                  //   }}>
                  <AppSvgIcon
                    icon={Icons.GreyStar}
                    height={22}
                    width={22}
                    style={{marginRight: 5}}
                    color="red"
                  />
                  // </TouchableOpacity>
                )}
              </>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default ReviewsCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark,
    padding: 8,
    borderRadius: 12,
    flexDirection: 'row',
    marginTop: 15,
  },
  title: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
});
