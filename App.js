/** @format */

import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import RootStackScreen from './components/RootStackScreen';

import {InAppNotificationProvider} from 'react-native-in-app-notification';

import UserDrawerNavigator from './components/UserDrawerNavigator';
import DrawerNavigatorRoutes from './components/DrawerNavigatorRoutes';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  function Login() {
    const [user, setUser] = useState();
    const [patient, setPatient] = useState();
    useEffect(async () => {
      if (!user) {
        await AsyncStorage.getItem('userData').then(user => setUser(user));
        // .catch()
      }
    }, [user, setUser]);

    useEffect(async () => {
      if (!patient) {
        await AsyncStorage.getItem('pData').then(patient =>
          setPatient(patient),
        );
        // .catch()
      }
    }, [patient, setPatient]);

    if (user) {
      return <DrawerNavigatorRoutes />;
    } else if (patient) {
      console.log('else if', patient);
      return <UserDrawerNavigator />;
    } else {
      return <RootStackScreen />;
    }
  }

  return (
    <InAppNotificationProvider>
      <NavigationContainer>
        <Login />
      </NavigationContainer>
    </InAppNotificationProvider>
  );
}
