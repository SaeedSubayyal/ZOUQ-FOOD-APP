import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../app-svg-icon/AppSvgIcon';
import {SubComments} from '../../types/Types';
import moment from 'moment';
import {useSelector} from 'react-redux';

interface PostProps {
  onPressLike: (id: string, index: number) => void;
  onDeleteSubComment: (id: string, index: number) => void;
  index: number;
  onPressSubRePost: (comment: string, id: string) => void;
}

const SubComment: FC<PostProps> = ({
  subItem,
  itemId,
  index,
  onPressLike,
  onDeleteSubComment,
  onPressSubRePost,
}: {
  subItem: SubComments;
  itemId: any;
  index: number;
  onDeleteSubComment: (id: string, index: number) => void;
  onPressLike: (id: string) => void;
  onPressSubRePost: (comment: string, id: string) => void;
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const userId = useSelector((state: State) => state?.userReducer?.userId);
  const [deleteView, setDeleteView] = useState(false);
  //   console.log(itemId, 'jjjj');

  const convertTime = (date: any) => {
    console.log(date, 'this is sub date');
    const timestampMoment = moment.unix(date?.seconds);
    const formattedTimestamp = timestampMoment.fromNow();
    return formattedTimestamp;
  };
  useEffect(() => {
    const fetchLikedStatus = async () => {
      const liked = await isUserLiked(subItem?.subCommentLike);
      setIsLiked(liked);
    };

    fetchLikedStatus();
  }, [subItem?.subCommentLike]); // Re-run effect when usersLikeId changes

  const isUserLiked = async (postId: any) => {
    const isLiked = postId.includes(userId);
    return isLiked;
  };

  return (
    <View style={styles.chatContainer}>
      <View style={styles.userInfoView}>
        <View style={styles.profileImgView}>
          <Image
            style={styles.profileImg}
            source={{uri: subItem?.subUserImage}}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.titelContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={styles.userTitle}>{subItem?.subUserName}</Text>
            </View>
            <Text style={styles.time}>
              {convertTime(subItem.subCommentTime)}
            </Text>
          </View>
          <View style={styles.descriptionView}>
            <Text style={styles.description}>{subItem?.subComment}</Text>
          </View>

          <View style={styles.likeCommentsView}>
            <TouchableOpacity
              onPress={() => onPressLike(itemId, index)}
              style={styles.like}>
              {isLiked ? (
                <AppSvgIcon icon={Icons.FillHeart} color="black" />
              ) : (
                <AppSvgIcon icon={Icons.Heart} color="black" />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressSubRePost(subItem.subComment, itemId)}
              style={styles.share}>
              <AppSvgIcon icon={Icons.Repost} color="red" />
            </TouchableOpacity>
          </View>
          <Text style={styles.numberoflikes}>
            {subItem?.subCommentLike?.length} like
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
              onDeleteSubComment(itemId, index);
            }}>
            Delete
          </Text>
        </View>
      )}
    </View>
  );
};

export default SubComment;

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
  descriptionView: {
    marginTop: 10,
  },
  likeCommentsView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginTop: 15,
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
});
