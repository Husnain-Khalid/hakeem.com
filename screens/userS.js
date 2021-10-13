/** @format */

import React, {
  Component,
  componentDidMount,
  getData,
  useEffect,
  useState,
} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userProfile from './userProfile';
import loginlogo from '../assets/loginlogo.png';
import IP from '../Ip';
export default function userS({navigation}) {
  const [username, Setusername] = React.useState('');
  const [password, Setpassword] = React.useState('');

  const signin = () => {
    fetch(IP + 'user/userlogin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(async responseJson => {
        if (typeof responseJson === 'string') {
          alert('Invalid Cradentials');
        } else {
          let patient = {
            id: responseJson.id,
            uname: responseJson.name,
          };
          await AsyncStorage.setItem('pData', JSON.stringify(patient));
          console.log(patient);

          navigation.navigate('userProfile');
        }
      })

      .catch(error => {
        console.log('Api call error');
        alert(error.message);
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
          // placeholderTextColor="#003f5c"
          onChangeText={username => Setusername(username)}
        />
      </View>

      <View style={styles.inputView}>
        <Input
          style={styles.TextInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          leftIcon={<Icon name="lock" size={24} color="black" />}
          secureTextEntry={true}
          onChangeText={password => Setpassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={signin} style={styles.loginBtn}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Sign Up')}
        style={styles.forgot_button}>
        <Text style={styles.loginText}>SIGNUP</Text>
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
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    backgroundColor: '#00ffff',
  },
  signupBtn: {
    width: '30%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    backgroundColor: '#00ffff',
  },
});
