import {FlatList, RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import Header from '../../components/header/header';
import ReviewsCard from '../../components/reviews-card/reviewsCard';
import firestore from '@react-native-firebase/firestore';

const ReviewsScreen = () => {
  const [reviews, setReview] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getreviews = async () => {
      const reviewsCollection = firestore().collection('reviews');
      const querySnapshot = await reviewsCollection.get();
      const userposts: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReview(userposts);
      setRefresh(false);
    };
    getreviews();
  }, [refresh]);

  const renderItem = ({item}: any) => {
    return <ReviewsCard item={item} />;
  };
  return (
    <View style={styles.container}>
      <Header headerText={'Reviews'} />
      <View style={{marginTop: 30, flex: 1}}>
        <FlatList
          data={reviews}
          renderItem={renderItem}
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

export default ReviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secondary,
  },
});
