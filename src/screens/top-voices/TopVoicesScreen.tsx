import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import Header from '../../components/header/header';
import ChatView from '../../components/chat-view/chat';
import AppSvgIcon, {Icons} from '../../components/app-svg-icon/AppSvgIcon';
import {SCREENS, State, UserPost} from '../../types/Types';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import AppModal from '../../components/app-modal/AppModal';
import AppInput from '../../components/app-inputs/AppInput';
import AppButton from '../../components/app-buttom/AppButton';

const TopVoicesScreen = (props: any) => {
  const [userPost, setUserPost] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [commentData, setCommentData] = useState('');
  const [PostId, setPostId] = useState('');

  const currentId = useSelector((state: State) => state.userReducer.userId);

  useFocusEffect(
    React.useCallback(() => {
      getPostData();
    }, []),
  );
  const getPostData = async () => {
    try {
      const usersCollection = firestore().collection('userpost');
      const querySnapshot = await usersCollection.get();
      const userposts: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(userposts, 'uuuii');
      setUserPost(userposts);
      setRefresh(false);
    } catch (error) {
      console.log(error, 'while get user data');
    }
  };
  useEffect(() => {
    getPostData();
  }, [refresh]);

  const onPressDelete = (id: string) => {
    firestore()
      .collection('userpost')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        setRefresh(true);
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  };
  const onDeleteSubComment = (id: any, index: any) => {
    firestore()
      .collection('userpost')
      .doc(id)
      .get()
      .then(doc => {
        if (doc.exists) {
          // Step 2: Modify the array
          const subComments = doc.data().subComments || [];
          const updatedSubComments = subComments.filter(
            (item: any, i: any) => i !== index,
          ); // Remove the element at the selected index

          // Step 3: Update the document with the modified array
          return firestore().collection('userpost').doc(id).update({
            subComments: updatedSubComments,
          });
        } else {
          console.log('No such document!');
        }
      })
      .then(() => {
        setRefresh(true);
        console.log('Sub-comment successfully deleted!');
        // Additional logic if needed after deletion
      })
      .catch(error => {
        console.error('Error deleting sub-comment: ', error);
      });
  };

  const onChangeTextComment = (val: string) => {
    setCommentData(val);
  };

  // user like action here
  const onPressPostLike = async (postId: string) => {
    try {
      const postRef = firestore().collection('userpost').doc(postId);
      const postSnapshot = await postRef?.get();

      if (postSnapshot.exists) {
        const postData = postSnapshot?.data();
        const usersLikeId = postData?.usersLikeId || [];
        const isLiked = usersLikeId.includes(currentId);
        if (isLiked) {
          const updatedUsersLikeId = usersLikeId.filter(
            (userId: string) => userId !== currentId,
          );
          await postRef.update({usersLikeId: updatedUsersLikeId});
          setRefresh(true);
        } else {
          const updatedUsersLikeId = [...usersLikeId, currentId];
          await postRef.update({usersLikeId: updatedUsersLikeId});
          setRefresh(true);
        }
        console.log('Post like status updated successfully');
      } else {
        console.log('Post does not exist');
      }
    } catch (error) {
      console.error('Error updating post like status: ', error);
    }
  };
  console.log(currentId, 'current id');

  const onPressComment = async (postId: string, userId: string) => {
    setIsVisible(true);
    setPostId(postId);
  };
  const onPressPost = async () => {
    const usersCollection = firestore().collection('userpost');
    const currentUserInfo = firestore().collection('users').doc(currentId);
    const userData = await currentUserInfo.get().then(doc => doc.data());
    console.log(userData, 'User data');
    usersCollection
      .doc(PostId)
      .update({
        subComments: firestore.FieldValue.arrayUnion({
          subUserImage: userData?.userImage,
          subUserName: userData?.displayName,
          subComment: commentData,
          subCommentLike: [],
          subCommentTime: firebase.firestore.Timestamp.now(),
        }),
      })
      .then(() => {
        console.log('Subcomment added successfully');
      })
      .catch(error => {
        console.error('Error adding subcomment: ', error);
        setIsVisible(false);
      });
    setIsVisible(false);
  };
  console.log(commentData);

  const onPressRePost = async (comment: any, image: any) => {
    const currentUserInfo = firestore().collection('users').doc(currentId);
    const userData = await currentUserInfo.get().then(doc => doc.data());
    const commentsCollection = firestore().collection('userpost');
    await commentsCollection.add({
      mainComment: comment,
      postImageURL: image,
      usersLikeId: [],
      userImage: userData?.userImage,
      userName: userData?.displayName,
      userId: currentId ?? '',
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    setRefresh(true);
  };

  const onPressSubRePost = async (comment: string, id: string) => {
    const usersCollection = firestore().collection('userpost');
    const currentUserInfo = firestore().collection('users').doc(currentId);
    const userData = await currentUserInfo.get().then(doc => doc.data());
    usersCollection
      .doc(id)
      .update({
        subComments: firestore.FieldValue.arrayUnion({
          subUserImage: userData?.userImage,
          subUserName: userData?.displayName,
          subComment: comment,
          subCommentLike: [],
          subCommentTime: firebase.firestore.Timestamp.now(),
        }),
      })
      .then(() => {
        console.log('Subcomment added successfully');
        setRefresh(true);
      })
      .catch(error => {
        console.error('Error adding subcomment: ', error);
      });
  };

  const renderItem = ({item}: {item: UserPost}) => {
    return (
      <ChatView
        item={item}
        onPressLike={(id: string) => onPressPostLike(id)}
        onPressComment={(postId: string, userId: string) =>
          onPressComment(postId, userId)
        }
        onPressDelete={(id: string) => {
          onPressDelete(id);
        }}
        onDeleteSubComment={(id: any, index: any) => {
          onDeleteSubComment(id, index);
        }}
        onPressRePost={(comment, image) => onPressRePost(comment, image)}
        onPressSubRePost={(comment, id) => onPressSubRePost(comment, id)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header headerText={'Top Voices'} />
      <View style={{marginTop: 30, flex: 1}}>
        <FlatList
          data={userPost}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={refresh}
          //     onRefresh={() => setRefresh(true)}
          //   />
          // }
        />
      </View>
      <AppModal
        visible={isVisible}
        onPressCross={() => setIsVisible(false)}
        children={
          <View style={styles.modalContainer}>
            <AppInput
              placeholder="Enter your comment"
              onChangeText={val => onChangeTextComment(val)}
              value={commentData}
            />
            <View style={{marginTop: 15}}>
              <AppButton
                btnColor={COLORS.primary}
                buttonText="Post"
                onPress={onPressPost}
              />
            </View>
          </View>
        }
      />
      {userPost.length == 0 ? (
        <Text style={styles.noPost}>There is no Posts ...</Text>
      ) : (
        console.log('non e')
      )}
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate(SCREENS.ADD_POST_SCREEN);
        }}
        style={styles.rePostView}>
        <AppSvgIcon
          icon={Icons.AddComment}
          width={25}
          height={25}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopVoicesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secondary,
  },
  rePostView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    position: 'absolute',
    bottom: 25,
    right: 18,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noPost: {
    color: COLORS.primary,
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
  },
  modalContainer: {
    marginTop: 30,
    width: 250,
    height: 100,
  },
});
