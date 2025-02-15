import { FaRegCircleXmark } from "react-icons/fa6";
import { HiPencilSquare } from "react-icons/hi2";
import { IoSendSharp } from "react-icons/io5";
import { MdEmojiEmotions } from "react-icons/md";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { LuSquareArrowLeft } from "react-icons/lu";
import DarkModeToggle from "../../ui/DarkModeToggle";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

const StyledChatApp = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
`;
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
const ChatListItem = styled.div`
  width: 100%;
  height: 6rem;
  border-bottom: 0.5px solid var(--color-grey-900);
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  /* background: linear-gradient(110deg,var(--color-neutral-600),var(--co lor-neutral-900)) ; */
`;
const H4 = styled.h4`
  font-size: 1.6rem;
  font-weight: 300;
  color: var(--color-grey-700);
`;

const ChatWindow = styled.div`
  width: 82%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ChatWindowHeader = styled.div`
  width: 100%;
  min-height: 8rem;
  /* background-color: var(--color-neutral-950); */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const H1 = styled.h1`
  letter-spacing: 0.1rem;
  margin: 0 2rem;
  color: var(--color-grey-600);
`;
const MainChat = styled.div`
  border-radius: 3rem;
  width: 50%;
  flex-grow: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  row-gap: 4rem;
  /* justify-content: space-between;
  align-items: flex-start; */
  margin: 0 auto;
  background-color: var(--color-neutral-950);
`;

const PromptResponse = styled.div`
  max-width: 80%;
  padding: 2rem;
  font-size: 1.6rem;
  color: var(--color-slate-100);
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.1);
`;
const Prompt = styled(PromptResponse)`
  background: linear-gradient(
    110deg,
    var(--color-neutral-600),
    var(--color-neutral-800)
  );
  align-self: flex-end;
  border-radius: 3rem 0 3rem 3rem;
  text-align: right;
`;
const Response = styled(PromptResponse)`
  background: linear-gradient(
    110deg,
    var(--color-neutral-800),
    var(--color-neutral-600)
  );
  border-radius: 0rem 3rem 3rem 3rem;
  align-self: flex-start;
  text-align: left;
`;
const Span = styled.span`
  font-size: 1.2rem;
  display: block;
  margin-top: 0.5rem;
`;
const Typing = styled(PromptResponse)`
  font-size: 1.4rem;
  color: var(--color-grey-500);
  margin-top: auto;
  background-color: transparent;
  box-shadow: none;
`;
const FormMessage = styled.form`
  width: 60%;
  height: 10rem;
  display: flex;
  align-items: center;
  box-shadow: 0 -0.5rem 0.5rem rgba(0, 0, 0, 0.1);
  border-radius: 3rem;
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
function ChatBotApp() {
  const navigate = useNavigate();

  return (
    <StyledChatApp>
      <StyledChatList>
        <StyledListHeader>
          <H2>Chat List</H2>
          <StyledIcon>
            <HiPencilSquare size="2.5rem" />
          </StyledIcon>
        </StyledListHeader>
        <ChatListItem
          style={{
            background:
              "linear-gradient(110deg,var(--color-neutral-600),var(--color-neutral-800))",
          }}
        >
          <H4>Chat 20/7/2024 12.50.33 PM</H4>
          <StyledIcon>
            <FaRegCircleXmark />
          </StyledIcon>
        </ChatListItem>
        <ChatListItem>
          <H4>Chat 20/7/2024 12.50.33 PM</H4>
          <StyledIcon>
            <FaRegCircleXmark />
          </StyledIcon>
        </ChatListItem>
        <ChatListItem>
          <H4>Chat 20/7/2024 12.50.33 PM</H4>
          <StyledIcon>
            <FaRegCircleXmark />
          </StyledIcon>
        </ChatListItem>
        <ChatListItem>
          <H4>Chat 20/7/2024 12.50.33 PM</H4>
          <StyledIcon>
            <FaRegCircleXmark />
          </StyledIcon>
        </ChatListItem>
      </StyledChatList>
      <ChatWindow>
        <ChatWindowHeader>
          <H1>EGYAi</H1>
          <DarkModeToggle />
          <StyledIcon onClick={() => navigate("/")}>
            <GoArrowRight size="3rem" stroke="var(--color-grey-600)" />
          </StyledIcon>
        </ChatWindowHeader>
        <MainChat>
          <Prompt>
            Hi, how are you? <Span>12.30.51 PM</Span>
          </Prompt>
          <Response>
            Hello, iam good how can i assist you today? <Span>12.30.52 PM</Span>{" "}
          </Response>
          <Typing>Typing...</Typing>
        </MainChat>
        <FormMessage>
          <SpecialStyledIcon>
            <MdEmojiEmotions size="3rem" />
          </SpecialStyledIcon>
          <StyledInput
            type="text"
            placeholder="Type a message..."
          ></StyledInput>
          <SpecialStyledIcon>
            <IoSendSharp size="3rem" />
          </SpecialStyledIcon>
        </FormMessage>
      </ChatWindow>
    </StyledChatApp>
  );
}

export default ChatBotApp;
