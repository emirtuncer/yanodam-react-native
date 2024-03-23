import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
// import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {Modalize} from 'react-native-modalize';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
// import { Profile } from '../components/Profile';
// import { Feed } from '../components/Feed';
import {Bottom} from '../components/Bottom';
import Item from '../components/Item';
import Text from '../components/Text';
import config from '../config/firebase';

// Contexts
import {UserContext} from '../context/UserContext';

// Utils
// import randomize from './../utils/randomize';
import {useTheme} from '../context/ThemeManager';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const HomeScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const [isSearching, setIsSearching] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [refresh, setRefresh] = useState();
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [inSearch, setInSearch] = useState(false);
  const [targetUser, setTargetUser] = useState();
  const navigation = useNavigation();
  const [pageLimit, setPageLimit] = useState(10);
  const {theme} = useTheme();
  const modalizeRef = useRef(Modalize);

  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const onClosed = () => {
    console.log('bottom tab closed', user.searchUni);
    searching(user.searchUni);
    if (user.searchUni != 'None') {
      setInSearch(true);
    } else {
      setInSearch(false);
    }
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const changeRefresh = () => {
    if (refresh == true) {
      setRefresh(false);
    } else {
      setRefresh(true);
    }
  };

  const searching = uni => {
    setLoading(true);
    if (uni != 'None') {
      const snapshot = firestore()
        .collection('users')
        .where('city', '==', user.city)
        .where('active', '==', true)
        .where('university', '==', uni)
        .limit(pageLimit)
        .get()
        .then(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {
              username,
              displayName,
              university,
              bio,
              isVerified,
              faculty,
              gender,
              profilePhotoUrl,
              profileData,
              houseData,
              city,
              active,
            } = doc.data();
            const uid = doc.id;
            if (username !== user.username) {
              list.push({
                uid,
                username,
                displayName,
                gender,
                university,
                bio,
                isVerified,
                faculty,
                profilePhotoUrl,
                profileData,
                houseData,
                city,
              });
            }
          });
          setProfiles(list);

          if (loading) {
            setRefreshing(false);
          }
        });
    } else {
      const snapshot = firestore()
        .collection('users')
        .where('city', '==', user.city)
        .where('active', '==', true)
        .where('username', '!=', user.username)
        .limit(pageLimit)
        .get()
        .then(querySnapshot => {
          const list = [];
          querySnapshot.forEach(doc => {
            const {
              username,
              displayName,
              university,
              bio,
              isVerified,
              faculty,
              gender,
              profilePhotoUrl,
              profileData,
              houseData,
              city,
              active,
            } = doc.data();
            const uid = doc.id;
            if (username !== user.username) {
              list.push({
                uid,
                username,
                displayName,
                gender,
                university,
                bio,
                isVerified,
                faculty,
                profilePhotoUrl,
                profileData,
                houseData,
                city,
              });
            }
          });
          setProfiles(list);

          if (loading) {
            setRefreshing(false);
          }
        });
    }
  };

  useEffect(() => {
    searching(user.searchUni);
  }, [refresh]);

  const renderPost = ({item}) => (
    <Swipeable
      containerStyle={{
        backgroundColor: theme.cardBackground,
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
                  displayName: item.displayName,
                  faculty: item.faculty,
                  university: item.university,
                  username: item.username,
                  profilePhotoUrl: item.profilePhotoUrl,
                  profileData: item.profileData,
                  houseData: item.houseData,
                  isVerified: item.isVerified,
                  igUsername: item.igUsername,
                  bio: item.bio,
                  uid: item.uid,
                  gender: item.gender,
                });
              }}>
              <Ionicons
                style={{padding: 10}}
                name="person"
                color={theme.greenD}
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
        if (item.houseData === true) {
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
                    displayName: item.displayName,
                    faculty: item.faculty,
                    university: item.university,
                    username: item.username,
                    profilePhotoUrl: item.profilePhotoUrl,
                    profileData: item.profileData,
                    houseData: item.houseData,
                    isVerified: item.isVerified,
                    igUsername: item.igUsername,
                    bio: item.bio,
                    uid: item.uid,
                    gender: item.gender,
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
        }
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
      }}>
      <View
        style={{
          alignSelf: 'center',
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          padding: 10,
          flex: 1,
          backgroundColor: theme.card,
          flexDirection: 'row',
          overflow: 'hidden',
        }}>
        <Image
          source={{uri: item.profilePhotoUrl}}
          style={[
            styles.postProfilePhoto,
            {
              backgroundColor: theme.profilePhotoContainer,
            },
          ]}
        />

        <Text style={{width: '50%'}} bold medium color={theme.text}>
          {item.displayName === '' ? item.username : item.displayName}
        </Text>
        {item.houseData === true ? (
          <View
            style={{
              width: 1,
              height: '100%',
              backgroundColor: theme.green,
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

      {/* <View style={styles.rowButtons}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Profile", {
                displayName: item.displayName,
                faculty: item.faculty,
                university: item.university,
                username: item.username,
                profilePhotoUrl: item.profilePhotoUrl,
                profileData: item.profileData,
                houseData: item.houseData,
                isVerified: item.isVerified,
                igUsername: item.igUsername,
                bio: item.bio,
                uid: item.uid,
                gender: item.gender,
              });
            }}
            style={styles.postInfoButton}
          >
            <Ionicons name="person" color={theme.text} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.postInfoButton}>
            <Ionicons name="home" color={theme.text} size={24} />
          </TouchableOpacity>
        </View> */}
    </Swipeable>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      <StatusBar
        barStyle={theme.statusBarStyle}
        backgroundColor={theme.statusBarBackground}
        translucent={false}
      />

      <View style={styles.flatListView}>
        <View
          style={[styles.header, {backgroundColor: theme.headerBackground}]}>
          <TouchableOpacity onPress={onOpen}>
            <Ionicons name="search" size={30} color={theme.text} />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'pacifico',
              fontSize: 24,
            }}
            color={theme.text}>
            Yan Odam
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Profile', {
                displayName: user.displayName,
                faculty: user.faculty,
                university: user.university,
                username: user.username,
                profilePhotoUrl: user.profilePhotoUrl,
                profileData: user.profileData,
                houseData: user.houseData,
                isVerified: user.isVerified,
                igUsername: user.igUsername,
                gender: user.gender,
                bio: user.bio,
                uid: user.uid,
              });
            }}>
            <Ionicons name="person" size={30} color={theme.text} />
          </TouchableOpacity>
        </View>

        {/* <View style={[styles.searchOutside, {theme.searchOutside}]}>
          <View style={[styles.searchInside, {theme.searchInside}]}>
            <TextInput
              style={{
                width: "90%",
                textAlign: "center",
                fontFamily: "Montserrat-ExtraLight",
                fontSize: 16,
              }}
              color={theme.text}
              placeholder="Arama"
              textAlign="center"
              placeholderTextColor="#f2f2f2"
              onChangeText={(text) => {
                setSearchValue(text);
              }}
            />
            <TouchableOpacity
              onPress={async () => {
                console.log("searching..", searchValue, searchValue.split(""));
                if (searchValue) {
                  const usersRef = firestore().collection("users");
                  const snapshot = await usersRef
                    .where("city", "==", user.city)
                    .where("active", "==", true)
                    .get();
                  if (snapshot.empty) {
                    console.log("No matching documents.");
                    return;
                  }
                  const list = [];
                  snapshot.forEach((doc) => {
                    const {
                      username,
                      displayName,
                      university,
                      bio,
                      isVerified,
                      faculty,
                      gender,
                      profilePhotoUrl,
                      profileData,
                      houseData,
                      city,
                      active,
                    } = doc.data();
                    let uid = doc.id;
                    if (username !== user.username) {
                      list.push({
                        uid,
                        username,
                        displayName,
                        gender,
                        university,
                        bio,
                        isVerified,
                        faculty,
                        profilePhotoUrl,
                        profileData,
                        houseData,
                        city,
                      });
                    }

                    setProfiles(list);
                  });
                }
              }}
            >
              <Ionicons name="search" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View> */}
        {inSearch ? (
          <View
            style={[
              styles.chipBar,
              {backgroundColor: theme.chipBarBackground},
            ]}>
            <Text color={theme.text} center>
              {user.searchUni}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setUser(state => ({
                  ...state,
                  searchUni: 'None',
                }));
                searching('None');
                setInSearch(false);
              }}
              style={{
                marginLeft: 10,
                height: 24,
                width: 24,
                borderRadius: 100,
                backgroundColor: theme.background,
                justifyContent: 'center',
              }}>
              <Ionicons name="close" size={24} text={theme.text} />
            </TouchableOpacity>
          </View>
        ) : (
          <View />
        )}

        {profiles.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.main, {backgroundColor: theme.background}]}>
            {profiles.map(item => (
              <Item key={item.username} itemInfo={item} />
            ))}
            <View>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  {
                    borderColor: theme.border,
                    backgroundColor: theme.buttonBackground,
                  },
                ]}
                onPress={() => {
                  setPageLimit(pageLimit + 10);
                  changeRefresh();
                }}>
                <Text color={theme.text} light center>
                  Daha fazla göster: {profiles.length}
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View
            style={
              (styles.main,
              {
                height: '80%',
                backgroundColor: theme.background,
                justifyContent: 'center',
                margin: 10,
                borderRadius: 10,
              })
            }>
            <Text color={theme.text} center large>
              Kimse yok burada! {'\n'} Arkadaşlarını çağır.
            </Text>
          </View>
        )}
      </View>

      <Modalize
        overlayStyle={{backgroundColor: theme.modalBg}}
        modalStyle={[styles.modal, {backgroundColor: theme.modalBackground}]}
        snapPoint={300}
        modalHeight={500}
        ref={modalizeRef}
        onClosed={onClosed}
        FooterComponent={
          <TouchableOpacity
            style={[styles.modalButton, {borderColor: theme.border}]}
            onPress={() => {
              closeModal();
            }}>
            <Text color={theme.text} center large>
              Bul
            </Text>
          </TouchableOpacity>
        }>
        <Bottom />
      </Modalize>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chipBar: {
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
    padding: 5,
    paddingLeft: 10,
  },

  container: {
    flex: 1,
  },

  flatListView: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },

  header: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    width: '100%',
  },

  main: {
    alignSelf: 'center',
    width: '100%',
  },

  modal: {
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 5,
    width: '99%',
  },

  modalButton: {
    alignSelf: 'center',
    borderRadius: 20,
    backgroundColor: '#0a0a0a',
    height: 60,
    justifyContent: 'center',
    marginVertical: 10,
    width: '30%',
  },

  postInfoButton: {
    alignItems: 'center',
    backgroundColor: '#2D2D2D',
    borderRadius: 10,
    justifyContent: 'center',
    margin: 10,
    padding: 10,
  },

  postProfilePhoto: {
    aspectRatio: 1,
    borderRadius: 10,
    resizeMode: 'cover',
    width: 100,
  },

  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },

  searchInside: {
    alignItems: 'center',
    borderRadius: 10,
    flex: 2,
    flexDirection: 'row',
    height: '100%',
    paddingLeft: 30,
    paddingRight: 10,
    width: '100%',
  },

  searchOutside: {
    alignSelf: 'center',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 70,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
});

export default HomeScreen;
