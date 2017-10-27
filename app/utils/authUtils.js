import { Alert, AsyncStorage } from 'react-native';
import firebase from 'react-native-firebase';

const { alert } = Alert;

const USER_STORAGE_KEY = '@CatStory:user';

async function login(email, password) {
  if ( email && password ) {
    try {
      const loginResult = await firebase.auth().signInWithEmailAndPassword(email, password);
      const db = firebase.database().ref();
      const userSnapShot = await db.child('users').child(loginResult.toJSON().uid).once('value');

      console.log('db user', userSnapShot.toJSON());

      await saveUser(userSnapShot.toJSON());

      return true;
    } catch (e) {
      if (e.code === 'auth/invalid-email') {
        alert('올바르지 않은 아이디입니다,');
      } else if (e.code === 'auth/wrong-password') {
        alert('비밀번호가 올바르지 않습니다.');
      } else {
        alert(e.message);
      }
    }
  } else {
    alert('아이디 혹은 비밀번호가 입력되지 않았습니다.');
  }

  return false;
}

async function logout () {
  try {
    await firebase.auth().signOut();
    await AsyncStorage.removeItem('@CatStory:user');

    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

async function loadUser() {
  try {
    const userJSONString = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userJSONString !== null) {
      return JSON.parse(userJSONString);
    }
  } catch (err) {
    alert(err.message);
  }

  return null;
}

async function saveUser(user) {
  await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

async function createUser (email, name, password) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = Object.assign({}, result.toJSON(), { name });

    // 부가정보 저장처리
    const db = firebase.database().ref();
    await db.child('users').child(user.uid).set(user);

    await saveUser(user);
  } catch (e) {
    console.error(e);
  }
}

export {
  login,
  logout,
  loadUser,
  createUser,
  saveUser
};