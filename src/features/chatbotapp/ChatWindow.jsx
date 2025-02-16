import styled from "styled-components";
import ChatWindowHeader from "./ChatWindowHeader";
import MainChat from "./MainChat";
import ChatInputForm from "./ChatInputForm";

const StyledChatWindow = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
function ChatWindow({
  messages,
  inputValue,
  handleInputChanges,
  sendMessage,
  createNewChat,
  isTyping,
  chatEndRef
}) {
  return (
    <StyledChatWindow>
      <ChatWindowHeader />
      <MainChat messages={messages} isTyping={isTyping} chatEndRef={chatEndRef} />
      <ChatInputForm
        inputValue={inputValue}
        handleInputChanges={handleInputChanges}
        sendMessage={sendMessage}
      />
    </StyledChatWindow>
  );
}

export default ChatWindow;
