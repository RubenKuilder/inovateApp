import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, ScrollView, Button, Image, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

var { width, height } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class Data extends Component<Props> {
	render() {
	    return (
          <TouchableOpacity style={styles.card}>
            <Image style={styles.cardImage} source={require('../assets/images/studielandschap.jpeg')} />
            <View style={styles.cardTextCont}>
              <Text style={styles.cardTitle}>ICT boven</Text>
              <Text style={styles.cardText}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc quis risus mi. Ut placerat quam lectus.</Text>
            </View>
          </TouchableOpacity>
	    );
	}
}