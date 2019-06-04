/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, TouchableOpacity, ScrollView, Button, Image, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Data from './components/data';

var { width, height } = Dimensions.get('window');

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



type Props = {};
export default class index extends Component<Props> {

  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  getData() {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.movies});
      })
      .catch((error) => {
      console.error(error);
    });
  }

  componentDidMount() {
    this.getData();
  }

  state = {
    isModalVisible: false
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.hdrLeftBtn}>
              <Text>0</Text>
            </View>
            <View style={styles.hdrCtr}>
              <View style={styles.hdrCtrTop}>
                <Text style={styles.hdrTitle}>
                  ICT Boven
                </Text>
              </View>
            </View>
          </View>

          <Text>Info page here</Text>

        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterModal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  overlayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    top: 0,
    left: 0,
  },
  overlayBg: {
    position: 'absolute',
    opacity: 0.5,
    backgroundColor: '#000000',
    width: width,
    height: height,
  },
  overlayContent: {
    position: 'absolute',
    backgroundColor: '#fff',
  },
  filterTitle: {
    width: width,
    paddingTop: 20,
    paddingRight: 35,
    paddingBottom: 20,
    paddingLeft: 35,
    backgroundColor: '#FAFAFA',
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 2,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
    color: '#252525',
  },
  filterOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width,
    paddingTop: 10,
    paddingRight: 35,
    paddingBottom: 10,
    paddingLeft: 35,
    backgroundColor: '#FFFFFF',
  },
  filterOption: {
    fontSize: 16,
    fontFamily: 'Karla-Regular',
    color: '#252525',
  },
  filterArrow: {
    marginRight: 10,
  },
  filterCloseContainer: {
    paddingLeft: 35,
    paddingRight: 35,
  },
  filterCloseBtn: {
    width: '100%',
    textAlign: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    borderTopColor: '#F2F2F2',
    borderTopWidth: 2,
    fontSize: 16,
  },
  container: {
    backgroundColor: '#FAFAFA',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 10,
    height: 90,
    flexDirection: 'row',
  },
  hdrLeftBtn: {
    width: 25,
    marginLeft: 10,
    //flex: 1,
    //backgroundColor: 'red',
  },
  hdrCtr: {
    flex: 8,
    flexDirection: 'column',
    //backgroundColor: 'purple',
  },
  hdrCtrTop: {
    flex: 2,
    //backgroundColor: 'green',
  },
  hdrCtrBottom: {
    flex: 1,
    //backgroundColor: 'orange',
  },
  hdrRightBtn: {
    width: 60,
    marginRight: 10,
    //flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'blue',
  },
  hdrTitle: {
    color: '#252525',
    fontSize: 31,
    fontFamily: 'Lato-Heavy',
  },
  hdrSubTitle: {
    color: '#252525',
    fontSize: 12,
    fontFamily: 'Lato-Light',
  },
  filterImg: {
    width: 20,
    height: 20,
  },
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
