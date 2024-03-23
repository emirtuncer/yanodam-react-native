/* eslint-disable no-undef */
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {LogBox, Appearance} from 'react-native';
import {FirebaseProvider} from './src/context/FirebaseContext';
import {SettingsProvider} from './src/context/SettingsContext';
import {ThemeManager} from './src/context/ThemeManager';
import {UserProvider} from './src/context/UserContext';
import AppStack from './src/navigation/AppStack';
import {DarkTheme, LightTheme} from './src/styles/AppTheme';

LogBox.ignoreLogs(['Setting a timer', 'Require cycle']);

export default App = () => {
  const colorScheme = Appearance.getColorScheme();

  return (
    <ThemeManager>
      <FirebaseProvider>
        <UserProvider>
          <SettingsProvider>
            <NavigationContainer
              theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
              <AppStack />
            </NavigationContainer>
          </SettingsProvider>
        </UserProvider>
      </FirebaseProvider>
    </ThemeManager>
  );
};
