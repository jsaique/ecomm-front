import styled, { css } from "styled-components";

export default function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export const ButtonStyle = css`
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 5px 15px;
  text-decoration: none;
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #f1f5f9;
      color: #0f172a;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #f1f5f9;
      border: 1px solid #f1f5f9;
    `}
  ${(props) =>
    props.primary &&
    css`
      background-color: #475569;
      color: #f1f5f9;
      border: 1px solid #475569;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      font-size: 1.2rem;
      padding: 10px 25px;
    `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;
