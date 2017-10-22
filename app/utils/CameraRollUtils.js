import React from 'react';
import { Platform, CameraRoll, PermissionsAndroid } from 'react-native';

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
    }

    console.log('granted', granted);

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn('err', err)
  }
}

export async function getPhotos(params) {
  if (Platform.OS === 'android') {
    requestCameraPermission();
  }

  const result = await CameraRoll.getPhotos(params);

  return result.edges;
}