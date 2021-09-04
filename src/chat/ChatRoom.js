import React from 'react';
import styled from "styled-components";

const ChatRoom = (props) => {

    const content = React.useRef();

    function sendMessage() {
        const value = content.current.value;
        if (value.length == 0) {
            alert('채팅 내용을 입력해주세요');
        } else {
            console.log(content.current.value);
            content.current.value = '';
        }
    }

    return(
        <ChatRoomConatiner>
        <ChatBox>
            <ChatTopBar>{props.match.params.friend_name}</ChatTopBar>

            <ChatContent></ChatContent>

            <ChatInput ref={content}></ChatInput>
            <ChatInputBtn onClick={() => {
                sendMessage();
            }}>전송</ChatInputBtn>
        </ChatBox>
        </ChatRoomConatiner>
    )
}

const ChatRoomConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ChatBox = styled.div`
    position: relative;
    width: 90%;
    height: 90%;
    overflow: hidden;
    border-radius: 30px;
    background-color: white;
`;

const ChatTopBar = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    background-color: pink;
    text-align: left;
    line-height: 50px;
`;

const ChatContent = styled.div`
    position: absolute;
    top: 50px;
    left: 5%;
    width: 90%;
    height: calc(100% - 100px);
`;

const ChatInput = styled.input`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 50px;
    padding: 0 10px;
    background-color: lightgray;
    border: 0px solid pink;
    &:focus {
        outline: none;
    }
`;

const ChatInputBtn = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10%;
    height: 50px;
    background-color: #dadafc;
    border: 1px solid #dadafc;
    cursor: pointer;
`;

export default ChatRoom;