import React from 'react';
import styled from "styled-components";

import { firestore } from '../services/firebase';
import { useSelector } from 'react-redux';

const ChatRoom = (props) => {
    const loginId = useSelector(state => state.user.id);
    const chatRoomNum = props.match.params.chat_room_num;
    const content = React.useRef(); //채팅 input 박스

    function getDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        
        return year + month + day;
    }

    function getTime() {
        const today = new Date();
        const hours = ('0' + today.getHours()).slice(-2);
        const minutes = ('0' + today.getMinutes()).slice(-2);
        const seconds = ('0' + today.getSeconds()).slice(-2);

        return hours + ':' + minutes + ':' + seconds;
    }

    function sendMessage() {
        const value = content.current.value;

        if (value.length == 0) {
            alert('채팅 내용을 입력해주세요');
        } else {
            const date = getDate(); //채팅 내역 document에 사용
            const time = getTime(); //채팅 내역 메세지 field에 사용
            const messageCode = time + loginId;

            firestore.collection('chatRooms').doc(chatRoomNum).collection('chatMessages')
            .doc(date).collection('userMessage').doc(messageCode).set({content: value, time: time.slice(0, -3)}).then(
                //전송 완료 (DB 등록)
            );

            content.current.value = ''; //채팅 input 박스 비우기
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