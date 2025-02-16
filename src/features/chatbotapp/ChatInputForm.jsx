import { useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import styled from "styled-components";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";

const FormMessage = styled.form`
  width: 60%;
  min-height: 10rem;
  display: flex;
  align-items: center;
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 3rem;
  position: relative;
  @media (max-width: 900px) {
    width: 90%;
  }
`;
const StyledInput = styled.input`
  height: 100%;
  flex-grow: 1;
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  color: var(--color-slate-100);
  &::placeholder {
    font-size: 1.8rem;
    font-weight: 300;
    color: var(--color-slate-100);
  }
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`;

const SpecialStyledIcon = styled.div`
  width: 10rem;
  display: flex;
  justify-content: center;
`;
const PickerContainer = styled.div`
  position: absolute;
  bottom: 7rem;
  left: 8rem;
  @media (max-width: 500px) {
    left: 1rem;
    bottom: 7rem;
  }
`;

function ChatInputForm({
  inputValue,
  handleInputChanges,
  sendMessage,
  handleEmojiSelect,
  setShowEmojiPicker,
  showEmojiPicker,
}) {
  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  }
  return (
    <FormMessage
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <SpecialStyledIcon>
        <MdEmojiEmotions
          size="3rem"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
        />
        {showEmojiPicker && (
          <PickerContainer>
            <Picker data={data} onEmojiSelect={handleEmojiSelect} />
          </PickerContainer>
        )}
      </SpecialStyledIcon>
      <StyledInput
        value={inputValue}
        onChange={handleInputChanges}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Type a message..."
        onFocus={() => setShowEmojiPicker(false)}
      ></StyledInput>
      <SpecialStyledIcon>
        <IoSendSharp size="3rem" onClick={sendMessage} />
      </SpecialStyledIcon>
    </FormMessage>
  );
}

export default ChatInputForm;
