import React, { Component } from 'react';
import { Dimensions, View, TouchableHighlight, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const deviceWidth = Dimensions.get('window').width;

export default class SelectableMedia extends Component {
  render() {
    const { image, selectedImageUri, onPress } = this.props;
    const { uri } = image.node.image;
    const selected = (uri === selectedImageUri);

    const imageStyle = {
      width: '100%',
      height: '100%',
      resizeMode: 'contain'
    };

    const touchImageStyle = {
      width: deviceWidth / 4,
      height: deviceWidth / 4,
      padding: 5
    };


    const imageWrapperStyle = Object.assign({}, touchImageStyle);

    if (selected) {
      imageWrapperStyle.opacity = 0.5;
      imageWrapperStyle.borderWidth = 1;
      imageWrapperStyle.borderColor = '#999999';
    }

    return (
      <View style={imageWrapperStyle}>
        <TouchableHighlight onPress={() => onPress(uri)}>
          <Image style={imageStyle} source={{ uri }} />
        </TouchableHighlight>
        {selected && <Icon name="check" size={60} color="#cccccc" />}
      </View>
    );
  }
}