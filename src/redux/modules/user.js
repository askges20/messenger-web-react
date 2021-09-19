import {firestore} from '../../services/firebase';

const user_db = firestore.collection('users');

//Actions
const GET_USER = 'user/GET_USER';
const RESET_USER = 'user/RESET_USER';
const LOADED = 'user/LOADED';

const initialState = {
    email: '',
    id: '',
    name: '',
    is_loaded: false,
}

//Action Creators
export const loadUser = (email, id, name) => {
    return {type: GET_USER, data: {email:email, id:id, name:name}};
}

export const resetUser = () => {
    return {type: RESET_USER};
}

export const isLoaded = (loaded) => {
    console.log('로딩 완료');
    return {type: LOADED, loaded};
}

//DB에서 사용자 정보 읽어오는 함수
export const getUserFB = (email) => {
    console.log('액션 생성 : DB에서 유저 정보 읽어오기');
    return function (dispatch){
        user_db.doc(email).get().then((info) => {
            const id = info.get('id');
            const name = info.get('name');
            dispatch(loadUser(email, id, name));    //액션 발생시키기
            dispatch(isLoaded(true));
        })
    }
}

//Reducer
export default function reducer(state = initialState, action = {}){
    switch(action.type){
        //do reducer stuff
        case 'user/GET_USER': {
            return {email: action.data.email, id: action.data.id,
                name: action.data.name, is_loaded: true};
        }
        case 'user/RESET_USER': {
            return initialState;
        }
        case 'user/LOADED': {
            return {...state, is_loaded: true};
        }
        default:
            return state;
    }
}
