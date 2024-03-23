'use strict';

// import normalize from 'react-native-normalize';
// Components
import {Picker} from '@react-native-picker/picker';
import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
// Context
import {useTheme} from '../context/ThemeManager';
import {UserContext} from '../context/UserContext';
// import DropDownPicker from 'react-native-dropdown-picker';
// Data
import universities from '../data/Universities';
// import { CustomPicker } from "./Picker";
import Text from './Text';

//  ! TODO: Add all cities
const Bottom = () => {
  const [user, setUser] = useContext(UserContext);
  // const [city, setCity] = useState(user.city);
  // const [university, setUniversity] = useState();
  const [itemValueState, setItemValue] = useState('none');
  const {theme} = useTheme();

  const pickersListArray = universities[user.city].map(obj => (
    <Picker.Item key={obj.key} label={obj.label} value={obj.value} />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.inside}>
        <Text color={theme.text} title center bold style={styles.titleText}>
          Arama
        </Text>
        <View style={styles.main}>
          <Text color={theme.text} large>
            Üniversiteye göre:
          </Text>
          <View
            style={{
              width: '90%',
              backgroundColor: theme.textInputBackground,
              borderRadius: 25,
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              margin: 10,
            }}>
            <Picker
              mode="dropdown"
              onValueChange={(itemValue, itemIndex) => {
                setUser(state => ({
                  ...state,
                  searchUni: universities[user.city][itemIndex].label,
                }));
                setItemValue(itemValue);
              }}
              selectedValue={itemValueState}
              style={[styles.picker, {color: theme.text}]}>
              {pickersListArray}
            </Picker>
            {/* <Picker
              selectedValue={itemValueState}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) => {
                setItemLabel(universities[user.city][itemIndex].label);
                setUser((state) => ({
                  ...state,
                  searchUni: universities[user.city][itemIndex].label,
                }));
                setItemIndex(itemIndex);
                setItemValue(itemValue);
              }}
            >
              {pickersListArray}
            </Picker> */}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  inside: {
    paddingTop: 10,
  },

  main: {
    alignItems: 'center',
  },

  picker: {
    height: 50,
    margin: 10,
    width: '90%',
  },

  titleText: {
    fontSize: 32,
    marginBottom: 20,
  },
});

export {Bottom};
