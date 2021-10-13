/** @format */

import React, {Component, useEffect, componentDidMount, useState} from 'react';
import {ImageBackground, StyleSheet, View, Alert, Button} from 'react-native';
import hakims from './hakims';

import hakim from '../assets/hakim.jpg';

export default class Home extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.backgroud}
        source={require('../assets/hakim.jpg')}>
        <View style={styles.hakeemButton}>
          <Button
            title="Hakim"
            onPress={() => this.props.navigation.navigate('Hakim')}
          />
        </View>

        <View style={styles.userButton}>
          <Button
            title="User"
            onPress={() => this.props.navigation.navigate('User')}
          />
        </View>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  backgroud: {
    flex: 1,
    justifyContent: 'center',
  },
  hakeemButton: {
    width: '20%',
    height: 70,
    top: 155,
    left: '40%',
  },
  userButton: {
    width: '20%',
    height: 70,
    top: 130,
    left: '40%',
  },
});
