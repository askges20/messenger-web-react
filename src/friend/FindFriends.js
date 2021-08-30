import React from 'react';
import styled from "styled-components";

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

const FindFriends = (props) => {
    const history = useHistory();

    return(
        <FindFriendsConatiner>
            <h4>채팅 친구를 찾아보세요!</h4>
            <p>친구의 아이디를 검색해서 찾을 수 있습니다.</p>
            <Formik
                initialValues={{id: ''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    id: Yup.string()
                    .required('아이디를 입력해주세요.'),
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    alert('친구를 검색합니다.');
                    history.push('/');
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <Input id="id" type="text" placeholder="아이디"
                            {...formik.getFieldProps('id')}
                        />
                        {formik.touched.id && formik.errors.id ? (
                            <div>{formik.errors.id}</div>
                        ) : null}
                        <br/>
                        <FindFriendBtn type="submit">친구 찾기</FindFriendBtn>
                    </form>
                )}
            </Formik>
        </FindFriendsConatiner>
    )
};

const FindFriendsConatiner = styled.div`
    position: fixed;
    right: 0;
    display:flex;
    width: 80%;
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFD9FA;
`;

const Input = styled.input`
    margin:10px;
`;

const FindFriendBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#dadafc")};
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 200px;
    margin: 10px 20px;
`;

export default FindFriends;