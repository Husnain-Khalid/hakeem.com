/** @format */

import React, {Component, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StatusBar,
  Button,
  alert,
  Alert,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import IP from '../Ip';
import {Picker} from '@react-native-picker/picker';

export default function AddMedicine({navigation}) {
  const [selectedLanguage, setSelectedLanguage] = useState();
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  const [ftitle, Settitle] = React.useState();
  const [uprescription, Setpres] = React.useState();
  const [uingredients, Setingredients] = React.useState();
  const [mData, setMData] = React.useState([]);

  const [user, setUser] = useState();

  useEffect(async () => {
    try {
      let hdata = await AsyncStorage.getItem('userData');
      let parsed = JSON.parse(hdata);
      setUser(parsed);
    } catch (error) {
      Alert.alert(error);
    }
  });

  const AddMedi = () => {
    fetch(IP + 'hakeem/addMedicine', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: ftitle,
        prescription: uprescription,
        ingredients: uingredients,
        Dname: selectedLanguage,
        h_id: user.id,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        if (typeof responseJson === 'string') {
          Alert.alert('Medicine Added');
          clearForm();
        } else {
          Alert.alert(' Not Saved');
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };
  const clearForm = () => {
    Settitle('');
    Setingredients('');
    Setpres('');
  };
  useEffect(() => {
    fetch(IP + 'hakeem/Alldisease')
      .then(response => response.json())
      .then(responseJson => {
        setMData(responseJson);
        console.log(mData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <HeaderComponent
          title="Add Medicine"
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <ScrollView>
        <View style={styles.container1}>
          <View>
            <Image
              style={styles.stretch}
              source={require('../assets/medicine.jpg')}
            />
          </View>

          <View
            style={{
              flex: 1,
              height: 50,
              width: 280,
              borderWidth: 2,
              borderRadius: 30,
              marginTop: 10,
              alignContent: 'center',
            }}>
            <Picker
              style={{fontSize: 18}}
              // ref={pickerRef}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              {mData.map((item, key) => (
                <Picker.Item
                  style={{fontSize: 18}}
                  value={item.Dname}
                  label={item.Dname}
                  key={item.Did}
                />
              ))}
            </Picker>
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={ftitle}
              placeholder="Medicine Name"
              placeholderTextColor="#000000"
              onChangeText={ftitle => Settitle(ftitle)}
            />
          </View>

          <View style={styles.inputView1}>
            <TextInput
              style={{fontSize: 18}}
              multiline
              numberOfLines={4}
              value={uingredients}
              //style={styles.TextInput1}

              placeholder="Ingredients "
              placeholderTextColor="#000000"
              onChangeText={uingredients => Setingredients(uingredients)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Prescription"
              value={uprescription}
              placeholderTextColor="#000000"
              onChangeText={uprescription => Setpres(uprescription)}
            />
          </View>

          <TouchableOpacity onPress={AddMedi} style={styles.signupBtn}>
            <Text style={styles.loginText}>Add</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
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
  },
  inputView: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '77%',
    height: 45,
    marginBottom: 20,
    marginTop: 10,

    alignItems: 'center',
  },
  inputView1: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '77%',
    height: 200,
    marginBottom: 20,
    fontSize: 20,
    alignItems: 'center',
  },
  stretch: {
    width: 300,
    height: 160,
    //resizeMode: 'stretch',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontSize: 20,
    marginLeft: 20,
  },
  TextInput1: {
    height: 200,
    flex: 1,
    padding: 10,
    margin: 12,
    fontSize: 18,
    marginLeft: 20,
  },
  signupBtn: {
    width: '30%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 5,
    backgroundColor: '#00ffff',
    marginBottom: 10,
  },
});
