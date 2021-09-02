import React from 'react';
import styled from "styled-components";

import userImg from '../img/user.png';
import { useSelector } from 'react-redux';

function Profile(props) {
    const id = useSelector(state => state.user.id);
    const name = useSelector(state => state.user.name);

    return(
        <ProfileConatiner>
            <ProfileImg/>
            <ProfileName>{name}</ProfileName>
            <ProfileId>@{id}</ProfileId>
        </ProfileConatiner>
    )
};

const ProfileConatiner = styled.div`
    box-sizing: border-box;
    flex-direction: column;
    margin-bottom: 30px;
`;

const ProfileImg = styled.img`
    width: 80%;
    height: 80%;
    border-radius: 50%;
    margin: 16px 0;
`;

const ProfileName = styled.p`
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 10px;
`;

const ProfileId = styled.p`
    font-size: 0.9rem;
`;

ProfileImg.defaultProps = {
    src: userImg,
}

export default Profile;