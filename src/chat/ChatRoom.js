import React from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';
import { Scrollbars } from 'react-custom-scrollbars';

import ChatDateLine from './ChatDateLine';
import SendChatMessage from './SendChatMessage';
import ReceiveChatMessage from './ReceiveChatMessage';

import { addChatMessage, updateLastMessage, getChatHistory } from '../helpers/database';
import { connect } from 'react-redux';
import { onValue } from '@firebase/database';

const content = React.createRef(); //채팅 input 박스
const chatContentBox = React.createRef();

const mapStateToProps = (state) => ({
    loginId: state.user.id
})

class ChatRoom extends React.Component {

    sendMessage = () => {
        const value = content.current.value;
    
        if (value.length == 0) {    //채팅을 입력하지 않았을 때
            content.current.focus();    //focus 주기
            return; //전송하지 않음
        }

        const date = moment().format('YYYYMMDD'); //채팅 내역 document에 사용
        const messageCode = moment().format('HHmmss') + this.props.loginId;
        const sendTime = moment().format('HH:mm');

        //해당 채팅방의 채팅 내역에 추가
        addChatMessage(this.chatRoomNum, date, messageCode, content.current.value, this.props.loginId, sendTime);
        //해당 채팅방의 마지막 메세지 추가 (채팅방 목록 정렬 시 사용)
        updateLastMessage(this.chatRoomNum, content.current.value, this.props.loginId, date, sendTime);

        content.current.value = ''; //채팅 input 박스 비우기
        content.current.focus();    //focus 주기
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.sendMessage(this.props.loginId);
        }
    }

    constructor(props) {
        super(props);
        this.chatRoomNum = props.match.params.chat_room_num;
        this.friendName = props.match.params.friend_name;

        this.chatHistoryRef = getChatHistory(this.chatRoomNum); //DB ref 가져오기

        this.state = {
            chatHistory: [], //채팅 기록을 상태로 관리
            loadCnt: 0
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
        this.state.loadCnt += 1;
        console.log(this.state.loadCnt);
        content.current.focus();

        if (this.state.loadCnt == 3) {  //채팅방 입장 시 가장 아래로 스크롤
            chatContentBox.current.scrollToBottom();
            return;
        }

        const chatCnt = this.state.chatHistory.length;  //누적 채팅 개수
        if (chatCnt == 0){  //채팅 기록이 없거나 아직 채팅 내역을 불러오지 않은 상태
            return;
        }
        
        const lastSenderId = this.state.chatHistory[chatCnt - 1].senderId;
        console.log(lastSenderId);
        if (lastSenderId == this.props.loginId){    //채팅을 전송하면
            chatContentBox.current.scrollToBottom();    //채팅 가장 아래로 자동 스크롤
        }
    }

    render () {
        return (
            <ChatRoomConatiner>
            <ChatBox>
                <ChatTopBar>{this.friendName}</ChatTopBar>

                <Scrollbars ref={chatContentBox}
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
                        position: 'absolute',
                        top: '50px',
                        width: '100%',
                        height: 'calc(100% - 100px)',
                    }}>
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
                </Scrollbars>

                <ChatInput ref={content} onKeyPress={this.handleKeyPress}></ChatInput>
                <ChatInputBtn onClick={() => {
                    this.sendMessage();
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

const ChatInput = styled.input`
    position: absolute;
    bottom: 0;
    left: 0;
    width: calc(100% - 50px);
    height: 50px;
    padding: 0 20px;
    background-color: #EAEAEA;
    border: 0px solid pink;
    &:focus {
        outline: none;
    }

    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
`;

const ChatInputBtn = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100px;
    height: 50px;
    background-color: #dadafc;
    border: 1px solid #dadafc;
    cursor: pointer;
`;

// export default ChatRoom;
export default connect(mapStateToProps)(ChatRoom);