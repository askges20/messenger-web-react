import React from 'react';
import styled from 'styled-components';

const ChatDateLine = (props) => {
  return (
    <ChatDateLineContainer>
      <ChatDateText>{props.year}년 {props.month}월 {props.date}일</ChatDateText>
    </ChatDateLineContainer>
  )
}

const ChatDateLineContainer = styled.div`
  text-align: center;
  margin: 30px 0;
`;

const ChatDateText = styled.span`
  
`;

export default ChatDateLine;