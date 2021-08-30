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
    position: fixed;
    right: 0;
    display:flex;
    width: 80%;
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: yellow;
`;

const ChatBox = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 30px;
    background-color: white;
`;

export default ChatList;