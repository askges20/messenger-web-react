import React, { useEffect } from 'react';
import styled from 'styled-components';

import { firestore } from '../services/firebase';
import { useSelector } from 'react-redux';

import DefaultProfile from '../img/user.png';
import '../css/btn.css';

import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    loginEmail : state.user.email
})

class FriendList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            friends: []
        }

        const usersFB = firestore.collection('users');
    }

    componentDidMount() {
        this.props.usersFB.doc(this.props.loginEmail).collection('friends').onSnapshot((docs) => {
            let listFromFB = [];

            //현재는 친구 등록 시 name을 같이 저장해서 바로 가져올 수 있음
            //나중에 가능하면 name은 사용자 정보를 검색해서 가져오도록 바꿀 것
            docs.forEach((doc) => {
                listFromFB.push({id: doc.data().id, name: doc.data().name, chatRoomNum: doc.data().chatRoomNum});
            });
            this.state.friends = listFromFB;
        })
    };

    render() {
        return (
            <FriendListContainer>
                <h3 style={{margin: '30px'}}>친구 목록</h3>
                {
                    this.state.friends.map((value, i) => {
                        return (
                            <div key={i} >
                                <Friend onClick={() => {
                                    //resizable=no 는 IE에서만 작동된다고 함, 팝업을 띄우는 다른 방법을 찾아봐야함
                                    window.open('/chatroom/' + value.name + '/' + value.chatRoomNum, '', '_blank');
                                }}>
                                    <ProfileImg src={DefaultProfile}/>
                                    <FriendName>{value.name}</FriendName>
                                    {/* <div className="transition"></div> */}
                                </Friend>
                                <hr/>
                            </div>
                        );
                    })
                }
            </FriendListContainer>
        );
    }
};

const FriendListContainer = styled.div`
    position: absolute;
    top: 50px;
    width: 100%;
    height: calc(100vh - 50px);
    background-color: #D9E5FF;
`;

const Friend = styled.div`
    height: 50px;
    background-color: white;
    padding: 20px;
    cursor: pointer;
    text-align: left;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const FriendName = styled.div`
    
`;

const ProfileImg = styled.img`
    height: 100%;
    margin-right: 10px;
`;

export default connect(mapStateToProps)(FriendList);