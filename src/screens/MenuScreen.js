import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Text from '../components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
// Contexts
import { useTheme } from '../context/ThemeManager';
import { UserContext } from '../context/UserContext';

const MenuScreen = () => {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser({
        uid: '',
        isLoggedIn: false,
        active: null,
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
        searchUni: 'none',
        onStart: 'false',
      });
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: theme.headerBackground },
        ]}
      >
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Entypo
            name="chevron-left"
            size={31}
            color={theme.text}
          />
        </TouchableOpacity>
        <View />
        <TouchableOpacity onPress={logOut}>
          <MaterialCommunityIcons
            name="logout"
            size={31}
            color={theme.text}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.scroll}>
        <Text bold title color={theme.text} center>
          Ayarlar
        </Text>
        <View
          style={[
            styles.divider,
            { backgroundColor: theme.divider },
          ]}
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}
          style={[
            styles.button,
            { backgroundColor: theme.buttonBackground },
          ]}
        >
          <Text center large color={theme.text}>
            Profil Ayarları
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('HouseSettings');
          }}
          style={[
            styles.button,
            { backgroundColor: theme.buttonBackground },
          ]}
        >
          <Text center large color={theme.text}>
            Ev Ayarları
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Verification');
          }}
          style={[
            styles.button,
            { backgroundColor: theme.buttonBackground },
          ]}
        >
          <Text center large color={theme.text}>
            Doğrulama
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommonScreens', { screen: 'Chat' });
          }}
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        >
          <Text center large color={theme.text}>
            Chat
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CommonScreens', { screen: 'Modal' });
          }}
          style={[styles.button, { backgroundColor: theme.buttonBackground }]}
        >
          <Text center large color={theme.text}>
            Modal
          </Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  divider: {
    width: '95%',
    height: 1,
    margin: 5,
  },

  button: {
    backgroundColor: '#181818',
    padding: 10,
    margin: 5,
    borderRadius: 10,
  },

  scroll: {
    padding: 10,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  header: {
    backgroundColor: '#1E1E1E',
    width: '100%',
    height: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
  },
});

export default MenuScreen;
