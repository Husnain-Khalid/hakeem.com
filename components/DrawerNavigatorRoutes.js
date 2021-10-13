import React, {useEffect, Component} from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import AddMedicine from '../screens/AddMedicine';
import ViewMedicine from '../screens/ViewMedicine';
import AddDisease from '../screens/AddDisease';
import showMedicine from '../screens/AddDisease';
import hakimProfile from '../screens/hakimProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import hakims from '../screens/hakims';
import RootStackScreen from './RootStackScreen';
import {DrawerContent} from './DrawerContent';
import Updatemed from '../screens/Updatemed';
import FameD from '../screens/FameD';
// const logOut = () => {
//   AsyncStorage.removeItem('userData');
//   navigation.navigate(hakims);
// };
export default function DrawerNavigator() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerContent {...props} />}
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
        name="ViewMedicine"
        component={ViewMedicine}
        options={{
          drawerLabel: 'VIEW MEDICINE',
        }}
      />

      <Drawer.Screen
        name="AddMedicine"
        component={AddMedicine}
        options={{drawerLabel: 'ADD MEDICINE'}}
      />

      <Drawer.Screen
        name="AddDisease"
        component={AddDisease}
        options={{drawerLabel: 'ADD DISEASE'}}
      />
      <Drawer.Screen
        name="showMedicine"
        component={showMedicine}
        options={{drawerLabel: 'ADD DISEASE'}}
      />
      <Drawer.Screen
        name="FameD"
        component={FameD}
        options={{drawerLabel: 'Details'}}
      />
      <Drawer.Screen
        name="Updatemed"
        component={Updatemed}
        options={{drawerLabel: 'UpdateMed'}}
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
