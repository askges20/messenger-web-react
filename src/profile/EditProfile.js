import React, { useEffect } from 'react';
import styled from "styled-components";

import { TextField } from '@material-ui/core';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useHistory } from 'react-router-dom';

const EditProfile = (props) => {
    const history = useHistory();

    useEffect(() => {
    });

    return(
        <EditProfileConatiner>
            <h3 style={{margin:'20px'}}>프로필 수정</h3>
            <Formik
                initialValues={{id: ''}}

                validationSchema={
                    //유효성 검사 스키마
                    Yup.object({
                    id: Yup.string()
                    .required('아이디를 입력해주세요.'),
                })}

                onSubmit = {(values, { setSubmitting }) => {
                    //setSearchId(values.id); //상태에 아이디 등록
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
                        <EditProfileBtn className="defaultBtn" type="submit">친구 찾기</EditProfileBtn>
                    </form>
                )}
            </Formik>
        </EditProfileConatiner>
    )
};

const EditProfileConatiner = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    display:flex;
    width: 20%;
    height: calc(100vh - 50px);
    padding: 20px;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #D9E5FF;
`;

const EditProfileBtn = styled.button`
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

export default EditProfile;