/** @format */

import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';

export default function hakimProfile({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.addDBtn}>
        <Button
          title="Add Deseases or Symptoms"
          color="purple"
          onPress={() => navigation.navigate('AddDisease')}
        />
      </View>

      <View style={styles.addPBtn}>
        <Button
          title="Add Products or Nuskha"
          color="purple"
          onPress={() => navigation.navigate('AddMedicine')}
        />
      </View>

      <View style={styles.addDBtn}>
        <Button
          title="View Medicines"
          color="purple"
          onPress={() => navigation.navigate('ViewMedicine')}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    left: 10,
    backgroundColor: '#fff',
  },
  addDBtn: {
    width: '50%',
    height: 70,
    top: 150,
    left: '20%',
  },
  addPBtn: {
    width: '50%',
    height: 70,
    top: 150,
    left: '20%',
  },
  viewBtn: {
    width: '50%',
    height: 70,
    top: 150,
    left: '20%',
  },
});
