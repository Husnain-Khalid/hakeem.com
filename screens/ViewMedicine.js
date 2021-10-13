/** @format */

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  FlatList,
  Alert,
  Image,
  LogBox,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
import CollapsibleList from 'react-native-collapsible-list';
import ActionBar from 'react-native-action-bar';
import IP from '../Ip';
import StarRating from 'react-native-star-rating';
import HeaderComponent from '../components/HeaderComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Item from './Item';
import Updatmed from './Updatemed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import {AccordionList} from 'accordion-collapse-react-native';
import {Separator} from 'native-base';
import Updatemed from './Updatemed';
import {useNavigation} from '@react-navigation/core';

export default class ViewMedicine extends Component {
  constructor(props) {
    super(props);

    LogBox.ignoreAllLogs();
    // state = {
    //   search: '',
    // };

    this.state = {
      dataSource: [],
      delta: '',
      search: '',
      // lastRefresh: Date(Date.now()).toString(),
    };
  }

  demo = async () => {
    const user = await AsyncStorage.getItem('userData');
    console.log('data user data', user);
    const vale = JSON.parse(user);
    console.log('data data', vale);

    this.setState({
      delta: vale,
    });
    // this.setState({data: vale.hid});
    console.log('sodaaaaaaaa', this.state.delta);
  };

  componentDidMount = async () => {
    const user = await AsyncStorage.getItem('userData');
    console.log('data user data', user);
    const vale = JSON.parse(user);
    console.log('data data', vale);

    this.setState({
      delta: vale.id,
    });
    // this.setState({data: vale.hid});

    //let pddata = JSON.parse(user1);
    if (this.state.delta == 1) {
      fetch(IP + 'hakeem/h1join')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataSource: responseJson,
          });
          console.log(this.state.dataSource);
        })
        .catch(error => console.log(error)); //to catch the errors if any
    } else if (this.state.delta == 2) {
      fetch(IP + 'hakeem/h2join')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            dataSource: responseJson,
          });
          console.log(this.state.dataSource);
        })
        .catch(error => console.log(error)); //to catch the errors if any
    }
  };

  Deletemed = item => {
    fetch(IP + 'hakeem/deleteNuskha/' + item, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: item,
        // d_id: Did,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        console.log('response', responseJson);
        console.log('sodaaaaaaadadadadadadadad', item);
        if (typeof responseJson === 'string') {
          Alert.alert('Deleted');

          //navigation.navigate('hakimProfile');
        } else {
          Alert.alert('Not Deleted');
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };

  _head(item) {
    return (
      <Separator bordered style={{alignItems: 'center', height: 50}}>
        <Text style={{fontSize: 18, fontFamily: 'bold'}}>{item.title}</Text>
      </Separator>
    );
  }

  _body = item => {
    return (
      <View style={{padding: 10}}>
        <Text style={{textAlign: 'center'}}>
          <Text style={{fontSize: 18, fontFamily: 'bold'}}>
            {'Ingredients:'}
            {'\n'}
          </Text>
          {'\n'}
          {item.ingredients}
          {'\n'}
          {'\n'}
          <Text style={{fontSize: 18, fontFamily: 'bold'}}>
            {'Prescription: '}
            {'\n'}
          </Text>
          {'\n'}
          {item.prescription}
          <Text style={{fontSize: 18, fontFamily: 'bold'}}>
            {'\n'} {'Disease: '}
            {'\n'}
          </Text>
          {'\n'}
          {item.Dname}
        </Text>
        <Text style={{fontSize: 16}}>
          {' '}
          {'\n'}
          {'Medicine Rating:'}
        </Text>

        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.AverageRate}
          fullStarColor={'orange'}
        />

        <Text style={{fontSize: 16}}>
          {'Hakim'}
          {' Rating:'}
          {'\n'}
        </Text>

        <StarRating
          disabled={true}
          maxStars={5}
          rating={item.Hrating}
          fullStarColor={'orange'}
        />
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate(
              'Updatemed',

              {otherparamKey: item},
            )
          }
          style={styles.signupBtn}
          // style={styles.forgot_button}
        >
          <Text style={styles.loginText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {/* <ScrollView style={styles.container}> */}
        <View>
          <HeaderComponent
            title="View Medicine"
            onPress={() => this.props.navigation.openDrawer()}
          />

          <View>
            <Image
              style={styles.stretch}
              source={require('../assets/unnamed.jpg')}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <AccordionList
            list={this.state.dataSource}
            header={this._head}
            body={this._body}
            keyExtractor={item => `${item.mid}`}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  stretch: {
    marginTop: 10,
    width: 340,
    height: 200,
    left: 10,
    //resizeMode: 'stretch',
  },
  header: {
    width: '100%',
    height: '80%',
    marginTop: 2,
  },

  wrapperCollapsibleList: {
    marginTop: 20,
    marginLeft: 10,
    marginRight: 40,
    overflow: 'hidden',
    backgroundColor: '#FFF',
    borderRadius: 5,
  },
  collapsibleItem: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#CCC',
    padding: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    backgroundColor: '#90ee90',
  },
  searchBar: {
    //  borderWidth: 2,
    fontSize: 24,
    margin: 10,
    width: '90%',
    height: 50,
    backgroundColor: 'white',
  },

  signupBtn: {
    width: '30%',
    // borderRadius: 25,
    height: 45,
    marginLeft: 120,
    alignItems: 'center',
    justifyContent: 'center',
    //marginTop: 5,
    backgroundColor: '#00ffff',
    marginBottom: 10,
  },
});
