import React, {useEffect, Component} from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
//import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootStackScreen from './RootStackScreen';
import hakims from '../screens/hakims';

const HeaderComponent = ({title, onPress, navigation}) => {
  // const removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem('userData');
  //     // console.log(userData);
  //     navigation.navigate(hakims);
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   // console.log('Done.');
  // };

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          height: 60,
          paddingHorizontal: '4%',
        }}>
        <TouchableOpacity onPress={onPress}>
          <Icon name="menu" size={35} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 0.5,
    // width: '100%',
    //  height: '40%',
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    right: 120,
    fontSize: 22,
    color: '#fff',
  },
  headerText1: {
    fontSize: 16,
    color: '#fff',
  },
  stretch: {
    width: 45,
    height: 30,
    //resizeMode: 'stretch',
  },
});
export default HeaderComponent;
