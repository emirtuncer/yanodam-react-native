import auth from '@react-native-firebase/auth';
import React, { useContext, useEffect } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  View,
} from 'react-native';
// Components
import Text from '.././components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
import { useTheme } from '../context/ThemeManager';
// Contexts
import { UserContext } from '../context/UserContext';

const LoadingScreen = ({ navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const { mode, theme, toggle } = useTheme();

  const loadUser = async (userF) => {
    try {
      const userInfo = await firebase.getUserInfo(
        userF.uid,
      );
      setUser({
        uid: userF.uid,
        isLoggedIn: true,
        email: userInfo.email,
        active: userInfo.active,
        houseData: userInfo.houseData,
        profileData: userInfo.profileData,
        gender: userInfo.gender,
        university: userInfo.university,
        faculty: userInfo.faculty,
        isVerified: userInfo.isVerified,
        city: userInfo.city,
        username: userInfo.username,
        displayName: userInfo.displayName,
        igUsername: userInfo.igUsername,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        onStart: false,
        searchUni: 'None',
      });
    } catch (error) {
      Alert.alert('Loading error!', error);
      console.log(error);
    }
  };

  useEffect(() => {
    auth().onAuthStateChanged((userF) => {
      if (userF) {
        loadUser(userF);
      } else {
        setUser((state) => ({
          uid: '',
          active: false,
          email: '',
          bio: '',
          houseData: '',
          igUsername: '',
          isVerified: false,
          profileData: '',
          profilPhotoUrl: 'default',
          username: '',
          displayName: '',
          university: '',
          faculty: '',
          city: '',
          gender: 'none',
          searchUni: 'None',
          isLoggedIn: false,
          onStart: false,
        }));
      }
    });
  }, []);

  return (
    <View
      style={[
        styles.centered,
        { backgroundColor: theme.background },
      ]}
    >
      <Text
        style={{ fontFamily: 'pacifico' }}
        color={theme.text}
        title
        center
      >
        Yan Odam
      </Text>
      <ActivityIndicator
        style={styles.loading}
        color={theme.text}
        size={64}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    marginTop: 20,
  },
});

export default LoadingScreen;
