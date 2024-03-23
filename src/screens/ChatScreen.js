import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Text from './../components/Text';

const ChatScreen = () => {
  const navigation = useNavigation();

  const person = {
    name: 'Emir',
    isWriting: 'false',
  };

  const message = {
    text: 'Naber yavrum? ;)',
    me: true,
  };

  const message2 = {
    text: 'Iyi sendenn? ;)',
    me: false,
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Entypo
          name="chevron-left"
          size={31}
          color="#fff"
        />
      </TouchableOpacity>
      <View style={styles.person}>
        <Image style={styles.personImg} />
        <Text bold color="#fff">
          {person.name}
        </Text>
      </View>
      <View style={styles.divider} />
      <ScrollView style={styles.main}>
        <View style={styles.message}>
          {message.me ? (
            <View style={styles.myMessage}>
              <Text light color="#fff">
                Me:{' '}
                {
                  <Text large thin color="#fff">
                    {message.text}
                  </Text>
                }
              </Text>
            </View>
          ) : (
            <View>
              <Text style={styles.otherSideMessage}>
                You:{' '}
                {
                  <Text large thin color="#fff">
                    {message.text}
                  </Text>
                }
              </Text>
            </View>
          )}
        </View>
        <View style={styles.message}>
          {message2.me ? (
            <View style={styles.myMessage}>
              <Text light color="#fff">
                Me:{' '}
                {
                  <Text large thin color="#fff">
                    {message2.text}
                  </Text>
                }
              </Text>
            </View>
          ) : (
            <View style={styles.otherSideMessage}>
              {
                <Text large thin color="#fff">
                  {message2.text}
                  {
                    <Text
                      color="#fff"
                      style={styles.otherSideMessage}
                    >
                      {'  '}:You
                    </Text>
                  }
                </Text>
              }
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181818',
  },

  goBackButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },

  divider: {
    width: '95%',
    backgroundColor: '#282828',
    height: 1,
    margin: 10,
  },

  myMessage: {
    alignSelf: 'flex-start',
    marginTop: 10,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 10,
  },

  otherSideMessage: {
    alignSelf: 'flex-end',
    marginTop: 10,
    backgroundColor: '#121212',
    borderRadius: 10,
    padding: 10,
  },

  main: {
    padding: 10,
  },

  person: {
    alignSelf: 'center',
    width: '96%',
    height: 70,
    backgroundColor: '#282828',
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    paddingLeft: 10,
  },

  personImg: {
    width: 50,
    backgroundColor: '#2F3136',
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default ChatScreen;
