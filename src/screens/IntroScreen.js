import React, { useContext, useState } from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
/*
 * dimens.js
 * USAGE:
 * hp2dp(360) max
 * wp2dp(760) max
 */
// import { hp, wp } from '../utils/dimen';

// Components
import Text from '../components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
import { useTheme } from '../context/ThemeManager';
// Contexts
import { UserContext } from '../context/UserContext';

const IntroScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);
  const { theme } = useTheme();

  const logIn = async () => {
    setLoading(true);
    try {
      await firebase.logIn(email, password);

      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);

      setUser({
        username: userInfo.username,
        email: userInfo.email,
        uid,
        gender: userInfo.gender,
        profilePhotoUrl: userInfo.profilePhotoUrl,
        isLoggedIn: true,
        active: userInfo.active,
        houseData: userInfo.houseData,
        igUsername: userInfo.igUsername,
        isVerified: userInfo.isVerified,
        profileData: userInfo.profileData,
        city: userInfo.city,
        university: userInfo.university,
        faculty: userInfo.faculty,
        displayName: userInfo.displayName,
      });
    } catch (error) {
      if (email == undefined) {
        alert('Lütfen email girin.');
      } else {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        hidden={false}
        backgroundColor={theme.statusBarBackground}
        translucent={false}
      />

      <View style={styles.header}>
        <Text color="#000" title bold center>
          Video
        </Text>
      </View>
      <View style={styles.main}>
        <View style={styles.authContainer}>
          <Image
            source={require('../assets/logoWhite512.png')}
            style={{
              alignSelf: 'center',
              resizeMode: 'contain',
              width: 125,
              height: 125,
              borderRadius: 100,
              marginBottom: 10,
            }}
          />
          <Text
            center
            title
            bold
            color="#fff"
            style={{
              marginBottom: 10,
            }}
          >
            Yan Odam
          </Text>
          <Text large light center color="#9B9B9B">
            Öğrencilerden, öğrencilere!
          </Text>
          <View style={styles.inputContainer}>
            <TouchableWithoutFeedback
              style={styles.button}
              onPress={() => {
                navigation.push('LoginScreen');
              }}
            >
              <Icon
                name="arrowright"
                size={30}
                color="#000"
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },

  header: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '30%',
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },

  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
    backgroundColor: '#000000',
  },

  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 40,
    height: 50,
    marginTop: 30,
    borderRadius: 25,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IntroScreen;
