import styled from "styled-components";

function Logo() {
  const Img = styled.img`
    width: 7rem;
    height: 7rem;
    border-radius: 50%;
    position: absolute;
    top: 1rem;
    left: 1rem;
  `;
  return <Img src="amr.jpeg" />;
}

export default Logo;
