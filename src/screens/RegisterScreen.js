import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  ImagePicker,
  Permissions,
} from 'react-native-unimodules';
import { Picker } from '@react-native-picker/picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import * as Permissions from 'expo-permissions';
// import * as ImagePicker from 'expo-image-picker';

// Components
import Text from '../components/Text';

// Context
import { FirebaseContext } from '../context/FirebaseContext';
import { UserContext } from '../context/UserContext';

// Utils
// import { hp, wp } from '../utils/dimen';
import { validate } from '../utils/emailValidator';

// Register Screen
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errors, setErrors] = useState({
    email: true,
    username: true,
  });
  const [city, setCity] = useState('istanbul');
  const [gender, setGender] = useState('none');
  const [loading, setLoading] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState();
  const firebase = useContext(FirebaseContext);
  const [_, setUser] = useContext(UserContext);

  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL,
      );
      await Permissions.askAsync(Permissions.CAMERA);
      return status;
    }
  };

  const pickImage = async () => {
    try {
      const result =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

      if (!result.cancelled) {
        setProfilePhoto(result.uri);
      }
    } catch (error) {
      console.log('Error @pickImage: ', error);
    }
  };

  const addProfilePhoto = async () => {
    const status = await getPermission();

    if (status !== 'granted') {
      alert(
        'Kamera fotoğraflarına yetki bulunmamaktadır, lütfen yetki isteğini kabul ediniz.',
      );
      return;
    }
    pickImage();
  };

  const checkUsername = async (username) => {
    console.log(username);
    try {
      const x = await firebase.isUsernameTaken(username);
      console.log('@checkUsername x: ', x);
      if (x === true) {
        setErrors((state) => ({
          ...state,
          username: true,
        }));
      } else {
        setErrors((state) => ({
          ...state,
          username: false,
        }));
      }
      return x;
    } catch (error) {
      console.log(
        'Error @checkUsername @isUsernameTaken: ',
        error,
      );
    }
  };

  const checkEmail = async (email) => {
    try {
      const x = validate(email);
      if (x === true) {
        setErrors((state) => ({ ...state, email: false }));
      } else {
        setErrors((state) => ({ ...state, email: true }));
      }
      return x;
    } catch (error) {
      console.log('Error @checkEmail: ', error);
    }
  };

  const registerButton = async () => {
    if (username === '') {
      Alert.alert("username can't be empty");
    } else if (email === '') {
      Alert.alert("email can't be empty");
    } else if (city === '') {
      Alert.alert("city can't be empty");
    } else if (password === '') {
      Alert.alert("password can't be empty");
    } else {
      try {
        const x = await checkUsername(username);
        if (!x) {
          console.log(
            '@registerButton => checkUsername: false',
          );
        } else {
          alert('Kullanici adina sahip bir kullanici var!');
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }

      setLoading(true);
      const user = {
        username,
        email,
        password,
        profilePhoto,
        city,
        gender,
      };

      try {
        const createdUser = await firebase.createUser(user);
        const { uid } = firebase.getCurrentUser();
        setUser({
          ...createdUser,
          isLoggedIn: true,
          active: false,
          isVerified: false,
          onStart: false,
          searchUni: 'None',
          uid,
          city,
        });
      } catch (error) {
        console.log('Error @register: ', error);
        if (error === 'The email address') {
          Alert.alert('Hata', 'Email kullanılıyor');
        } else if (
          (error === 'TypeError: null is not an object',
          error)
        ) {
          Alert.alert('Hata', 'Email kullanılıyor');
        } else {
          Alert.alert(error);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        <View style={styles.header}>
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
        <TouchableOpacity
          style={styles.profilePhotoContainer}
          onPress={addProfilePhoto}
        >
          {profilePhoto ? (
            <Image
              style={{ flex: 1 }}
              source={{ uri: profilePhoto }}
            />
          ) : (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}
            >
              <AntDesign
                name="plus"
                size={32}
                color="#000"
              />
            </View>
          )}
        </TouchableOpacity>
        <Picker
          selectedValue={city}
          style={styles.pickerStyle}
          itemStyle={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Thin',
            backgroundColor: '#000',
            color: '#fff',
          }}
          mode="dropdown"
          onValueChange={(itemValue) => {
            console.log(itemValue);
            setCity(itemValue);
            setUser((state) => ({ ...state, city }));
          }}
        >
          <Picker.Item label="İstanbul" value="istanbul" />
          <Picker.Item label="İzmir" value="izmir" />
          <Picker.Item label="Ankara" value="ankara" />
        </Picker>

        <Picker
          selectedValue={gender}
          mode="dropdown"
          style={styles.pickerStyle}
          itemStyle={{
            textAlign: 'center',
            fontFamily: 'Montserrat-Thin',
          }}
          onValueChange={(itemValue) => {
            console.log(itemValue);
            setUser((state) => ({ ...state, gender }));
            setGender(itemValue);
          }}
        >
          <Picker.Item
            label="Belirtmek istemiyorum"
            value="none"
          />
          <Picker.Item label="Erkek" value="male" />
          <Picker.Item label="Kadın" value="female" />
        </Picker>

        <View style={styles.authContainer}>
          <Text
            style={[
              errors.username === true
                ? {
                    marginBottom: 10,
                    width: '70%',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    color: '#FF4139',
                  }
                : styles.authTitle,
            ]}
          >
            Kullanıcı Adı:
          </Text>

          <View
            style={[
              errors.username === true
                ? [styles.authView, { borderWidth: 1 }]
                : styles.authView,
            ]}
          >
            <TextInput
              style={styles.authField}
              autoCapitilize="none"
              autoCorrect={false}
              autoFocus={false}
              onChangeText={(text) => {
                setUsername(text.trim());
                checkUsername(text.trim());
              }}
              value={username}
            />
          </View>
        </View>

        <View style={styles.authContainer}>
          <Text
            style={[
              errors.email === true
                ? {
                    marginBottom: 10,
                    width: '70%',
                    fontSize: 12,
                    textTransform: 'uppercase',
                    color: '#FF4139',
                  }
                : styles.authTitle,
            ]}
          >
            Email:
          </Text>
          <View
            style={[
              errors.email === true
                ? [styles.authView, { borderWidth: 1 }]
                : styles.authView,
            ]}
          >
            <TextInput
              style={styles.authField}
              autoCapitilize="none"
              autoCompleteType="email"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => {
                setEmail(text.trim());
                checkEmail(text.trim());
              }}
              value={email}
            />
          </View>
        </View>

        <View style={styles.authContainer}>
          <Text style={styles.authTitle}>Şifre: </Text>
          <View style={styles.authView}>
            <TextInput
              style={styles.authField}
              autoCapitilize="none"
              autoCompleteType="password"
              autoCorrect={false}
              secureTextEntry
              onChangeText={(text) =>
                setPassword(text.trim())
              }
              value={password}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            style={styles.loginContainer}
            onPress={registerButton}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator small color="#000" />
            ) : (
              <Text
                semibold
                center
                color="#000"
                style={{
                  fontSize: 24,
                }}
              >
                Kayıt Ol
              </Text>
            )}
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate('LoginScreen')}
        >
          <Text center color="#f2f2f2">
            Zaten hesabın var mı?{' '}
            <Text med color="#f5f5f5">
              Giriş Yap
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingVertical: 10,
  },

  main: {
    width: '100%',
  },

  authView: {
    backgroundColor: '#131313',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#FF4139',
  },

  profilePhotoContainer: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    borderRadius: 40,
    borderColor: '#36393F',
    borderWidth: 1.5,
    alignSelf: 'center',
    marginTop: 32,
    overflow: 'hidden',
  },

  authContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  authTitle: {
    marginBottom: 10,
    width: '70%',
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
    padding: 50,
    marginTop: 10,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderRadius: 50,
  },

  register: {
    marginTop: 10,
    marginBottom: 40,
  },

  pickerStyle: {
    width: '80%',
    height: 50,
    color: '#fff',
    backgroundColor: '#131313',
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default RegisterScreen;
