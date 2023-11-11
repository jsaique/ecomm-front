import { primary } from "@/lib/colors";
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
  font-family: "Poppins", sans-serif;
  font-weight: 500;
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
      border: 2px solid #f1f5f9;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: ${primary};
      color: #f1f5f9;
      border: 2px solid ${primary};
    `}
  ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      color: ${primary};
      border: 2px solid ${primary};
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
