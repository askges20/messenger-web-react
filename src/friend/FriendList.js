import React, { useEffect } from 'react';
import styled from 'styled-components';

import { firestore } from '../services/firebase';
import { useSelector } from 'react-redux';

import '../css/btn.css';

const FriendList = (props) => {
    const loginEmail = useSelector(state => state.user.email);
    const [friends, setFriends] = React.useState([]);
    const usersFB = firestore.collection('users');

    useEffect(() => {
        usersFB.doc(loginEmail).collection('friends').onSnapshot((docs) => {
            let listFromFB = [];

            //현재는 친구 등록 시 name을 같이 저장해서 바로 가져올 수 있음
            //나중에 가능하면 name은 사용자 정보를 검색해서 가져오도록 바꿀 것
            docs.forEach((doc) => {
                listFromFB.push({email: doc.id, id: doc.data().id, name: doc.data().name});
            });
            setFriends(listFromFB);

            // docs.forEach((doc) => {
            //     usersFB.doc(doc.id).get().then((doc) => {
            //         const name = doc.data().name;
            //         listFromFB.push({email: doc.id, id: doc.data().id, name: name});
            //         console.log(name, listFromFB);
            //         setFriends(listFromFB);
            //     });
            // });
    })}, []);

    return (
        <FriendListContainer>
            <h4 style={{textAlign: 'left', margin: '10px'}}>친구 목록</h4>
            {
                friends.map((value, i) => {
                    return (
                        <div className="btn10" key={i}>
                            <span>{value.name}</span>
                            <div className="transition"></div>
                        </div>
                    );
                })
            }
        </FriendListContainer>
    );
};

const FriendListContainer = styled.div`
    width: 100%;
    // background-color: white;
`;

export default FriendList;