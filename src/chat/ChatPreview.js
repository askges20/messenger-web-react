import React, { useEffect } from 'react';
import styled from "styled-components";

import { getChatMembers } from '../helpers/database';
import { onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const ChatPreview = (props) => {
    const id = useSelector(state => state.user.id);
    const senderId = props.senderId;
    const isRead = props.isRead;

    const [chatDate, setChatDate] = React.useState(0);
    const [chatRoomName, setChatRoomName] = React.useState('');

    useEffect(() => {
        setChatDate(props.dateTime);
        
        //채팅방 이름 짓기
        const memberRef = getChatMembers(props.chatRoomNum);  //채팅방 멤버 구하기
        onValue(memberRef, (members) => {
            let chatRoomName = '';
            members.forEach((member) => {
                if (member.key !== id) {
                    chatRoomName += ', ' + member.key;
                }
            })

            if (chatRoomName.length === 0) {
                setChatRoomName(id);    //나와의 채팅방
            } else {
                setChatRoomName(chatRoomName.slice(1,))
            }
        })
    }, [props.dateTime, props.chatRoomNum, id]);

    return(
        <ChatPreviewConatiner
            onClick={() => {
                window.open('/chatroom/' + chatRoomName + '/' + props.chatRoomNum, '', '_blank');
            }}
        >
            <ChatPreviewDiv1>
                <FriendName>{chatRoomName}</FriendName>
                <ChatContent>{props.content}</ChatContent>
            </ChatPreviewDiv1>
            <ChatPreviewDiv2>
                <LastChatTime>
                    {`${chatDate}`.slice(0, 4)}년 {`${chatDate}`.slice(4, 6).trimLeft()}월 {`${chatDate}`.slice(6, 8).trimLeft()}일</LastChatTime>
                {console.log(chatRoomName, isRead)}
                {isRead || (senderId === id) ? <div></div> : <NotReadChatCnt>N</NotReadChatCnt>}
            </ChatPreviewDiv2>
        </ChatPreviewConatiner>
    )
};

const ChatPreviewConatiner = styled.div`
    display: flex;
    padding: 30px;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
        background-color: #F3F3F3;
    }
`;

const ChatPreviewDiv1 = styled.div`
    width: calc(100% - 120px);
`;

const FriendName = styled.div`
    text-align: left;
    font-weight: 700;
    margin-bottom: 15px;
`;

const ChatContent = styled.div`
    text-align: left;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const ChatPreviewDiv2 = styled.div`
    width: 120px;
`;

const LastChatTime = styled.div`
    margin-bottom: 10px;
    font-size: 0.8em;
`;

const NotReadChatCnt = styled.span`
    display: inline-block;
    // width: 30px;
    // height: 30px;
    padding: 10px;
    line-height: 30px;
    
    color: white;
    background: #6799FF;
    // border-radius: 50%;

    clip-path: ellipse(50% 30% at 50% 50%);
`;

export default ChatPreview;