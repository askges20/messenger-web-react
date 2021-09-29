import React, { useEffect, useState } from 'react';
import styled from "styled-components";

import { firestore, storage } from "../services/firebase";
import userImg from '../img/user.png';

import { TextField } from '@material-ui/core';
import ImageSearchOutlinedIcon from '@material-ui/icons/ImageSearchOutlined';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {withRouter} from 'react-router';
import { useSelector, connect } from 'react-redux';
import {getUserFB, isLoaded} from '../redux/modules/user';

//상태 값을 변화시키기 위한 액션 생성 함수를 props로 받아오기 위한 함수
const mapDispatchToProps = (dispatch) => {
    return {
        loadUser: (email) => {
            dispatch(getUserFB(email));
        }
    }
}

const EditProfile = (props) => {
    const [image, setImage] = useState('');

    const users = firestore.collection("users");    //Firestore DB

    const changeMenu = props.changeMenu;
    //redux
    const email = useSelector(state => state.user.email);
    const id = useSelector(state => state.user.id);
    const name = useSelector(state => state.user.name);
    const intro = useSelector(state => state.user.intro);

    const setUserInfo = () => {
        props.loadUser(email);
    }

    function backToShowProfile() {
        changeMenu(false);
    }

    const uploadImg = () => {
        if (image == null) {
            return;
        }
        storage.ref(`/profile/${id}`).put(image);   //사용자 아이디를 이미지 이름으로 지정해서 storage 업로드
    }

    function readImg(input) {
        if (input.files && input.files[0]) {
            //이미지 파일인지 검사 (생략)
            //FileReader 인스턴스 생성
            const reader = new FileReader();
            //이미지가 로드된 경우
            reader.onload = e => {
                const previewImg = document.getElementById('profileImg');
                previewImg.src = e.target.result;
            }
            //reader가 이미지 읽도록 하기
            reader.readAsDataURL(input.files[0]);
        }
    }

    useEffect(() => {
        const inputImg = document.getElementById('inputImg');
        inputImg.addEventListener('change', e => {
            readImg(e.target);
        });
    })

    return(
        <EditProfileConatiner>
            <ProfileContainer1>
                <ImgArea for='inputImg' style={{cursor: 'pointer'}}>
                    <ProfileImg id='profileImg'/>
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
                                setUserInfo();
                                uploadImg();
                                backToShowProfile();
                            }
                        )
                    }}
                    >
                    {formik => (
                        <form onSubmit={formik.handleSubmit}>
                            <input type="file" id='inputImg' style={{display:'none'}} onChange={(e) => {
                                setImage(e.target.files[0]);
                            }}/>
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
                            <Btn onClick={backToShowProfile}>수정 취소</Btn>
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

const ImgArea = styled.label`
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
    object-fit: cover;
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

export default connect(null, mapDispatchToProps)(withRouter(EditProfile));