import React, { useEffect } from 'react';
import styled from "styled-components";

import { firestore } from "../services/firebase";
import userImg from '../img/user.png';

import { TextField } from '@material-ui/core';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const EditProfile = (props) => {
    const history = useHistory();

    const users = firestore.collection("users");

    const changeMenu = props.changeMenu;
    const name = useSelector(state => state.user.name);
    const email = useSelector(state => state.user.email);
    const intro = useSelector(state => state.user.intro);
    
    useEffect(() => {
    });

    function cancelEdit() {
        changeMenu(false);
    }

    function selectImg() {
        alert('클릭');
    }

    return(
        <EditProfileConatiner>
            <ProfileContainer1>
                <ImgArea style={{cursor: 'pointer'}} onClick={selectImg}>
                    <ProfileImg/>
                    <ImageSearchOutlinedIcon
                        style={{   
                            position: 'absolute',
                            bottom: '15px',
                            right: '15px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            padding: '5px',
                            width: '25px',
                            height: '25px',
                            cursor: 'pointer',
                        }}
                    />
                </ImgArea>
            </ProfileContainer1>
            <ProfileContainer2>
                <div style={{
                    cursor: 'pointer',
                    position: 'absolute',
                    width: '200px',
                    height: '50px',
                    top: 0,
                    left: 'calc(50% - 100px)'
                }}
                onClick={selectImg}
                />
                <Formik
                    initialValues={{name, intro}}

                    validationSchema={
                        //유효성 검사 스키마
                        Yup.object({
                        name: Yup.string()
                        .required('이름을 입력해주세요.'),
                        intro: Yup.string()
                        // .required('소개글을 입력해주세요.')
                    })}

                    onSubmit = {(values, { setSubmitting }) => {
                        //setSearchId(values.id); //상태에 아이디 등록
                        users.doc(email).update({'name': values.name, 'intro': values.intro}).then(() => {
                                alert("프로필 수정이 완료되었습니다!");
                                // changeMenu(false);
                                history.push('/');
                            }
                        )
                    }}
                    >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                name="name" id="name" type="text"
                                style={{marginBottom: '10px'}}
                                {...formik.getFieldProps('name')}
                            />
                            <br/>
                            <ErrorMessage name="name">
                                { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                            </ErrorMessage>
                            <br/>

                            <TextField
                                multiline name="intro" id="intro" type="text"
                                placeholder="소개글"
                                minRows={2} maxRows={8}
                                style={{width: '80%', maxWidth: '500px', marginBottom: '10px'}}
                                {...formik.getFieldProps('intro')}
                                />
                            <br/>
                            <ErrorMessage name="intro">
                                { msg => <div style={{ color: '#6B66FF' }}>{msg}</div> }
                            </ErrorMessage>
                            <br/>
                            <Btn onClick={cancelEdit}>수정 취소</Btn>
                            <Btn type="submit">수정 완료</Btn>
                        </form>
                    )}
                </Formik>
            </ProfileContainer2>
        </EditProfileConatiner>
    )
};

const EditProfileConatiner = styled.div`
    position: absolute;
    top: 50px;
    right: 0;
    display:flex;
    width: 80%;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #D9E5FF;
`;

const ProfileContainer1 = styled.div`
    width: 100%;
    height: 250px;
    position: absolute;
    top: 0;
    left: 0;
    background: -webkit-linear-gradient(to right, #A0D9E2, #acb6e5);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #A0D9E2, #acb6e5); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ImgArea = styled.div`
    position: absolute;
    left: calc(50% - 100px);
    top: 100px;
    width: 200px;
    height: 200px;
`;

const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`;

ProfileImg.defaultProps = {
  src: userImg,
}

const ProfileContainer2 = styled.div`
    width: 100%;
    position: absolute;
    top: 250px;
    padding-top: 80px;
`;

const Btn = styled.button`
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