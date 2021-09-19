import React from 'react';
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';

import Profile from './Profile';
import FriendList from '../friend/FriendList';

const SideBar = (props) => {

    return(
        <Scrollbars
            autoHide
            autoHideTimeout = {2000}
            autoHideDuration = {500}
            renderView={props => (
                <div {...props}
                style = {{
                    ...props.style,
                    overflowX: 'hidden'
                }}/>
            )}
            renderTrackHorizontal={props =>
                <div {...props}
                style = {{
                    display: 'none'
                }}/>
            }
            style={{
                position: 'fixed',
                top: '50px',
                width: '20%',
                height: 'calc(100vh - 50px)',
                boxSizing: 'border-box',
                flexDirection: 'column',
                backgroundColor: '#B2CCFF'
            }}
        >
            <Profile/>
            <FriendList/>
        </Scrollbars>
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