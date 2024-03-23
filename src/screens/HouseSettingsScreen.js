import {useNavigation} from '@react-navigation/native';
import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
// Components
import ImageItem from '../components/ImageItem';
import Text from '../components/Text';
import {FirebaseContext} from '../context/FirebaseContext';
// Contexts
import {useTheme} from '../context/ThemeManager';
import {UserContext} from '../context/UserContext';

const HouseSettingsScreen = () => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const navigation = useNavigation();
  const [effect, setEffect] = useState();
  const [loading, setLoading] = useState();
  const [houseData, setHouseData] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const {theme} = useTheme();
  const [photos, setPhotos] = useState(['']);
  const [bools, setBools] = useState([]);
  const [strings, setStrings] = useState([]);
  const [siteValues, setSiteValues] = useState([]);

  const [security, setSecurity] = useState(false);
  const [gym, setGym] = useState(false);
  const [carPark, setCarPark] = useState(false);
  const [park, setPark] = useState(false);
  const [pool, setPool] = useState(false);

  const toggleSecurity = () => setSecurity(previousState => !previousState);
  const toggleGym = () => setGym(previousState => !previousState);
  const toggleCarPark = () => setCarPark(previousState => !previousState);
  const togglePark = () => setPark(previousState => !previousState);
  const togglePool = () => setPool(previousState => !previousState);

  const [pet, setPet] = useState(false);
  const [smoke, setSmoke] = useState(false);
  const [alcohol, setAlcohol] = useState(false);
  const [food, setFood] = useState(false);
  const [internet, setInternet] = useState(false);
  const [klima, setKlima] = useState(false);
  const [sicakSu, setSicakSu] = useState(false);

  const togglePet = () => setPet(previousState => !previousState);
  const toggleSmoke = () => setSmoke(previousState => !previousState);
  const toggleAlcohol = () => setAlcohol(previousState => !previousState);
  const toggleFood = () => setFood(previousState => !previousState);
  const toggleInternet = () => setInternet(previousState => !previousState);
  const toggleKlima = () => setKlima(previousState => !previousState);
  const toggleSicaksu = () => setSicaksu(previousState => !previousState);

  const [people, setPeople] = useState('');
  const [rooms, setRooms] = useState('');
  const [banyo, setBanyo] = useState('');
  const [kira, setKira] = useState('');
  const [isitmaTuru, setIsitmaTuru] = useState('');
  const [katSayisi, setkatSayisi] = useState('');
  const [kacinciKat, setkacinciKat] = useState('');
  const [balkonSayisi, setBalkonSayisi] = useState('');

  const loadData = async (bools, strings, siteValues) => {
    try {
      if (bools) {
        if (bools[0] == 1) {
          setPet(true);
        } else {
          setPet(false);
        }
        if (bools[1] == 1) {
          setSmoke(true);
        } else {
          setSmoke(false);
        }
        if (bools[2] == 1) {
          setAlcohol(true);
        } else {
          setAlcohol(false);
        }
        if (bools[3] == 1) {
          setFood(true);
        } else {
          setFood(false);
        }
        if (bools[4] == 1) {
          setInternet(true);
        } else {
          setInternet(false);
        }
        if (bools[5] == 1) {
          setKlima(true);
        } else {
          setKlima(false);
        }
        if (bools[6] == 1) {
          setSicakSu(true);
        } else {
          setSicakSu(false);
        }

        setPeople(strings[0]);
        setRooms(strings[1]);
        setBanyo(strings[2]);
        setKira(strings[3]);
        setIsitmaTuru(strings[4]);
        setkatSayisi(strings[5]);
        setkacinciKat(strings[6]);
        setBalkonSayisi(strings[7]);

        if (siteValues[0] == 1) {
          setSecurity(true);
        } else {
          setSecurity(false);
        }
        if (siteValues[1] == 1) {
          setGym(true);
        } else {
          setGym(false);
        }
        if (siteValues[2] == 1) {
          setCarPark(true);
        } else {
          setCarPark(false);
        }
        if (siteValues[3] == 1) {
          setPark(true);
        } else {
          setPark(false);
        }
        if (siteValues[4] == 1) {
          setPool(true);
        } else {
          setPool(false);
        }

        setSiteValues(siteValues);
        console.log(strings);
        console.log(bools);
        console.log(siteValues);
      }
    } catch (err) {
      console.log('@loadData => ', err);
    }
  };

  const onLongPressImage = async () => {
    Alert.alert(
      ' ',
      'Bu gorseli kaldirmak istiyor musunuz',
      [
        {
          text: 'Iptal',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Sil',
          onPress: () => console.log('Sill'),
        },
      ],
      {cancelable: true},
    );
  };

  useEffect(() => {
    fetchData();
    // return () => {
    //   setPhotos(['']);
    //   console.log(photos)
    // };
  }, [navigation]);

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await firebase.getHouseData(user.uid);
      setHouseData(data);
      console.log(data);
      setPhotos(photos.concat(data.photos));
      setBools(data.bools.split(';'));
      setStrings(data.strings.split(';'));
      loadData(
        data.bools.split(';'),
        data.strings.split(';'),
        data.siteValues.split(';'),
      );
    } catch (e) {
      console.log('@FetchData Error: ', e);
    } finally {
      setLoading(false);
    }
  };

  const changeEffect = () => {
    if (effect == true) {
      setEffect(false);
    } else {
      setEffect(true);
    }
  };

  const saveButton = () => {
    console.log('Save Button');
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={[styles.header, {backgroundColor: theme.headerBackground}]}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => {
            navigation.goBack();
          }}>
          <Entypo name="chevron-left" size={31} color={theme.text} />
        </TouchableOpacity>
        <View />
      </View>
      {loading ? (
        <View
          style={{
            paddingTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text center title color={theme.text}>
            Loading
          </Text>
          <ActivityIndicator color={theme.text} size={64} />
        </View>
      ) : (
        <ScrollView style={styles.main}>
          <ScrollView
            fadingEdgeLength={30}
            showsHorizontalScrollIndicator={false}
            horizontal={true}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
              }}>
              {photos.map(item => (
                <ImageItem
                  style={[
                    styles.houseImageContainer,
                    {backgroundCOlor: theme.background},
                  ]}
                  isOwner={true}
                  photo={item}
                  key={item}
                />
              ))}
            </View>
          </ScrollView>

          <View style={{padding: 5}}>
            <View>
              <Text center bold large color={theme.text}>
                Ev Özellikleri
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Evcil hayvan</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={togglePet}
                  value={pet}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Sigara</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSmoke}
                  value={smoke}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Alkol kullanılıyor mu</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleAlcohol}
                  value={alcohol}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Yemek yapılıyor mu</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleFood}
                  value={food}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>İnternet var mı</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleInternet}
                  value={internet}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Klima var mı?</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleKlima}
                  value={klima}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Sıcak su</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSicaksu}
                  value={sicakSu}
                />
              </View>
            </View>
            <View style={{marginTop: 15}}>
              <Text center bold large color={theme.text}>
                Site Özellikleri
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Güvenlik</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleSecurity}
                  value={security}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Spor salonu</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleGym}
                  value={gym}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Otopark</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={toggleCarPark}
                  value={carPark}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Park</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={togglePark}
                  value={park}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text color={theme.text}>Havuz</Text>
                <Switch
                  trackColor={{
                    false: '#767577',
                    true: '#42f587',
                  }}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={togglePool}
                  value={pool}
                />
              </View>
            </View>
          </View>

          <TouchableOpacity
            onPress={saveButton}
            style={[styles.button, {backgroundColor: theme.buttonBackground}]}>
            <Text center large color={theme.text}>
              Kaydet
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
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
    elevation: 5,
  },

  houseImageContainer: {
    margin: 5,
    height: 200,
    aspectRatio: 1,
    borderRadius: 10,
    alignSelf: 'center',
    overflow: 'hidden',
    zIndex: 1,
  },

  houseImage: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
  },

  tab: {
    padding: 10,
  },

  button: {
    padding: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    borderRadius: 10,
  },

  main: {},
});

export default HouseSettingsScreen;
