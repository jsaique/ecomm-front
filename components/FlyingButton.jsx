import { primary } from "@/lib/colors";
import { ButtonStyle } from "./Button";
import styled from "styled-components";
import FlyingButtonOriginal from "react-flying-item";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);

  return (
    <FlyingButtonWrapper
      main={props.main}
      white={props.white}
      onClick={() => addProduct(props._id)}
    >
      <FlyingButtonOriginal
        {...props}
        flyingItemStyling={{
          width: "auto",
          height: "auto",
          maxWidth: "80px",
          maxHeight: "80px",
        }}
        targetTop={"5%"}
        targetLeft={"80%"}
      />
    </FlyingButtonWrapper>
  );
}

const FlyingButtonWrapper = styled.div.attrs((props) => ({
  main: props.main ? "true" : "false",
  white: props.white ? "true" : "false",
}))`
  button {
    ${ButtonStyle}
    font-weight: 500;

    ${(props) =>
      props.main === "true"
        ? `
    background-color: ${primary};
    color: #f1f5f9;`
        : `background-color: transparent;
    color: ${primary};
    border: 1px solid ${primary};`}

    ${(props) =>
      props.white === "true" &&
      `background-color: #f1f5f9;
      border: 1px solid #f1f5f9;
      color: #0f172a;`}
  }
`;
