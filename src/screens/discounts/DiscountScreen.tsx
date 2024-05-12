import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import Header from '../../components/header/header';
import DiscountCard from '../../components/discount-card/discountCard';
import firestore from '@react-native-firebase/firestore';

const DiscountScreen = () => {
  const [discount, setDiscount] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getreviews = async () => {
      const reviewsCollection = firestore().collection('reviews');
      const querySnapshot = await reviewsCollection.get();
      const userposts: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      const sortByLike = (a: {like: any}, b: {like: any}) => {
        if (a.like === b.like) {
          return 0;
        }
        return a.like ? -1 : 1; // true comes first
      };

      userposts.sort(sortByLike);
      setDiscount(userposts);
      setRefresh(false);
    };
    getreviews();
  }, [refresh]);

  const onPressLike = (like: any, id: any) => {
    const newDiscountArray: any = [...discount];
    const findIndex = discount.findIndex(item => item.id === id);
    if (like === true) {
      newDiscountArray[findIndex] = {
        ...newDiscountArray[findIndex],
        like: false,
      };
      const usersCollection = firestore().collection('reviews');
      usersCollection
        .doc(id)
        .update({
          like: false,
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    } else {
      newDiscountArray[findIndex] = {
        ...newDiscountArray[findIndex],
        like: true,
      };
      const usersCollection = firestore().collection('reviews');
      usersCollection
        .doc(id)
        .update({
          like: true,
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
    }

    const sortByLike = (a: {like: any}, b: {like: any}) => {
      if (a.like === b.like) {
        return 0;
      }
      return a.like ? -1 : 1; // true comes first
    };
    newDiscountArray.sort(sortByLike);
    setDiscount(newDiscountArray);
  };

  const renderItem = ({item}: any) => {
    return (
      <DiscountCard
        item={item}
        onPressLike={(like: any, id: any) => onPressLike(like, id)}
      />
    );
  };
  return (
    <View style={styles.container}>
      <Header headerText={'Discounts'} />
      <View style={{marginTop: 10, flex: 1}}>
        <FlatList
          data={discount}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(_item, index) => index.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
            />
          }
        />
      </View>
    </View>
  );
};

export default DiscountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secondary,
  },
});
