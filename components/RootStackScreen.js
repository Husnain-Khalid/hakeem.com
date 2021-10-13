import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import hakims from '../screens/hakims';
import userS from '../screens/userS';
import HomeScreen from '../screens/Home';
import hakimProfile from '../screens/hakimProfile';
import userProfile from '../screens/userProfile';
import DrawerNavigator from './DrawerNavigatorRoutes';
import UserSignup from '../screens/UserSignup';
import UserDrawerNavigator from './UserDrawerNavigator';
import showMedicine from '../screens/showMedicine';
import Updatemed from '../screens/Updatemed';

const Stack = createStackNavigator();

export default function RootStackScreen({props, navigation}) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Hakim.Com" component={HomeScreen} />
      <Stack.Screen name="User" component={userS} />
      <Stack.Screen name="Sign Up" component={UserSignup} />
      <Stack.Screen name="Hakim" component={hakims} />

      <Stack.Screen name="Updatemed" component={Updatemed} />
      <Stack.Screen name="ViewMedicine" component={DrawerNavigator} />

      <Stack.Screen
        name="hakimProfile"
        component={hakimProfile}
        options={{title: 'Profile'}}
      />
      <Stack.Screen name="showMedicine" component={showMedicine} />
      <Stack.Screen
        name="userProfile"
        component={UserDrawerNavigator}
        options={{title: 'Profile'}}
      />
    </Stack.Navigator>
  );
}
