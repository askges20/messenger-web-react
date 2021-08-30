import React from 'react';
import styled from "styled-components";

import { useHistory } from 'react-router-dom';

const SideBar = (props) => {
    const history = useHistory();

    return(
        <SideBarConatiner>
            <p>내용</p>
        </SideBarConatiner>
    )
};

const SideBarConatiner = styled.div`
    position: fixed;
    width: 20%;
    height: calc(100vh - 50px);
    overflow: scroll;
    padding: 16px;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    flex-direction: column;
    background-color: #EDA0C7;
`;

export default SideBar;