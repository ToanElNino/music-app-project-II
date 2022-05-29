import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, StyleSheet} from 'react-native';
import UserScreen from '../screens/mainHomeScreen/userScreen/UserScreen';
import MainHomeScreen from '../screens/mainHomeScreen/MainHomeScreen';
import MusicPlayer from '../components/Music/MusicPlayer';
import UploadScreen from '../screens/mainHomeScreen/uploadScreen/UploadScreen';

const Tab= createBottomTabNavigator();

export default function Tabs(){
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
          }}>
          <Tab.Screen
            name="main home"
            component={MainHomeScreen}
            options={{
              showLabel: false,
              headerShown: false,
              // tabBarStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                <View style={styles.tabContainer}>
                  <Image
                    source={require('../assets/icons/User.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                    }}
                  />
                  <Text
                    style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                    Main Home
                  </Text>
                </View>
              ),
              title: 'User', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Tab.Screen
            name="Love Songs"
            component={MusicPlayer}
            options={{
              showLabel: false,
              headerShown: false,
              // tabBarStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                <View style={styles.tabContainer}>
                  <Image
                    source={require('../assets/icons/FavoriteList.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                    }}
                  />
                  <Text
                    style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                  Music Player
                  </Text>
                </View>
              ),
              title: 'Love Songs', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Tab.Screen
            name="Upload"
            component={UploadScreen}
            options={{
              showLabel: false,
              headerShown: false,
              // tabBarStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                <View style={styles.tabContainer}>
                  <Image
                    source={require('../assets/icons/UpLoadList.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                    }}
                  />
                  <Text
                    style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                    Upload
                  </Text>
                </View>
              ),
              title: 'Love Songs', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
          <Tab.Screen
            name="User"
            component={UserScreen}
            options={{
              showLabel: false,
              headerShown: false,
              // tabBarStyle: {display: 'none'},
              tabBarIcon: ({focused}) => (
                <View style={styles.tabContainer}>
                  <Image
                    source={require('../assets/icons/User.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                    }}
                  />
                  <Text
                    style={{color: focused ? '#3A5BB3' : '#a9a9a9', fontSize: 12}}>
                    User
                  </Text>
                </View>
              ),
              title: 'User', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}
          />
        </Tab.Navigator>
      );
}
const styles = StyleSheet.create({
  tabContainer: {alignItems: 'center', justifyContent: 'center', top: 0},
  tabImage: {},
});