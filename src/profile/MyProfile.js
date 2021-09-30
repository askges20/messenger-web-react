import React, { useEffect } from 'react';

import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';
import { storage } from '../services/firebase';

import { useSelector } from 'react-redux';

const MyProfile = (props) => {
  const [edit, setEdit] = React.useState(false);
  let [imgUrl, setImgUrl] = React.useState('');

  const id = useSelector(state => state.user.id);

  function changeImg() {
    imgUrl = storage.ref(`profile/${id}`).getDownloadURL().then((url) => {
      setImgUrl(url);
    })
  }

  useEffect(() => {
    changeImg();
  });

  if (edit) {
    console.log(edit);
    return <EditProfile changeMenu = {setEdit} changeImg = {changeImg} imgUrl = {imgUrl}/>
  } else {
    console.log(edit);
    return <ShowProfile changeMenu = {setEdit} imgUrl = {imgUrl} />
  }
};

export default MyProfile;