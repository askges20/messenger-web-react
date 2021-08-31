import React, { useEffect } from 'react';
import styled from "styled-components";

import { firestore } from '../services/firebase';
import userImg from '../img/user.png';

import { useHistory } from 'react-router-dom';

const FriendProfile = (props) => {
    const history = useHistory();
    const friendId = props.friendId;
    const [isLoaded, setLoaded] = React.useState(false);
    const [friendName, setFriendName] = React.useState('');

    //firebase firestore에서 해당 유저 검색
    const findUser = () => {
        firestore.collection('users').get().then((docs) => {
            docs.forEach((doc) => {
                if (doc.data().id == friendId) {
                    setFriendName(doc.data().name);
                    setLoaded(true);
                }
            });
            setLoaded(true);
        })
    }
    
    useEffect(() => {
        findUser();
    }, []);

    const addFriend = () => {
        const select = prompt('친구로 추가하시겠습니까?');
        if (select) {
            console.log('친구 추가하기');
            // firestore.collection('users');
        }
    }

    return(
        <FriendProfileConatiner>
            {isLoaded ? (
                <div>
                    <FriendImg/>
                    <FriendName>{friendName}</FriendName>
                    <AddFriendBtn onClick={addFriend()}>친구 추가하기</AddFriendBtn>
                </div>
            ) : '친구 검색 중...'}
        </FriendProfileConatiner>
    )
};

const FriendProfileConatiner = styled.div`
    display:flex;
    width: 60%;
    max-width: 350px;
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