import { HiPencilSquare, HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import ChatListItem from "./ChatListItem";
import { useChatApp } from "../../context/ChatAppProvider";
const StyledChatList = styled.div`
  width: 18%;
  height: 100%;
  background-color: var(--color-neutral-950);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;

  @media (max-width: 900px) {
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 100%;
    width: 40%;
    transform: ${(props) =>
      props.type === "show" ? "translateX(0)" : "translateX(-100%)"};
    transition: transform 0.3s ease-in-out;
  }

  @media (max-width: 500px) {
    width: 40%; /* Ensures it covers full width on smaller screens */
  }
`;

const StyledListHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid var(--color-grey-900);
  padding: 2rem 1rem;
  /* @media (max-width: 900px) {
    display: flex;
  } */
`;

const H2 = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  text-transform: uppercase;
  @media (max-width: 900px) {
    font-size: 1.4rem;
  }
`;

const StyledIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  margin-right: 0rem;
  @media (max-width: 900px) {
    /* margin-right: 5rem; */
  }
`;
const HideStyledIcon = styled.div`
  display: none;
  @media (max-width: 900px) {
    font-size: 3rem;
    cursor: pointer;
    display: block;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
  }
`;
const StyledIconGroup = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
  @media (max-width: 900px) {
    margin-top: 3rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

function ChatList() {
  const { handleVisibilty, showChatList, chats, createNewChat } = useChatApp();
  return (
    <StyledChatList type={showChatList ? "show" : ""}>
      <StyledListHeader>
        <StyledIconGroup>
          <H2>Chat List</H2>
          <StyledIcon>
            <HiPencilSquare size="2rem" onClick={() => createNewChat("")} />
          </StyledIcon>
        </StyledIconGroup>
        <HideStyledIcon onClick={handleVisibilty}>
          <HiXMark />
        </HideStyledIcon>
      </StyledListHeader>
      {chats.map((chat) => (
        <ChatListItem chat={chat} key={chat.id} index={chat.id} />
      ))}
    </StyledChatList>
  );
}
export default ChatList;
