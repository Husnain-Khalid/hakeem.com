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
  DevSettings,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../components/HeaderComponent';
import IP from '../Ip';
import {Picker} from '@react-native-picker/picker';

export default function Updatemed({navigation, route}) {
  const [selecteddisease, setselecteddisease] = useState();
  const pickerRef = useRef();

  const Detail = route.params.otherparamKey;

  const [ftitle, Settitle] = React.useState();
  const [uprescription, Setpres] = React.useState();
  const [uingredients, Setingredients] = React.useState();
  const [mData, setMData] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState();
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
    fetch(IP + 'hakeem/modifyNuskha', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mid: Detail.mid,
        title: ftitle,
        prescription: uprescription,

        ingredients: uingredients,
        // Dname: selecteddisease,
        Dname: selectedLanguage,
        h_id: user.id,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        if (typeof responseJson === 'string') {
          Alert.alert(' Not Saved');
        } else {
          Alert.alert('Medicine Updated');
          navigation.navigate('ViewMedicine');
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };

  useEffect(() => {
    fetch(IP + 'hakeem/Alldisease')
      .then(response => response.json())
      .then(responseJson => {
        setMData(responseJson);
        console.log('disease', mData);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    // <ScrollView style={styles.container}>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View>
        <HeaderComponent
          title="Update"
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <ScrollView>
        <View style={styles.container1}>
          <Text style={{fontSize: 16}}> Disease Name:</Text>

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

          <Text style={{fontSize: 16}}> Medicine Name:</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Medicine Name"
              placeholderTextColor="#000000"
              defaultValue={Detail.title}
              onChangeText={ftitle => Settitle(ftitle)}
            />
          </View>
          <Text style={{fontSize: 16}}> Ingredients:</Text>
          <View style={styles.inputView1}>
            <TextInput
              style={{fontSize: 18}}
              multiline
              numberOfLines={4}
              //style={styles.TextInput1}

              placeholder="Ingredients "
              placeholderTextColor="#000000"
              defaultValue={Detail.ingredients}
              onChangeText={uingredients => Setingredients(uingredients)}
            />
          </View>
          <Text style={{fontSize: 16}}> Prescription:</Text>
          <View style={styles.inputView1}>
            <TextInput
              style={styles.TextInput}
              multiline
              numberOfLines={4}
              placeholder="Prescription"
              placeholderTextColor="#000000"
              defaultValue={Detail.prescription}
              onChangeText={uprescription => Setpres(uprescription)}
            />
          </View>

          <TouchableOpacity onPress={AddMedi} style={styles.signupBtn}>
            <Text style={styles.loginText}>UPDATE</Text>
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
    marginBottom: 10,
    marginTop: 5,

    alignItems: 'center',
  },
  inputView1: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '77%',
    height: 200,
    marginBottom: 10,
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
