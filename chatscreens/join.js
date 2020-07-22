import { StatusBar } from "expo-status-bar";
import React, { Component, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { TextInput } from "react-native-gesture-handler";

export default function JoinScreen({ navigation }) {
    const [name, setName] = useState();


  return (
    <View>
      <Text style={{margin:10}} >Enter your name : </Text>
      <TextInput style={{ fontSize: 24, borderWidth: 1, marginHorizontal: 5 }}  placeholder= "user name" onChangeText={setName} />
      <Button
        title="JOIN NOW"
        onPress={() => {
          navigation.navigate("Chatroom");
        }}
      />
    </View>
  );
}
