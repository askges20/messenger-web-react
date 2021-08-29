import React from 'react';
import styled from "styled-components";

import { useHistory } from 'react-router-dom';

const ChatList = (props) => {
    const history = useHistory();

    return(
        <ChatMainConatiner>
            <h2>채팅 화면</h2>
        </ChatMainConatiner>
    )
};

const ChatMainConatiner = styled.div`
    display:flex;
    width: 100%;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    // justify-content: center;
    // align-items: center;
`;

export default ChatList;