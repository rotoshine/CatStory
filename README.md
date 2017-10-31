# 실행하는 법

현재 안드로이드만 세팅이 되어있다.

## project setting

1. https://facebook.github.io/react-native/ 를 참고하여 react-native를 설치한다.
2. 프로젝트를 clone 받고, `npm install` 한다.

## firebase app setting

파이어베이스의 인증 및 DB, 스토리지를 쓰고 있으므로 firebase app 세팅이 필요하다

1. https://console.firebase.google.com 에 접속하여 프롲게트를 생성한다
2. 프로젝트 대시보드에서 안드로이드 앱을 추가한다
3. 앱 추가 후 `google-services.json`을 다운받아 `android/app/` 아래로 복사한다.

## 실행

`react-native run-android`로 실행한다.