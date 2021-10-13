import {NotificationProvider} from 'react-native-internal-notification';
import App from './App';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
const Application = function () {
  return (
    <NotificationProvider>
      <App />
    </NotificationProvider>
  );
};
export default Application;
