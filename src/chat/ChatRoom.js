import React from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';

import ChatDateLine from './ChatDateLine';
import SendChatMessage from './SendChatMessage';
import ReceiveChatMessage from './ReceiveChatMessage';

import { addChatMessage, getChatHistory } from '../helpers/database';
import { connect } from 'react-redux';
import { onValue } from '@firebase/database';

let isLoaded = 0;
const content = React.createRef(); //채팅 input 박스
const chatContentBox = React.createRef();

const mapStateToProps = (state) => ({
    loginId: state.user.id
})

class ChatRoom extends React.Component {

    sendMessage = (loginId) => {
        const value = content.current.value;
    
        if (value.length == 0) {
            alert('채팅 내용을 입력해주세요');
        } else {
            const date = moment().format('YYYYMMDD'); //채팅 내역 document에 사용
            const messageCode = moment().format('HHmmss') + loginId;
            const sendTime = moment().format('HH:mm');

            addChatMessage(this.chatRoomNum, date, messageCode, content.current.value, loginId, sendTime);
            content.current.value = ''; //채팅 input 박스 비우기
        }
    }

    constructor(props) {
        super(props);
        this.chatRoomNum = props.match.params.chat_room_num;
        this.friendName = props.match.params.friend_name;

        this.chatHistoryRef = getChatHistory(this.chatRoomNum); //DB ref 가져오기

        this.state = {
            chatHistory: [] //채팅 기록을 상태로 관리
        }

        onValue(this.chatHistoryRef, (snapshot) => {
            let chatFromFB = []
            snapshot.forEach((chatDate) => {
                const year = chatDate.key.slice(0, 4)
                const month = chatDate.key.slice(4, 6).trimLeft();
                const date = chatDate.key.slice(6, 8).trimLeft();
                chatFromFB.push({year, month, date});

                chatDate.forEach((chat) => {    // 각 채팅 데이터
                    const content = chat.val().content;
                    const senderId = chat.val().senderId;
                    const time = chat.val().time;
                    chatFromFB.push({content, senderId, time});
                })
            })

            this.setState(() => {
                return {chatHistory: chatFromFB}
            })
        });
    }

    componentDidUpdate() {
        if (isLoaded >= 3) {
            chatContentBox.current.scrollBy({top: chatContentBox.current.scrollHeight, behavior: 'smooth'});
        } else {    //첫 로딩은 smooth 없이
            chatContentBox.current.scrollBy({top: chatContentBox.current.scrollHeight});
        }
        isLoaded += 1;
        console.log(isLoaded);
    }

    render () {
        return (
            <ChatRoomConatiner>
            <ChatBox>
                <ChatTopBar>{this.friendName}</ChatTopBar>

                <ChatContent ref={chatContentBox}>
                    {
                        this.state.chatHistory.map((value, i) => {
                            if (!value.senderId){
                                return (
                                    <ChatDateLine key={i} year={value.year} month={value.month} date={value.date}/>
                                )
                            } else if (value.senderId == this.props.loginId){
                                return (
                                    <SendChatMessage key={i} content={value.content} time={value.time}/>
                                );
                            } else {
                                return (
                                    <ReceiveChatMessage key={i} content={value.content} time={value.time} friendName={this.friendName}/>
                                );
                            }
                        })
                    }
                </ChatContent>

                <ChatInput ref={content}></ChatInput>
                <ChatInputBtn onClick={() => {
                    this.sendMessage(this.props.loginId);
                }}>전송</ChatInputBtn>
            </ChatBox>
            </ChatRoomConatiner>
        );
    }
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
    width: 100%;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: scroll;
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

// export default ChatRoom;
export default connect(mapStateToProps)(ChatRoom);