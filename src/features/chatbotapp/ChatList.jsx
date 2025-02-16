import { HiPencilSquare } from "react-icons/hi2";
import styled from "styled-components";
import ChatListItem from "./ChatListItem";

const StyledChatList = styled.div`
  width: 18%;
  height: 100%;
  background-color: var(--color-neutral-950);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const StyledListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-grey-900);
  padding: 2rem 1rem;
`;

const H2 = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  text-transform: uppercase;
`;

const StyledIcon = styled.div`
  font-size: 1.9rem;
  cursor: pointer;
  margin-right: 2rem;
`;

function ChatList({ chats,createNewChat,activeChat,handleSelectChat,handleDeleteChat }) {
  return (
    <StyledChatList>
      <StyledListHeader>
        <H2>Chat List</H2>
        <StyledIcon>
          <HiPencilSquare size="2.5rem" onClick={()=>createNewChat("")} />
        </StyledIcon>
      </StyledListHeader>
      {chats.map((chat) => (
        <ChatListItem handleDeleteChat={handleDeleteChat} handleSelectChat={handleSelectChat} activeChat={activeChat} chat={chat} key={chat.id} index={chat.id} />
      ))}
    </StyledChatList>
  );
}
export default ChatList;
