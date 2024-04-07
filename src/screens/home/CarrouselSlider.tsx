import React, {Fragment, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableWithoutFeedback} from 'react-native';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import Swiper from 'react-native-swiper';
import {COLORS} from '../../styles/colors';
import {firebaseSlider} from '../../types/Types';
import firestore from '@react-native-firebase/firestore';

const CarrouselSlider = () => {
  const [sliderData, setSliderData] = useState([]);
  const [sliderSetting, setSliderSetting] = useState([]);
  const getCarrouselSlidesData = async () => {
    const usersCollection = firestore().collection('slider');
    const settingDocRef = firestore().doc('slider/setting');
    try {
      const querySnapshot = await usersCollection.get();
      const sliderData: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      settingDocRef.get().then(doc => {
        if (doc.exists) {
          const settingData: any = doc.data();
          setSliderData(sliderData);
          setSliderSetting(settingData);
        } else {
          console.log('Setting document not found');
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    getCarrouselSlidesData();
  }, []);

  const getSortedActiveUsers = (firebaseUsers: any) => {
    const activeUsers = firebaseUsers?.filter((item: any) => {
      return item?.id !== 'setting' && item?.active === true;
    });
    const sortedActiveUsers = activeUsers?.sort(
      (a: any, b: any) => a?.order - b?.order,
    );
    return sortedActiveUsers;
  };

  return (
    <Fragment>
      {getSortedActiveUsers(sliderData).some(
        (item: firebaseSlider) => item?.active,
      ) ? (
        <View style={styles.carrouselContainer}>
          {sliderData?.length ? (
            <Swiper
              showsButtons={false}
              autoplay={true}
              autoplayDirection={true}
              autoplayTimeout={sliderSetting?.speed}
              loop={true}
              bounces={true}
              dot={<View style={styles.dot} />}
              activeDot={<View style={styles.activeDot} />}
              renderPagination={index => (
                <View style={styles.paginationStyle}>
                  <View style={styles.dotView}>
                    {getSortedActiveUsers(sliderData)?.map(
                      (item: firebaseSlider, sliderIndex: number) => {
                        return (
                          <Fragment key={sliderIndex}>
                            {index === sliderIndex ? (
                              <View style={styles.activeDot} />
                            ) : (
                              <View style={styles.dot} />
                            )}
                          </Fragment>
                        );
                      },
                    )}
                  </View>
                </View>
              )}>
              {getSortedActiveUsers(sliderData)?.map(
                (item: firebaseSlider, index: number) => (
                  <View key={index} style={styles.imageContainer}>
                    <TouchableWithoutFeedback disabled>
                      {item.active === true && (
                        <FastImage
                          style={styles.sliderImage}
                          source={{
                            uri: item.content,
                            priority: FastImage.priority.normal,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      )}
                    </TouchableWithoutFeedback>
                  </View>
                ),
              )}
            </Swiper>
          ) : (
            <View style={styles.lodingIndicater}>
              <ActivityIndicator size={'large'} color={'white'} />
            </View>
          )}
        </View>
      ) : null}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  carrouselContainer: {
    height: 170,
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
  },
  dot: {
    backgroundColor: COLORS.grayish_blue,
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginHorizontal: 3,
    marginVertical: 3,
  },
  activeDot: {
    backgroundColor: COLORS.salmon,
    width: 5,
    height: 5,
    borderRadius: 5 / 2,
    marginHorizontal: 3,
    marginVertical: 3,
  },

  paginationStyle: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 25,
  },
  dotView: {
    backgroundColor: COLORS.gray,
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 4,
  },
  imageContainer: {
    elevation: 5,
    width: '94%',
    height: 163,
    alignSelf: 'center',
    borderRadius: 15,
  },
  sliderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
  },
  lodingIndicater: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CarrouselSlider;
