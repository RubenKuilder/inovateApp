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

import { createStackNavigator, createAppContainer } from 'react-navigation';

var { width, height } = Dimensions.get('window');

type Props = {};
class HomeScreen extends Component<Props> {
  constructor() {
    super()
    this.state = {
      data: []
    }
  }

  getData() {
    return fetch('https://testrest1.herokuapp.com/getallsensors')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({data: responseJson.sensoren});
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
    const {navigate} = this.props.navigation;
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.hdrLeftBtn}>
            </View>
            <View style={styles.hdrCtr}>
              <View style={styles.hdrCtrTop}>
                <Text style={styles.hdrTitle}>
                  Locations
                </Text>
              </View>
              <View style={styles.hdrCtrBottom}>
                <Text style={styles.hdrSubTitle}>
                  No filter applied
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.hdrRightBtn} onPress={this.toggleModal}>
              <Image style={styles.filterImg} source={require('./assets/images/filter.png')} />
            </TouchableOpacity>
          </View>

          <Button
            title="Go to info page"
            onPress={() => this.props.navigation.navigate('Details')}
          />

          <Data data = {this.state.data} />

        </ScrollView>

        <View>
          <Modal style={styles.filterModal} isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isVisible: false })}>
            <View style={styles.overlayContent}>
              <Text style={styles.filterTitle}>Filters</Text>
              <TouchableOpacity style={styles.filterOptionContainer}>
                <Image style={styles.filterArrow} source={require('./assets/images/arrowUp.png')} />
                <Text style={styles.filterOption}>Best</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOptionContainer}>
                <Image style={styles.filterArrow} source={require('./assets/images/arrowUp.png')} />
                <Text style={styles.filterOption}>Worst</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOptionContainer}>
                <Image style={styles.filterArrow} source={require('./assets/images/arrowUp.png')} />
                <Text style={styles.filterOption}>Warmest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterOptionContainer}>
                <Image style={styles.filterArrow} source={require('./assets/images/arrowUp.png')} />
                <Text style={styles.filterOption}>Coldest</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.filterCloseContainer} onPress={this.toggleModal}>
                <Text style={styles.filterCloseBtn}>Close</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <View>
        <Text>Details screen here!</Text>
        <Button
          title="Go back to home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

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

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}