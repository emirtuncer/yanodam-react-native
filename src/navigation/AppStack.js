import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {TouchableOpacity, Easing} from 'react-native';
import {enableScreens} from 'react-native-screens';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTheme} from '../context/ThemeManager';

// Context
import {UserContext} from '../context/UserContext';

// Screens
import ActivationScreen from '../screens/ActivationScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import ModalScreen from '../screens/ModalScreen';
import ProfileScreen from '../screens/ProfileScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SettingsScreen from '../screens/SettingsScreen';
import IntroScreen from '../screens/IntroScreen';
import HouseScreen from './../screens/HouseScreen';
import ChatScreen from './../screens/ChatScreen';
import HouseSettingsScreen from './../screens/HouseSettingsScreen';
import ImageViewScreen from './../screens/ImageViewScreen';
import LoadingScreen from './../screens/LoadingScreen';
import VerificationScreen from './../screens/VerificationScreen';
import MenuScreen from './../screens/MenuScreen';

// Header
// import { Header } from "../components/Header";

// Components
import Text from './../components/Text';

enableScreens();

function GoToButton({screenName}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.navigate(screenName)}>
      <Text>{`Go to ${screenName}`}</Text>
    </TouchableOpacity>
  );
}

const ProfileScreens = props => {
  const ProfileStack = createStackNavigator();
  const [user, setUser] = useContext(UserContext);
  console.log(props);
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ProfileStack.Screen
        name="Profile"
        initialParams={{
          displayName: user.displayName,
          faculty: user.faculty,
          university: user.university,
          username: user.username,
          profilePhotoUrl: user.profilePhotoUrl,
          profileData: user.profileData,
          isVerified: user.isVerified,
          igUsername: user.igUsername,
          houseData: user.houseData,
          bio: user.bio,
          uid: user.uid,
        }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen name="House" component={HouseScreen} />
    </ProfileStack.Navigator>
  );
};

const AuthStackScreens = () => {
  const AuthStack = createStackNavigator();

  const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 50,
      mass: 3,
      overshootClamping: false,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  const closeConfig = {
    animation: 'timing',
    config: {
      duration: 500,
      easing: Easing.linear,
    },
  };

  return (
    <AuthStack.Navigator
      gestureEnabled={true}
      gestureDirection="horizontal"
      screenOptions={{
        headerShown: false,
        transationSpec: {
          open: config,
          close: config,
        },
      }}>
      <AuthStack.Screen name="IntroScreen" component={IntroScreen} />
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
};

const ActivationScreens = () => {
  const ActivationStack = createStackNavigator();
  const [user, setUser] = useContext(UserContext);

  return (
    <ActivationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <ActivationStack.Screen name="Activation" component={ActivationScreen} />
    </ActivationStack.Navigator>
  );
};

const CommonScreens = () => {
  const CommonStack = createStackNavigator();
  const [user, setUser] = useContext(UserContext);

  return (
    <CommonStack.Navigator
      mode="modal"
      screenOptions={{
        headerShown: false,
      }}>
      <CommonStack.Screen name="Chat" component={ChatScreen} />
      <CommonStack.Screen name="Modal" component={ModalScreen} />
      <CommonStack.Screen name="ImageViewer" component={ImageViewScreen} />
    </CommonStack.Navigator>
  );
};

const SettingScreens = () => {
  const SettingStack = createStackNavigator();

  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <SettingStack.Screen name="SettingsMenu" component={MenuScreen} />
      <SettingStack.Screen name="Settings" component={SettingsScreen} />
      <SettingStack.Screen
        name="HouseSettings"
        component={HouseSettingsScreen}
      />
      <SettingStack.Screen name="Verification" component={VerificationScreen} />
    </SettingStack.Navigator>
  );
};

const MainStackScreens = () => {
  const MainStack = createBottomTabNavigator();
  const [user, setUser] = useContext(UserContext);
  const {theme} = useTheme();

  const tabBarOptions = {
    showLabel: false,
    style: {
      backgroundColor: theme.bottomTab,
    },
  };

  const screenOptions = ({route}) => ({
    headerShown: false,
    tabBarShowLabel: false,
    tabBarStyle: [
      {
        display: 'flex',
      },
      null,
    ],
    tabBarIcon: ({focused}) => {
      let iconName;

      switch (route.name) {
        case 'Home':
          iconName = 'home';
          break;
        case 'Profile':
          iconName = 'person';
          break;
        case 'Settings':
          iconName = 'settings';
          break;
        default:
          iconName = 'circle';
      }

      return (
        <Ionicons
          name={iconName}
          size={24}
          color={focused ? theme.bottomTabActive : theme.bottomTabInactive}
        />
      );
    },
  });

  return (
    <MainStack.Navigator
      // tabBarOptions={tabBarOptions}
      screenOptions={screenOptions}>
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen
        initialParams={{
          displayName: user.displayName,
          faculty: user.faculty,
          university: user.university,
          username: user.username,
          profilePhotoUrl: user.profilePhotoUrl,
          profileData: user.profileData,
          isVerified: user.isVerified,
          igUsername: user.igUsername,
          houseData: user.houseData,
          bio: user.bio,
          uid: user.uid,
        }}
        name="Profile"
        component={ProfileScreen}
      />
      <MainStack.Screen name="Settings" component={SettingScreens} />
    </MainStack.Navigator>
  );
};

const AppStackScreens = () => {
  const AppStack = createStackNavigator();
  const [user, setUser] = useContext(UserContext);

  return (
    <AppStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {user.onStart ? (
        <AppStack.Screen name="Loading" component={LoadingScreen} />
      ) : user.isLoggedIn ? (
        user.active ? (
          <>
            <AppStack.Screen name="Main" component={MainStackScreens} />
            <AppStack.Screen name="HouseProfile" component={HouseScreen} />
          </>
        ) : (
          <AppStack.Screen name="Activation" component={ActivationScreens} />
        )
      ) : (
        <AppStack.Screen name="Auth" component={AuthStackScreens} />
      )}
      <AppStack.Screen name="CommonScreens" component={CommonScreens} />
    </AppStack.Navigator>
  );
};

export default AppStackScreens;
export {GoToButton};
