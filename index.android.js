import React, { Component } from 'react';
import Button from 'react-native-button';
import I18n from 'react-native-i18n';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import SToastAndroid from './SToastAndroid';

SToastAndroid.show('Hello OKKAMI ' + I18n.locale, SToastAndroid.SHORT);


I18n.fallbacks = true

I18n.translations = {
  'en': {
    greeting: 'Hi!',
    youtube: 'youtube-US',
    map: 'GoogleMAP-US',
    jwplayer: 'JWPlayer-US'
  },
  'en-GB': {
    greeting: 'Hi from the UK!',
    youtube: 'youtube-UK',
    map: 'GoogleMAP-UK',
    jwplayer: 'JWPlayer-UK'
  },
  'th-TH': {
    greeting: 'สวัสดี',
    youtube: 'ยูทูป',
    map: 'แผนที่นำทาง',
    jwplayer: 'เครื่องเล่น JWP'
  }
}

export default class MyToast extends Component {
  constructor(props, context) {
    super(props, context);
  }

  _handleYoutube() {
    //SToastAndroid.show('OpenNewJWPlayer', SToastAndroid.SHORT);
    SToastAndroid.openYoutube();
    console.log('Pressed!');
  }

  _handleMap() {
    //SToastAndroid.show('OpenNewJWPlayer', SToastAndroid.SHORT);
    SToastAndroid.openMap();
    console.log('Pressed!');
  }

  _handleJWPlayer() {
    //SToastAndroid.show('OpenNewJWPlayer', SToastAndroid.SHORT);
    SToastAndroid.openJWPlayer();
    console.log('Pressed!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.android.js
        </Text>
        <Text style={styles.instructions}>
          Double tap R on your keyboard to reload,{'\n'}
          Shake or press menu button for dev menu
        </Text>
        <Button
          containerStyle={{marginTop:10, padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'white'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handleYoutube()}>
          {I18n.t('youtube')}
        </Button>

        <Button
          containerStyle={{marginTop:10, padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'white'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handleMap()}>
          {I18n.t('map')}
        </Button>

        <Button
          containerStyle={{marginTop:10, padding:10, height:45, overflow:'hidden', borderRadius:4, backgroundColor: 'grey'}}
          style={{fontSize: 20, color: 'white'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handleJWPlayer()}>
          {I18n.t('jwplayer')}
        </Button>
        <Text>{I18n.t('greeting')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('MyToast', () => MyToast);
