import React from 'react';
import styled from "styled-components";
import { Scrollbars } from 'react-custom-scrollbars';

import ChatPreview from './ChatPreview';

const ChatList = (props) => {
    return(
        <ChatMainConatiner>
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
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'white',
                }}>
                <ChatListTitle>채팅 목록</ChatListTitle>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
                <ChatPreview/>
            </Scrollbars>
        </ChatMainConatiner>
    )
};

const ChatMainConatiner = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    display:flex;
    width: calc(100vw - 20%);
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFD9FA;
`;

const ChatListTitle = styled.h3`
    padding: 20px;
`;

export default ChatList;