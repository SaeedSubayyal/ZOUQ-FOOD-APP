import {
  Alert,
  Image,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../../styles/colors';
import Header from '../../components/header/header';
import AppInput from '../../components/app-inputs/AppInput';
import {Icons} from '../../utils/helper/svg';
import AppSvgIcon from '../../components/app-svg-icon/AppSvgIcon';
import InfoView from '../../components/info-view/infoView';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import {
  actionHideTabbar,
  actionRegisterUserSuccess,
  actionUserId,
} from '../../redux/user/action';
import {SCREENS} from '../../types/Types';
import DateTimePicker from 'react-native-date-picker';
import MyDatePicker from '../../components/date-modal/MyDatePicker';
import moment from 'moment';

const ProfileScreen = (props: any) => {
  const [select, setSelect] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state: any) => state.userReducer.userId);
  const [data, setData] = useState();

  useEffect(() => {
    (async () => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        event => {
          // Retrieve keyboard height from the event
          dispatch(actionHideTabbar(true));
        },
      );

      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
          // Reset keyboard height when keyboard is hidden
          dispatch(actionHideTabbar(false));
        },
      );

      // Clean up listeners when component unmounts
      return () => {
        keyboardDidShowListener.remove();
        keyboardDidHideListener.remove();
      };
    })();
  }, []);
  useEffect(() => {
    const users = async () => {
      const userdata = await firestore().collection('users').doc(userId).get();
      setData(userdata._data);
    };
    users();
  }, [refresh]);

  const handleDateChange = (selectedDate: any) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
  };
  const onConfirm = () => {
    const selectDate = new Date(date);
    // Format the date as "MM/DD/YYYY"
    const formattedDate = moment(selectDate).format('MM/DD/YYYY');
    setData(prevState => ({...prevState, ['date']: formattedDate}));
    setShowDatePicker(false);
  };

  const selectImage = async () => {
    try {
      setRefresh(false);
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
        compressImageQuality: 0.1,
      });
      const reference = storage().ref('filename');
      await reference.putFile(image.path);
      const downloadURL = await reference.getDownloadURL();
      const usersCollection = firestore().collection('users');
      usersCollection
        .doc(userId)
        .update({
          userImage: downloadURL,
        })
        .then(docRef => {
          console.log('Document written with ID: ', docRef);
        })
        .catch(error => {
          console.error('Error adding document: ', error);
        });
      setRefresh(true);
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const onChangeText = (key: string, val: string) => {
    setData(prevState => ({...prevState, [key]: val}));
  };

  const Save = () => {
    setRefresh(false);
    const usersCollection = firestore().collection('users');
    usersCollection
      .doc(userId)
      .update({
        displayName: data?.displayName,
        date: data?.date,
        location: data?.location,
        gender: data?.gender,
      })
      .then(docRef => {
        console.log('Document written with ID: ', docRef);
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
    Alert.alert('Success', 'Profile updated successfully', [
      {text: 'OK', onPress: () => setRefresh(true)},
    ]);
    // props.navigation.navigate(SCREENS.HOME_SCREEN);/
  };

  const logOut = () => {
    dispatch(actionRegisterUserSuccess([]));
    dispatch(actionUserId(''));
  };

  return (
    <View style={styles.container}>
      <Header headerText={'Profile'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileView}>
          {data?.userImage ? (
            <Image style={styles.img} source={{uri: data?.userImage}} />
          ) : (
            <Image
              style={styles.img}
              source={require('../../../assets/images/profile.png')}
            />
          )}
        </View>
        <View>
          <Text onPress={() => selectImage()} style={styles.editText}>
            Edit
          </Text>
        </View>
        <View style={{marginVertical: 30}}>
          <InfoView title={data?.email} disabled={true} />
          <View style={{marginVertical: 20}}>
            <AppInput
              placeholder="name"
              onChangeText={(val: string) => onChangeText('displayName', val)}
              value={data?.displayName}
            />
          </View>
          <InfoView
            icon={Icons.Calendar}
            title={data?.date}
            placeholder="Select Date"
            onPress={() => {
              setShowDatePicker(true);
            }}
            height={15}
            width={25}
          />
          <View style={{marginVertical: 20}}>
            <InfoView
              icon={Icons.DownArrow}
              title={data?.gender}
              placeholder="Select Gender"
              onPress={() => {
                setSelect(!select);
              }}
              height={15}
              width={25}
            />
            {select && (
              <View style={{backgroundColor: 'white'}}>
                <TouchableOpacity
                  onPress={() => {
                    setData(prevState => ({...prevState, ['gender']: 'Male'}));
                    setSelect(false);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      borderBottomWidth: 1,
                      borderBottomColor: 'black',
                      padding: 8,
                    }}>
                    Male
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setData(prevState => ({
                      ...prevState,
                      ['gender']: 'Female',
                    }));
                    setSelect(false);
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      padding: 8,
                    }}>
                    Female
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <AppInput
            placeholder="Location"
            onChangeText={(val: string) => onChangeText('location', val)}
            value={data?.location}
            leftIcon={Icons.Map}
          />
          <View style={styles.buttonView}>
            <TouchableOpacity
              onPress={() => {
                Save();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                logOut();
              }}
              style={styles.button}>
              <Text style={styles.buttonText}>Log Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {showDatePicker && (
        <MyDatePicker
          showDatePicker={showDatePicker}
          handleDateChange={(selectedDate: any) =>
            handleDateChange(selectedDate)
          }
          onClose={() => {
            setShowDatePicker(false);
          }}
          onConfirm={() => {
            onConfirm();
          }}
          date={date}
        />
      )}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: COLORS.secondary,
  },
  profileView: {
    height: 160,
    width: 160,
    borderRadius: 80,
    backgroundColor: 'grey',
    alignSelf: 'center',
    marginTop: 50,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: 80,
  },
  editText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 25,
  },
  button: {
    width: '40%',
    backgroundColor: 'red',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonView: {
    justifyContent: 'space-between',
    height: 56,
    flexDirection: 'row',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
});
