import React from 'react';
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';

import ChatPreview from './ChatPreview';

import { findLastMessage, getMyChatRoomRef } from '../helpers/database';

import { connect } from 'react-redux';
import { onValue } from '@firebase/database';

const mapStateToProps = (state) => ({
    loginUserId: state.user.id
})

class ChatList extends React.Component {

    // 사용자가 속한 채팅방 번호 구하기
    findMyChatRooms = () => {
        onValue(this.myChatRoomRef, (snapshot) => {
            let chatRoomFromFB = [];
            snapshot.forEach((chatRoom) => {
                const chatRoomNum = chatRoom.key;
                chatRoomFromFB.push(chatRoomNum);
            });

            this.setState(() => {
                return {myChatRooms: chatRoomFromFB};
            })

            this.findChatRoomMessages(chatRoomFromFB);
        })
    }

    // 각 채팅방의 가장 마지막 메세지 구하기
    findChatRoomMessages = (chatRooms) => {
        let lastMessageFromFB = [];
        chatRooms.forEach((chatRoom) => {
            const chatRoomLastMessage = findLastMessage(chatRoom);  //Firebase DB ref 찾기
            onValue(chatRoomLastMessage, (lastMessage) => {
                const chatRoomNum = chatRoom;
                const content = lastMessage.val().content;
                const dateTime = lastMessage.val().dateTime;
                const senderId = lastMessage.val().senderId;

                let flag = false;
                lastMessageFromFB.forEach((value, i) => {
                    if (value.chatRoomNum === chatRoomNum){ //기존에 있던 채팅방이면 값을 업데이트
                        lastMessageFromFB[i] = {chatRoomNum, content, dateTime, senderId};
                        flag = true;
                    }
                })
                if (!flag) {    //새로운 채팅방이면 push
                    lastMessageFromFB.push({chatRoomNum, content, dateTime, senderId});
                }

                //마지막 메세지들을 상태로 가짐
                this.setState(() => {
                    return {lastMessages: lastMessageFromFB};
                })
            })
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            myChatRooms: [],
            lastMessages: [],
        }
        this.myChatRoomRef = getMyChatRoomRef(this.props.loginUserId);  //DB ref 가져오기
    }

    componentDidMount() {
        this.findMyChatRooms(); //사용자가 속한 채팅방 목록 찾기
    }

    render() {
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
                        this.state.lastMessages.map((value, i) => {
                            return(<ChatPreview chatRoomNum={value.chatRoomNum} content={value.content} dateTime={value.dateTime} senderId={value.senderId} key={i}/>);
                        })
                    }
                </Scrollbars>
            </ChatMainConatiner>
        )
    }
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

export default connect(mapStateToProps)(ChatList);