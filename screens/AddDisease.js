/** @format */

import React, {Component} from 'react';
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
  TextInput,
  Image,
} from 'react-native';
import IP from '../Ip';
import HeaderComponent from '../components/HeaderComponent';
//import medicine from '../assets/medicine.jpg';

export default function AddDisease({navigation}) {
  const [dName, Setname] = React.useState();
  const [dsymp, Setsymp] = React.useState();
  const [Did, SetDid] = React.useState();

  const AddDis = () => {
    fetch(IP + 'hakeem/addDisease', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Dname: dName,
        symp: dsymp,
        // d_id: Did,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        if (typeof responseJson === 'string') {
          Alert.alert('Disease Added');
          clearForm();
        } else {
          Alert.alert('Saved');
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };

  const clearForm = () => {
    Setname('');
    Setsymp('');
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.container1}>
        <StatusBar style="auto" />
        <View>
          <HeaderComponent
            title="Add Disease"
            onPress={() => navigation.openDrawer()}
          />
        </View>
        <View>
          <Image
            style={styles.stretch}
            source={require('../assets/Dis1.jpg')}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            value={dName}
            placeholder="Disease Name"
            placeholderTextColor="#000000"
            onChangeText={dName => Setname(dName)}
          />
        </View>

        <View style={styles.inputView1}>
          <TextInput
            style={{fontSize: 20}}
            multiline
            numberOfLines={4}
            value={dsymp}
            placeholder="Symptoms "
            placeholderTextColor="#000000"
            onChangeText={dsymp => Setsymp(dsymp)}
          />
        </View>

        <TouchableOpacity style={styles.signupBtn} onPress={AddDis}>
          <Text style={styles.loginText}>Add</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

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
    // marginTop: 2,
  },
  inputView: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '70%',
    height: 50,
    marginBottom: 20,
    marginTop: 20,

    alignItems: 'center',
  },
  inputView1: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '70%',
    height: 200,
    // marginBottom: 20,

    alignItems: 'center',
  },
  stretch: {
    width: 300,
    height: 200,
    marginTop: 10,
    //resizeMode: 'stretch',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
    fontSize: 20,
  },
  TextInput1: {
    height: 200,
    flex: 0.5,
    padding: 10,
    margin: 12,
    marginLeft: 20,
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
