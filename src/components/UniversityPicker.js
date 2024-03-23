'use strict';

import { Picker } from '@react-native-picker/picker';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
// Context
import { UserContext } from '../context/UserContext';
// Data
import universities from '../data/Universities';

//  ! TODO: Add all cities
const UniversityPicker = ({ style }) => {
  const [user, setUser] = useContext(UserContext);
  const [itemValueState, setItemValue] = useState();

  const pickersListArray = universities[user.city].map(
    (obj) => (
      <Picker.Item
        key={obj.key}
        label={obj.label}
        value={obj.value}
      />
    ),
  );

  return (
    <Picker
      selectedValue={itemValueState}
      style={style}
      itemStyle={{
        textAlign: 'center',
        fontFamily: 'Montserrat-Thin',
      }}
      onValueChange={(itemValue, itemIndex) => {
        setUser((state) => ({
          ...state,
          university:
            universities[user.city][itemIndex].label,
        }));
        setItemValue(itemValue);
      }}
    >
      {pickersListArray}
    </Picker>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  divider: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: 2,
    margin: 10,
    width: '95%',
  },

  inside: {
    paddingTop: 10,
  },

  pickerStyle: {
    borderRadius: 50,
  },

  textInput: {
    backgroundColor: '#222222',
    color: '#fff',
    textAlign: 'center',
  },

  titleText: {
    fontSize: 32,
  },
});

export { UniversityPicker };
