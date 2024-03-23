import {useNavigation} from '@react-navigation/native';
import React, {setTimeout, useCallback, useContext, useState} from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ExpandableView} from '../components/ExpandableView';
import Text from '../components/Text';
import {FirebaseContext} from '../context/FirebaseContext';
import {useTheme} from '../context/ThemeManager';
import {UserContext} from '../context/UserContext';

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
  const {theme} = useTheme();
  const navigation = useNavigation();

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
  const [house, setHouse] = useState();

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
      setGenderX('Belirtilmemiş');
    } else if (gender == 'male') {
      setGenderX('Erkek');
    } else if (gender == 'female') {
      setGenderX('Kadın');
    }

    // HouseJob
    if (profileData[0] == '1') {
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

  const onRefresh = useCallback(() => {
    console.log('onRefresh fired');
    setRefreshing(true);
    setUserId(uid);
    updateProfile();
    wait(3000).then(() => {
      setRefreshing(false);
    });
  }, [refreshing]);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        hidden={true}
        backgroundColor={theme.statusBarBackground}
        translucent={false}
      />
      {/*             <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                style={[styles.listView, {backgroundColor: theme.listView}]}
             */}

      <View style={[styles.header, {backgroundColor: theme.headerBackground}]}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="chevron-left" size={31} color={theme.text} />
        </TouchableOpacity>
        <View />
        <View />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        <View
          style={[
            styles.profilePhotoContainer,
            {
              backgroundColor: theme.profilePhotoContainer,
            },
          ]}>
          <Image
            source={
              profilePhotoUrl === 'default'
                ? require('../assets/defaultProfilePhoto.jpg')
                : {uri: profilePhotoUrl}
            }
            style={styles.postProfilePhoto}
          />
        </View>

        <View style={[styles.profileView, {backgroundColor: theme.tabView}]}>
          <View style={styles.postInfoText}>
            <Text
              style={{textAlignVertical: 'center'}}
              center
              bold
              title
              color={theme.text}>
              {displayName == '' ? username : displayName}{' '}
            </Text>
            {isVerified ? (
              <MaterialIcons color={theme.text} size={31} name="verified" />
            ) : (
              <View />
            )}
          </View>
          <View
            style={[styles.postInfoUnder, {borderColor: theme.infoRowBorder}]}>
            <Text center large color={theme.text}>
              {university}
            </Text>
          </View>

          <View
            style={[styles.postInfoUnder, {borderColor: theme.infoRowBorder}]}>
            <Text center large color={theme.text}>
              {faculty}
            </Text>
          </View>
        </View>
        {houseData ? (
          <View style={[styles.igView, {backgroundColor: theme.tabView}]}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HouseProfile', {
                  uid: uid,
                  username: username,
                  displayName: displayName,
                  profilePhotoUrl: profilePhotoUrl,
                });
              }}>
              <View style={styles.rowView}>
                <Ionicons
                  name="home"
                  style={{marginHorizontal: 5}}
                  size={30}
                  color={theme.text}
                />
                <Text color={theme.text}>Ev Profili</Text>
              </View>
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}

        {/* <ExpandableView /> */}

        <View style={[styles.tabView, {backgroundColor: theme.tabView}]}>
          <Text center bold title color={theme.text} style={{marginBottom: 20}}>
            Profil Bilgileri
          </Text>

          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text
              color={theme.text}
              style={{
                textAlignVertical: 'center',
                fontFamily: 'Montserrat-Regular',
                height: 50,
                fontSize: 16,
                textAlign: 'left',
                width: '50%',
              }}>
              Cinsiyet:
            </Text>
            <Text
              color={theme.text}
              style={{
                fontFamily: 'Montserrat-Regular',
                textAlignVertical: 'center',
                fontSize: 16,
              }}
              bold>
              {genderX}
            </Text>
          </View>

          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Ev işi yapıyor mu:
            </Text>
            {houseJob == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>
          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Arkadaşlarını eve çağırıyor mu:
            </Text>
            {friendComeHome == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>

          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Yüksek sesle müzik dinliyor mu:
            </Text>
            {loudMusic == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>
          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Çalışkan bir öğrenci mi:
            </Text>
            {hardworker == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>

          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Gece hayatı var mı:
            </Text>
            {nightLife == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>

          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Herhangi bir alerjisi var mı:
            </Text>
            {alergic == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>
          <View style={[styles.infoRow, {borderColor: theme.infoRowBorder}]}>
            <Text color={theme.text} style={styles.tabViewText2}>
              Herhangi bir hastalığı var mı:
            </Text>
            {illness == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>
          <View
            style={[
              styles.infoRow,
              {
                borderColor: theme.infoRowBorder,
              },
            ]}>
            <Text color={theme.text} style={styles.tabViewText}>
              Evcil hayvan besliyor mu:
            </Text>

            {pet == 'Evet' ? (
              <Text yes style={styles.tabViewText2}>
                Evet
              </Text>
            ) : (
              <Text no style={styles.tabViewText2}>
                Hayır
              </Text>
            )}
          </View>
        </View>

        {igUsername ? (
          <View
            style={[
              styles.igView,
              {
                marginBottom: 10,
                backgroundColor: theme.tabView,
              },
            ]}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(
                  'https://www.instagram.com/{x}'.replace('{x}', igUsername),
                );
              }}>
              <View style={styles.rowView}>
                <Ionicons
                  name="logo-instagram"
                  style={{marginHorizontal: 5}}
                  size={30}
                  color={theme.text}
                />
                <Text color={theme.text}>{igUsername}</Text>
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

  infoRow: {
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    borderTopWidth: 1,
    alignItems: 'center',
  },

  tabViewText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    width: '70%',
  },

  tabView2: {
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },

  tabViewText2: {
    textAlignVertical: 'center',
    fontFamily: 'Montserrat-Regular',
    textAlign: 'right',
    fontSize: 16,
  },

  scene: {
    flex: 1,
  },

  list: {
    width: '100%',
    alignSelf: 'center',
  },

  profilePhotoContainer: {
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: 1,
    borderRadius: 25,
    width: '75%',
    aspectRatio: 1,
    marginTop: 20,
    marginBottom: 20,
  },

  postProfilePhoto: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  profileView: {
    alignSelf: 'center',
    width: '95%',
    padding: 10,
    borderRadius: 10,
  },

  listView: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  tabView: {
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    paddingBottom: 20,
    paddingTop: 20,
    borderRadius: 10,
    marginTop: 10,
  },

  postInfoText: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  igView: {
    padding: 10,
    width: '95%',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 10,
  },

  rowView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },

  postInfoUnder: {
    marginTop: 5,
    padding: 10,
    borderTopWidth: 0.5,
  },
});

export default ProfileScreen;
