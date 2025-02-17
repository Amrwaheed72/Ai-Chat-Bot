import styled from "styled-components";
import ChatWindowHeader from "./ChatWindowHeader";
import MainChat from "./MainChat";
import ChatInputForm from "./ChatInputForm";

const StyledChatWindow = styled.div`
  flex: 1; /* Makes it take the remaining space */
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 900px) {
    width: 100%;
  }
`;

function ChatWindow() {
  return (
    <StyledChatWindow>
      <ChatWindowHeader />
      <MainChat />
      <ChatInputForm />
    </StyledChatWindow>
  );
}

export default ChatWindow;
