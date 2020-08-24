import React, { Component, useState,useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as firebase from 'firebase';
import AsyncStorage from '@react-native-community/async-storage';
//asdasdsa
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
} from "react-native";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

var firebaseConfig = {
  apiKey: "AIzaSyAW8Cm5ZoHCXdGPRPV_1oydF5Yh6iSOV0E",
  authDomain: "chatrn-2c1f7.firebaseapp.com",
  databaseURL: "https://chatrn-2c1f7.firebaseio.com",
  projectId: "chatrn-2c1f7",
  storageBucket: "chatrn-2c1f7.appspot.com",
  messagingSenderId: "1089397243122",
  appId: "1:1089397243122:web:69ef9277c8dd3ac987246b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default function Chatroom({ navigation }) {
  const [name, setName] = useState();
  const [chatContent, setChatcontent] = useState();

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
            <Text>Chat</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "gray",
              alignContent: "flex-end",
              flex: 1 / 10,
            }}
          >
            <TextInput
              style={{
                //backgroundColor: "red",
                fontSize: 24,
                marginHorizontal: 5,
                marginTop: 5,
                width: 350,
                flex: 8 / 10,
              }}
              onChangeText={setChatcontent}
            />
            <View
              style={{
                flex: 2 / 10,
                marginTop: 15,
              }}
            >
              <Button title="Gửi" onPress={getData} />
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
