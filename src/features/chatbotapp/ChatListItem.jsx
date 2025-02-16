import { FaRegCircleXmark } from "react-icons/fa6";
import styled from "styled-components";

const StyledChatListItem = styled.div`
  cursor: pointer;
  width: 100%;
  height: 6rem;
  border-bottom: 0.5px solid var(--color-grey-900);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  background: ${({ type }) =>
    type === "active"
      ? "linear-gradient(110deg, var(--color-neutral-600), var(--color-neutral-800))"
      : "transparent"};
`;

const H4 = styled.h4`
  font-size: 1.3rem;
  font-weight: 300;
  color: var(--color-grey-700);
`;
const StyledIcon = styled.div`
  font-size: 1.6rem;
  cursor: pointer;
  margin-right: 2rem;
`;
function ChatListItem({
  chat,
  index,
  activeChat,
  handleSelectChat,
  handleDeleteChat,
}) {
  const { id, messages, displayId } = chat;
  // console.log(id);
  return (
    <StyledChatListItem
      type={index === activeChat ? "active" : ""}
      onClick={() => handleSelectChat(id)}
    >
      <H4>{displayId}</H4>
      <StyledIcon title="Click to delete the chat">
        <FaRegCircleXmark
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteChat(id);
          }}
        />
      </StyledIcon>
    </StyledChatListItem>
  );
}

export default ChatListItem;
