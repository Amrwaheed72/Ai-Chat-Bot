import { useNavigate } from "react-router";
import DarkModeToggle from "../../ui/DarkModeToggle";
import styled from "styled-components";
import { GoArrowRight } from "react-icons/go";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";

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
  @media (max-width:900px ) {
    padding-left: 5rem;
  }
`;

const StyledIcon = styled.div`
  font-size: 1.9rem;
  cursor: pointer;
  margin-right: 2rem;
`;
const MenuStyledIcon = styled.div`
display: none;
  @media (max-width: 900px) {
    width: 100%;
    font-size: 2.7rem;
    cursor: pointer;
    margin-left: 1.7rem;
    display: block;
    position: absolute;
    top: 2.5rem;
  }
`;

function ChatWindowHeader({handleVisibilty}) {
  const navigate = useNavigate();
  return (
    <StyledChatWindowHeader>
      <H1>EGYAi</H1>
      <MenuStyledIcon onClick={handleVisibilty}>
        <CiMenuBurger />
      </MenuStyledIcon>
      <DarkModeToggle />
      <StyledIcon onClick={() => navigate("/")}>
        <GoArrowRight size="3rem" stroke="var(--color-grey-600)" />
      </StyledIcon>
    </StyledChatWindowHeader>
  );
}

export default ChatWindowHeader;
