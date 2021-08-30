import React, { useEffect } from 'react';
import styled from "styled-components";

import userImg from '../img/user.png';
import { auth, firestore } from '../services/firebase';
import { useHistory } from 'react-router-dom';

function Profile(props) {
    const history = useHistory();
    const [id, setId] = React.useState('id');
    const [name, setName] = React.useState('name');

    useEffect(() => {
        auth().onAuthStateChanged((user) => {
            console.log('로그인한 이메일 : ' + user.email);
            const users = firestore.collection('users');
            users.doc(user.email).get().then((doc) => {
                setId(doc.data().id);
                setName(doc.data().name);
            });
        });
    }, []);

    return(
        <ProfileConatiner>
            <ProfileImg/>
            <h3>{name}</h3>
            <p>@{id}</p>
        </ProfileConatiner>
    )
};

const ProfileConatiner = styled.div`
    box-sizing: border-box;
    flex-direction: column;
`;

const ProfileImg = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 50%;
    margin-bottom: 15px;
`;

ProfileImg.defaultProps = {
    src: userImg,
}

export default Profile;