import { database } from '../services/firebase';
import { ref, set, update } from 'firebase/database';

export function addChatMember(chatRoomNum, id, email) {
    //채팅방의 멤버로 등록
    set(ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMembers/' + id + '/'), {
        email: email,
        isMember: true
    });

    //자신이 속한 채팅방 목록에 추가
    set(ref(database, '/MyChatRooms/' + id + '/' + chatRoomNum + '/'), {
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

export function updateLastMessage(chatRoomNum, content, id, date, sendTime) {
    set(ref(database, '/ChatRooms/' + chatRoomNum + '/LastMessage/'), {
        content: content,
        senderId: id,
        dateTime: date + sendTime,
        isRead: false
    });
}

export function readLastMessage(chatRoomNum) {
    const updates = {};
    updates['/ChatRooms/' + chatRoomNum + '/LastMessage/isRead'] = true;
    update(ref(database), updates);
}

export function getChatHistory(chatRoomNum) {
    return ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMessages/');
}

export function getMyChatRoomRef(id) {
    return ref(database, '/MyChatRooms/' + id + '/');
}

export function findLastMessage(chatRoomNum) {
    return ref(database, '/ChatRooms/' + chatRoomNum + '/LastMessage/');
}

export function getChatMembers(chatRoomNum) {
    return ref(database, '/ChatRooms/' + chatRoomNum + '/ChatMembers/');
}