import React, { useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { useTheme } from '../context/ThemeManager';

const ImageViewScreen = ({ navigation, route }) => {
  const [imageSource, setImageSource] = useState(
    route.params.imageSource,
  );
  const { theme } = useTheme();

  useEffect(() => {
    setImageSource(route.params.imageSource);
    return () => {
      setImageSource('');
    };
  }, [route]);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.background18 },
      ]}
    >
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo
          name="chevron-left"
          size={31}
          color={theme.text}
        />
      </TouchableOpacity>

      <View style={styles.main}>
        <Image
          style={{
            backgroundColor: theme.profilePhotoContainer,
            width: '100%',
            aspectRatio: 1,
            resizeMode: 'cover',
          }}
          source={{
            uri: imageSource,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  goBackButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  main: {
    justifyContent: 'center',
    alignContent: 'center',
  },
});

export default ImageViewScreen;
