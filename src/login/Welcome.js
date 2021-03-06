import React from 'react';
import styled from "styled-components";

import '../css/gradient_background.css';

import { useHistory } from 'react-router-dom';

const Welcome = (props) => {
    const history = useHistory();

    return(
        <WelcomeConatiner className='background'>
            <WelcomeTitle>๋ฐ๊ฐ์์!๐</WelcomeTitle>
            <WelcomeText><b>๋ฉ์ ์  ์น ์ฌ์ดํธ</b>์ ์ค์  ๊ฒ์ ํ์ํฉ๋๋ค.<br/>
            ์น๊ตฌ๋ฅผ ์ฐพ๊ณ  ์ ์ ๋ค๊ณผ ์ํตํด๋ณด์ธ์.</WelcomeText>
            <Btn
                onClick={() => {
                    history.push('/login');
                }}
            >๋ก๊ทธ์ธ</Btn>
            <Btn
                onClick={() => {
                    history.push('/signup');
                }}
            >ํ์๊ฐ์</Btn>
        </WelcomeConatiner>
    )
}

const WelcomeConatiner = styled.div`
    display:flex;
    width: 100%;
    height: 100vh;
    // overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const WelcomeTitle = styled.p`
    font-size: 30px;
    margin: 30px;
    color: white;
`;

const WelcomeText = styled.p`
    font-size: 18px;
    margin: 10px;
    color: white;
    line-height: 2.5;
    margin-bottom: 30px;
`;

const Btn = styled.button`
    padding: 10px 24px;
    background-color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 0px;
    width: 200px;
    margin: 10px 20px;
    cursor: pointer;
`;

export default Welcome;