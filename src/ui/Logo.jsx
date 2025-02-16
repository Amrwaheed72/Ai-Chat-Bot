import styled from "styled-components";

function Logo() {
  // const LogoContainer=styled.div`
  //   /* width: 100px; */
  //   background: transparent;
  // `
  const Img = styled.img`
    width: 10rem;
    height: auto;
    border-radius: 5rem;
    position: absolute;
    top: 1rem;
    left: 1rem;
  `;
  return (
      <Img src="amrblackandwhite.jpg" />
  );
}

export default Logo;
