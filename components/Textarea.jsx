import styled from "styled-components";

export default function Textarea(props) {
  return <StyledTextarea {...props} />;
}

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #cbd5e1;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: inherit;
`;
