import React from 'react';
import styled from "styled-components";

import { useHistory } from 'react-router-dom';

const TopBar = (props) => {
    const history = useHistory();

    return(
        <TopBarConatiner>
            <TopBarIcon>채팅</TopBarIcon>
            <TopBarIcon>친구 찾기</TopBarIcon>
        </TopBarConatiner>
    )
};

const TopBarConatiner = styled.div`
    position: sticky;
    top: 0;
    width: 100%;
    height: 50px;
    padding: 10px;
    box-sizing: border-box;
    background: linear-gradient( to top, #FFA9EE, #FF85CA );
    text-align: right;
`;

const TopBarIcon = styled.div`
    display: inline;
    height: 100%;
    align: center;
    margin: 0 10px;
`;

export default TopBar;