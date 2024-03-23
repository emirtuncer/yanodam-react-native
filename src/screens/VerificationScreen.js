import React, {
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// Components
import Text from '../components/Text';
import { FirebaseContext } from '../context/FirebaseContext';
// Contexts
import { useTheme } from '../context/ThemeManager';
import { UserContext } from '../context/UserContext';

const VerificationScreen = ({ props, navigation }) => {
  const [user, setUser] = useContext(UserContext);
  const firebase = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  const [loadingDogrulama, setLoadingDogrulama] =
    useState(false);
  const [verificationRunning, setVerificationRunning] =
    useState(false);
  const { theme } = useTheme();
  const [student, setStudent] = useState();
  const [tc, setTC] = useState();
  const [barkodNo, setBarkodNo] = useState();

  const fetchData = async () => {
    setLoading(true);

    try {
      const data = await firebase.getVerifiedInfo(
        user.username,
      );
      setStudent(data);
      console.log(data);
    } catch (e) {
      console.log('@FetchData Error: ', e);
    } finally {
      setLoading(false);
    }
  };

  const removeVerification = async () => {
    setLoadingDogrulama(true);

    try {
      const result = await firebase.removeVerification(
        user.username,
      );
      console.log(result);
      setStudent();
      setUser((state) => ({
        ...state,
        isVerified: false,
      }));

      setLoadingDogrulama(false);
    } catch (e) {
      console.log('@removeVerification Error: ', e);
    } finally {
      navigation.goBack();
    }
  };

  const verifyDataSet = async (
    tcKimlik: number,
    barkodNumarasi: string,
  ) => {
    if (verificationRunning) {
      throw new Error('Already running');
    }
    if (tcKimlik.length !== 11) {
      ToastAndroid.show('TC yanlış!', ToastAndroid.SHORT);
      throw new Error('TC False');
    } else if (
      barkodNumarasi.length !== 18 ||
      !barkodNumarasi.startsWith('YOK')
    ) {
      ToastAndroid.show(
        'Barkod Numarası yanlış!',
        ToastAndroid.SHORT,
      );
      throw new Error('Barkod false');
    } else {
      try {
        setVerificationRunning(true);
        console.log(
          'verify data set with: ',
          tcKimlik,
          barkodNumarasi,
        );
        ToastAndroid.show(
          'Dogrulaniyor!',
          ToastAndroid.LONG,
        );
        fetch(
          'https://yan-odam.herokuapp.com/users/verify',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              barkodKodu: barkodNumarasi,
              tcKimlik,
            }),
          },
        )
          .then((response) => response.json())
          .then(async (json) => {
            console.log(json.status);
            if (
              json.status === 'Student verified in E-Devlet'
            ) {
              ToastAndroid.show(
                'Dogrulama basarili!',
                ToastAndroid.SHORT,
              );
              try {
                await firebase.verifyUser({
                  city: user.city,
                  faculty: user.faculty,
                  fullName: 'Test test',
                  university: user.university,
                  username: user.username,
                  userId: user.uid,
                });
                navigation.goBack();
              } catch (e) {
                console.log('@VerifyUser: ', e);
              }
              setVerificationRunning(false);
              return true;
            }
            if (json.status === 'Student not verified') {
              ToastAndroid.show(
                'Dogrulama basarisiz!',
                ToastAndroid.SHORT,
              );
              setVerificationRunning(false);
              return false;
            }
            ToastAndroid.show('Hata!', ToastAndroid.SHORT);
            setVerificationRunning(false);
            return false;
          })
          .catch((e) => console.log(e));
      } catch (e) {
        console.log(e);
      }
    }
    // try {
    //   if (
    //     user.city &&
    //     user.faculty &&
    //     user.university &&
    //     user.username &&
    //     tcKimlik &&
    //     barkodNumarasi
    //   ) {
    //     const result = await firebase.verifyUser(user.uid, {
    //       city: user.city,
    //       faculty: user.faculty,
    //       fullName: name,
    //       university: user.university,
    //       username: user.username,
    //     });
    //     setUser((state) => ({
    //       ...state,
    //       isVerified: true,
    //     }));
    //     navigation.goBack();
    //   }
    // } catch (error) {
    //   console.log('@verifyDataSet Error:', e);
    // } finally {
    //   setLoadingVerificationRequest(false);
    // }
  };

  useEffect(() => {
    fetchData();
    // return () => {
    //   setStudent(null);
    // };
  }, [navigation]);

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
      </View>
      {loading ? (
        <View
          style={{
            paddingTop: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text center title color={theme.text}>
            Loading
          </Text>
          <ActivityIndicator color={theme.text} size={64} />
        </View>
      ) : student && user.isVerified ? (
        <View
          style={[
            styles.main,
            { backgroundColor: theme.background },
          ]}
        >
          <Text semibold center title color={theme.text}>
            Kullanıcı doğrulanmış!
          </Text>
          <MaterialIcons
            style={{ alignSelf: 'center', marginTop: 10 }}
            color={theme.text}
            size={32}
            name="verified"
          />
          <View
            style={[
              { margin: 10, padding: 10, borderRadius: 10 },
              { backgroundColor: theme.headerBackground },
            ]}
          >
            <Text color={theme.text}>
              Tam Ad: {student.fullName}
            </Text>
            <Text color={theme.text}>
              Şehir: {student.city}
            </Text>
            <Text color={theme.text}>
              Üniversite: {student.university}
            </Text>
            <Text color={theme.text}>
              Bölüm: {student.faculty}
            </Text>

            {loadingDogrulama ? (
              <View
                style={[
                  styles.button,
                  {
                    backgroundColor: theme.buttonBackground,
                  },
                ]}
              >
                <ActivityIndicator
                  color={theme.text}
                  size={18}
                />
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: theme.buttonBackground,
                  width: '50%',
                  alignSelf: 'center',
                  padding: 5,
                  borderRadius: 10,
                  marginTop: 20,
                }}
                onPress={removeVerification}
              >
                <Text large center color={theme.text}>
                  Doğrulamayı kaldırın
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <ScrollView style={styles.main}>
          <View
            style={[
              styles.tab,
              {
                backgroundColor:
                  theme.profileCardBackground,
              },
            ]}
          >
            <Text semibold center title color={theme.text}>
              Doğrulama
            </Text>

            <View style={{ marginTop: 10 }}>
              <Text large color={theme.text}>
                TC Kimlik No:
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: theme.divider,
                  borderRadius: 10,
                  fontFamily: 'Montserrat-ExtraLight',
                  color: theme.text,
                  fontSize: 16,
                  marginTop: 5,
                  alignSelf: 'center',
                }}
                autoCapitilize="none"
                autoCompleteType="off"
                autoCorrect={false}
                autoFocus={false}
                secureTextEntry={false}
                onChangeText={(text) => {
                  setTC(text.trim());
                  console.log(text);
                }}
                value={tc}
              />
              <Text large color={theme.text}>
                Barkod No:
              </Text>
              <TextInput
                style={{
                  width: '100%',
                  textAlign: 'center',
                  backgroundColor: theme.divider,
                  color: theme.text,
                  borderRadius: 10,
                  fontFamily: 'Montserrat-ExtraLight',
                  fontSize: 16,
                  marginTop: 5,
                  alignSelf: 'center',
                }}
                autoCapitilize="none"
                autoCompleteType="off"
                autoCorrect={false}
                autoFocus={false}
                secureTextEntry={false}
                onChangeText={(text) => {
                  setBarkodNo(text.trim());
                  console.log(text);
                }}
                value={barkodNo}
              />

              {/* <TouchableOpacity
                style={{
                  width: '50%',
                  alignSelf: 'center',
                  padding: 10,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: '#73A8FF',
                  borderColor: '#4285F4',
                }}
                onPress={async () => {
                  // navigation.navigate('Info')
                  console.log('hi');
                  try {
                    const res = await DocumentPicker.pick({
                      type: [DocumentPicker.types.pdf],
                    }).then((res) => {
                      firebase.uploadPDFFile(res.uri);
                    });
                  } catch (err) {
                    if (DocumentPicker.isCancel(err)) {
                      // User cancelled the picker, exit any dialogs or menus and move on
                    } else {
                      throw err;
                    }
                  }
                }}
              >
                <Text center color="#fff">
                  PDF yukle
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {verificationRunning ? (
            <View
              style={[
                styles.button,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <ActivityIndicator
                color={theme.text}
                size={18}
              />
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                verifyDataSet(tc, barkodNo);
              }}
              style={[
                styles.button,
                { backgroundColor: theme.buttonBackground },
              ]}
            >
              <Text center large color={theme.text}>
                Doğrula
              </Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginHorizontal: 30,
    marginVertical: 10,
    padding: 10,
  },

  container: {
    flex: 1,
  },

  header: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 5,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    padding: 15,
    width: '100%',
  },

  houseImage: {
    alignSelf: 'center',
    height: '100%',
    width: '100%',
  },

  houseImageContainer: {
    alignSelf: 'center',
    aspectRatio: 1,
    borderRadius: 10,
    height: 200,
    margin: 5,
    overflow: 'hidden',
    zIndex: 1,
  },

  main: {
    paddingTop: 20,
  },

  tab: {
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
});

export default VerificationScreen;
