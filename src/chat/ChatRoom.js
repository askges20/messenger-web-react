import React, { useEffect } from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';

import SendChatMessage from './SendChatMessage';
import ReceiveChatMessage from './ReceiveChatMessage';

import { firestore } from '../services/firebase';
import { useSelector } from 'react-redux';

const ChatRoom = (props) => {
    const loginId = useSelector(state => state.user.id);
    const chatRoomNum = props.match.params.chat_room_num;
    const content = React.useRef(); //채팅 input 박스

    const [chatHistory, setChatHistory] = React.useState([]);   //채팅 기록을 상태로 관리
    const chatMessageFB = firestore.collection('chatRooms').doc(chatRoomNum).collection('chatMessages');

    useEffect(() => {
        chatMessageFB.doc('20210909').collection('userMessage').onSnapshot((docs) => {
            let chatFromFB = [];
            console.log(docs)
            docs.forEach((doc) => {
                chatFromFB.push({
                    senderId: doc.data().senderId,
                    content: doc.data().content,
                    time: doc.data().time
                })
            })
            setChatHistory(chatFromFB);
        });

        // chatMessageFB.get().then((docs) => {
        //     let chatFromFB = [];
        //     docs.forEach((doc) => {
        //         console.log("?");
        //         doc.ref.collection('userMessage').get().then((message) => {
        //             chatFromFB.push({
        //                 senderId: message.data().senderId,
        //                 content: message.data().content,
        //                 time: message.data().time
        //             })
        //         })
        //         setChatHistory(chatFromFB);
        //     })
        //     console.log(chatFromFB);
        // })
    }, []);

    function getDate() {
        return moment().format('YYYYMMDD');
    }

    function getTime() {
        return moment().format('HH:mm:ss');
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
            .doc(date).collection('userMessage').doc(messageCode).set({content: value, time: time.slice(0, -3), senderId: loginId}).then(
                //전송 완료 (DB 등록)
            );

            content.current.value = ''; //채팅 input 박스 비우기
        }
    }

    return(
        <ChatRoomConatiner>
        <ChatBox>
            <ChatTopBar>{props.match.params.friend_name}</ChatTopBar>

            <ChatContent>
                {
                    chatHistory.map((value, i) => {
                        if (value.senderId == loginId){
                            return (
                                <SendChatMessage key={i} content={value.content} time={value.time}/>
                            );
                        } else {
                            return (
                                <ReceiveChatMessage key={i} content={value.content} time={value.time} friendName={props.match.params.friend_name}/>
                            );
                        }
                    })
                }
            </ChatContent>

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
    border-radius: 20px;
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
    font-weight: 700;
`;

const ChatContent = styled.div`
    position: absolute;
    top: 50px;
    width: calc(100% - 20px);
    height: calc(100% - 100px);
    padding: 10px;
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