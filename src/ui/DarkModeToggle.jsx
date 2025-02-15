import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";


const ButtonIcon = styled.button`
  background: none;
  border: 1px solid var(--color-grey-400);
  padding: 0.6rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;
  position: absolute;
  top: 1.9rem;
  right: 7rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.2rem;
    height: 2.2rem;
    color: var(--color-brand-600);
  }
`;


function DarkModeToggle() {
    const { isDarkMode,toggleDarkMode } = useDarkMode();
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode?<HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkModeToggle
