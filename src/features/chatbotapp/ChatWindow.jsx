import styled from "styled-components";
import ChatWindowHeader from "./ChatWindowHeader";
import MainChat from "./MainChat";
import ChatInputForm from "./ChatInputForm";
import { useState } from "react";

const StyledChatWindow = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width:900px ) {
    width: 100%;
  }
  @media (max-width:500px ) {
width: 100%;
}
`;
function ChatWindow({
  handleVisibilty,
  messages,
  inputValue,
  handleInputChanges,
  sendMessage,
  createNewChat,
  isTyping,
  chatEndRef,
  setInputValue,
}) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  function handleEmojiSelect(emoji) {
    setInputValue((prevInput) => prevInput + emoji.native);
  }
  return (
    <StyledChatWindow>
      <ChatWindowHeader handleVisibilty={handleVisibilty} />
      <MainChat
        messages={messages}
        isTyping={isTyping}
        chatEndRef={chatEndRef}
      />
      <ChatInputForm
      showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        handleEmojiSelect={handleEmojiSelect}
        inputValue={inputValue}
        handleInputChanges={handleInputChanges}
        sendMessage={sendMessage}
      />
    </StyledChatWindow>
  );
}

export default ChatWindow;
