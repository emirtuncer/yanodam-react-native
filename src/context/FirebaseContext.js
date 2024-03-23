// import firebase, { firestore } from 'firebase';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import '@react-native-firebase/firestore';
import React, {createContext} from 'react';

// import 'firebase/auth';
// import 'firebase/firestore';
// import config from '../config/firebase';

const FirebaseContext = createContext();

if (!firebase.apps.length) {
  firebase.default.initializeApp();
}

const db = firebase.firestore();

// const firestore() = firebase.firestore();

const Firebase = {
  getCurrentUser: () => {
    return auth().currentUser;
  },

  getUserInfo: async uid => {
    try {
      const user = await db.collection('users').doc(uid).get();

      if (user.exists) {
        return user.data();
      }
    } catch (error) {
      console.log('Error @getUserInfo: ', error);
    }
  },

  isUsernameTaken: async username => {
    try {
      const userRef = await db.collection('usernames').doc(username).get();
      if (!userRef.exists) {
        return false;
      } else {
        console.log('Document data:', userRef.data());
        return true;
      }
    } catch (error) {
      if (error.code === 'auth/insufficient-permission') {
        console.log('go on');
        return false;
      }
      console.log('Error @isUsernameTaken: ', error.message);
    }
  },

  getVerifiedInfo: async userID => {
    try {
      const data = await db.collection('verifiedUsers').doc(userID).get();

      if (data.exists) {
        return data.data();
      } else {
        return 'User is not verified';
      }
    } catch (e) {
      console.log('@getVerifiedInfo: ', e);
    }
  },

  verifyUser: async userData => {
    const userID = Firebase.getCurrentUser().uid;
    console.log(userData);
    try {
      await db
        .collection('users')
        .doc(userID)
        .update({isVerified: true})
        .catch(err => console.log(err))
        .then(() => {
          db.collection('verifiedUsers').doc(userData.username).set({
            city: userData.city,
            faculty: userData.faculty,
            fullName: userData.fullName,
            university: userData.university,
            username: userData.username,
            userId: userID,
          });
        });
    } catch (err) {
      console.log('@VerifyUser: ', err);
    }
  },

  removeVerification: async userID => {
    try {
      const result = await db
        .collection('verifiedUsers')
        .doc(userID)
        .delete()
        .catch(e => console.log(e))
        .then(() => {
          db.collection('users').doc(userID).update({isVerified: false});
        })
        .then(() => {
          db.collection('verifiedUsers').doc(userID).remove();
        })
        .catch(e => console.log(e));

      return result;
    } catch (e) {
      console.log('@removeVerification: ', e);
    }
  },

  createUser: async user => {
    // const batch = db.batch();
    try {
      await auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then(() => {
          console.log('User created!!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }
          console.log(error);
        });
      const uid = Firebase.getCurrentUser().uid;
      let profilePhotoUrl = 'default';

      try {
        const userRef = await db.collection('users').doc(uid).set({
          username: user.username,
          email: user.email,
          city: user.city,
          gender: user.gender,
          active: false,
          isVerified: false,
          profilePhotoUrl,
          bio: '',
          houseData: false,
          igUsername: '',
          profileData: '00000000',
          university: '',
          faculty: '',
          displayName: '',
        });
      } catch (error) {
        console.log('Error: @createUser @usersCreate: ', error);
      }

      // username search
      try {
        const usernameRef = await db
          .collection('usernames')
          .doc(user.username)
          .set({
            city: user.city,
            username: user.username,
            userId: uid,
          });
        // batch.set(usernameRef, { city: user.city });
      } catch (error) {
        console.log('Error: @createUser @usernameCreate:', error);
      }

      // // city search
      // try {
      //   const cityRef = await db
      //     .collection(user.city)
      //     .doc(user.username)
      //     .set({ uid: uid });
      //   // batch.set(cityRef, { uid: uid });
      // } catch (error) {
      //   console.log('Error: @createUser @cityCreate', error);
      // }

      if (user.profilePhoto) {
        const profilePhoto = await Firebase.uploadProfilePhoto(
          user.profilePhoto,
        );
        try {
          const result = await db.collection('users').doc(uid).set({
            profilePhotoUrl: profilePhoto,
          });
        } catch (e) {
          console.log(e);
        }
      }

      // try {
      //   await batch.commit();
      // } catch (e) {
      //   console.log(e);
      // }

      delete user.password;
      return {
        ...user,
        // eslint-disable-next-line no-undef
        profilePhoto,
        profileData: '00000000',
      };
    } catch (error) {
      console.log('Error @createUser: ', error.message);
    }
  },

  getHouseData: async uid => {
    try {
      const data = await db.collection('houses').doc(uid).get();

      if (data.exists) {
        return data.data();
      }
    } catch (error) {
      console.log('Error @getHouseData: ', error);
    }
  },

  changeProfilePhoto: async uri => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('profilePhotos').child(uid);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch (error) {
      console.log('Error @changeProfilePhoto', error);
    }
  },

  uploadProfilePhoto: async uri => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const photo = await Firebase.getBlob(uri);
      const imageRef = firebase.storage().ref('profilePhotos').child(uid);
      await imageRef.put(photo);
      const url = await imageRef.getDownloadURL();
      await db.collection('users').doc(uid).update({
        profilePhotoUrl: url,
      });

      return url;
    } catch (error) {
      console.log('Error @uploadProfilePhoto', error);
    }
  },

  uploadPDFFile: async uri => {
    const uid = Firebase.getCurrentUser().uid;

    try {
      const pdf = await Firebase.getBlob(uri);
      const pdfRef = firebase.storage().ref('verificationPDFs').child(uid);
      await pdfRef.put(pdf);

      return 'succesful';
    } catch (error) {
      console.log('Error @uploadProfilePhoto', error);
    }
  },

  getBlob: async uri => {
    return await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => {
        resolve(xhr.response);
      };

      xhr.onerror = () => {
        reject(new TypeError('Network request failed'));
      };

      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      xhr.send(null);
    });
  },

  changeUserAccountInfo: async data => {
    console.log('changeUserAccountInfo fired');
    const uid = Firebase.getCurrentUser().uid;

    const batch = db.batch();
    const ref = db.collection('users').doc(uid);
    if (data.houseData) {
      batch.update(ref, {houseData: data.houseData});
    }
    if (data.igUsername) {
      batch.update(ref, {igUsername: data.igUsername});
    }
    if (data.profileData) {
      batch.update(ref, {profileData: data.profileData});
    }
    if (data.displayName) {
      batch.update(ref, {displayName: data.displayName});
    }
    try {
      await batch.commit();
    } catch (error) {
      console.log('Error @changeUserAccountInfo: ', error);
    }
  },

  changeUserBio: async data => {
    console.log('changeUserBio fired');
    const uid = Firebase.getCurrentUser().uid;
    const ref = db.collection('users').doc(uid);
    try {
      await ref.update({bio: data});
    } catch (error) {
      console.log('Error @changeUserBio: ', error);
    }
  },

  findPeopleSameCity: async (uid, userCity) => {
    //const snapshot = await db.collection(userCity).get();
    try {
      const snapshot = await db
        .collection('users')
        .where('city', '==', userCity)
        .where('active', '==', true)
        .get();
      if (snapshot.empty) {
        console.log('No matching docs.');
        return;
      }
      return snapshot;
    } catch (error) {
      console.log('Error @findPeopleSameCity: ', error);
    }
  },

  logOut: async uid => {
    try {
      await auth().signOut();

      return true;
    } catch (error) {
      console.log('Error @logOut: ', error);
    }

    return false;
  },

  logIn: async (email, password) => {
    return auth().signInWithEmailAndPassword(email, password);
  },

  search: async (uid, city) => {},

  registerFacultyAndUniversity: async (uid, university, faculty) => {
    try {
      const batch = db.batch();
      const ref = db.collection('users').doc(uid);
      if (university) {
        batch.update(ref, {university: university});
      }
      if (faculty) {
        batch.update(ref, {faculty: faculty});
      }

      batch.update(ref, {active: true});
      await batch.commit();
    } catch (error) {
      console.log('Error @registerFacultyAndUniversity: ', error);
    }
  },
};

const FirebaseProvider = props => {
  return (
    <FirebaseContext.Provider value={Firebase}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export {FirebaseContext, FirebaseProvider};
