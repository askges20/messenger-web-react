import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import FriendList from '../friend/FriendList';

const SideBar = (props) => {

    return(
        <Scrollbars
            autoHide
            autoHideTimeout = {2000}
            autoHideDuration = {500}
            renderView={props => (
                <div {...props}
                style = {{
                    ...props.style,
                    overflowX: 'hidden'
                }}/>
            )}
            renderTrackHorizontal={props =>
                <div {...props}
                style = {{
                    display: 'none'
                }}/>
            }
            style={{
                position: 'fixed',
                top: '50px',
                width: '20%',
                height: 'calc(100vh - 50px)',
                boxSizing: 'border-box',
                flexDirection: 'column',
                backgroundColor: '#B2CCFF'
            }}
        >
            {/* <Profile/> */}
            <FriendList/>
        </Scrollbars>
    )
};

export default SideBar;