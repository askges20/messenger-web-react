# 웹 메신저 사이트
웹 메신저 기능을 제공하는 React.js 기반 개인 프로젝트

## 제공 기능
- 회원가입 및 로그인 ✔
- 친구 검색 및 추가, 친구 목록 조회 ✔
- 1:1 채팅 내역 조회, 전송, 실시간 업데이트 ✔
- 채팅방 목록 보기 및 최신순 정렬 기능
- 단체방 생성 및 멤버 초대
- 회원 정보 수정
- 기타 기능 확장 예정

## 사용 기술
- Redux를 이용한 전역 상태 관리
- React Router을 이용한 라우팅 처리
- Google Firebase를 통해 사용자 정보, 채팅 정보 등 데이터 관리
- Formik을 이용한 Form 핸들링, Yup을 이용한 유효성 검사
- Styled Components를 이용한 컴포넌트 스타일링
- Class Components의 라이프 사이클 함수, Functional Components의 Hook 이용

## 개발 환경 및 도구
- IDE : VSCode
- 언어 : Javascript, JSX, SCSS 등
- 툴 : NPM, Yarn
- 데이터베이스 : Google Firebase Firestore & Realtime Database
- 사용자 관리 : Google Firebase Authentication
- 패키지 : firebase, react-router-dom, redux, react-redux, redux-thunk, formik, yup, moment, styled-components, react-custom-scrollbars ...

## 개발 일지
👉 [티스토리 블로그](https://askges20.tistory.com/category/Web/%5B%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%5D%20%EC%9B%B9%20%EB%A9%94%EC%8B%A0%EC%A0%80)

### 2021.09.12 기준 구현 모습
![메인 화면](https://user-images.githubusercontent.com/75527311/132988138-2065e464-bedd-4a65-bb0a-55039754d8b5.png)
<p align="center">회원가입 및 로그인 완료 후 메인 화면으로 이동, 친구 아이디를 검색하여 친구 추가 가능</p>

![1:1 채팅](https://user-images.githubusercontent.com/75527311/132988041-dbadbb35-4d9b-4322-ac28-c5fa9cfae68d.PNG)
<p align="center">사이드바의 친구 목록을 클릭하여 1:1 채팅방 이동 가능, 채팅 내역은 실시간 업데이트</p>
