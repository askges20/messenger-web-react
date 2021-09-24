import React from 'react';

import ShowProfile from './ShowProfile';
import EditProfile from './EditProfile';

const MyProfile = (props) => {
  const [edit, setEdit] = React.useState(false);

  if (edit) {
    console.log(edit);
    return <EditProfile changeMenu = {setEdit}/>
  } else {
    console.log(edit);
    return <ShowProfile changeMenu = {setEdit} />
  }
};

export default MyProfile;