/* eslint-disable eqeqeq */
// import { GoToButton } from '../navigation/AppStack';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DropDownPicker from 'react-native-dropdown-picker';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';
import {
  ImagePicker,
  Permissions,
} from 'react-native-unimodules';
import Entypo from 'react-native-vector-icons/Entypo';
// Components
import Text from '../components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
// Contexts
import { useTheme } from '../context/ThemeManager';
import { UserContext } from '../context/UserContext';

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

const SettingsScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(false);
  const [profileData, setprofileData] = useState('');
  const [igUsername, setigUsername] = useState('');
  const [displayName, setdisplayName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const { theme, toggle } = useTheme();

  // Profile Data
  const [houseJob, setHouseJob] = useState(false);
  const [friendComeHome, setfriendComeHome] =
    useState(false);
  const [loudMusic, setloudMusic] = useState(false);
  const [hardworker, sethardworker] = useState(false);
  const [nightLife, setnightLife] = useState(false);
  const [alergic, setAlergic] = useState(false);
  const [illness, setIllness] = useState(false);
  const [pet, setPet] = useState(false);
  let data = 'testdata';

  const logOut = async () => {
    const loggedOut = await firebase.logOut();

    if (loggedOut) {
      setUser({
        uid: '',
        isLoggedIn: false,
        active: null,
        email: '',
        bio: '',
        houseData: false,
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

  const ChangeHouseJob = () => {
    if (houseJob == true) {
      setHouseJob(false);
      console.log('houseJob changed to: false');
    } else {
      setHouseJob(true);
      console.log('houseJob changed to: true');
    }
  };

  const ChangeFriendComeHome = () => {
    if (friendComeHome == true) {
      setfriendComeHome(false);
      console.log('friendComeHome changed to: false');
    } else {
      setfriendComeHome(true);
      console.log('friendsComeHome changed to: true');
    }
  };

  const ChangeLoudMusic = () => {
    if (loudMusic == true) {
      setloudMusic(false);
      console.log('loudMusic changed to: false');
    } else {
      setloudMusic(true);
      console.log('loudMusic changed to: true');
    }
  };

  const ChangeHardWorker = () => {
    if (hardworker == true) {
      sethardworker(false);
      console.log('hardworker changed to: false');
    } else {
      sethardworker(true);
      console.log('hardworker changed to: true');
    }
  };

  const ChangeNightLife = () => {
    if (nightLife == true) {
      setnightLife(false);
      console.log('nightLife changed to: false');
    } else {
      setnightLife(true);
      console.log('nightLife changed to: true');
    }
  };

  const ChangeAlergic = () => {
    if (alergic == true) {
      setAlergic(false);
      console.log('alergic changed to: false');
    } else {
      setAlergic(true);
      console.log('alergic changed to: true');
    }
  };

  const ChangeIllness = () => {
    if (illness == true) {
      setIllness(false);
      console.log('illness changed to: false');
    } else {
      setIllness(true);
      console.log('illness changed to: true');
    }
  };

  const ChangePet = () => {
    if (pet == true) {
      setPet(false);
      console.log('pet changed to: false');
    } else {
      setPet(true);
      console.log('pet changed to: true');
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    updateProfile();

    wait(3000).then(() => setRefreshing(false));
  }, []);

  const updateProfile = async () => {
    setigUsername(user.igUsername);
    setdisplayName(user.displayName);

    // HouseJob
    if (user.profileData[0] == 1) {
      setHouseJob(true);
    } else {
      setHouseJob(false);
    }

    // friendsComeHome
    if (user.profileData[1] == 1) {
      setfriendComeHome(true);
    } else {
      setfriendComeHome(false);
    }

    // loudMusic
    if (user.profileData[2] == 1) {
      setloudMusic(true);
    } else {
      setloudMusic(false);
    }

    // hardworker
    if (user.profileData[3] == 1) {
      sethardworker(true);
    } else {
      sethardworker(false);
    }

    // nightLife
    if (user.profileData[4] == 1) {
      setnightLife(true);
    } else {
      setnightLife(false);
    }

    // Alergic
    if (user.profileData[5] == 1) {
      setAlergic(true);
    } else {
      setAlergic(false);
    }

    // Illness
    if (user.profileData[6] == 1) {
      setIllness(true);
    } else {
      setIllness(false);
    }

    // Pet
    if (user.profileData[7] == 1) {
      setPet(true);
    } else {
      setPet(false);
    }
  };

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
      );
      return status;
    }
  };

  const pickImage = async () => {
    try {
      let result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
        // setUser((state) => ({
        //   ...state,
        //   profilePhotoUrl: result.uri,
        // }));
        console.log(result.uri);
      }
    } catch (error) {
      console.log('Error @pickImage: ', error);
    }
  };

  const addProfilePhoto = async () => {
    try {
      const status = await getPermission();

      console.log(status);
      if (status === 'granted') {
        pickImage();
      }
    } catch (e) {
      console.log('@addProfilePhoto => getPermission: ', e);
      ToastAndroid.show(
        'Kamera fotoğraflarına yetki bulunmamaktadır, lütfen yetki isteğini kabul ediniz.',
        ToastAndroid.SHORT,
      );
      return;
    }
  };

  if (profileData != user.profileData) {
    setprofileData(user.profileData);
    updateProfile();
  }

  // TODO: update profile save feature
  const saveSettings = async () => {
    setLoading(true);

    data = user.profileData;

    if (houseJob == true) {
      data = data.split('');
      data[0] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[0] = '0';
      data = data.join('');
    }

    if (friendComeHome == true) {
      data = data.split('');
      data[1] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[1] = '0';
      data = data.join('');
    }

    if (loudMusic == true) {
      data = data.split('');
      data[2] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[2] = '0';
      data = data.join('');
    }

    if (hardworker == true) {
      data = data.split('');
      data[3] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[3] = '0';
      data = data.join('');
    }

    if (nightLife == true) {
      data = data.split('');
      data[4] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[4] = '0';
      data = data.join('');
    }

    if (alergic == true) {
      data = data.split('');
      data[5] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[5] = '0';
      data = data.join('');
    }

    if (illness == true) {
      data = data.split('');
      data[6] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[6] = '0';
      data = data.join('');
    }

    if (pet == true) {
      data = data.split('');
      data[7] = '1';
      data = data.join('');
    } else {
      data = data.split('');
      data[7] = '0';
      data = data.join('');
    }

    try {
      await firebase.changeUserAccountInfo({
        igUsername: igUsername,
        profileData: data,
        displayName: displayName,
      });

      if (profilePhoto != user.profilePhotoUrl) {
        try {
          const x = await firebase.changeProfilePhoto(
            profilePhoto,
          );
          console.log(x);
        } catch (error) {
          console.log(
            '@SettingsScreen => SaveSettings: ',
            error,
          );
        }
      }

      setUser((state) => ({
        ...state,
        profileData: data,
        displayName: displayName,
        igUsername: igUsername,
      }));
    } catch (error) {
      alert(error.message);
      console.log(
        '@SettingsScreen => changeAccountInfo: ',
        error.message,
      );
    } finally {
      setLoading(false);
      ToastAndroid.show(
        'Profiliniz kaydedildi!',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        style={styles.listView}
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
          <View />
        </View>
        <TouchableOpacity
          style={[
            styles.profilePhotoContainer,
            {
              backgroundColor: theme.profilePhotoContainer,
              borderColor: theme.border,
            },
          ]}
          onPress={addProfilePhoto}
        >
          <Image
            style={styles.postProfilePhoto}
            source={
              profilePhoto
                ? { uri: profilePhoto }
                : user.profilePhotoUrl === 'default'
                ? require('../assets/defaultProfilePhoto.jpg')
                : { uri: user.profilePhotoUrl }
            }
          />
        </TouchableOpacity>
        <View
          style={[
            styles.auth,
            { backgroundColor: theme.tabView },
          ]}
        >
          <View style={styles.authContainer}>
            <Text
              color={theme.text}
              style={styles.authTitle}
            >
              Ad Soyad
            </Text>
            <View
              style={[
                styles.authView,
                { backgroundColor: theme.authView },
              ]}
            >
              <TextInput
                style={[
                  styles.authField,
                  { color: theme.text },
                ]}
                autoCapitilize="none"
                autoCorrect={false}
                onChangeText={(displayName) =>
                  setdisplayName(displayName)
                }
                defaultValue={user.displayName}
              />
            </View>
          </View>
          <View style={styles.authContainer}>
            <Text
              color={theme.text}
              style={styles.authTitle}
            >
              Instagram Kullanıcı Adı
            </Text>
            <View
              style={[
                styles.authView,
                { backgroundColor: theme.authView },
              ]}
            >
              <TextInput
                style={[
                  styles.authField,
                  { color: theme.text },
                ]}
                autoCapitilize="none"
                autoCorrect={false}
                onChangeText={(igUsername) =>
                  setigUsername(igUsername)
                }
                defaultValue={user.igUsername}
              />
            </View>
          </View>
        </View>
        <View
          style={[
            styles.secondTab,
            { backgroundColor: theme.tabView },
          ]}
        >
          <Text
            center
            color={theme.text}
            style={{
              fontFamily: 'Montserrat-Bold',
              fontSize: 24,
              alignSelf: 'center',
              marginBottom: 10,
            }}
          >
            Profil Bilgileri
          </Text>
          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Ev isi yapiyor musun?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeHouseJob}
              value={houseJob}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />
          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                fontSize: 16,
                width: '70%',
              }}
            >
              Arkadaslarini eve cagiriyor musun?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeFriendComeHome}
              value={friendComeHome}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />

          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Yuksek sesle muzik dinler misin?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeLoudMusic}
              value={loudMusic}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />

          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Caliskan bir ogrenci misin?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeHardWorker}
              value={hardworker}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />

          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Gece hayatin var mi?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeNightLife}
              value={nightLife}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />

          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Her hangi bir alerjin var mi?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeAlergic}
              value={alergic}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />

          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Her hangi bir hastaligin var mi?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangeIllness}
              value={illness}
            />
          </View>
          <View
            style={[
              styles.divider,
              { backgroundColor: theme.divider },
            ]}
          />
          <View style={styles.switchView}>
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Light',
                width: '70%',
                fontSize: 16,
              }}
            >
              Evcil hayvan besliyor musun?
            </Text>
            <Switch
              trackColor={{
                false: '#767577',
                true: '#42f587',
              }}
              ios_backgroundColor="#3e3e3e"
              onValueChange={ChangePet}
              value={pet}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            styles.saveProfileButton,
            { backgroundColor: theme.buttonBackground },
          ]}
          onPress={saveSettings}
        >
          {loading ? (
            <ActivityIndicator small color={theme.text} />
          ) : (
            <Text
              center
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: 24,
              }}
            >
              Profili Kaydet
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 15,
  },

  secondTab: {
    borderRadius: 10,
    width: '95%',
    alignSelf: 'center',
    paddingTop: 20,
    paddingBottom: 20,
  },

  auth: {
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    width: '95%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  divider: {
    width: '100%',
    height: 1,
    marginTop: 5,
    marginBottom: 5,
  },

  switchView: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
  },

  authContainer: {
    margin: 10,
  },

  authView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
  },

  authTitle: {
    fontSize: 12,
    marginBottom: 12,
    textTransform: 'uppercase',
    fontFamily: 'Montserrat-SemiBold',
  },

  authField: {
    marginLeft: 10,
    height: 48,
    fontFamily: 'Montserrat-SemiBold',
    width: '80%',
    textAlign: 'left',
  },

  listView: {
    alignSelf: 'center',
    paddingBottom: 10,
  },

  postProfilePhoto: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  profilePhotoContainer: {
    width: '80%',
    aspectRatio: 1,
    alignSelf: 'center',
    overflow: 'hidden',
    borderWidth: 3,
    zIndex: 1,
    borderRadius: 10,
    marginTop: 10,
  },

  saveProfileButton: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    margin: 12,
    padding: 10,
    borderRadius: 10,
  },
});

export default SettingsScreen;
