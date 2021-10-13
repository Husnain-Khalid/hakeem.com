/** @format */

import React, {
  useState,
  useCallback,
  commponentDidMount,
  useEffect,
} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  FlatList,
  StyleSheet,
  Text,
  LogBox,
  StatusBar,
  Alert,
  RefreshControl,
  TouchableHighlight,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DataTable} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchComponent from '../components/search';
import StarRating from 'react-native-star-rating';
import {Rating, AirbnbRating} from 'react-native-ratings';
import IP from '../Ip';
import Icon from 'react-native-vector-icons/AntDesign';
import {Input} from 'react-native-elements';
import UserHeader from '../components/UserHeader';

import {withInAppNotification} from 'react-native-in-app-notification';

import Application from '../Application';

function userProfile(props, navigation) {
  const [search, setSearch] = useState('');
  const [medicineData, setMedicineData] = useState('');
  const [ratt, setratt] = useState();
  useEffect(() => {
    fetchMedicine();
    fetchrat();
  }, []);
  LogBox.ignoreAllLogs();
  //////////////////////  REFRESH
  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  /////////////////////////// END

  const fetchMedicine = async () => {
    await fetch(IP + 'hakeem/medjoin')
      .then(response => response.json())
      .then(list => {
        setMedicineData(list);
        setAllfiltered(list);
        // console.log('listdata', list);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const fetchrat = async () => {
    await fetch(IP + 'user/countingId')
      .then(response => response.json())
      .then(list => {
        //console.log('ratttt', list);
        setratt(list);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          // paddingVertical: 20,
          backgroundColor: 'black',
        }}
      />
    );
  };
  const showItems = ({item}) => (
    <DataTable>
      <DataTable.Row style={styles.rowstudent}>
        <DataTable.Cell>{item.title}</DataTable.Cell>
        <DataTable.Cell>{item.ingredients}</DataTable.Cell>
        <DataTable.Cell>{item.prescription}</DataTable.Cell>

        <TouchableOpacity
          style={styles.stucomplaintBtn}
          onPress={() =>
            props.navigation.navigate('showMedicine', {
              paramKey: item,
            })
          }>
          <Text style={styles.btnTxt}>Detail</Text>
        </TouchableOpacity>
      </DataTable.Row>
    </DataTable>
  );

  const showN = () => {
    props.showNotification({
      title: 'New Medicine Added!!!',
      message: 'Hakim added a new Medicine',

      onPress: () => Alert.alert('Alert', 'You clicked the notification!'),
      additionalProps: {type: 'error'},
    });
  };

  const [allFiltered, setAllfiltered] = useState();
  const searchAlumnifunc = val => {
    setAllfiltered(
      medicineData.filter(item => {
        const itemData = `${item.Dname.toUpperCase()} ${item.title.toUpperCase()} ${item.symp.toUpperCase()} ${item.name.toUpperCase()} `;
        const textData = val.toUpperCase();
        return itemData.indexOf(textData) > -1;
      }),
    );
  };
  const [hakimrat, sethakimrat] = useState('');

  useEffect(async () => {
    await AsyncStorage.getItem('hrating').then(reat => {
      sethakimrat(reat);

      console.log('hakim rating', hakimrat);
    });
  });

  return (
    <SafeAreaView style={styles.container}>
      <UserHeader
        title="Profile"
        onPress={() => props.navigation.openDrawer()}
        onPress1={showN}
      />
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View style={{flex: 1}}>
          <Input
            onChangeText={val => searchAlumnifunc(val)}
            style={styles.searchBar}
            placeholder="Type here to search..."
            leftIcon={<Icon name="search1" size={24} color="black" />}
          />

          <View style={{flex: 1}}>
            <View style={{padding: 5}}>
              <FlatList
                padding={20}
                data={allFiltered}
                ItemSeparatorComponent={FlatListItemSeparator}
                renderItem={showItems}
                //key={medicineData}
                keyExtractor={item => item.Did}
                renderItem={({item, key}) => (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{marginBottom: 30}}
                      onPress={() =>
                        props.navigation.navigate(
                          'showMedicine',

                          {paramKey: item},
                          // { meding: item.ingredients }
                        )
                      }>
                      <Text
                        style={{fontSize: 26, fontFamily: 'bold', height: 60}}>
                        {item.title}
                      </Text>
                      <Text style={{fontSize: 20, height: 60}}>
                        {'Medicine Rating:'}
                      </Text>

                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.AverageRate}
                        fullStarColor={'orange'}
                        // rating={this.state.starCount}
                        // selectedStar={(rating) => this.onStarRatingPress(rating)}
                      />

                      <Text style={{fontSize: 20, height: 60}}>
                        {'Hakim'}
                        {' Rating:'}
                      </Text>

                      <StarRating
                        disabled={true}
                        maxStars={5}
                        rating={item.Hrating}
                        fullStarColor={'orange'}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
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
  item1: {
    //backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
    marginTop: 100,
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
    fontSize: 23,
    color: '#000000',
  },
  pic: {
    height: 300,
    width: 150,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  pic1: {
    height: 800,
    width: '100%',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  welcome: {
    width: '100%',
    fontFamily: 'times new roman',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  welcomecolor: {
    backgroundColor: '#4CAF50',
    width: '100%',
    textAlign: 'center',
    marginBottom: 10,
    height: 50,
    padding: 7.5,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  SubmitBtn: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginTop: -40,
    width: 150,
    alignSelf: 'flex-end',
  },
  btnTxt: {
    textAlign: 'center',
    color: 'white',
  },
  logoutBtn: {
    backgroundColor: '#4CAF50',
    padding: 5,
    // width:'100%',
    borderRadius: 0,
    alignSelf: 'flex-end',
    //marginRight:16,
    // marginTop:-23,
  },
  LbtnTxt: {
    fontSize: 18,
    alignSelf: 'flex-end',
    color: 'white',
  },
  stucomplaintBtn: {
    backgroundColor: '#4CAF50',
    marginTop: 8,
    marginBottom: 8,
    padding: 10,
    borderRadius: 5,
    // marginLeft:-10,
    // marginRight:30,
  },
  border: {
    // marginTop:10,
    margin: 1.5,
    // borderWidth: 2,
    borderColor: 'grey',
    // paddingBottom:5,
  },
});

export default withInAppNotification(userProfile);
