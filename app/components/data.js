import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, ScrollView, Button, Image, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';

import { createStackNavigator, createAppContainer } from 'react-navigation';

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

		let articles = this.props.data.map(function(articleData, index){
			return (
	          <TouchableOpacity style={styles.card} key={index}>
	            <Image style={styles.cardImage} source={{uri: articleData.imageURL}} />
	            <View style={styles.cardTextCont}>
	              <Text style={styles.cardTitle}>{articleData.locationname}</Text>
	              <Text style={styles.cardText}>{articleData.description}</Text>
	            </View>
	          </TouchableOpacity>
			)
		});

	    return (
	    	<View>
	    		{articles}
	    	</View>
	    );
	}
}

const styles = StyleSheet.create({
  card: {
    backgroundColor:'#fff',
    marginBottom:10,
    marginLeft:'2%',
    width:'96%',
    shadowColor:'#000',
    shadowOpacity:0.2,
    shadowRadius:1,
    elevation:3,
  },
  cardImage: {
    width:'100%',
    height:200,
    resizeMode:'cover',
  },
  cardTextCont: {
    paddingTop: 10,
    paddingRight: 25,
    paddingBottom: 10,
    paddingLeft: 25,
  },
  cardTitle: {
    fontSize:20,
    color:'#252525',
    fontFamily: 'Lato-Heavy',
  },
  cardText: {
    fontSize:12,
    color:'#252525',
    fontFamily: 'Karla-Regular',
  }
});