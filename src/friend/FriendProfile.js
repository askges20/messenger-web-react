import React, { useEffect } from 'react';
import styled from "styled-components";

import { useSelector, useDispatch } from 'react-redux';
import { firestore } from '../services/firebase';
import userImg from '../img/user.png';

const FriendProfile = (props) => {
    const loginUserEmail = useSelector(state => state.user.email);
    const friendId = props.friendId;
    const [isLoaded, setLoaded] = React.useState(false);
    const [friendEmail, setFriendEmail] = React.useState('');
    const [friendName, setFriendName] = React.useState('');

    //firebase firestore에서 해당 유저 검색
    const findUser = () => {
        firestore.collection('users').get().then((docs) => {
            docs.forEach((doc) => {
                if (doc.data().id == friendId) {
                    setFriendEmail(doc.id);
                    setFriendName(doc.data().name);
                    setLoaded(true);
                }
            });
            setLoaded(true);
        })
        console.log(isLoaded, friendName);
    }
    
    useEffect(() => {
        findUser();
    }, []);

    //친구 추가
    const addFriend = () => {
        let popup = window.confirm('친구로 추가하시겠습니까?');
        if (popup) {    //'예'를 선택했을 때
            console.log('친구 추가하기');
            firestore.collection('users').doc(loginUserEmail).collection('friends').doc(friendEmail).set({id: friendId, name: friendName})
                .then(() => {alert('친구로 등록되었습니다.')});
        }
    }

    return(
        <FriendProfileConatiner>
            {isLoaded ? friendName == '' ? 
            (<div>해당 아이디로 검색되는 유저가 없습니다.</div>) :
            (
                <div>
                    <FriendImg/>
                    <FriendName>{friendName}</FriendName>
                    <AddFriendBtn onClick={() => {addFriend()}}>친구 추가하기</AddFriendBtn>
                </div>
            ) :
            '친구 검색 중...'}
        </FriendProfileConatiner>
    )
};

const FriendProfileConatiner = styled.div`
    display:flex;
    width: 60%;
    max-width: 350px;
    min-height: 150px;
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

FriendImg.defaultProps = {
    src: userImg,
}

const AddFriendBtn = styled.button`
    padding: 8px 24px;
    background-color: #dadafc;
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 150px;
    margin: 10px 20px;
    cursor: pointer;
    box-shadow: 1px 2px purple;
    &:active {
        box-shadow: 1px 1px 0 rgb(0,0,0,0.5);
        position: relative;
        top:2px;
    }
`;

export default FriendProfile;