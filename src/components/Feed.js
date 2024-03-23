import React, {useState} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from '../context/ThemeManager';
import Text from './Text';

const Feed = ({data, containerStyle}) => {
  const [feedIndex, setFeedIndex] = useState(0);
  const {theme} = useTheme();

  return (
    <View style={containerStyle ? containerStyle : styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={{}}>
        <ImageBackground
          source={{
            uri: data[feedIndex]['profilePhotoUrl'],
          }}
          style={styles.postProfilePhoto}>
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: 'rgba(0,0,0, 0.92)',
              width: '100%',
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            {data[feedIndex]['displayName'] ? (
              <Text bold large center color={theme.text}>
                {data[feedIndex]['displayName']}
              </Text>
            ) : (
              <Text bold large center color={theme.text}>
                {data[feedIndex]['username']}
              </Text>
            )}

            {data[feedIndex]['university'] ? (
              <Text bold large center color={theme.text}>
                {data[feedIndex]['university']}
              </Text>
            ) : (
              <Text />
            )}
          </View>
        </ImageBackground>

        <View style={styles.bottom}>
          <View style={styles.buttonBg}>
            {feedIndex + 1 == data.length ? (
              <Text color="#282828">Next user</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFeedIndex(feedIndex + 1);
                }}>
                <Text color={theme.text}>Next user</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonBg}>
            <Text center color={theme.text}>
              {feedIndex}
            </Text>
          </View>

          <View style={styles.buttonBg}>
            {feedIndex - 1 == -1 ? (
              <Text color="#282828">Previous user</Text>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setFeedIndex(feedIndex - 1);
                }}>
                <Text color={theme.text}>Previous user</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  buttonBg: {
    alignItems: 'center',
    backgroundColor: '#0F0F0F',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },

  container: {
    alignSelf: 'center',
    backgroundColor: '#282828',
    flex: 1,
    height: '80%',
    justifyContent: 'center',
    width: '95%',
  },

  postProfilePhoto: {
    aspectRatio: 1,
    backgroundColor: '#242424',
    justifyContent: 'flex-end',
    marginBottom: 10,
    resizeMode: 'cover',
    width: '100%',
  },
});

export {Feed};
