import React from 'react';
import styled from "styled-components";

import ChatList from './chat/ChatList';

import { useHistory } from 'react-router-dom';

const Main = (props) => {
    const history = useHistory();

    return(
        <MainConatiner>
            <h2>메인 화면</h2>
            <ChatList/>
        </MainConatiner>
    )
};

const MainConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
`;

export default Main;