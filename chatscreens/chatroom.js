<<<<<<< HEAD
import React, { Component, useState,useEffect } from "react";
=======
import React, { Component, useState, useEffect } from "react";
>>>>>>> b3a2972df147ad538f5b254a7b4b339b0f770bf7
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';

import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Image,
  ImageBackground,
  ScrollView
} from "react-native";
import AsyncStorage from '@react-native-community/async-storage';


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import * as firebase from 'firebase';
// import { ScrollView } from "react-native-gesture-handler";

const firebaseConfig = {
  apiKey: "AIzaSyAW8Cm5ZoHCXdGPRPV_1oydF5Yh6iSOV0E",
  authDomain: "chatrn-2c1f7.firebaseapp.com",
  databaseURL: "https://chatrn-2c1f7.firebaseio.com",
  projectId: "chatrn-2c1f7",
  storageBucket: "chatrn-2c1f7.appspot.com",
  messagingSenderId: "1089397243122",
  appId: "1:1089397243122:web:69ef9277c8dd3ac987246b"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const LineChat = (props) => (
  <View style={{ backgroundColor: 'gray', borderRadius: 10, margin: 5 }}>
    <Text style={{ fontSize: 12, margin: 5, color: '#00bfff' }}>{props.userName}</Text>
    <Text style={{ fontSize: 24, margin: 5 }} >{props.chatContent}</Text>
  </View>
)

export default function Chatroom({ navigation }) {
  const [name, setName] = useState();
  const [chatContent, setChatcontent] = useState();
  const [userName, setUsername] = useState();
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState();

  useEffect(() => {
    getData();
    firebase.database().ref('chatroom/').on('value', (snapshot) => {
      if (snapshot.val() !== undefined && snapshot.val() !== null) {
        setData(
          Object.values(snapshot.val())
          //[...data, { username: Object.values(snapshot.val()) , chatContent: Object.values(snapshot.val().chatContent) }]
        )
      }
    });
    console.log(data)
    setRefresh(false)
  }, [refresh]);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name')
      if (value !== null) {
        setUsername(value)
      }
    } catch (e) {
      // error reading value
    }
  }

  const renderLine = (item) => {
    if (item.userName === userName) {
      return (
        <View style={{ alignItems: 'flex-end' }} >
          <LineChat userName="YOU" chatContent={item.chatContent} />
        </View>
      );
    }
    return (
      <LineChat userName={item.userName} chatContent={item.chatContent} />
    );
  }

  function storeChat(userName, chatContent) {
    firebase.database().ref('chatroom/').push({
      userName: userName,
      chatContent: chatContent,
    });
  }

  _renderChatLine = (item) => {
    if (item.userName === this.state.username) {
      return (
        <View style={{ alignItems: 'flex-end' }} >
          <LineChat userName="YOU" chatContent={item.chatContent} />
        </View>
      );
    }
    return (
      <LineChat userName={item.userName} chatContent={item.chatContent} />
    );
  };


  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('name')
      if(value !== null) {
        setName(value)
        //console.log(value)
      }
    } catch(e) {
      // error reading value
    }
  }

  function storeHighScore(userId, score) {
    firebase.database().ref('chatroom/' + userId).set({
      highscore: score
    });
  }

  useEffect(() => {
    firebase.database().ref('chatroom/' ).on('value', (snapshot) => {
      const chatroom = snapshot.val().chatroom;
      console.log("New high score: " + chatroom);
    });
  }, [])

  function setupHighscoreListener() {
    firebase.database().ref('chatroom/' ).on('value', (snapshot) => {
      const chatroom = Object.values( snapshot.val())
      console.log("New high score: " + chatroom);
    });
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexDirection: "column", flex: 1 }}>
          <View style={{ flex: 9 / 10 }}>
            <ScrollView style={{ flex: 1 }}>
              {
                data.map((item) => {
                  if (item.userName === userName) {
                    return (
                      <View style={{ alignItems: 'flex-end' }} >
                        <LineChat userName="YOU" chatContent={item.chatContent} />
                      </View>
                    );
                  }
                  return (
                    <View style={{ alignItems: 'flex-start' }} >
                      <LineChat userName={item.userName} chatContent={item.chatContent} />
                    </View>
                  );
                })
              }
            </ScrollView>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "skyblue",
              alignContent: "flex-end",
              flex: 1 / 10,
            }}
          >
            <TextInput
              style={{
                fontSize: 24,
                marginHorizontal: 5,
                marginTop: 5,
                width: 350,
                flex: 8 / 10,
              }}
              value={chatContent}
              onChangeText={setChatcontent}
            />
            <View
              style={{
                flex: 2 / 10,
                marginTop: 15,
              }}
            >
              <Button title="Gửi" onPress={() => {
                scrollToEnd({animated: true})
                getData();
                storeChat(userName, chatContent)
                setRefresh(true)
                setChatcontent("")
              }} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "space-around",
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12,
  },
});
