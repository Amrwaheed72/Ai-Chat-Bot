import styled from "styled-components";
import DarkModeToggle from "../ui/DarkModeToggle";
import Logo from "../ui/Logo";
import { useNavigate } from "react-router";

const StyledStartPage = styled.div`
  width: 100%;
  height: 100%;
  /* display: grid;
  place-items: center; */
  text-align: center; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;
const StyledHeader = styled.h1`
  font-size: 10rem;
  color: var(--color-indigo-700);
  text-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
  letter-spacing: 2rem;
`;
const StyledSmallHeader=styled.h3`
  margin-top: -3rem;
  font-size: 3rem;
  color: var(--color-grey-900);
  letter-spacing: 1rem;

`
const Button = styled.button`
  width: 30rem;
  height: 15rem;
  background: linear-gradient(120deg,var(--color-indigo-700),var(--color-indigo-100));
  color: var(--color-grey-50);
  border: none;
  border-radius: 1rem;
  font-size: 5rem;
  text-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
  box-shadow: 0 1rem 2rem rgba(0,0,0,0.2);
  transition: all 0.1 ease ;
  cursor: pointer;

  &:active{
    transform: scale(0.98);
  }
`;

function ChatBotStart() {
  const navigate=useNavigate()
  return (
    <StyledStartPage>
      <Logo />
      <DarkModeToggle />
      <StyledHeader>EGYAI</StyledHeader>
      <StyledSmallHeader>Into the unknown</StyledSmallHeader>
      <Button onClick={()=>{
        navigate('/main')
      }} >Start Chat</Button>
    </StyledStartPage>
  );
}

export default ChatBotStart;
