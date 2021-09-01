import React from 'react';
import styled from "styled-components";

import { useHistory } from 'react-router-dom';

const ChatList = (props) => {
    const history = useHistory();

    return(
        <ChatMainConatiner>
            <ChatBox>
            </ChatBox>
        </ChatMainConatiner>
    )
};

const ChatMainConatiner = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    display:flex;
    width: calc(100vw - 20%);
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFD9FA;
`;

const ChatBox = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: white;
`;

export default ChatList;