import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import JoinScreen from './chatscreens/join.js'
import Chatroom from './chatscreens/chatroom.js'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="JoinScreen">
        <Stack.Screen name="JoinScreen" component={JoinScreen} />
        <Stack.Screen name="Chatroom" component={Chatroom} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
