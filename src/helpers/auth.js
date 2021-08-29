import { auth } from '../services/firebase';

export function signUp(email, password) {
    return auth().createUserWithEmailAndPassword(email, password);
}

export function signIn(email, password) {
    return auth().signInWithEmailAndPassword(email, password);
}

// export function sendEmailToUser(user) {
//     auth().useDeviceLanguage();
//     user.sendEmailVerification().then(function() {
//         console.log('인증 메일 발송 완료');
//     }).catch(function(error){
//         console.error('인증 메일 발송 실패');
//     })
// }