import React from 'react';
import styled from "styled-components";

import { useHistory } from 'react-router-dom';

const Welcome = (props) => {
    const history = useHistory();

    return(
        <WelcomeConatiner>
        <WelcomeText>안녕하세요!</WelcomeText>
        <WelcomeText>처음이시면 회원가입을 해주세요.</WelcomeText>
            <Btn
                onClick={() => {
                    history.push('/login');
                }}
            >로그인</Btn>
            <Btn
                onClick={() => {
                    history.push('/signup');
                }}
            >회원가입</Btn>
        </WelcomeConatiner>
    )
}

const WelcomeConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WelcomeText = styled.p`
    font-size: 18px;
    margin: 10px;
`;

const Btn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#5587ED")};
    color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 10px 20px;
    cursor: pointer;
`;

export default Welcome;