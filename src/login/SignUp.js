import React from 'react';
import styled from "styled-components";

import '../css/gradient_background.css';

import { firestore } from "../services/firebase";
import { signUp } from '../helpers/auth';
import '../css/input.css';

import { TextField } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

const SignUp = (props) => {

    const users = firestore.collection("users");
    const history = useHistory();

    return(
        <SignUpConatiner className='background'>
            {/* <h2 style={{color:'white'}}>회원가입</h2> */}
            <Formik
                initialValues={{ name: '', email: '', id:'', password: '', intro:''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    name: Yup.string()
                    .max(10, '이름은 10글자 이하로 작성해주세요.')
                    .required('이름을 입력해주세요.'),
                    email: Yup.string().email('유효한 이메일 형식이 아닙니다.')
                    .required('이메일을 작성해주세요.'),
                    id: Yup.string()
                    .min(5, '아이디는 최소 5글자 이상 작성해주세요.')
                    .max(15, '아이디는 15글자 이하로 작성해주세요.')
                    .required('아이디를 작성해주세요.'),
                    password: Yup.string()
                    .min(8, '비밀번호는 최소 8글자 이상 작성해주세요.')
                    .max(20, '비밀번호는 20글자 이하로 작성해주세요.')
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, '비밀번호는 영어, 숫자, 특수기호를 포함하여 작성해주세요.')
                    .required('비밀번호를 입력해주세요.'),
                    intro: Yup.string()
                    .max(150, '소개글은 150글자 이하로 작성해주세요')
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    users.doc(values.email).set({'id':values.id, 'name':values.name, 'intro':values.intro});   //DB에 유저 정보 등록
                    signUp(values.email, values.password);
                    alert('회원가입이 완료되었습니다.');
                    history.push('/login');
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <FormContainer>
                        <TextField label="이름" name="name" id="name" type="text" variant="outlined"
                            style={{margin: '10px', backgroundColor: 'white'}}
                            {...formik.getFieldProps('name')}
                        />
                        <br/>
                        <ErrorMessage name="name">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>
                        
                        <TextField label="이메일" name="email" id="email" type="email" variant="outlined"
                            style={{margin: '10px', backgroundColor: 'white'}}
                            {...formik.getFieldProps('email')} />
                        <br/>
                        <ErrorMessage name="email">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>

                        <TextField label="아이디" name="id" id="id" type="text" variant="outlined"
                            style={{margin: '10px', backgroundColor: 'white'}}
                            {...formik.getFieldProps('id')}
                        />
                        <br/>
                        <ErrorMessage name="id">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>

                        <TextField label="비밀번호" name="password" id="password" type="password" variant="outlined"
                            style={{margin: '10px', backgroundColor: 'white'}}
                            {...formik.getFieldProps('password')}
                        />
                        <br/>
                        <ErrorMessage name="password">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>

                        <TextField label="소개글" name="intro" id="intro" type="text" variant="outlined"
                            multiline rows={4}
                            style={{marign: '10px', backgroundColor: 'white'}}
                            {...formik.getFieldProps('intro')}
                        />
                        <ErrorMessage name="intro">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>
                        </FormContainer>

                        <SignUpBtn type="submit">가입하기</SignUpBtn>
                    </form>
                )}
            </Formik>
        </SignUpConatiner>
    )
};

const SignUpConatiner = styled.div`
    display:flex;
    width: 100vw;
    height: 100vh;
    // overflow: hidden;
    padding: 16px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FormContainer = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 30px 20px;
    margin: 20px;
`;

const SignUpBtn = styled.button`
    padding: 10px 24px;
    background-color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 0px;
    width: 200px;
    margin: 10px 20px;
    cursor: pointer;
`;

export default SignUp;