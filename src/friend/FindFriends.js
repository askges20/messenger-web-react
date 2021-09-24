import React, { useEffect } from 'react';
import styled from "styled-components";

import FriendProfile from './FriendProfile';

import { TextField } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const FindFriends = (props) => {
    const [searchId, setSearchId] = React.useState('');   //검색 아이디 상태 관리

    useEffect(() => {
        console.log(searchId);
    });

    return(
        <FindFriendsConatiner>
            <h3 style={{margin:'20px'}}>채팅 친구를 찾아보세요!</h3>
            <p style={{margin:'10px'}}>친구의 아이디를 검색해서 찾을 수 있습니다.</p>
            <Formik
                initialValues={{id: ''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    id: Yup.string()
                    .required('아이디를 입력해주세요.'),
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    setSearchId(values.id); //상태에 아이디 등록
                }}
                >
                {formik => (
                    <form onSubmit={formik.handleSubmit}>
                        <TextField label="아이디" name="id" id="id" type="text" style={{margin: '15px'}}
                            {...formik.getFieldProps('id')}
                        />
                        <br/>
                        <ErrorMessage name="id">
                            { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                        </ErrorMessage>
                        <br/>
                        <FindFriendBtn className="defaultBtn" type="submit">친구 찾기</FindFriendBtn>
                    </form>
                )}
            </Formik>
            {searchId !== '' ? <FriendProfile friendId={searchId} key={searchId}/> : <div></div>}
        </FindFriendsConatiner>
    )
};

const FindFriendsConatiner = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    display:flex;
    width: 80%;
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #D9E5FF;
`;

const FindFriendBtn = styled.button`
    padding: 8px 24px;
    background-color: ${(props) => (props.outlined ? "#ffffff" : "#5587ED")};
    color: white;
    font-weight: 700;
    border-radius: 30px;
    border: 1px solid #dadafc;
    width: 150px;
    margin: 10px 20px;
    cursor: pointer;
`;

export default FindFriends;