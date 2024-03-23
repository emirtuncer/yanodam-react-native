import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, Dimensions, Image, StyleSheet, View} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '../context/ThemeManager';

const imageWidth = (Dimensions.get('window').width * 60) / 100;

const ImageItem = ({photo, isOwner}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [profilePhoto] = useState(photo);

  const removePhoto = async () => {
    Alert.alert(
      'Onaylama',
      'Bu gorseli kaldirmak istiyor musunuz',
      [
        {
          text: 'Iptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => console.log('Sill'),
        },
      ],
      {cancelable: true},
    );
  };

  const addPhoto = () => {
    console.log('add photo');
  };

  const openPhoto = () => {
    navigation.navigate('CommonScreens', {
      screen: 'ImageViewer',
      params: {imageSource: photo},
    });
  };

  const doNothing = () => {};

  return (
    <TouchableWithoutFeedback
      onLongPress={
        isOwner ? (profilePhoto ? removePhoto : doNothing) : doNothing
      }
      onPress={profilePhoto ? openPhoto : addPhoto}
      style={[
        styles.houseImageContainer,
        {
          backgroundColor: theme.profileCardBackground,
        },
      ]}>
      {profilePhoto ? (
        <Image style={{flex: 1}} source={{uri: photo}} />
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <AntDesign name="plus" size={32} color={theme.text} />
        </View>
      )}
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  houseImageContainer: {
    margin: 5,
    height: imageWidth,
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },

  houseImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },
});

export default ImageItem;
