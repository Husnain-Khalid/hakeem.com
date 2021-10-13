import React from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
// import Icon from 'react-native-vector-icons/dist/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SearchComponent({title, onPress, navigation}) {
  return (
    // <View style={{flex: 1}}>
    //   <HeaderComponent
    //     title="Search"
    //     onPress={() => navigation.toggleDrawer()}
    //   />

    <View style={styles.container}>
      <TextInput placeholder="Search" style={styles.input} />

      <Icon name="search" size={30} />
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    padding: 5,
    borderWidth: 1,
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
