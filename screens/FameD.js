import React, {useState, componentDidMount, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  SectionList,
  Alert,
  TextInput,
  StatusBar,
  Image,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import UserHeader from '../components/UserHeader';
import IP from '../Ip';

import {Rating, AirbnbRating} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userS from './userS';

export default function FameD({props, navigation, route}) {
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

    // await AsyncStorage.getItem('pData').then(user => {
    //   setUser(user);

    //   console.log('user data asyncstorage', user.uname);
    // });
  });

  // function DATA() {
  //   useEffect(async () => {
  //     if (!user) {
  //       await AsyncStorage.getItem('pData').then(user => setUser(user));
  //       // .catch()
  //     }
  //   }, [user, setUser]);
  //   // console.log('user : ', user);
  // }
  // DATA();
  // console.log('user bahir : ', user);

  // let temp = JSON.parse(user);
  // console.log('user out side: ', temp.uname);

  //const [productName, setproductName] = useState('');
  const [showComment, setShowComment] = useState(false);

  const productName = route.params.paramKey;
  // let datata = JSON.stringify(route.params.paramKey);
  const id = route.params.paramKey.mid;
  const [hrate, setHrate] = useState();
  //   fetchClasses();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  const [count, setCount] = useState(0);
  const ratingCompleted = rating => {
    // let count = 0;
    if (rating <= 3) {
      setCount(count + 0);
    } else if (rating >= 4) {
      setCount(count + 1);
      console.log('count', count);
      if (count == 4) {
        AsyncStorage.setItem('hrating', '1');
      } else if (count == 8) {
        AsyncStorage.setItem('hrating', '2');
      } else if (count == 12) {
        AsyncStorage.setItem('hrating', '3');
      }
    }

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
  // let items = [medid];
  // let itemList = [];
  // items.forEach((item, index) => {
  //   itemList.push(
  //     <Text key={item}>
  //       {items.uname}
  //       {':'} {'\t'} {items.comment}
  //     </Text>,
  //   );
  // });

  const [medid, Setmedid] = useState({});

  const fetchmedstdData = () => {
    // let id = route.params.paramKey.mid;
    fetch(IP + 'user/medstdData/' + id)
      .then(response => response.json())
      .then(list => {
        Setmedid(list);
        console.log('iddddddddddddddddd', id);
        // console.log('testinggggg', medid);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader title="Detail" onPress={() => navigation.openDrawer()} />
      <ScrollView>
        <View style={{padding: 15}}>
          <View style={{alignItems: 'center', alignContent: 'center'}}>
            <Text style={styles.h1}>{productName.title}</Text>
          </View>

          <View>
            <Text style={styles.h2}>
              {'\n'}
              {'Ingredients:'}
            </Text>
          </View>
          <Text style={styles.text}>{productName.ingredients}</Text>
          <View>
            <Text style={styles.h2}>{'Prescription:'}</Text>
          </View>
          <Text style={styles.text}>{productName.prescription}</Text>
          <View>
            <Text style={styles.h2}>{'Disease:'}</Text>
          </View>
          <Text style={styles.text}>{productName.Dname}</Text>

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
            <View></View>
            {/* <Text style={styles.text}>
              <Text>{itemList}</Text>
            </Text> */}
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
