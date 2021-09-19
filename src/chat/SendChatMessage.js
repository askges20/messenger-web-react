import React from 'react';
import styled from "styled-components";

const SendChatMessage = (props) => {
    return(
        <MessageContainer>
            <ChatBox>{props.content}</ChatBox>
            <ChatTime>{props.time.slice(0, 5)}</ChatTime>
        </MessageContainer>
        
    );
}

const MessageContainer = styled.div`
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    min-height: 50px;
    margin-bottom: 20px;
    margin-right: 10px;
`;

const ChatTime = styled.div`
    margin-right: 10px;
    color: gray;
    font-size: 0.8em;
`;

const ChatBox = styled.div`
    position: relative;
    max-width: 75%;
    background: lightgray;
    border-radius: 10px;
    padding: 10px;
    margin: 5px 10px;
    line-height: 1.3em;
    text-align: left;

    display: inline-block;
    flex: none;
    align-items: center;

    &:after {
        border-top:15px solid lightgray;
        border-right: 15px solid transparent;
        border-left: 0px solid transparent;
        border-bottom: 0px solid transparent;
        content:"";
        position:absolute;
        top:10px;
        right:-15px;
    }
`;

export default SendChatMessage;