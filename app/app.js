/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, FlatList, TouchableOpacity, ScrollView, Button, Image, Text, View, Dimensions} from 'react-native';
import Modal from 'react-native-modal';
import Data from './components/data';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { LineChart, YAxis, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

var { width, height } = Dimensions.get('window');

type Props = {};
class HomeScreen extends Component<Props> {
  constructor() {
    super();
    this.state={
      data: []
    }
  }

  componentDidMount() {
    fetch("https://testrest1.herokuapp.com/getallsensors")
    .then((result)=>result.json())
    .then((res)=>{
      this.setState({
        data:res.sensoren
      })
    })
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

          <FlatList
            data={this.state.data}
            renderItem={({item}) =>
            <TouchableOpacity
              style={styles.card}
              onPress={() => {this.props.navigation.navigate('Details', {
                itemId: item.sensorID,
              });
            }
            }>
              <Image style={styles.cardImage} source={{uri: item.imageURL}} />
              <View style={styles.cardTextCont}>
                <Text style={styles.cardTitle}>{item.locationname}</Text>
                <Text style={styles.cardText}>{item.description}</Text>
              </View>
            </TouchableOpacity>
          }
          keyExtractor={(item, index) => index.toString()}
          />

        </ScrollView>

        <View>
          <Modal style={styles.filterModal} isVisible={this.state.isModalVisible} onBackdropPress={() => this.setState({ isVisible: false })}>
            <View style={styles.overlayContent}>
              <Text style={styles.filterTitle}>Filters</Text>
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
  constructor() {
    super();
    this.state = {
      data: [],
      airqualityColor: "",
      temperatureColor: "",
      humidityColor: "",
      pressureColor: "",
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', '');
    fetch("https://testrest1.herokuapp.com/getglobalsensordata?sensor="+itemId)
    .then((result)=>result.json())
    .then((res)=>{
      this.setState({
        data:res
      })

      if(res.airquality < 20) {
        this.setState({ temperatureColor: "#76ff03" });
      } else if(res.airquality > 30) {
        this.setState({ temperatureColor: "#c6ff00" });
      } else if(res.airquality > 30) {
        this.setState({ temperatureColor: "#ffff00" });
      } else if(res.airquality > 30) {
        this.setState({ temperatureColor: "#ffb300" });
      } else {
        this.setState({ temperatureColor: "#ff3d00" });
      }

      if(res.temperature < 10) {
        this.setState({ airqualityColor: "#2196f3" });
      } else if(res.temperature < 15) {
        this.setState({ airqualityColor: "#ba68c8" });
      } else if(res.temperature < 20) {
        this.setState({ airqualityColor: "#ffb300" });
      } else if(res.temperature < 25) {
        this.setState({ airqualityColor: "#ff6f00" });
      } else {
        this.setState({ airqualityColor: "#ff3d00" });
      }

      if(res.humidity < 20) {
        this.setState({ humidityColor: "#bbdefb" });
      } else if(res.humidity < 30) {
        this.setState({ humidityColor: "#64b5tf6" });
      } else if(res.humidity < 40) {
        this.setState({ humidityColor: "#1e88e5" });
      } else {
        this.setState({ humidityColor: "#1565c0" });
      }

      if(res.pressure < 800) {
        this.setState({ pressureColor: "#f3e5f5" });
      } else if(res.pressure < 900) {
        this.setState({ pressureColor: "#e1bee7" });
      } else if(res.pressure < 1000) {
        this.setState({ pressureColor: "#ce93d8" });
      } else if(res.pressure < 1100) {
        this.setState({ pressureColor: "#ba68c8" });
      } else if(res.pressure < 1200) {
        this.setState({ pressureColor: "#ab47bc" });
      } else {
        this.setState({ pressureColor: "#9c27b0" });
      }
    })
  }

  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', '');
    return (
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.hdrLeftBtn} onPress={() => this.props.navigation.navigate('Home')}>
            <Image style={styles.backArrow} source={require('./assets/images/arrowLeft.png')} />
          </TouchableOpacity>
                 <FlatList
                  data={[this.state.data]}
                  renderItem={ ({item}) => 
                    <View style={styles.hdrCtr}>
                      <View style={styles.hdrCtrTop}>
                       <Text style={styles.hdrTitle}>
                        {item.locationname}
                       </Text>
                      </View>
                      <View style={styles.hdrCtrBottom}>
                        <Text style={[styles.hdrSubTitle, {marginTop: 5}]}>
                          Last Synced {item.datetime}
                        </Text>
                      </View>
                    </View>
                  }
                  keyExtractor={(item, index) => index.toString()}
                  />
        </View>

        <FlatList
        data={[this.state.data]}
        renderItem={ ({item}) =>
          <View>  
            <Image style={styles.detailImage} source={{uri: item.imageURL}} />
            <TouchableOpacity style={styles.detailContainer} onPress={() => {this.props.navigation.navigate('Graph', { itemId: itemId, quantity: 'air'})}}>
              <View style={styles.detailLeft}>
                <View style={[styles.detailBorder, {backgroundColor: this.state.airqualityColor}]}></View>
                <Text style={styles.detailText}>{item.airquality}%  Air Quality</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.moreInfo}>
                  More info &nbsp;
                  <Image style={styles.detailArrow} source={require('./assets/images/arrowRight.png')} />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailContainer} onPress={() => {this.props.navigation.navigate('Graph', { itemId: itemId, quantity: 'temp' })}}>
              <View style={styles.detailLeft}>
                <View style={[styles.detailBorder, {backgroundColor: this.state.temperatureColor}]}></View>
                <Text style={styles.detailText}>{item.temperature}° Celcius</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.moreInfo}>
                  More info &nbsp;
                  <Image style={styles.detailArrow} source={require('./assets/images/arrowRight.png')} />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailContainer} onPress={() => {this.props.navigation.navigate('Graph', { itemId: itemId, quantity: 'hum' })}}>
              <View style={styles.detailLeft}>
                <View style={[styles.detailBorder, {backgroundColor: this.state.humidityColor}]}></View>
                <Text style={styles.detailText}>{item.humidity}%  Humidity</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.moreInfo}>
                  More info &nbsp;
                  <Image style={styles.detailArrow} source={require('./assets/images/arrowRight.png')} />
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailContainer} onPress={() => {this.props.navigation.navigate('Graph', { itemId: itemId, quantity: 'press' })}}>
              <View style={styles.detailLeft}>
                <View style={[styles.detailBorder, {backgroundColor: this.state.pressureColor}]}></View>
                <Text style={styles.detailText}>{item.pressure}  Hecto Pascal</Text>
              </View>
              <View style={styles.detailRight}>
                <Text style={styles.moreInfo}>
                  More info &nbsp;
                  <Image style={styles.detailArrow} source={require('./assets/images/arrowRight.png')} />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        }
        keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    );
  }
}

class GraphScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      labelsTest: [],
      valuesTest: [],
      graphTitle: '',
      graphDesc: '',
      yValue: '',
    }
  }

  componentDidMount() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', '');
    const quantity = navigation.getParam('quantity', '');
    fetch("https://testrest1.herokuapp.com/getchartdata?sensor="+ itemId +"&quantity="+quantity)
    .then((result)=>result.json())
    .then((res)=>{
      this.setState({

        labelsTest: res.metingen.map(obj => {
          return obj.label;
        }),

        valuesTest: res.metingen.map(obj => {
          return obj.value;
        }),

        graphTitle: res.title,
        graphDesc: res.description,
      });
    })
  }

  render() {
    const {navigation} = this.props;
    const itemId = navigation.getParam('itemId', '');
    const quantity = navigation.getParam('quantity', '');
    const data = this.state.valuesTest;
    const contentInset = { top: 20, bottom: 20 };
    const labelLength = this.state.labelsTest.length - 1;

    return(
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity style={styles.hdrLeftBtn} onPress={() => this.props.navigation.navigate('Details')}>
            <Image style={styles.backArrow} source={require('./assets/images/arrowLeft.png')} />
          </TouchableOpacity>
          <View style={styles.hdrCtr}>
            <View style={styles.hdrCtrTop}>
             <Text style={styles.hdrTitle}>
              {this.state.graphTitle}
             </Text>
            </View>
          </View>
        </View>

        <View style={styles.chart}>
          <YAxis
            data={ data }
            contentInset={ contentInset }
            svg={{
                fill: 'grey',
                fontSize: 10,
            }}
            numberOfTicks={ 5 }
            formatLabel={value => `${value}`}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 7 }}
            data={ data }
            curve={ shape.curveNatural }
            svg={{ stroke: 'rgb(134, 65, 244)' }}
            contentInset={ contentInset }
          >
          <Grid />
          </LineChart>
        </View>
        <View style={styles.chartX}>
          <Text>{this.state.labelsTest[0]}</Text>
          <Text>{this.state.labelsTest[labelLength]}</Text>
        </View>

        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTextTitle}>Information</Text>
          <Text style={styles.infoText}>{this.state.graphDesc}</Text>
        </View>

      </ScrollView>
    )
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: { screen: HomeScreen, navigationOptions: { header: null } },
    Details: { screen: DetailsScreen, navigationOptions: { header: null } },
    Graph: { screen: GraphScreen, navigationOptions: { header: null } },
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  testDing: {
    flex: 1,
    justifyContent: 'space-between',
  },
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
    height: 5,
    width: 8,
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
    marginTop: -18,
    justifyContent: 'center',
    //flex: 1,
    //backgroundColor: 'red',
  },
  backArrow: {
    width: 5,
    height: 8,
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
  },
  detailContainer: {
    flex: 1,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailBorder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 4,
  },
  detailText: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 35,
    fontFamily: 'Karla-Regular',
    fontSize: 20,
    color: '#252525',
  },
  detailDateText: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 35,
    fontFamily: 'Karla-Regular',
    fontSize: 17,
    color: '#252525',
  },
  detailImage: {
    width:'100%',
    height:200,
    resizeMode:'cover',
    marginBottom: 4,
  },
  moreInfo: {
    fontFamily: 'Karla-Regular',
    fontSize: 16,
    color: '#252525',
    paddingTop: 20,
    paddingBottom: 20,
    paddingRight: 20,
  },
  detailArrow: {
    width: 5,
    height: 8,
  },
  chart: {
    height: 200,
    flexDirection: 'row',
    paddingLeft: 7,
    paddingRight: 35,
    paddingBottom: 0,
  },
  chartX: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 35,
    paddingTop: 0,
  },
  infoTextContainer: {
    paddingTop: 0,
    padding: 35,
  },
  infoTextTitle: {
    fontSize: 21,
    fontFamily: 'Lato-Bold',
    color: '#252525',
    paddingBottom: 5,
  },
  infoText: {
    fontSize: 16,
    fontFamily: 'Karla-Regular',
    color: '#252525',
  }
});

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}