import React from 'react';
import styled from "styled-components";

const Welcome = (props) => {
    return(
        <WelcomeConatiner>
        <p>안녕하세요! 처음이시면 회원가입을 해주세요.</p>
            <Btn
                onClick={() => {
                    window.location.href='/login';
                }}
            >로그인</Btn>
            <Btn
                onClick={() => {
                    window.location.href='/signup';
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

const Btn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 10px 20px;
`;

export default Welcome;