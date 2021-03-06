import React, {Component} from 'react';
import _ from 'lodash';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  Switch,
  Text
} from 'react-native';
import {ListView} from 'realm/react-native';
import BeerInfo from './BeerInfo.js';
import App from './App.js';

export default class Beer extends Component {
  constructor(props){
    super(props);
  }
  _beerPress() {
    this.props.navigator.push({
      barTintColor: '#f7b20a',
      title: this.props.beerObject.name,
      component: BeerInfo,
      rightButtonTitle: 'Home',
      onRightButtonPress: () => this.props.navigator.popToTop(),
      passProps: {
        beerObject: this.props.beerObject
      }
    })
  }

  render() {
    let imgUrl = require('../images/Beer-icon.png');
    if (this.props.beerObject.labels){
      imgUrl = {uri: this.props.beerObject.labels.large};
    } else {
      imgUrl = require('../images/Beer-icon.png');
    }
    var breweryName;
    if (!this.props.beerObject.breweries || this.props.beerObject.breweries === null) {
      var breweryName = '';
    } else {
      var breweryName = this.props.beerObject.breweries[0].name + " Brewery";
    }
    var typeName;
    if (!this.props.beerObject.style || this.props.beerObject.style === null) {
      var typeName = '';
    } else {
      var typeName = "Type: " + this.props.beerObject.style.name;
    }

    return(
      <TouchableOpacity onPress={() => this._beerPress()}>
      <View style={styles.buttonContainer}>
        <View style={styles.imageContainer}>
            <Image
            style={styles.beerImage}
            source={imgUrl}
            />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{this.props.beerObject.name}</Text>
          <Text style={styles.info}>{breweryName}</Text>
          <Text style={styles.info}>{typeName}</Text>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.abvContainer}>
            <Text style={styles.bold}>ABV: </Text>
            <Text style={styles.info}> {this.props.beerObject.abv} %</Text>
          </View>
          <View style={styles.ibuContainer}>
            <Text style={styles.bold}>IBU: </Text>
            <Text style={styles.info}>{this.props.beerObject.ibu}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer:{
    flex: 1,
    padding: 10/PixelRatio.get(),
    minHeight: 200/PixelRatio.get(),
    borderColor: '#cac9cf',
    borderBottomWidth: 4,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 5/PixelRatio.get(),
    justifyContent: 'flex-start',
    marginBottom: 5/PixelRatio.get(),
    backgroundColor: '#ffffff'

  },
  imageContainer:{
    flex: 3,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 5/PixelRatio.get(),
    justifyContent: 'center',
    height: 100,
    borderBottomColor: '#c34517',
    borderBottomWidth: 0,

  },
  contentContainer:{
    flex: 8,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 5/PixelRatio.get(),
    justifyContent: 'flex-start',

  },
  infoContainer:{
    flex: 4,
    flexDirection: 'column',
  },
  abvContainer:{
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderColor: '#cac9cf',
    padding: 5/PixelRatio.get(),
    borderBottomWidth: 2,
  },
  ibuContainer:{
    flex: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 5/PixelRatio.get(),
  },
  beerImage:{
    width: 120/PixelRatio.get(),
    height: 120/PixelRatio.get()
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    fontFamily: 'ECONOMICA'
  },
  info:{
    fontFamily: 'Raleway',
    marginBottom: 5,
  },
  bold: {
    fontFamily: 'Raleway-bold',
    marginBottom: 5,
  }
})
