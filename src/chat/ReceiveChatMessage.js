import React from 'react';
import styled from "styled-components";

import '../css/shadow.css';

const ReceiveChatMessage = (props) => {
    return(
        <MessageContainer>
            <FriendName>{props.friendName}</FriendName>
            <ChatBox className="shadow">{props.content}</ChatBox>
            <ChatTime>{props.time.slice(0, 5)}</ChatTime>
        </MessageContainer>
    );
}

const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    min-height: 50px;
    margin-bottom: 20px;
    margin-left: 10px;
`;

const FriendName = styled.div`
    margin: 5px;
    margin-left: 10px;
`;

const ChatTime = styled.div`
    margin-left: 10px;
    color: gray;
    font-size: 0.8em;
`;

const ChatBox = styled.div`
    position: relative;
    max-width: 75%;
    background: #5587ED;
    border-radius: 10px;
    padding: 10px;
    margin: 5px 10px;
    line-height: 1.3em;
    text-align: left;
    color: white;
    font-weight: 300;

    display: inline-block;
    flex: none;
    align-items: center;

    &:after {
        border-top:15px solid #5587ED;
        border-left: 15px solid transparent;
        border-right: 0px solid transparent;
        border-bottom: 0px solid transparent;
        content:"";
        position:absolute;
        top:10px;
        left:-15px;
    }
`;

export default ReceiveChatMessage;