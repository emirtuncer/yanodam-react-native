import React, {createContext, useState} from 'react';

const UserContext = createContext([{}, () => {}]);

const UserProvider = props => {
  const [state, setState] = useState({
    uid: '',
    isLoggedIn: false,
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
    onStart: true,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider};
