import { database } from '../services/firebase';
import { ref, set } from 'firebase/database';

export function addChatMember(chatRoomNum, id, email) {
    set(ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMembers/' + id + '/'), {
        email: email,
        isMember: true
    });
}

export function addChatMessage(chatRoomNum, date, messageCode, content, id, sendTime) {
    return set(ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMessages/' + date + '/' + messageCode + '/'), {
        content: content,
        senderId: id,
        time: sendTime
    });
}

export function getChatHistory(chatRoomNum) {
    return ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMessages/');
}