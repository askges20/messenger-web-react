import React from 'react';
import styled from 'styled-components';
import LinearProgress from '@material-ui/core/LinearProgress';

const Spinner = (props) => {
  return(
    <Outter>
      {/* <CircularProgress/> */}
      <LinearProgress style={{width:'80%'}}/>
    </Outter>
  )
}

const Outter = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export default Spinner;