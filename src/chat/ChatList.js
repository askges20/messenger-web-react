import React, { useEffect } from 'react';
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';

import ChatPreview from './ChatPreview';

import { findLastMessage, getMyChatRoomRef } from '../helpers/database';

import { useSelector } from 'react-redux';
import { onValue } from '@firebase/database';

const ChatList = (props) => {
    const [myChatRooms, setMyChatRooms] = React.useState([]);
    const [lastMessages, setLastMessages] = React.useState([]);
    const loginUserId = useSelector(state => state.user.id);
    const myChatRoomRef = getMyChatRoomRef(loginUserId);

    const findMyChatRooms = () => {
        onValue(myChatRoomRef, (snapshot) => {
            let chatRoomFromFB = [];
            let lastMessageFromFB = [];
            snapshot.forEach((chatRoomNum) => {
                chatRoomFromFB.push(chatRoomNum.key);
                const chatRoomLastMessage = findLastMessage(chatRoomNum.key);
                onValue(chatRoomLastMessage, (lastMessage) => {
                    console.log(lastMessage.val().content);
                    console.log(lastMessage.val().dateTime);
                    console.log(lastMessage.val().senderId);

                    const content = lastMessage.val().content;
                    const dateTime = lastMessage.val().dateTime;
                    const senderId = lastMessage.val().senderId;
                    // const senderId = chatRoomNum.key;

                    lastMessageFromFB.push({content, dateTime, senderId});
                    // {채팅방 번호 : {content, dateTime, senderId}} 로 해서 update 할 수 있도록

                    setLastMessages(lastMessageFromFB);
                })
            });
            setMyChatRooms(chatRoomFromFB); //상태
        })
    }

    useEffect(() => {
        findMyChatRooms();
    }, []);

    return(
        <ChatMainConatiner>
            <Scrollbars
                autoHide
                autoHideTimeout = {2000}
                autoHideDuration = {500}
                renderView={props => (
                    <div {...props}
                    style = {{
                        ...props.style,
                        overflowX: 'hidden'
                    }}/>
                )}
                renderTrackHorizontal={props =>
                    <div {...props}
                    style = {{
                        display: 'none'
                    }}/>
                }
                style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}>
                <ChatListTitle>채팅 목록</ChatListTitle>
                {
                    lastMessages.map((value, i) => {
                        console.log('렌더링')
                        return(<ChatPreview content={value.content} dateTime={value.dateTime} senderId={value.senderId} key={i}/>);
                    })
                }
            </Scrollbars>
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

const ChatListTitle = styled.h3`
    padding: 20px;
`;

export default ChatList;