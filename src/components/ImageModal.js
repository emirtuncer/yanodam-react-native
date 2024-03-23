import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../context/ThemeManager';
import Text from './Text';

const ImageModal = ({photo}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const [profilePhoto] = useState(photo);

  return (
    <View style={styles.container}>
      <Text color={theme.text}>Modal</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ImageModal;
