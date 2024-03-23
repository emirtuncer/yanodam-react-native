import React from 'react';
import {StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
// components
import Text from './Text';

const Modal = () => (
  <View style={styles.container}>
    <Text>Modal</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: normalize(40),
    width: '100%',
  },
});

export {Modal};
