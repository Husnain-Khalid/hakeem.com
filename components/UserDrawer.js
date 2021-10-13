import React, {useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import hakims from '../screens/hakims';
//import Fame from '../screens/Fame;';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {NavigationContainer} from '@react-navigation/native';

export function UserDrawer({props, navigation}) {
  const paperTheme = useTheme();

  let udata = [];
  useEffect(async () => {
    udata = await AsyncStorage.getItem('pData');
    // console.log('udata : ', udata);
  });

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Image source={require('../assets/images.png')} />
            </View>
          </View>
          <View style={{height: 6, backgroundColor: 'white'}}></View>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="face-profile" color={color} size={30} />
              )}
              label="My Profile"
              labelStyle={{fontSize: 20, fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('userProfile');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="face-profile" color={color} size={30} />
              )}
              label="Hall of Fame"
              labelStyle={{fontSize: 20, fontWeight: 'bold'}}
              onPress={() => {
                navigation.navigate('Fame');
              }}
            />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          labelStyle={{fontSize: 20, fontWeight: 'bold'}}
          focused="boolean"
          onPress={() => {
            AsyncStorage.removeItem('pData');
            navigation.navigate('Hakim');
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 20,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 20,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 25,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
