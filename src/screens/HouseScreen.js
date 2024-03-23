import React, {
  setTimeout,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
// Components
import ImageItem from '../components/ImageItem';
import SegmentedTab from '../components/TabView/TabView';
import Text from '../components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
import { useTheme } from '../context/ThemeManager';
// Utils
import PossessiveSuffix from '../utils/TurkceIyelik';

// Functions
function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

// Animation variables
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 80;
const HEADER_SCROLL_DISTANCE = 150;

const MAX_IMAGE_HEIGHT = 150;
const MIN_IMAGE_HEIGHT = 0;

const HouseScreen = ({ route, navigation }) => {
  const firebase = useContext(FirebaseContext);
  const [userId, setUserId] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [houseData, setHouseData] = useState();
  const [geoPoint, setGeopoint] = useState();
  const [owner, setOwner] = useState();
  const [bools, setBools] = useState([]);
  const [siteValues, setSiteValues] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [strings, setStrings] = useState([]);
  const [done, setDone] = useState(false);
  const { theme } = useTheme();
  const {
    uid,
    profileData,
    house,
    username,
    displayName,
    profilePhotoUrl,
  } = route.params;

  const possessive = new PossessiveSuffix();

  // Animation
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 170],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const imageHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [MAX_IMAGE_HEIGHT, MIN_IMAGE_HEIGHT],
    extrapolate: 'clamp',
  });

  // eslint-disable-next-line no-shadow
  const loadHouse = async (uid) => {
    setDone(false);
    try {
      const data = await firebase.getHouseData(uid);
      setBools(data.bools.split(';'));
      setGeopoint(data.geopoint);
      setPhotos(data.photos);
      setSiteValues(data.siteValues.split(';'));
      setStrings(data.strings.split(';'));
      if (displayName) {
        setOwner(displayName);
      } else {
        setOwner(username);
      }
    } catch (error) {
      console.log('@HouseScreen => @getData: ', error);
    } finally {
      setDone(true);
    }
  };

  useEffect(() => {
    if (!houseData) {
      loadHouse(uid);
    }
  }, [refreshing]);

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
        <View />
      </View>

      {done ? (
        <View
          style={[
            styles.container,
            { backgroundColor: theme.background },
          ]}
        >
          <Animated.View
            style={[
              styles.headerView,
              {
                height: headerHeight,
              },
            ]}
          >
            <Animated.Image
              style={{
                opacity: headerOpacity,
                backgroundColor: '#fff',
                height: imageHeight,
                borderRadius: 100,
                aspectRatio: 1,
              }}
              source={{ uri: profilePhotoUrl }}
            />
            <Text title center color={theme.text}>
              {possessive.word(owner).get()} Evi
            </Text>
          </Animated.View>
          <ScrollView
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { y: scrollY },
                  },
                },
              ],
              { useNativeDriver: false },
            )}
            style={[
              styles.main,
              { backgroundColor: theme.background },
            ]}
          >
            <ScrollView
              fadingEdgeLength={30}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
            >
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingVertical: 5,
                  width: '100%',
                }}
              >
                {photos.map((item) => (
                  <ImageItem
                    style={[
                      styles.houseImageContainer,
                      { backgroundCOlor: theme.background },
                    ]}
                    isOwner={false}
                    photo={item}
                    key={item}
                  />
                ))}
              </View>
            </ScrollView>
            <View
              style={[
                styles.tab,
                {
                  backgroundColor:
                    theme.profileCardBackground,
                },
              ]}
            />

            <SegmentedTab
              info={[bools, strings, siteValues]}
            />
          </ScrollView>
        </View>
      ) : (
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            backgroundColor: theme.background,
          }}
        >
          <ActivityIndicator color={theme.text} size={64} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 15,
    width: '100%',
  },

  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  igView: {
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    width: '95%',
  },

  infoRow: {
    alignContent: 'center',
    alignSelf: 'center',
    borderTopWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  list: {
    alignSelf: 'center',
    width: '100%',
  },

  listView: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },

  main: {},

  postInfoText: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  postInfoUnder: {
    borderTopWidth: 0.5,
    marginTop: 5,
    padding: 10,
  },

  postProfilePhoto: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },

  profilePhotoContainer: {
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 25,
    marginBottom: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: '75%',
    zIndex: 1,
  },

  profilePhotoImage: {
    borderRadius: 100,
    height: 100,
    width: 100,
  },

  profilePhotoImageStyle: {
    aspectRatio: 1,
    height: 100,
  },

  profileView: {
    alignSelf: 'center',
    borderRadius: 10,
    padding: 10,
    width: '95%',
  },

  rowView: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  scene: {
    flex: 1,
  },

  tabView: {
    alignSelf: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    marginTop: 10,
    padding: 10,
    paddingBottom: 20,
    paddingTop: 20,
    width: '95%',
  },

  tabViewText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    height: 50,
    textAlign: 'left',
    textAlignVertical: 'center',
    width: '70%',
  },

  tabViewText2: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 16,
    textAlign: 'right',
    textAlignVertical: 'center',
  },
});

export default HouseScreen;
