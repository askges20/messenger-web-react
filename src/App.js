import logo from './logo.svg';
import './App.css';
import Welcome from './login/Welcome';
import React from 'react';

import {Route, Switch} from 'react-router-dom';

import {withRouter} from 'react-router';
import {connect} from 'react-redux';

//스토어가 가진 상태값을 props로 받아오기 위한 함수
const mapStateToProps = (state) => ({
  ...state,
})

//상태 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수
const mapDispatchToProps = (dispatch) => ({
  load:() => {

  }
})

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      //redux로 상태 관리
    };
  }

  render () {
    return(
    <div className="App">
      {/* 로그인 X -> Welcome 페이지, 로그인 O -> Chatting 페이지*/}
      <Welcome/>
    </div>
    );
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));