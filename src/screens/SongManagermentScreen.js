import React from "react";
import {View, Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import UploadScreen from "./songManagerScreen/UploadScreen";
import FavoriteListScreen from "./songManagerScreen/FavoriteListScreen";
import AlbumManagerScreen from "./songManagerScreen/AlbumManager";
import UploadListManagerScreen from "./songManagerScreen/UploadListScreen";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Drawer = createDrawerNavigator();

const SongMangermentScreen =() =>{
    return(
        <Drawer.Navigator initialRouteName="My Favorite Songs">
            <Drawer.Screen name="My Favorite Songs" component={FavoriteListScreen} 
                 options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <MaterialIcons name="favorite" size={30} />
                </View>
              ),
              title: 'My Favorite Songs', //Set Header Title
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
            <Drawer.Screen name="My Albums" component={AlbumManagerScreen} 
                options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <Ionicons name="albums" size={30} />
                </View>
              ),
              title: 'My Favorite Songs', //Set Header Title
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
            <Drawer.Screen name="My upload songs" component={UploadListManagerScreen} 
                options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <MaterialCommunityIcons name="folder-upload" size={30} />
                </View>
              ),
              title: 'My upload songs', //Set Header Title
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
            <Drawer.Screen name="Upload New Song" component={UploadScreen} 
                options={{
              // tabBarStyle: {display: 'none'},
              drawerIcon: ({focused}) => (
                <View>
                  <MaterialCommunityIcons name="upload-multiple" size={30} />
                </View>
              ),
              title: 'Upload New Song', //Set Header Title
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
export default SongMangermentScreen;