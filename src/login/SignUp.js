import React from 'react';
import styled from "styled-components";

import { firestore } from "../firebase";

import { Formik, Field, Form} from 'formik';
import * as Yup from 'yup';

const SignUp = (props) => {

    const users = firestore.collection("users");

    return(
        <SignUpConatiner>
            <h2>회원가입</h2>
            <Formik
                initialValues={{ name: '', email: '', id:'', password: ''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    name: Yup.string()
                    .max(10, '이름은 10글자 이하로 작성해주세요.')
                    .required('이름을 입력해주세요.'),
                    email: Yup.string().email('유효한 이메일 형식이 아닙니다.')
                    .required('이메일을 작성해주세요.'),
                    id: Yup.string()
                    .max(15, '아이디는 15글자 이하로 작성해주세요.')
                    .required('아이디를 작성해주세요.'),
                    password: Yup.string()
                    .max(20, '비밀번호는 20글자 이하로 작성해주세요.')
                    .required('비밀번호를 입력해주세요.')
                })}

                onSubmit={(values, { setSubmitting }) => {
                    users.doc(values.id).set(values);   //DB에 유저 정보 등록
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <Input id="name" type="text" placeholder="이름"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                        ) : null}
                        <br/>
                        
                        <Input id="email" type="email" placeholder="이메일"
                            {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}
                        <br/>

                        <Input id="id" type="text" placeholder="아이디"
                            {...formik.getFieldProps('id')}
                        />
                        {formik.touched.id && formik.errors.id ? (
                            <div>{formik.errors.id}</div>
                        ) : null}
                        <br/>

                        <Input id="password" type="password" placeholder="비밀번호"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}
                        <br/>

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

const SignUpBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 10px 20px;
`;

export default SignUp;