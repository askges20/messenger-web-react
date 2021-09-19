import React, { useEffect } from 'react';
import styled from "styled-components";

import { getChatMembers } from '../helpers/database';
import { onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const ChatPreview = (props) => {
    const id = useSelector(state => state.user.id);

    const [year, setYear] = React.useState(0);
    const [month, setMonth] = React.useState(0);
    const [date, setDate] = React.useState(0);
    const [chatRoomName, setChatRoomName] = React.useState('');

    const getChatRoomName = () => {
        const memberRef = getChatMembers(props.chatRoomNum);  //채팅방 멤버 구하기
        onValue(memberRef, (members) => {
            let chatRoomName = '';
            members.forEach((member) => {
                if (member.key != id) {
                    chatRoomName += ', ' + member.key;
                }
            })

            if (chatRoomName.length == 0) {
                setChatRoomName(id);    //나와의 채팅방
            } else {
                setChatRoomName(chatRoomName.slice(1,))
            }
        })
    }

    useEffect(() => {
        setYear(props.dateTime.slice(0, 4));
        setMonth(props.dateTime.slice(4, 6).trimLeft());
        setDate(props.dateTime.slice(6, 8).trimLeft());

        getChatRoomName();  //채팅방 이름 구하기
    }, );

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
                <LastChatTime>{year}년 {month}월 {date}일</LastChatTime>
                <NotReadChatCnt>2</NotReadChatCnt>
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
        background-color: #EAEAEA;
    }
`;

const ChatPreviewDiv1 = styled.div`
    width: 100%;
`;

const FriendName = styled.div`
    text-align: left;
    font-weight: 700;
    margin-bottom: 15px;
`;

const ChatContent = styled.div`
    text-align: left;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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
    
    font-weight: 700;
    color: #F15F5F;
    background: #FFD8D8;
    // border-radius: 50%;

    clip-path: ellipse(50% 30% at 50% 50%);
`;

export default ChatPreview;