import firebase from 'react-native-firebase';
import _ from 'lodash';

const REF_KEY = 'stories';

function getDB() {
  return firebase.database().ref(REF_KEY);
}

function getStorage() {
  return firebase.storage().ref(REF_KEY);
}
async function fetchStories(fetchCount = 10, endAt) {
  const db = getDB();
  const result = await db.orderByKey().limitToLast(fetchCount).endAt(endAt).once('value');

  const storiesJSON = result.toJSON();

  if (storiesJSON !== null)  {
    return _.values(storiesJSON);
  }

  return [];
}

function createNewStoryKey() {
  return getDB().push().key;
}

async function createStory({ userUid, name, content, imageUri }) {
  try {
    const newStoryKey = createNewStoryKey();

    const downloadURL = await uploadImage(newStoryKey, userUid, imageUri);

    const story = Object.assign({}, {
      key: newStoryKey,
      userUid,
      name,
      content,
      createdAt: new Date().getTime(),
      imageUri: downloadURL
    });

    // story model
    // { uid: '', name: '', image: { uri: '' }, content: '', createdAt: '' }

    const updates = {
      [`/stories/${newStoryKey}`]: story,
      [`/user-stories/${userUid}/${newStoryKey}`]: story
    };

    firebase.database().ref().update(updates);
    return true;
  } catch (e) {
    console.log('create story error', e.message);
    console.log(e);
    return false;
  }
}

async function uploadImage (newStoryKey, userUid, imageUri) {
  try {
    const result = await getStorage().child(`${userUid}/${newStoryKey}`).putFile(imageUri);

    return result.downloadURL;
  } catch(e) {
    console.log('upload error', e.message);
    console.error(e);
  }
}


export {
  fetchStories,
  createStory
};