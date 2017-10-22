import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getPhotos } from '../utils/CameraRollUtils';

export default class FormScreen extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="plus" size={30} />
  };

  constructor (props) {
    super(props);
    this.state = {
      images: null
    };
  }
  componentDidMount () {
    //this.fetchLocalPhotos();
  }

  async fetchLocalPhotos () {
    const images = await getPhotos({
      first: 20,
      assetType: 'All'
    });
    this.setState({ images });
  }

  render() {
    const { images } = this.state;

    return (
      <View style={{marginTop:20}}>
        <Text>Form!!</Text>
        { images && images.map((image, key) => {
          return <Image key={key} source={{ uri: image.node.image.uri }} style={{width:50, height:50}}/>
        })}
      </View>
    );
  }
}