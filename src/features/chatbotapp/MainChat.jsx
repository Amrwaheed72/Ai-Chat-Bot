import styled from "styled-components";
import { useChatApp } from "../../context/ChatAppProvider";

const Message = styled.div`
  max-width: 80%;
  padding: 2rem;
  margin: 0.5rem;
  font-size: 1.4rem;
  color: var(--color-slate-100);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);

  align-self: ${({ type }) => (type === "prompt" ? "flex-end" : "flex-start")};
  text-align: ${({ type }) => (type === "prompt" ? "right" : "left")};

  background: ${({ type }) =>
    type === "prompt"
      ? "linear-gradient(110deg, var(--color-neutral-600), var(--color-neutral-800))"
      : "linear-gradient(110deg, var(--color-neutral-800), var(--color-neutral-600))"};

  border-radius: ${({ type }) =>
    type === "prompt" ? "3rem 0 3rem 3rem" : "0rem 3rem 3rem 3rem"};
`;

const Span = styled.span`
  font-size: 1rem;
  display: block;
  margin-top: 0.5rem;
`;

const Typing = styled(Message)`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  margin-top: auto;
  background-color: transparent;
  box-shadow: none;
  text-align: left;
  align-self: flex-start;
  background: transparent;
`;

const StyledChatWindow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px;

  /* WebKit */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: black;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: linear-gradient(
      180deg,
      var(--color-grey-200),
      var(--color-neutral-950)
    ); /* Smooth black fade */
    border-radius: 10px;
    &:hover {
      background: linear-gradient(
        180deg,
        var(--color-grey-400),
        var(--color-grey-200)
      );
    }
  }

  /* Firefox */
  scrollbar-width: thin;
  scrollbar-color: var(--color-silver-100) var(--color-neutral-950);
`;

const StyledMainChat = styled.div`
  border-radius: 3rem;
  width: 50%;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  margin: 0 auto;
  background-color: var(--color-neutral-950);
  overflow: auto;
  @media (max-width: 900px) {
    width: 80%;
  }
`;

function MainChat() {
  // const { text, type, timestamp } = messages;
  const { messages, isTyping, chatEndRef } = useChatApp();
  return (
    <StyledMainChat>
      <StyledChatWindow>
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;

          return (
            <Message
              type={msg.type === "prompt" ? "prompt" : "response"}
              key={index}
              ref={isLastMessage ? chatEndRef : null}
            >
              {msg.text}
              <Span>{msg.timestamp}</Span>
            </Message>
          );
        })}
      </StyledChatWindow>
      <Typing>{isTyping ? "Typing..." : ""}</Typing>
    </StyledMainChat>
  );
}

export default MainChat;
