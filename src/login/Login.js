import React from 'react';
import styled from "styled-components";

import { signIn } from '../helpers/auth';
import { auth } from '../services/firebase';
import '../css/input.css';

import { TextField } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const history = useHistory();

    return(
        <SignInConatiner>
            <h2>로그인</h2>
            <Formik
                initialValues={{ name: '', email: '', id:'', password: ''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    email: Yup.string().required('이메일을 입력해주세요.'),
                    password: Yup.string().required('비밀번호를 입력해주세요.')
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    signIn(values.email, values.password).then(() => {
                        //인증 상태 지속성 유형 (현재는 LOCAL, 나중에 SESSION으로 변경할 것)
                        auth().setPersistence(auth.Auth.Persistence.SESSION).then(() => {
                            const provider = new auth.EmailAuthProvider();
                            auth().onAuthStateChanged((user) => {
                                if (user) {
                                    console.log('로그인 완료'+auth().currentUser.email);
                                    history.push('/');
                                } else {
                                    console.log('로그인되지 않음'+auth().currentUser.email);
                                    auth().signInWithPopup(provider)
                                    .then(() => {
                                        history.push('/')
                                    })
                                }
                            })
                        })
                        history.push('/');
                    }).catch((error) => {
                        switch(error.code){
                            case "auth/invalid-email":
                                alert("유효하지 않은 이메일입니다.");
                                break;
                            case "auth/user-not-found":
                                alert("사용자를 찾을 수 없습니다.");
                                break;
                            case "auth/wrong-password":
                                alert("비밀번호를 다시 확인해주세요.");
                                break;
                            default:
                                break;
                        }
                    })
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>                        
                        <TextField label="이메일" name="email" id="email" type="email"
                            style={{margin: '10px'}}
                            {...formik.getFieldProps('email')} />
                        <br/>
                        <ErrorMessage name="email">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>

                        <TextField label="비밀번호" name="password" id="password" type="password"
                            style={{margin: '10px'}}
                            {...formik.getFieldProps('password')}
                        />
                        <br/>
                        <ErrorMessage name="password">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>

                        <SignInBtn type="submit">로그인</SignInBtn>
                    </form>
                )}
            </Formik>
        </SignInConatiner>
    )
};

const SignInConatiner = styled.div`
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

const SignInBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#5587ED")};
    color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 30px 20px;
    cursor: pointer;
`;

export default Login;