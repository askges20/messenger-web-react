//채팅방 목록 최신순 정렬
export const sortChatRoom = (a, b) => {
  if (a && b) {
    const aDateTime = a.dateTime;
    const bDateTime = b.dateTime;

    if (aDateTime.slice(0, 8) === bDateTime.slice(0, 8)) {  //날짜
      if (aDateTime.slice(8, 10) === bDateTime.slice(8, 10)) {  //시
        if (aDateTime.slice(11, 13) === bDateTime.slice(11, 13)) {  //분
          return bDateTime.slice(14, 16) - aDateTime.slice(14, 16); //초
        }
        return bDateTime.slice(11, 13) - aDateTime.slice(11, 13);
      }
      return bDateTime.slice(8, 10) - aDateTime.slice(8, 10);
    }
    return bDateTime.slice(0, 8) - aDateTime.slice(0, 8);
  }
}