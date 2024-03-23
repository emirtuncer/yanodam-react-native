import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Animated, Image, TouchableOpacity, View} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeManager';
import Text from './Text';

const Item = ({itemInfo}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  return (
    <Swipeable
      containerStyle={{
        backgroundColor: theme.swipeable,
        marginBottom: 3,
      }}
      renderLeftActions={(progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [-20, 0, 0, 1],
        });

        return (
          <Animated.View
            style={{
              transform: [{translateX: trans}],
              color: theme.greenD,
              justifyContent: 'center',
              padding: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Profile', {
                  displayName: itemInfo.displayName,
                  faculty: itemInfo.faculty,
                  university: itemInfo.university,
                  username: itemInfo.username,
                  profilePhotoUrl: itemInfo.profilePhotoUrl,
                  profileData: itemInfo.profileData,
                  houseData: itemInfo.houseData,
                  isVerified: itemInfo.isVerified,
                  igUsername: itemInfo.igUsername,
                  bio: itemInfo.bio,
                  uid: itemInfo.uid,
                  gender: itemInfo.gender,
                });
              }}>
              <Ionicons
                style={{padding: 10}}
                name="person"
                color={theme.green}
                size={24}
              />
            </TouchableOpacity>
          </Animated.View>
        );
      }}
      renderRightActions={(progress, dragX) => {
        const trans = dragX.interpolate({
          inputRange: [0, 50, 100, 101],
          outputRange: [17, 30, 0, -20],
        });
        if (itemInfo.houseData === true) {
          return (
            <Animated.View
              style={{
                transform: [{translateX: trans}],
                color: theme.greenD,
                justifyContent: 'center',
                padding: 10,
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('HouseProfile', {
                    uid: itemInfo.uid,
                    username: itemInfo.username,
                    displayName: itemInfo.displayName,
                    profilePhotoUrl: itemInfo.profilePhotoUrl,
                  });
                }}>
                <Ionicons
                  style={{padding: 10}}
                  name="home"
                  color={theme.greenD}
                  size={24}
                />
              </TouchableOpacity>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View
              style={{
                transform: [{translateX: trans}],
                color: theme.red,
                justifyContent: 'center',
                padding: 10,
              }}>
              <Ionicons
                style={{padding: 10}}
                name="home"
                color={theme.red}
                size={24}
              />
            </Animated.View>
          );
        }
      }}>
      <View
        style={{
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          height: 150,
          padding: 10,
          flex: 1,
          backgroundColor: theme.card,
          flexDirection: 'row',
          overflow: 'hidden',
        }}>
        {itemInfo.profilePhotoUrl === 'default' ? (
          <Ionicons
            style={{padding: 10}}
            name="person"
            color={theme.green}
            size={100}
          />
        ) : (
          <Image
            source={{uri: itemInfo.profilePhotoUrl}}
            style={{
              backgroundColor: theme.profilePhotoContainer,
              width: 100,
              aspectRatio: 1,
              resizeMode: 'cover',
              borderRadius: 10,
            }}
          />
        )}

        <Text style={{width: '50%'}} bold medium color={theme.text}>
          {itemInfo.displayName == ''
            ? itemInfo.username
            : itemInfo.displayName}
        </Text>
        {itemInfo.houseData == true ? (
          <View
            style={{
              width: 1,
              height: '100%',
              backgroundColor: theme.greenD,
            }}
          />
        ) : (
          <View
            style={{
              width: 1,
              height: '100%',
              backgroundColor: theme.red,
            }}
          />
        )}
      </View>
    </Swipeable>
  );
};

export default Item;
