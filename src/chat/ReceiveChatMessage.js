import React from 'react';
import styled from "styled-components";

const ReceiveChatMessage = (props) => {
    return(
        <MessageContainer>
            <FriendName>{props.friendName}</FriendName>
            <ChatBox>{props.content}</ChatBox>
            <ChatTime>{props.time}</ChatTime>
        </MessageContainer>
    );
}

const MessageContainer = styled.div`
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    min-height: 50px;
`;

const FriendName = styled.div`
    margin: 5px;
    margin-left: 10px;
`;

const ChatTime = styled.div`
    margin-left: 10px;
    color: gray;
`;

const ChatBox = styled.div`
    position: relative;
    max-width: 75%;
    background: pink;
    border-radius: 10px;
    padding: 10px;
    margin: 5px 10px;

    display: inline-block;
    flex: none;
    align-items: center;

    &:after {
        border-top:15px solid pink;
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