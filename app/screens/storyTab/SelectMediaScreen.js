import React, { Component } from 'react';
import { Dimensions, ScrollView, View, Text, Image, Button, TouchableHighlight } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';

import SelectableMedia from './SelectableMedia';

import { getPhotos } from '../../utils/cameraRollUtils';

const deviceWidth = Dimensions.get('window').width;

const FormView = styled.View`
  display: flex;
  flex-direction: column;
`;

const ImagePreviewWrapperView = styled.View`
  background-color: #ffffff;
  border-width: 1px;
  border-color: #cccccc;
  width: 100%;
  height: 50%;
`;

const SelectedImage = styled.Image`
  width: 100%;
  height: 100%;
  resizeMode: contain;
`;

const CameraIconButton = ({ onPress }) => {
  const wrapperStyle = {
    width: deviceWidth / 4,
    height: deviceWidth / 4,
    backgroundColor: '#ffffff',
    borderColor: '#cccccc',
    borderWidth: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <TouchableHighlight style={wrapperStyle} onPress={onPress}>
      <Icon name="camera" color="#000000" size={80} />
    </TouchableHighlight>
  );
};

export default class SelectMediaScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Select Media',
    headerRight: (
      <Button title="Next" onPress={() => {
        const { state, navigate } = navigation;
        const { selectedImageUri } = state.params;

        if (selectedImageUri !== null) {
          navigate('CreateStory', { selectedImageUri });
        }
      }}/>
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      localImages: [],
      selectedImageUri: null,
      cursor: 0,
      hasNextData: true
    };
  }

  componentDidMount() {
    this.fetchLocalPhotos();
  }

  async fetchLocalPhotos() {
    try {
      const { localImages, cursor } = this.state;
      const fetchParams = {
        first: (cursor === 0) ? 11 : 12
      };

      if (cursor > 0) {
        fetchParams.after = cursor;
      }

      const result = await getPhotos(fetchParams);

      const pageInfo = result.page_info;

      this.setState({
        localImages: [...localImages, ...result.edges],
        cursor: pageInfo.end_cursor,
        hasNextData: pageInfo.has_next_page
      });
    } catch (e) {
      console.error(e);
    }
  }

  handleCameraPress = () => {
    ImagePicker.launchCamera({
      storageOptions: {
        path: 'cat_images',
        cameraRoll: true
      }
    }, (response) => {
      if (response.didCancel) {
        console.log('usert cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const { navigate } = this.props.navigation;
        console.log('camera data', response.uri);
        navigate('CreateStory', { selectedImageUri: response.uri });
      }
    });
  };

  handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isScrollEnd = (layoutMeasurement.height + contentOffset.y) >= (contentSize.height - 20);

    const { hasNextData } = this.state;
    if (isScrollEnd && hasNextData) {
      this.fetchLocalPhotos();
    }
  };

  render() {
    const { localImages } = this.state;
    const { navigation } = this.props;
    const { state, setParams } = navigation;
    const selectedImageUri = state && state.params && state.params.selectedImageUri;

    return (
      <FormView>
        <ImagePreviewWrapperView>
          {selectedImageUri &&
            <SelectedImage source={{ uri: selectedImageUri }} />
          }
          {!selectedImageUri &&
            <Text>이미지를 선택해주세요.</Text>
          }
        </ImagePreviewWrapperView>
        <ScrollView style={{
          height: '50%'
        }} contentContainerStyle={{
          paddingBottom: 10,
          flexWrap: 'wrap',
          flexDirection: 'row'
        }} onScroll={this.handleScroll}>
          <CameraIconButton onPress={this.handleCameraPress} />
          {localImages && localImages.map((image, key) => {
            return (
              <SelectableMedia key={key}
                               image={image}
                               selectedImageUri={selectedImageUri}
                               onPress={(uri) => setParams({ selectedImageUri: uri })}
              />
            );
          })}
        </ScrollView>
      </FormView>
    );
  }
}