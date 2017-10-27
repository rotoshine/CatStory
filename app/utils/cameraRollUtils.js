import React from 'react';
import { Alert, Platform, CameraRoll, PermissionsAndroid } from 'react-native';
import ImagePicker from 'react-native-image-picker';

async function requestCameraPermission() {
  try {
    const checkResult = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (!checkResult) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Cool Photo App needs access to your camera ' +
          'so you can take awesome pictures.'
        }
      );
      console.log('granted', granted);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
        console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
        return false;
      }
    }

    return true;
  } catch (err) {
    console.warn(err.message);
  }
}

async function getPhotos(params) {
  try {
    if (Platform.OS === 'android') {
      const hasCameraPermission = await requestCameraPermission();
      if (!hasCameraPermission) {
        Alert.alert('카메라 권한이 필요합니다.');
        return;
      }
    }

    return await CameraRoll.getPhotos(params);
  } catch (e) {
    console.error(e);
    return null;
  }
}

const storageOptions = {
  path: 'cat_images',
  cameraRoll: true
};

async function showImagePicker() {
  return new Promise((resolve) => {
    ImagePicker.showImagePicker({
      title: '이미지 선택',
      storageOptions
    }, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('usert cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        resolve(response.uri);
      }
    });
  });

}

export {
  getPhotos,
  showImagePicker,
}