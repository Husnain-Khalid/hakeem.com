/** @format */

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
import hakimProfile from './hakimProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../Ip';
import loginlogo from '../assets/loginlogo.png';
import DrawerNavigator from '../components/DrawerNavigatorRoutes';
import ViewMedicine from './ViewMedicine';

export default function hakims({navigation}) {
  const [hakimname, Sethakimname] = React.useState('');
  const [password, Setpassword] = React.useState('');

  const login = () => {
    //  if (hakimname && password) {
    fetch(IP + 'hakeem/hakimLogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hakimname: hakimname,
        password: password,
      }),
    })
      //if(response && Array.isArray(response))
      .then(responseJson => responseJson.json())
      .then(async responseJson => {
        if (typeof responseJson === 'string') {
          alert('Invalid Cradentials');
        } else {
          console.log('Hakeem login :', responseJson);
          let userdata = {
            id: responseJson.hid,
            gender: responseJson.gender,
            name: responseJson.hakimname,
          };
          console.log('userData : ', userdata);
          await AsyncStorage.setItem('userData', JSON.stringify(userdata));

          let data = await AsyncStorage.getItem('userData');
          console.log('data : ', data);

          navigation.navigate(ViewMedicine);
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={loginlogo} />

      <StatusBar style="auto" />
      <View style={styles.inputView}>
        <Input
          style={styles.TextInput}
          placeholder="Email"
          leftIcon={<Icon name="mail" size={24} color="black" />}
          onChangeText={hakimname => Sethakimname(hakimname)}
        />
      </View>

      <View style={styles.inputView}>
        <Input
          style={styles.TextInput}
          placeholder="Password."
          placeholderTextColor="#003f5c"
          leftIcon={<Icon name="lock" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={password => Setpassword(password)}
        />
      </View>

      <TouchableOpacity onPress={login} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    borderRadius: 30,
    borderColor: 'black',
    //borderWidth: 2,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: '30%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#00ffff',
  },
});
