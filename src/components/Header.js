import React from 'react';
import {StyleSheet, View} from 'react-native';
import normalize from 'react-native-normalize';
import Text from './Text';

const Header = () => {
  return (
    <View style={styles.container}>
      <Text>Header</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: normalize(40),
    width: '100%',
  },
});

export {Header};
