import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import AppSvgIcon, {Icons} from '../../components/app-svg-icon/AppSvgIcon';
import AppButton from '../../components/app-buttom/AppButton';
import AppInput from '../../components/app-inputs/AppInput';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import AppLoader from '../../components/app-loader/AppLoader';

const AddPostScreen = (props: any) => {
  const [comment, setComment] = useState('');
  const [imageData, setImageData] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const usersCollection = firestore().collection('users');

  const onChangeText = (val: string) => {
    setComment(val);
  };
  const getUserData = async () => {
    try {
      const querySnapshot = await usersCollection.get();
      const userData: any = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserData(userData);
    } catch (error) {
      console.log(error, 'while get user data');
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  console.log(imageData);

  const validation = imageData == '' || comment == '';

  const selectImage = async () => {
    console.log('click');
    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.7,
        multiple: false,
      });
      console.log(image, ' from gallery image');
      setImageData(image.path);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };
  console.log(validation);

  // post publiuc
  const onPressPost = async () => {
    if (validation) {
      return Alert.alert('Alert', 'Please fill all the fields');
    }
    setLoading(true);
    try {
      const reference = storage().ref('post');
      const res = await reference.putFile(imageData);
      const downloadURL = await reference.getDownloadURL();
      const commentsCollection = firestore().collection('userpost');
      await commentsCollection.add({
        mainComment: comment,
        postImageURL: downloadURL,
        usersLikeId: [],
        userImage: userData[0]?.userImage,
        userName: userData[0]?.displayName, // if user change not show change image
        userId: userData[0]?.id ?? '',
        timestamp: firestore.FieldValue.serverTimestamp(),
      });
      setImageData('');
      setComment('');
      setLoading(false);
      navigation.goBack();
    } catch (error) {
      console.log(error, 'while post');
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.goBack();
          }}>
          <AppSvgIcon icon={Icons.Close} color="red" height={14} width={14} />
        </TouchableOpacity>
        <Text style={styles.postText}>New Post</Text>
      </View>
      <AppLoader loading={loading} />
      <View style={styles.postView}>
        <View style={styles.profileImgView}>
          <Image
            style={styles.profileImg}
            source={require('../../../assets/images/profile.png')}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.title}>
            {userData[0]?.displayName ?? 'user name'}
          </Text>
          <View style={styles.input}>
            <AppInput
              placeholder="found a new place to eat......"
              onChangeText={val => onChangeText(val)}
              value={comment.comment}
            />
          </View>
          <TouchableOpacity onPress={selectImage} style={{marginTop: 15}}>
            <AppSvgIcon
              icon={Icons.Attachdoc}
              color="red"
              height={27}
              width={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10, height: 170}}>
        {imageData !== null && (
          <Image
            source={{
              uri: imageData,
            }}
            style={{width: '100%', height: 170, resizeMode: 'cover'}}
          />
        )}
      </View>
      <View style={styles.postBtn}>
        <AppButton
          btnColor={COLORS.primary}
          buttonText="Post"
          onPress={onPressPost}
        />
      </View>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secondary,
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
  headerView: {
    flexDirection: 'row',
    marginTop: 80,
    alignItems: 'center',
  },
  postText: {
    color: COLORS.white,
    fontSize: 18,
    marginLeft: 20,
  },
  postView: {
    flexDirection: 'row',
    marginTop: 60,
  },
  title: {
    fontSize: 16,
    color: COLORS.white,
    fontWeight: '600',
  },
  editText: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 5,
  },
  inputContainer: {
    width: '90%',
  },
  input: {
    width: '100%',
    marginTop: 20,
  },
  postBtn: {
    marginTop: 70,
    width: '100%',
  },
});
