import { BarLoader } from "react-spinners";
import styled from "styled-components";

export default function Spinner({ fullWidth }) {
  return (
    <Wrapper fullwidth={fullWidth.toString()}>
      <BarLoader speedMultiplier={1} color={"#0f172a"} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${(props) =>
    props.fullwidth === "true" &&
    `
      display: flex;
      justify-content: center;
      align-items: center;
      height: 70vh;
       `}
`;
