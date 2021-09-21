import React from 'react';
import styled from "styled-components";

import SideBar from './components/SideBar';
import FindFriends from './friend/FindFriends';
import ChatList from './chat/ChatList';
import MyProfile from './profile/MyProfile';

import { useHistory } from 'react-router-dom';
import { userSignOut } from './helpers/auth';
import { resetUser } from './redux/modules/user';
import { useDispatch } from 'react-redux';

import ChatIcon from './img/chat-icon.png';
import FriendIcon from './img/friends-icon.png';
import LogoutIcon from './img/logout-icon.png';
import EditProfileIcon from './img/edit-profile-icon.png';

const Main = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const [menu, setMenu] = React.useState('edit');   //메뉴 선택 값을 상태 관리

    const logout = () => {
        let popup = window.confirm('로그아웃 하시겠습니까?');
        if (popup) {    //'예'를 선택했을 때
            userSignOut();  //로그아웃
            dispatch(resetUser());  //redux 유저 정보 초기화
            history.push('/'); //웰컴 화면으로 이동
        }
    }

    // 선택한 메뉴에 따라 다른 화면 렌더링
    const MainContent = () => {
        switch (menu){
            case 'friend':
                return <FindFriends/>;
                break;
            case 'chat':
                return <ChatList/>;
                break;
            case 'edit':
                return <MyProfile/>;
                break;
            default:
                return <ChatList/>;
        }
    }

    return(
        <MainConatiner>
            <TopBarConatiner>
                <TopBarIcon src={ChatIcon} onClick={() => {
                    setMenu('chat');
                }}>
                </TopBarIcon>
                <TopBarIcon src={FriendIcon} onClick={() => {
                    setMenu('friend');
                }}/>
                <TopBarIcon src={EditProfileIcon} onClick={() => {
                    setMenu('edit');
                }}/>
                <TopBarIcon src={LogoutIcon} onClick={() => {
                    logout();
                }}/>
            </TopBarConatiner>
            <div>
                <SideBar/>
                <MainContent/>
            </div>
        </MainConatiner>
    )
};

const MainConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    box-sizing: border-box;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
`;

const TopBarConatiner = styled.div`
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    box-sizing: border-box;
    background: linear-gradient( to top, #9DCFFF, #6799FF );
    text-align: right;
`;

const TopBarIcon = styled.img`
    padding-top: 10px;
    height: 30px;
    align: center;
    margin: 0 10px;
    cursor: pointer;
    //filter: opacity(0.5) drop-shadow(0 0 0 #003399);
`;

export default Main;