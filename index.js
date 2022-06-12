/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';
import WrapperApp from './WrapperApp';

AppRegistry.registerComponent(appName, () => WrapperApp);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
