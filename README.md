# 웹 메신저 사이트
웹 메신저 기능을 제공하는 React.js 기반 개인 프로젝트

## 제공 기능
- 회원가입 및 로그인 ✔
- 친구 검색 및 추가, 친구 목록 조회 ✔
- 1:1 채팅 내역 조회, 전송, 실시간 업데이트 ✔
- 채팅방 목록 보기 및 최신순 정렬 기능 ✔
- 프로필 정보 수정 ✔
- 단체방 생성 및 멤버 초대
- 기타 기능 확장 예정

## 사용 기술
- `Redux`를 이용한 `전역 상태 관리`
- `React Router`을 이용한 라우팅 처리
- `Google Firebase`를 통해 사용자 정보, 채팅 정보 등 데이터 관리
- Material UI, Styled Components를 이용한 `컴포넌트 스타일링`
- Formik을 이용한 `Form 핸들링`, Yup을 이용한 `유효성 검사`
- Class Components의 `라이프 사이클 함수`, Functional Components의 `Hook` 이용

## 개발 환경 및 도구
- IDE : VSCode
- 언어 : Javascript, JSX, SCSS 등
- 툴 : NPM, Yarn
- 데이터베이스 : Google Firebase Firestore & Realtime Database
- 사용자 관리 : Google Firebase Authentication
- 이미지 관리 : Google Firebase Storage 
- 패키지 : firebase, react-router-dom, redux, react-redux, redux-thunk, @material-ui/core, styled-components, formik, yup, moment, react-custom-scrollbars ...

## 개발 일지
👉 [티스토리 블로그](https://askges20.tistory.com/category/Web/%5B%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D%20%EC%9B%B9%20%EB%A9%94%EC%8B%A0%EC%A0%80)

### 2021.10.22 기준 구현 모습
<img src="https://user-images.githubusercontent.com/75527311/138340315-e65fce09-e765-4d51-b33d-46b46fa57169.PNG">
<p align="center">사이트 접속 시 웰컴 화면</p>
<br/>

<div align="center">
<img src="https://user-images.githubusercontent.com/75527311/138340380-b68e24d7-7893-46f2-9e97-ce60ffc23812.png" width="400">
<img src="https://user-images.githubusercontent.com/75527311/138340387-6626160a-84fd-4956-b70e-1afcaef14592.png" width="400">
</div>
<p align="center">로그인 / 회원가입</p>
<br/>

![210919_친구찾기](https://user-images.githubusercontent.com/75527311/134221402-46d4b8b8-e507-47c9-a28b-a12eef70ba9c.PNG)
<p align="center">메인 화면으로 이동, 친구 아이디를 검색하여 친구 추가 가능</p>
<br/>

![210919_채팅방 목록_1](https://user-images.githubusercontent.com/75527311/134221834-f62ff1af-76ac-4d68-b8fa-d9d61205c0e1.png)
<p align="center">채팅방 목록 조회 및 실시간 최신순 정렬</p>
<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/75527311/134221472-23b674ef-0983-4af9-ae92-d5bed0b43edb.png"/>
</div>
<p align="center">사이드바를 통해 1:1 채팅방 이동, 채팅 기능 구현 완료</p>
<br/>

<div align="center">
  <img src="https://user-images.githubusercontent.com/75527311/138340795-fe0f77fa-f9c6-4c0a-ad8c-35c4ef099420.PNG" height="400">
  <img src="https://user-images.githubusercontent.com/75527311/138340920-57f5f91e-dcfd-4715-99ab-f4084b57bdc2.PNG" height="400">
</div>
<p align="center">마이페이지에서 프로필 확인, 수정</p>
