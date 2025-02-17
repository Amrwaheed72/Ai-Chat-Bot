import styled from "styled-components";
import DarkModeToggle from "../../ui/DarkModeToggle";
import Logo from "../../ui/Logo";
import { useNavigate } from "react-router";

const StyledStartPage = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;
const ChatStartHeader = styled.div`
  position: absolute;
  top: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const StyledHeader = styled.h1`
  font-size: 10rem;
  color: var(--color-slate-100);
  text-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  letter-spacing: 2rem;
  @media (max-width: 900px) {
    font-size: 8rem;
  }
  @media (max-width: 500px) {
    font-size: 6rem;
  }
`;
const StyledSmallHeader = styled.h3`
  margin-top: -3rem;
  font-size: 4rem;
  color: var(--color-slate-400);
  letter-spacing: 1rem;
  @media (max-width: 900px) {
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;
const Button = styled.button`
  width: 30rem;
  height: 15rem;
  background: linear-gradient(
    110deg,
    var(--color-neutral-600),
    var(--color-neutral-800)
  );
  color: var(--color-slate-100);
  border: none;
  border-radius: 1rem;
  font-size: 5rem;
  text-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);
  transition: all 0.1 ease;
  cursor: pointer;

  &:active {
    transform: scale(0.98);
  }
  @media (max-width: 900px) {
    width: 20rem;
    height: 10rem;
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    width: 15rem;
    height: 7.5rem;
    font-size: 2rem;
  }
`;

function ChatBotStart() {
  const navigate = useNavigate();
  return (
    <StyledStartPage>
      <ChatStartHeader>
        <Logo />
        <DarkModeToggle />
      </ChatStartHeader>
      <StyledHeader>EGYAI</StyledHeader>
      <StyledSmallHeader>Into the unknown</StyledSmallHeader>
      <Button
        onClick={() => {
          navigate("/main");
        }}
      >
        Start Chat
      </Button>
    </StyledStartPage>
  );
}

export default ChatBotStart;
