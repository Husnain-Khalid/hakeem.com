/** @format */

import React, {Component, useRef} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  alert,
  Alert,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import userS from './userS';
import {Picker} from '@react-native-picker/picker';
import IP from '../Ip';
const UserSignup = ({navigation}) => {
  const [fname, Setname] = React.useState();
  const [uname, Setusername] = React.useState();
  const [upassword, Setpassword] = React.useState();
  const [uage, Setage] = React.useState();

  const [ucity, Setcity] = React.useState();
  const [selectedGender, setSelectedGender] = React.useState();

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const signup = () => {
    fetch(IP + 'user/addUser', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: fname,
        age: uage,
        gender: selectedGender,

        username: uname,
        password: upassword,
        city: ucity,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        if (typeof responseJson === 'string') {
          Alert.alert('signed up successfully');
          navigation.navigate('User');
        } else {
          Alert.alert('Saved');
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image
          style={styles.stretch}
          source={require('../assets/signup2.png')}
        />
      </View>
      <View style={styles.container1}>
        <StatusBar style="auto" />

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Full Name"
            placeholderTextColor="#000000"
            onChangeText={fname => Setname(fname)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Email: example@hakim.com"
            placeholderTextColor="#000000"
            onChangeText={uname => Setusername(uname)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="City"
            placeholderTextColor="#000000"
            onChangeText={ucity => Setcity(ucity)}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Age "
            placeholderTextColor="#000000"
            numeric
            keyboardType={'numeric'}
            onChangeText={uage => Setage(uage)}
            maxLength={2}
          />
        </View>

        <View
          style={{
            flex: 1,
            height: 50,
            width: 280,
            borderWidth: 2,
            borderRadius: 30,
            marginTop: 8,
            marginBottom: 20,
          }}>
          <Picker
            ref={pickerRef}
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedGender(itemValue)
            }>
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#000000"
            secureTextEntry={true}
            onChangeText={upassword => Setpassword(upassword)}
          />
        </View>

        <TouchableOpacity onPress={signup} style={styles.signupBtn}>
          <Text style={styles.loginText}>SIGNUP</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  inputView: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '70%',
    height: 45,
    marginBottom: 20,

    alignItems: 'center',
  },
  stretch: {
    marginTop: 10,
    width: 350,
    height: 120,
    marginLeft: 10,
    //resizeMode: 'stretch',
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 16,
    fontFamily: 'bold',
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

export default UserSignup;
