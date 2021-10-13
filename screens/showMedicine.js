import React, {useState, componentDidMount, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  Alert,
  TextInput,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import UserHeader from '../components/UserHeader';
import IP from '../Ip';

import {Rating, AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userS from './userS';

export default function showMedicine({props, navigation, route}) {
  const [user, setUser] = useState([]);

  useEffect(async () => {
    try {
      let user1 = await AsyncStorage.getItem('pData');
      let parsed = JSON.parse(user1);
      setUser(parsed);
      // console.log('user', user.uname);
    } catch (error) {
      alert(error);
    }
  });

  const id = route.params.paramKey.mid;

  const ratingCompleted = rating => {
    Setrat(rating);
  };

  const [rat, Setrat] = useState();
  const [com, Setcom] = React.useState();
  const [name, Setname] = React.useState();

  const AddRating = () => {
    fetch(IP + 'hakeem/addrating', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        m_id: productName.mid,
        uname: user.uname,

        comment: com,
        rate: rat,
        hk_id: productName.hid,
      }),
    })
      .then(responseJson => responseJson.json())
      .then(responseJson => {
        console.log('rated???', responseJson);
        if (typeof responseJson === 'string') {
          Alert.alert('Thank you for rating :)');
          clearForm();
        } else {
          Alert.alert('Rating updated ');
          console.log('user data', user.uname);
          clearForm();
        }
      })
      .catch(error => {
        console.log('Api call error');
        Alert.alert(error.message);
      });
  };
  const clearForm = () => {
    Setcom('');
  };

  useEffect(() => {
    fetchmedstdData();
    // fetchrat();
    console.log('param key data', productName);
    //console.log('param key stringify data', {datata});
  }, []);

  const [ratt, setratt] = useState({});
  const fetchrat = () => {
    fetch(IP + 'hakeem/allrating')
      .then(response => response.json())
      .then(list => {
        // console.log('ratttt', list);
        setratt(list);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const [medid, Setmedid] = useState({});

  const fetchmedstdData = () => {
    // let id = route.params.paramKey.mid;
    fetch(IP + 'user/medstdData/' + id)
      .then(response => response.json())
      .then(list => {
        Setmedid(list);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader
        title="Medicine Detail"
        onPress={() => navigation.openDrawer()}
      />
      <ScrollView>
        <View style={{padding: 15}}>
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Text style={styles.h1}>{productName.title}</Text>
          </View>

          <View>
            <Text style={styles.h2}>
              {'\n'}
              {'Ingredients:'}
              {'\n'}
            </Text>
          </View>
          <Text style={styles.text}>{productName.ingredients}</Text>
          <View>
            <Text style={styles.h2}>
              {' '}
              {'\n'}
              {'Prescription:'}
              {'\n'}
            </Text>
          </View>
          <Text style={styles.text}>{productName.prescription}</Text>
          <View>
            <Text style={styles.h2}>
              {' '}
              {'\n'}
              {'Disease:'}
              {'\n'}
            </Text>
          </View>
          <Text style={styles.text}>{productName.Dname}</Text>
          <View>
            <Text style={styles.h2}>
              {' '}
              {'\n'}
              {'Symptoms:'}
              {'\n'}
            </Text>
          </View>
          <Text style={styles.text}>{productName.symp}</Text>
          <View>
            <Text style={styles.h3}>
              {' '}
              {'\n'}
              {'Medicine By:'}
              {'\t'}
              <Text style={styles.text}>
                {'Hakim'} {'\t'}
                {productName.name}
                {'\n'}
                {'Rating: '}
              </Text>
            </Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={productName.Hrating}
              fullStarColor={'orange'}
            />
          </View>
          <View>
            <Text style={styles.h2}>
              {' '}
              {'\n'}
              {'Reviews:'}
              {'\n'}
            </Text>
          </View>

          <View>
            <View></View>

            <FlatList
              style={styles.root}
              data={medid}
              //extraData={productName}
              ItemSeparatorComponent={() => {
                return <View style={styles.separator} />;
              }}
              keyExtractor={item => {
                return item.medid;
              }}
              renderItem={item => {
                const Notification = item.item;
                return (
                  <View style={styles.container}>
                    <View style={styles.content}>
                      <View style={styles.contentHeader}>
                        <Text style={styles.name}>
                          {'User Name: '}
                          {Notification.uname}
                        </Text>
                        {/* <Text style={styles.time}>9:58 am</Text> */}
                      </View>
                      <Text>
                        {' '}
                        {'Comment: '}
                        {Notification.comment}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>

          <View>
            <Text style={styles.h2}>
              {' '}
              {'\n'}
              {'     Please Rate:'}
              {'\n'}
            </Text>
            <AirbnbRating
              count={5}
              reviews={['', '', '', '', '']}
              defaultRating={0}
              size={30}
              onFinishRating={ratingCompleted}
            />
            <View style={styles.inputView1}>
              <TextInput
                style={{fontSize: 20}}
                multiline
                numberOfLines={4}
                value={com}
                //style={styles.TextInput1}
                placeholder="Comment about medicine.... "
                placeholderTextColor="#000000"
                onChangeText={com => Setcom(com)}
              />
            </View>
            <View>
              <TouchableOpacity onPress={AddRating} style={styles.signupBtn}>
                <Text style={styles.loginText}>Comment</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    //backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  title: {
    color: 'blue',
    fontSize: 23,
    color: '#000000',
  },
  welcome: {
    width: '100%',
    fontFamily: 'times new roman',
    fontSize: 49,
    textAlign: 'center',
    color: 'black',
  },
  welcomecolor: {
    backgroundColor: '#4CAF50',
    width: '100%',
    textAlign: 'center',
    marginBottom: 20,
    //marginTop:-50,
    height: 130,
    padding: 15,
    borderBottomRightRadius: 100,
    borderBottomLeftRadius: 100,
  },
  text: {
    fontSize: 20,
  },
  h1: {
    fontSize: 28,
    alignContent: 'center',
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,

    fontWeight: 'bold',
  },
  h3: {
    fontSize: 18,

    fontWeight: 'bold',
  },
  buttonStyle: {
    backgroundColor: '#007AFF',
    color: '#FFFFFF',
    alignItems: 'center',
    borderRadius: 3,
    marginTop: 15,
    width: 115,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  logoutBtn: {
    backgroundColor: '#4CAF50',
    padding: 5,
    width: '100%',
    //borderRadius: 5,
    alignSelf: 'flex-end',
    //marginRight:16,
    //marginTop:-23,
  },
  LbtnTxt: {
    fontSize: 18,
    alignSelf: 'flex-end',
    color: 'white',
  },
  inputView1: {
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 2,
    width: '70%',
    height: 200,
    marginBottom: 20,
    fontSize: 20,
    marginLeft: 50,
    // alignItems: 'center',
  },
  signupBtn: {
    width: '30%',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 50,
    marginBottom: 20,
    //marginTop: 5,
    backgroundColor: '#00ffff',
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item1: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },

  root: {
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  container1: {
    paddingLeft: 19,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  content: {
    marginLeft: 16,
    flex: 1,
  },
  contentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginLeft: 20,
  },
  time: {
    fontSize: 11,
    color: '#808080',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
