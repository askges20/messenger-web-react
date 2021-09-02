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