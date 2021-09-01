import React from 'react';
import './App.css';

import Welcome from './login/Welcome';
import Login from './login/Login';
import SignUp from './login/SignUp';
import Main from './Main';

import {withRouter} from 'react-router';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {getUserFB} from './redux/modules/user';

import { auth } from './services/firebase';

//스토어가 가진 상태값을 props로 받아오기 위한 함수
const mapStateToProps = (state) => {
  return {
    user_email: state.user.email,
    user_id: state.user.id,
    user_name: state.user.name,
    is_loaded: state.user.is_loaded,
  };
}

//상태 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수
const mapDispatchToProps = (dispatch) => {
  return {
    load: (email) => {
      dispatch(getUserFB(email));
    },
  }
}

class App extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    auth().onAuthStateChanged((user) => {
      if(user) {  //로그인한 상태일 때
        console.log('로그인한 이메일 : ' + user.email);
        this.setState({email: user.email});
        this.props.load(user.email);  //DB에서 사용자 정보 로드해서 Redux에 넣기
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
        {(this.props.user_email == '' ?
          <Route exact path='/' render={(props) => (<Welcome/>)}/> :
          <Route exact path='/' render={(props) => (<Main/>)}/>)
        }
        <Route path='/login' exact component={Login}/>
        <Route path='/signup' exact component={SignUp}/>
      </Switch>
    </div>
    );
  }
}

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));