import { useNavigate } from "react-router";
import DarkModeToggle from "../../ui/DarkModeToggle";
import styled from "styled-components";
import { GoArrowRight } from "react-icons/go";

const StyledChatWindowHeader = styled.div`
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

const StyledIcon = styled.div`
  font-size: 1.9rem;
  cursor: pointer;
  margin-right: 2rem;
`;

function ChatWindowHeader() {
  const navigate = useNavigate();
  return (
    <StyledChatWindowHeader>
      <H1>EGYAi</H1>
      <DarkModeToggle />
      <StyledIcon onClick={() => navigate("/")}>
        <GoArrowRight size="3rem" stroke="var(--color-grey-600)" />
      </StyledIcon>
    </StyledChatWindowHeader>
  );
}

export default ChatWindowHeader;
