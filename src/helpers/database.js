import { database } from '../services/firebase';
import { ref, set } from 'firebase/database';

export function addChatMember(chatRoomNum, id, email) {
    set(ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMembers/' + id + '/'), {
        email: email,
        isMember: true
    });
}