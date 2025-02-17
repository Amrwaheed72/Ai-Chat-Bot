import styled from "styled-components";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const StyledChatApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden; /* Prevents horizontal scrolling */

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

function ChatBotApp() {
  return (
    <StyledChatApp>
      <ChatList />
      <ChatWindow />
    </StyledChatApp>
  );
}

export default ChatBotApp;
