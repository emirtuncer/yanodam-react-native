import React, {setTimeout, useContext, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import Entypo from 'react-native-vector-icons/Entypo';
// Icons
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {FirebaseContext} from '../context/FirebaseContext';
import {UserContext} from '../context/UserContext';
import Text from './Text';

// Functions
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}

const ProfileScreen = props => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [userId, setUserId] = useState();
  const [refreshing, setRefreshing] = useState(false);

  // Profile Data
  const [houseJob, setHouseJob] = useState('');
  const [friendComeHome, setfriendComeHome] = useState('');
  const [loudMusic, setloudMusic] = useState('');
  const [hardworker, sethardworker] = useState('');
  const [nightLife, setnightLife] = useState('');
  const [alergic, setAlergic] = useState('');
  const [illness, setIllness] = useState('');
  const [pet, setPet] = useState('');
  const [genderX, setGenderX] = useState();

  const {
    displayName,
    faculty,
    university,
    username,
    profilePhotoUrl,
    profileData,
    isVerified,
    igUsername,
    houseData,
    bio,
    gender,
    uid,
  } = props.route.params;

  if (userId != uid) {
    setUserId(uid);
    updateProfile();
  }

  function updateProfile() {
    // Gender
    if (gender == 'none') {
      setGenderX('Belirtilmemis');
    } else if (gender == 'male') {
      setGenderX('Erkek');
    } else if (gender == 'female') {
      setGenderX('Kadın');
    }

    // HouseJob
    if (profileData[0] == 1) {
      setHouseJob('Evet');
    } else {
      setHouseJob('Hayır');
    }

    // friendsComeHome
    if (profileData[1] == 1) {
      setfriendComeHome('Evet');
    } else {
      setfriendComeHome('Hayır');
    }

    // loudMusic
    if (profileData[2] == 1) {
      setloudMusic('Evet');
    } else {
      setloudMusic('Hayır');
    }

    // hardworker
    if (profileData[3] == 1) {
      sethardworker('Evet');
    } else {
      sethardworker('Hayır');
    }

    // nightLife
    if (profileData[4] == 1) {
      setnightLife('Evet');
    } else {
      setnightLife('Hayır');
    }

    // Alergic
    if (profileData[5] == 1) {
      setAlergic('Evet');
    } else {
      setAlergic('Hayır');
    }

    // Illness
    if (profileData[6] == 1) {
      setIllness('Evet');
    } else {
      setIllness('Hayır');
    }

    // Pet
    if (profileData[7] == 1) {
      setPet('Evet');
    } else {
      setPet('Hayır');
    }
  }

  const onRefresh = React.useCallback(() => {
    console.log('onRefresh fired');
    setRefreshing(true);
    setUserId(uid);
    updateProfile();
    wait(3000).then(() => {
      setRefreshing(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshing]);

  return (
    <View style={styles.container}>
      {/*             <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={styles.listView}
             */}
      <View style={styles.title}>
        <Entypo name="message" size={31} color="#000" />
      </View>
      <ScrollView style={styles.list}>
        <View style={styles.profilePhotoContainer}>
          <Image
            source={
              profilePhotoUrl === 'default'
                ? require('../assets/defaultProfilePhoto.jpg')
                : {uri: profilePhotoUrl}
            }
            style={styles.postProfilePhoto}
          />
        </View>

        <View style={styles.profileView}>
          <View style={styles.postInfoText}>
            <Text center bold title color="#373737">
              {displayName == '' ? username : displayName}{' '}
              {isVerified ? (
                <MaterialIcons size={31} name="verified" />
              ) : (
                <View />
              )}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.postInfoUnder}>
            <Text center large color="#373737">
              {university}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.postInfoUnder}>
            <Text center large color="#373737">
              {faculty}
            </Text>
          </View>
        </View>

        <View style={styles.tabView}>
          <Text
            center
            bold
            title
            color="#373737"
            style={{
              marginBottom: normalize(20, 'height'),
            }}>
            Profil Bilgileri
          </Text>

          <View styles={styles.rowView}>
            <Text style={styles.tabViewText}>
              Cinsiyet: {<Text bold>{genderX}</Text>}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Ev isi yapiyor mu:{' '}
              {houseJob == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Arkadaslarini eve cagiriyor mu:
              {friendComeHome == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Yuksek sesle muzik dinliyor mu:{' '}
              {loudMusic == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Caliskan bir ogrenci mi:{' '}
              {hardworker == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Gece hayati var mi:{' '}
              {nightLife == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Her hangi bir alerjisi var mi:{' '}
              {alergic == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Her hangi bir hastaligi var mi:{' '}
              {illness == 'Evet' ? (
                <Text yes>Evet</Text>
              ) : (
                <Text no>Hayir</Text>
              )}
            </Text>
            <View style={styles.divider} />
            <Text style={styles.tabViewText}>
              Evcil hayvan besliyor mu:{' '}
              {pet == 'Evet' ? <Text yes>Evet</Text> : <Text no>Hayir</Text>}
            </Text>
          </View>
        </View>

        {igUsername ? (
          <View style={styles.tabView}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.instagram.com/{x}'.replace('{x}', igUsername),
                );
              }}>
              <View style={styles.rowView}>
                <Ionicons name="logo-instagram" size={30} color="#161616" />
                <Text
                  style={{
                    fontSize: normalize(15),
                    width: '80%',
                  }}>
                  {igUsername}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  scene: {
    flex: 1,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#C8C8C8',
    marginTop: 5,
    marginBottom: 5,
  },

  listView: {
    backgroundColor: '#F7F7F7',
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  postContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7F7F7',
    width: '98%',
    marginTop: normalize(25),
    borderRadius: normalize(30),
  },

  tabView: {
    width: normalize(350),
    alignSelf: 'center',

    paddingBottom: normalize(20, 'height'),
    paddingTop: normalize(20, 'height'),
    justifyContent: 'center',

    borderColor: '#C8C8C8',
    backgroundColor: '#F7F7F7',
    elevation: 20,
    marginBottom: normalize(50, 'height'),
    borderRadius: normalize(10),
    marginTop: normalize(10),
  },

  tabViewText: {
    color: '#212121',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
    marginBottom: normalize(10),
  },

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  title: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    elevation: 5,
    height: normalize(60),
    paddingTop: normalize(10),
    marginBottom: normalize(10),
    paddingBottom: normalize(10),
  },

  postHeaderContainer: {
    alignItems: 'center',
    marginTop: '20%',
  },

  profileView: {
    alignSelf: 'center',

    paddingBottom: normalize(20, 'height'),
    paddingTop: normalize(20, 'height'),

    width: '95%',
    borderColor: '#C8C8C8',
    backgroundColor: '#F7F7F7',
    elevation: 20,
    marginBottom: normalize(50, 'height'),
    borderRadius: normalize(10),
  },

  postProfilePhoto: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  postInfoContainer: {
    flex: 1,
  },

  postInfoText: {
    alignSelf: 'center',
  },

  postInfoUnder: {
    marginBottom: normalize(10),
    marginTop: normalize(10),
  },

  profileButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: normalize(300),
    marginTop: normalize(20),
    borderRadius: normalize(20),
    height: normalize(30),
  },

  profilePhotoContainer: {
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: 1,
    elevation: 25,
    borderRadius: normalize(25),
    width: normalize(250),
    height: normalize(250),
    marginBottom: normalize(30),
    marginTop: normalize(20),
  },

  button: {
    height: normalize(50, 'height'),
    width: normalize(120),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: normalize(15),
  },

  rowButtons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    height: normalize(100),
  },

  profileInfo: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    alignSelf: 'center',
    height: normalize(200),
  },

  logOutButton: {
    alignSelf: 'center',
    marginBottom: normalize(32),
  },

  button2: {
    backgroundColor: '#F7F7F7',
    height: '70%',
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: normalize(5),
    borderRadius: normalize(6),
  },

  textInfoText: {
    alignSelf: 'center',
    textAlignVertical: 'center',
    elevation: 2,
    borderColor: '#F7F7F7',
    marginTop: normalize(10),
    width: normalize(300),
    height: normalize(100),
    borderRadius: normalize(10),
  },
});

export default ProfileScreen;
