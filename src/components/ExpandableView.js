import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useTheme} from '../context/ThemeManager';
// components
import Text from './Text';

export const ExpandableView = ({styleProp}) => {
  const {theme} = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.tabView,
        },
      ]}>
      <View
        style={[
          styles.header,
          {
            backgroundColor: open ? '#0f0f0f0f' : '#FBFBFB',
            borderBottomLeftRadius: open ? 0 : 10,
            borderBottomRightRadius: open ? 0 : 10,
          },
        ]}>
        <Text>ExpandableView</Text>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => setOpen(!open)}>
          {open ? (
            <Entypo name="chevron-thin-up" size={24} color={theme.text} />
          ) : (
            <Entypo name="chevron-thin-down" size={24} color={theme.text} />
          )}
        </TouchableOpacity>
      </View>
      {open ? (
        <View style={styles.body}>
          <Text>Expanded</Text>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },

  header: {
    display: 'flex',
    borderRadius: 10,
    flexDirection: 'row',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    margin: 10,
  },
});
