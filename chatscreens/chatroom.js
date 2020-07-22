import React, { Component, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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

const image = { uri: "https://reactjs.org/logo-og.png" };

export default function Chatroom({ navigation }) {
  const [chatContent, setChatcontent] = useState();

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
              <Button title="Gửi" />
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
