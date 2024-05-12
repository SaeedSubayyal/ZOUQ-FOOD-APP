import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';
import {State, UserPost} from '../../types/Types';
import moment from 'moment';
import {useSelector} from 'react-redux';
import SubComment from './SubComment';
import firestore, {firebase} from '@react-native-firebase/firestore';

interface PostProps {
  onPressLike: (id: string) => void;
  onPressComment: (postId: string, userId: string) => void;
  onPressDelete: (userId: string) => void;
  onDeleteSubComment: (id: string, index: number) => void;
  onPressRePost: (comment: any, image: any) => void;
  onPressSubRePost: (comment: string, id: string) => void;
}

const ChatView: FC<PostProps> = ({
  item,
  onPressLike,
  onPressComment,
  onPressDelete,
  onDeleteSubComment,
  onPressRePost,
  onPressSubRePost,
}: {
  item: UserPost;
  onPressLike: (id: string) => void;
  onPressComment: (postId: string, userId: string) => void;
  onPressDelete: (userId: string) => void;
  onDeleteSubComment: (id: string, index: number) => void;
  onPressRePost: (comment: any, image: any) => void;
  onPressSubRePost: (comment: string, id: string) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const currentId = useSelector((state: State) => state.userReducer.userId);

  const convertTime = (date: any) => {
    const timestampMoment = moment.unix(date?.timestamp.seconds);
    const formattedTimestamp = timestampMoment.fromNow();
    return formattedTimestamp;
  };

  const userId = useSelector((state: State) => state?.userReducer?.userId);
  useEffect(() => {
    const fetchLikedStatus = async () => {
      const liked = await isUserLiked(item?.usersLikeId);
      setIsLiked(liked);
    };

    fetchLikedStatus();
  }, [item?.usersLikeId]); // Re-run effect when usersLikeId changes

  const isUserLiked = async (postId: any) => {
    const isLiked = postId.includes(userId);
    return isLiked;
  };

  const onPressSubCommentLike = async (
    postId: string,
    subCommentIndex: number,
  ) => {
    try {
      const postRef = firestore().collection('userpost').doc(postId);
      const postSnapshot = await postRef.get();

      if (postSnapshot.exists) {
        const postData = postSnapshot.data();
        const subComments = postData?.subComments || [];
        // Find the specific subcomment by index
        const subComment = subComments[subCommentIndex];
        if (!subComment) {
          console.error('Subcomment not found');
          return;
        }

        // Update the subCommentLike field within the subcomment
        const userSubComLike = subComment.subCommentLike || [];
        const isLiked = userSubComLike.includes(currentId);
        if (isLiked) {
          const updatedUsersLikeId = userSubComLike.filter(
            userId => userId !== currentId,
          );
          subComment.subCommentLike = updatedUsersLikeId;
        } else {
          const updatedUsersLikeId = [...userSubComLike, currentId];
          subComment.subCommentLike = updatedUsersLikeId;
        }

        // Update the subcomment within the subcomments array
        subComments[subCommentIndex] = subComment;

        // Update the document in Firestore
        await postRef.update({subComments});
        setRefresh(true);
        console.log('Subcomment like status updated successfully');
      } else {
        console.log('Post does not exist');
      }
    } catch (error) {
      console.error('Error updating subcomment like status: ', error);
    }
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.userInfoView}>
        <View style={styles.profileImgView}>
          <Image style={styles.profileImg} source={{uri: item?.userImage}} />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.titelContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.userTitle}>{item?.userName}</Text>
              <View style={styles.verifiedView}>
                <Image
                  style={styles.verifiedImg}
                  source={require('../../../assets/images/verified.png')}
                />
              </View>
            </View>
            <Text style={styles.time}>{convertTime(item)}</Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>{item?.mainComment}</Text>
          </View>
          {item?.postImageURL && (
            <View style={styles.imageView}>
              <Image
                style={{height: '100%', width: '100%', borderRadius: 12}}
                source={{uri: item?.postImageURL}}
              />
            </View>
          )}
          <View style={styles.likeCommentsView}>
            <TouchableOpacity
              onPress={() => onPressLike(item?.id)}
              style={styles.like}>
              {isLiked ? (
                <AppSvgIcon icon={Icons.FillHeart} color="black" />
              ) : (
                <AppSvgIcon icon={Icons.Heart} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressComment(item?.id, item?.userId)}
              style={styles.comments}>
              <AppSvgIcon icon={Icons.Comments} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                onPressRePost(item?.mainComment, item?.postImageURL)
              }
              style={styles.share}>
              <AppSvgIcon icon={Icons.Repost} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.numberoflikes}>
            {item?.usersLikeId?.length} like
          </Text>
        </View>
        <View style={styles.menuView}>
          <View style={styles.menu}>
            <TouchableOpacity
              onPress={() => {
                setDeleteView(!deleteView);
              }}
              style={{height: 20}}>
              <Image
                style={styles.menuIcon}
                source={require('../../../assets/images/3dots.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* here is sub comment */}
      <View style={styles.subComment}>
        {item?.subComments?.map((subItem, index) => (
          <SubComment
            subItem={subItem}
            itemId={item.id}
            index={index}
            onPressLike={(id: string, index: number) =>
              onPressSubCommentLike(id, index)
            }
            onDeleteSubComment={(id, index) => {
              onDeleteSubComment(id, index);
            }}
            onPressSubRePost={(comment: string, id: string) =>
              onPressSubRePost(comment, id)
            }
          />
        ))}
      </View>
      {deleteView && (
        <View
          style={{
            backgroundColor: COLORS.white,
            position: 'absolute',
            height: 30,
            width: 100,
            top: 24,
            right: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            onPress={() => {
              onPressDelete(item.id);
            }}>
            Delete
          </Text>
        </View>
      )}
    </View>
  );
};

export default ChatView;

const styles = StyleSheet.create({
  chatContainer: {
    marginBottom: 20,
  },
  userInfoView: {
    flexDirection: 'row',
  },
  titelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  profileImgView: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  profileImg: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  userTitle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  verifiedView: {
    marginLeft: 10,
  },
  verifiedImg: {
    height: 12,
    width: 12,
  },
  menuView: {
    flexDirection: 'row',
    marginTop: 5,
  },
  menuIcon: {
    height: 24,
    width: 24,
  },
  time: {
    color: COLORS.gray,
    fontSize: 12,
    marginRight: 10,
    marginTop: 3,
  },
  menu: {},
  description: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 5,
  },
  imageView: {
    height: 161,
    borderRadius: 10,
    marginVertical: 8,
  },
  descriptionView: {},
  likeCommentsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  like: {},
  comments: {
    marginLeft: 15,
  },
  share: {
    marginLeft: 15,
  },
  numberoflikes: {
    color: COLORS.gray,
    fontSize: 16,
  },
  subComment: {
    marginTop: 10,
  },
});
