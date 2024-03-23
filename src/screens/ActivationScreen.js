import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// Components
import Text from '.././components/Text';
import { FacultyPicker } from '../components/FacultyPicker';
import { UniversityPicker } from '../components/UniversityPicker';
import { FirebaseContext } from '../context/FirebaseContext';
// Contexts
import { UserContext } from '../context/UserContext';

const ActivationScreen = () => {
  const firebase = useContext(FirebaseContext);
  const [user, setUser] = useContext(UserContext);
  const [university, setUniversity] = useState();
  const [faculty, setFaculty] = useState();
  const [loading, setLoading] = useState(false);

  const registerUniversity = async (
    university,
    faculty,
  ) => {
    setLoading(true);
    try {
      const uid = firebase.getCurrentUser().uid;
      const userInfo = await firebase.getUserInfo(uid);

      await firebase.registerFacultyAndUniversity(
        uid,
        university,
        faculty,
      );
      setUser((state) => ({ ...state, active: true }));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {user.city ? (
        <>
          <View style={styles.head}>
            <View style={styles.headerText}>
              <Text color="#000" title bold>
                Profil Bilgilerinizi Doldurun
              </Text>
            </View>
          </View>
          <ScrollView style={styles.body}>
            <View style={styles.card}>
              <FontAwesome
                name="university"
                size={32}
                color="#fff"
              />
              <View
                styles={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flex: 1,
                }}
              >
                <UniversityPicker style={styles.picker} />
              </View>
            </View>

            <View style={styles.card}>
              <FontAwesome
                name="book"
                size={32}
                color="#fff"
              />
              <View
                styles={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  flex: 1,
                }}
              >
                <FacultyPicker style={styles.picker} />
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            {user.university == '' ||
            user.university == 'None' ||
            user.faculty == '' ? (
              <View />
            ) : (
              <TouchableHighlight
                onPress={() => {
                  console.log(
                    'registerUniversity :: ',
                    user.university,
                    user.faculty,
                  );
                  registerUniversity(
                    user.university,
                    user.faculty,
                  );
                }}
                style={styles.submitBtn}
              >
                {loading ? (
                  <ActivityIndicator small color="#fff" />
                ) : (
                  <Text color="#fff" large bold center>
                    Kaydet
                  </Text>
                )}
              </TouchableHighlight>
            )}
          </View>
        </>
      ) : (
        <View>
          <Text>Error</Text>
          <TouchableOpacity
            onPress={() => {
              console.log(user);
              setUser((state) => ({
                uid: '',
                active: false,
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
                searchUni: 'None',
                isLoggedIn: false,
                onStart: false,
              }));
            }}
          >
            <Text>Restart App</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 10,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 3,
    marginBottom: 3,
    justifyContent: 'space-evenly',
    flex: 2,
    alignItems: 'center',
    flexDirection: 'row',
  },

  picker: {
    height: 50,
    width: 200,
    borderRadius: 250,
    color: '#fff',
    fontFamily: 'Montserrat-Light',
    margin: 10,
  },

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  head: {
    padding: 20,
    height: '20%',
  },

  headerText: {
    marginTop: 20,
  },

  body: {
    width: '98%',
    height: '60%',
    alignSelf: 'center',
  },

  bottom: {
    height: '20%',
  },

  submitBtn: {
    justifyContent: 'center',
    backgroundColor: '#0f0f0f',
    borderRadius: 10,
    padding: 35,
    alignSelf: 'center',
    height: 45,
  },
});

export default ActivationScreen;
