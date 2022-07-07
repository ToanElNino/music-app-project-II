import React from "react";
import {View, Image, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UserScreen from "./userScreen/UserScreen";
import LogOut from "../components/auth/LogOut";
import Entypo from 'react-native-vector-icons/Entypo';

const Drawer = createDrawerNavigator();

const UserDrawerSceen =() =>{
    return(
        <Drawer.Navigator initialRouteName="User Information">
            <Drawer.Screen name="User Information" component={UserScreen} 
            options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <Image
                    source={require('../assets/icons/User.png')}
                    resizeMode="contain"
                    style={{
                      width: 30,
                      height: 30,
                      tintColor: focused ? '#3A5BB3' : '#a9a9a9',
                    }}
                  />
                </View>
              ),
              title: 'User Information', //Set Header Title
              headerStyle: {
                backgroundColor: '#3A5BB3', //Set Header color
              },
              headerTintColor: '#fff', //Set Header text color
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontWeight: 'bold', //Set Header text style
              },
            }}/>
            <Drawer.Screen name="Log Out" component={LogOut} 
                 options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <Entypo name="log-out" size={30} />
                </View>
              ),
              title: 'Log out', //Set Header Title
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
        </Drawer.Navigator>
    )
}
export default UserDrawerSceen;