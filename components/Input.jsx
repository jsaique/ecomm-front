import styled from "styled-components";

export default function Input(props) {
  return <StyledInput {...props} />;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
`;
