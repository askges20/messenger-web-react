import React, { useEffect } from 'react';
import styled from "styled-components";
import moment from 'moment';
import 'moment/locale/ko';

import { useSelector } from 'react-redux';
import { firestore } from '../services/firebase';
import { addChatMember } from '../helpers/database';
import userImg from '../img/user.png';

const FriendProfile = (props) => {
    const loginUserEmail = useSelector(state => state.user.email);
    const loginUserId = useSelector(state => state.user.id);
    const friendId = props.friendId;
    const [isLoaded, setLoaded] = React.useState(false);
    const [friendEmail, setFriendEmail] = React.useState('');
    const [friendName, setFriendName] = React.useState('');
    const [friendIntro, setFriendIntro] = React.useState('');

    //firebase firestore에서 해당 유저 검색
    const findUser = () => {
        firestore.collection('users').get().then((docs) => {
            docs.forEach((doc) => {
                if (doc.data().id === friendId) {
                    setFriendEmail(doc.id);
                    setFriendName(doc.data().name);
                    setFriendIntro(doc.data().intro);
                    setLoaded(true);
                }
            });
            setLoaded(true);
        })
        console.log(isLoaded, friendName);
    }
    
    useEffect(() => {
        findUser();
    });

    //현재 날짜와 시간을 이용해서 채팅방 번호 생성
    function makeChatRoomNum() {
        return moment().format('YYYYMMDDHHmmss') + loginUserId;
    }

    //친구 추가
    const addFriend = () => {
        let popup = window.confirm('친구로 추가하시겠습니까?');
        if (popup) {    //'예'를 선택했을 때
            console.log('친구 추가하기');
            let chatRoomNum = '';

            firestore.collection('users').doc(friendEmail).collection('friends').doc(loginUserEmail).get().then((doc) => {
                if (doc.exists){    //이미 1:1 채팅방 존재
                    chatRoomNum = doc.data().chatRoomNum;
                } else {    //새로운 채팅방 만들기
                    chatRoomNum = makeChatRoomNum();

                    //채팅방 멤버로 등록 (Firestore -> Realtime Database)
                    addChatMember(chatRoomNum, loginUserId, loginUserEmail);
                    addChatMember(chatRoomNum, friendId, friendEmail);
                }
                
                //친구 등록 완료
                firestore.collection('users').doc(loginUserEmail).collection('friends').doc(friendEmail).set({id: friendId, name: friendName, chatRoomNum: chatRoomNum})
                .then(() => {
                    alert('친구로 등록되었습니다.')}
                );
            })
        }
    }

    return(
        <FriendProfileConatiner>
            {isLoaded ? friendName === '' ? 
            (<div>해당 아이디로 검색되는 유저가 없습니다.</div>) :
            (
                <div>
                    <FriendImg/>
                    <FriendName>{friendName}</FriendName>
                    {friendIntro === '' ? <div></div> : <FriendIntro>{friendIntro}</FriendIntro>}
                    <AddFriendBtn onClick={() => {addFriend()}}>친구 추가하기</AddFriendBtn>
                </div>
            ) :
            '친구 검색 중...'}
        </FriendProfileConatiner>
    )
};

const FriendProfileConatiner = styled.div`
    display:flex;
    width: 80%;
    max-width: 400px;
    min-height: 200px;
    padding: 20px;
    margin: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    &:hover {
        box-shadow: 0 3px 5px rgba(0,0,0,0.12), 0 3px 4px rgba(0,0,0,0.24);
    }
`;

const FriendImg = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
`;

const FriendName = styled.div`
    margin: 20px;
`;

const FriendIntro = styled.div`
    font-size: 0.8em;
    line-height: 1.2em;
    margin: 10px;
`;

FriendImg.defaultProps = {
    src: userImg,
}

const AddFriendBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#5587ED")};
    color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 1px solid #B2CCFF;
    width: 150px;
    margin: 10px 20px;
    cursor: pointer;
    box-shadow: 1px 2px #003399;
    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`;

export default FriendProfile;