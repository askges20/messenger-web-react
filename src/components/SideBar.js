import React from 'react';
import styled from "styled-components";

import Profile from './Profile';
import FriendList from '../friend/FriendList';

const SideBar = (props) => {

    return(
        <SideBarConatiner>
            <Profile/>
            <FriendList/>
        </SideBarConatiner>
    )
};

const SideBarConatiner = styled.div`
    position: fixed;
    top: 50px;
    width: 20%;
    height: calc(100vh - 50px);
    overflow: scroll;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    flex-direction: column;
    background-color: #EDA0C7;
`;

export default SideBar;