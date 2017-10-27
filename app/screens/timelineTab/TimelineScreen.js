import React, { Component } from 'react';
import _ from 'lodash';
import { ActivityIndicator, FlatList } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import Story from './Story';

import { showImagePicker } from '../../utils/cameraRollUtils';
import { fetchStories } from '../../apis/storyApi';

const MainView = styled.View`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const Header = styled.View`
  background-color: #ffffff;
  height: 45px;
  display: flex;
  flex-direction: row;
  padding-left: 15px;
  padding-right: 15px;
`;

const IconButton = styled.TouchableHighlight`
  padding: 5px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #eeeeee;
`;

const HeaderText = styled.Text`
  background-color: #ffffff;
  flex: 1;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const InfoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
export default class TimelineScreen extends Component {
  static navigationOptions = {
    tabBarIcon: () => <Icon name="view-list" size={30}/>,
    tabBarLabel: 'Timeline'
  };

  constructor (props) {
    super(props);

    this.state = {
      isFetching: false,
      refreshing: false,
      hasMoreData: true,
      lastStoryKey: null,
      stories: null
    };
  }

  componentDidMount () {
    this.fetchStories();
  }

  componentWillReceiveProps (props) {
    const { isFetching } = this.state;
    const { params } = props.navigation.state;
    if (!isFetching && params.refresh) {
      this.fetchStories();
    }
  }

  async asyncSetState (state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  async fetchStories (appendMode = false, fetchCount = 5) {
    await this.asyncSetState({ isFetching: true });

    const { lastStoryKey, stories = [] } = this.state;
    const fetchedStories = await fetchStories(fetchCount, lastStoryKey);
    const nextLastStoryKey = fetchedStories.length > 0 ? _.last(fetchedStories).key : null;
    const nextStories = appendMode ? [...stories, ...fetchedStories] : fetchedStories;

    await this.asyncSetState({
      lastStoryKey: nextLastStoryKey,
      isFetching: false,
      hasMoreData: fetchedStories.length === fetchCount,
      stories: nextStories
    });
  }

  handleCameraPress = async () => {
    const imageUri = await showImagePicker();

    if (imageUri) {
      const { navigate } = this.props.navigation;
      navigate('CreateStory', { selectedImageUri: response.uri });
    }
  };


  handleRefresh = async () => {
    await this.fetchStories(false, 5);
  };

  handleEndReached = async () => {
    const { hasMoreData, isFetching } = this.state;
    if (hasMoreData && !isFetching) {
      await this.fetchStories(true, 3);
    }
  };

  render () {
    const { isFetching, refreshing, stories } = this.state;

    return (
      <MainView>
        <Header>
          <IconButton style={{ justifyContent: 'flex-start' }} onPress={this.handleCameraPress}>
            <Icon name="camera" size={28}/>
          </IconButton>
          <HeaderText>Cat Story</HeaderText>
          <IconButton style={{ justifyContent: 'flex-end', display: 'none' }}>
            <Icon name="message-plus" size={28}/>
          </IconButton>
        </Header>
        { isFetching && <ActivityIndicator /> }
        {
          !isFetching && stories === null &&
          <InfoView>
            <Text h3>어머나! 스토리가 하나도 없네요!</Text>
          </InfoView>
        }
        {
          stories !== null && stories.length > 0 &&
          <FlatList data={stories}
                    refreshing={refreshing}
                    keyExtractor={(item, index) => index}
                    renderItem={({ item, index }) => <Story key={index} story={item}/>}
                    onRefresh={this.handleRefresh}
                    onEndReachedThreshold={0.1}
                    onEndReached={this.handleEndReached}
          />
        }
      </MainView>
    );
  }
}