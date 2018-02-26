# 실행하는 법

현재 안드로이드만 세팅이 되어있다.

## project setting

1. https://facebook.github.io/react-native/ 를 참고하여 react-native를 설치한다.
2. 프로젝트를 clone 받고, `npm install` 한다.

## firebase app setting

파이어베이스의 인증 및 DB, 스토리지를 쓰고 있으므로 firebase app 세팅이 필요하다

1. https://console.firebase.google.com 에 접속하여 프로젝트를 생성한다
2. 프로젝트 대시보드에서 안드로이드 앱을 추가한다
3. 앱 추가 후 `google-services.json`을 다운받아 `android/app/` 아래로 복사한다.


### 인증 활성화

1. 대시보드의 `Authentication`을 클릭 후 `로그인 방법 설정` 을 클릭한다.
2. 이메일/비밀번호를 클릭하여 활성화 시킨다.

### Database 활성화

1. 대시보드의 `Database`를 클릭 후 Reatime Database 패널의 '시작하기' 버튼을 클릭한다.
2. '규칙' 탭에 들어가 규칙을 아래와 같이 수정 후 게시를 클릭하여 저장한다.

```json
{
  "rules": {
    ".read": true,
    ".write": "auth != null"
  }
}
```

### Storage 활성화

1. 대시보드의 `Storage`를 클릭한 후 '시작하기' 버튼을 클릭한다.
2. '규칙' 탭에 들어가 내용을 아래와 같이 수정한다.

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow write: if request.auth != null;
      allow read: if true;
    }
  }
}

```

## 실행

`react-native run-android`로 실행한다.
