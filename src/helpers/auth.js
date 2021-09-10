import { auth } from '../services/firebase';

//회원가입
export function signUp(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

//로그인
export function signIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

//로그아웃
export async function userSignOut() {
    try {
        await auth().signOut();
    } catch (error) { }
}
// export function userSignOut() {
//     return auth().signOut().then(() => {
        
//     }).catch((error) => {

//     });
// }