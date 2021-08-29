import React from 'react';
import styled from "styled-components";

import { signIn } from '../helpers/auth';

import { Formik } from 'formik';
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
                        alert("로그인 성공!");
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
                        }
                    })
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>                        
                        <Input id="email" type="email" placeholder="이메일"
                            {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <br/>

                        <Input id="password" type="password" placeholder="비밀번호"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                        <br/>

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
    // justify-content: center;
    // align-items: center;
`;

const Input = styled.input`
    margin:10px;
`;

const SignInBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 10px 20px;
`;

export default Login;