import React from 'react';
import styled from "styled-components";

const Login = (props) => {
    return(
        <LoginConatiner>
        <h2>로그인</h2>
        </LoginConatiner>
    )
}

const LoginConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
`;

export default Login;