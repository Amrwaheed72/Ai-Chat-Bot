import styled from "styled-components";

// const aa = styled.div`
//   font-size: ${({ size }) => size || "20rem"};
//   fill: ${({ fill }) => fill || "var(--color-grey-500);"};
//   stroke: ${({ stroke }) => stroke || "none"};
// `;

function StyledGlobalIcon({ icon: Icon, size, fill, stroke }) {
  return (
      <Icon size={size} fill={fill} stroke={stroke} />
  );
}

export default StyledGlobalIcon;
