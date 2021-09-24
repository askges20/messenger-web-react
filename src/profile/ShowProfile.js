import React, { useEffect } from 'react';
import styled from "styled-components";

import userImg from '../img/user.png';

import { useSelector } from 'react-redux';

const ShowProfile = (props) => {
  const changeMenu = props.changeMenu;
  const email = useSelector(state => state.user.email);
  const id = useSelector(state => state.user.id);
  const name = useSelector(state => state.user.name);

  useEffect(() => {
  });

  function goToEdit() {
    changeMenu(true);
  }

  return(
    <ShowProfileConatiner>
      <ProfileContainer1>
        <ProfileImg/>
      </ProfileContainer1>
      <ProfileContainer2>
        <ProfileName>{name}</ProfileName>
        <ProfileInfo>소개글</ProfileInfo>
        <br/>

        <ProfileInfo>{email}</ProfileInfo>
        <ProfileInfo>2021년 9월 21일 가입</ProfileInfo>
        <EditProfileBtn onClick={goToEdit}>프로필 수정</EditProfileBtn>
      </ProfileContainer2>
    </ShowProfileConatiner>
  )
};

const ShowProfileConatiner = styled.div`
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

const ProfileImg = styled.img`
  position: absolute;
  left: calc(50% - 100px);
  top: 100px;
  width: 200px;
  border-radius: 50%;
`;

ProfileImg.defaultProps = {
  src: userImg,
}

const ProfileName = styled.p`
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 20px;
`;

const ProfileContainer2 = styled.div`
  width: 100%;
  position: absolute;
  top: 250px;
  padding-top: 80px;
`;

const ProfileInfo = styled.div`
  margin: 20px;
`;

const EditProfileBtn = styled.button`
  padding: 8px 24px;
  background-color: ${(props) => (props.outlined ? "#ffffff" : "#5587ED")};
  color: white;
  font-weight: 700;
  border-radius: 30px;
  border: 1px solid #dadafc;
  width: 150px;
  margin: 30px 20px;
  cursor: pointer;
`;

export default ShowProfile;