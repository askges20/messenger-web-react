import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import '../css/sidebar.css';
import FriendList from '../friend/FriendList';

const SideBar = (props) => {

    return(
        <Scrollbars
            id = 'friendList'
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
        >
            {/* <Profile/> */}
            <FriendList/>
        </Scrollbars>
    )
};

export default SideBar;