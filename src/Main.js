import React from 'react';
import styled from "styled-components";

import TopBar from './components/TopBar';
import SideBar from './components/SideBar';
import ChatList from './chat/ChatList';

import { useHistory } from 'react-router-dom';
import FindFriends from './friend/FindFriends';

const Main = (props) => {
    const history = useHistory();
    const [menu, setMenu] = React.useState('friend');

    return(
        <MainConatiner>
            <TopBar/>
            <div>
                <SideBar/>
                {menu == 'friend' ? <FindFriends/> : <ChatList/>}
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

export default Main;