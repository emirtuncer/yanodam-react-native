import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

const LoginScreen = ({ navigation }) => {
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
        <Image
          source={require('../assets/roundIcon.png')}
          style={{
            alignSelf: 'center',
            resizeMode: 'contain',
            width: 100,
            height: 100,
          }}
        />
        <Text
          center
          title
          color="#fff"
          style={{
            fontFamily: 'pacifico',
          }}
        >
          Yan Odam
        </Text>
      </View>
      <ScrollView style={styles.main}>
        <View style={styles.authContainer}>
          <Text color="#fff" style={styles.authTitle}>
            Email:
          </Text>
          <View style={styles.authView}>
            <TextInput
              style={styles.authField}
              autoCapitilize="none"
              autoCompleteType="email"
              autoCorrect={true}
              autoFocus={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text.trim())}
              value={email}
            />
          </View>
        </View>
        <View style={styles.authContainer}>
          <Text color="#fff" style={styles.authTitle}>
            Şifre:
          </Text>
          <View style={styles.authView}>
            <TextInput
              style={styles.authField}
              autoCapitilize="none"
              autoCompleteType="password"
              autoCorrect={false}
              autoFocus={false}
              secureTextEntry={true}
              onChangeText={(text) =>
                setPassword(text.trim())
              }
              value={password}
            />
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={logIn}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator small color="#000" />
            ) : (
              <Text
                center
                semibold
                color="#000"
                style={{
                  fontFamily: 'Montserrat-SemiBold',
                  fontSize: 24,
                }}
              >
                Giriş Yap
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.register}
            onPress={() =>
              navigation.navigate('RegisterScreen')
            }
          >
            <Text center color="#f2f2f2">
              Yeni misin?{' '}
              <Text med color="#f5f5f5">
                Kayıt ol
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  header: {
    paddingVertical: 10,
  },

  authView: {
    backgroundColor: '#131313',
    alignItems: 'center',
    borderRadius: 50,
  },

  main: {
    width: '100%',
    height: '70%',
    paddingTop: 35,
  },

  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },

  authTitle: {
    marginLeft: 20,
    width: '70%',
    marginBottom: 5,
    color: '#fff',
    fontSize: 12,
    textTransform: 'uppercase',
  },

  authField: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    paddingLeft: 15,
    width: 250,
    height: 50,
    color: '#fff',
  },

  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 60,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 50,
  },

  bottom: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },

  register: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default LoginScreen;
