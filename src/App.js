import React from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

import Welcome from './login/Welcome';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Main from './Main';

import { auth } from './services/firebase';

import {Route, Switch} from 'react-router-dom';

import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import { getUserNameFB } from './reudx/modules/user';

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
      email: null
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if(user) {  //로그인한 상태일 때
        console.log('로그인한 이메일 : ' + user.email);
        this.setState({email: user.email});
      } else {  //로그인 안한 상태일 때
        console.log('로그인 안된 상태');
      }
    });
  }

  render () {

    return(
    <div className="App">
      {/* 로그인 X -> Welcome 페이지, 로그인 O -> Chatting 페이지*/}
      <Switch>
        <Route path='/' exact component={this.state.email === null ? Welcome : Main}/>
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={SignUp}/>
      </Switch>
    </div>
    );
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));