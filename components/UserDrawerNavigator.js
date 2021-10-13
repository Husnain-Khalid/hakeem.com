import React, {useEffect, Component} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import hakims from '../screens/hakims';
import RootStackScreen from './RootStackScreen';
import {UserDrawer} from './UserDrawer';
import userProfile from '../screens/userProfile';
import Fame from '../screens/Fame';
import showMedicine from '../screens/showMedicine';
import FameD from '../screens/FameD';
// const logOut = () => {
//   AsyncStorage.removeItem('userData');
//   navigation.navigate(hakims);
// };
export default function UserDrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <UserDrawer {...props} />}
      drawerContentOptions={{
        activeTintColor: 'green',
        color: '#cee1f2',
        itemStyle: {marginVertical: 5, color: 'black'},
        labelStyle: {
          color: 'black',
        },
      }}
      screenOptions={{headerShown: false}}>
      <Drawer.Screen
        name="userProfile"
        component={userProfile}
        options={{
          drawerLabel: 'Profile',
        }}
      />
      <Drawer.Screen
        name="showMedicine"
        component={showMedicine}
        options={{
          drawerLabel: 'Detail',
        }}
      />

      <Drawer.Screen
        name="Fame"
        component={Fame}
        options={{
          drawerLabel: 'Hall of Fame',
        }}
      />
      <Drawer.Screen
        name="FameD"
        component={FameD}
        options={{
          drawerLabel: 'Fdetail',
        }}
      />

      <Drawer.Screen
        name="Hakim"
        component={RootStackScreen}
        // options={{drawerLabel: 'ADD DISEASE'}}
      />

      {/* <Drawer.Screen name="LogOut" options={{drawerLabel: 'ADD DISEASE'}} /> */}
    </Drawer.Navigator>
  );
}
