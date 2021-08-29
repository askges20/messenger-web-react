import {firestore} from '../../services/firebase';

const user_db = firestore.collection('users');

//Actions
const GET_NAME = 'user/GET_NAME';

const IS_LOADED = 'user/IS_LOADED';

const initialState = {
    user_name: null,
    is_loaded: false
}


//Action Creators
export const isLoaded = (loaded) => {
    return {type: IS_LOADED, loaded};
}

export const getUserNameFB = (user_email) => {
    return function (dispatch){
        dispatch(isLoaded(false));

        user_db.doc(user_email).get().then((fields) => {
            console.log(fields.get('email'));
        })
    }
}

