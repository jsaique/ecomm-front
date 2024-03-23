import { primary } from "@/lib/colors";
import { ButtonStyle } from "./Button";
import styled from "styled-components";
import FlyingButtonOriginal from "react-flying-item";
import { useContext, useEffect, useRef } from "react";
import { CartContext } from "./CartContext";

export default function FlyingButton(props) {
  const { addProduct } = useContext(CartContext);
  const imgRef = useRef();

  const sendImageToCart = function (e) {
    imgRef.current.style.display = "inline-block";
    imgRef.current.style.left = e.clientX - 50 + "px";
    imgRef.current.style.top = e.clientY - 50 + "px";
    setTimeout(() => {
      imgRef.current.style.display = "none";
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const reveal = imgRef?.current?.closest("div[data-sr-id]");
      if (reveal?.style.opacity === "1") {
        // Visible
        reveal.style.transform = "none";
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <FlyingButtonWrapper
        main={props.main}
        white={props.white}
        onClick={() => addProduct(props._id)}
      >
        {/* <FlyingButtonOriginal
          {...props}
          flyingItemStyling={{
            width: "auto",
            height: "auto",
            maxWidth: "80px",
            maxHeight: "80px",
          }}
          targetTop={"5%"}
          targetLeft={"80%"}
        /> */}
        <img src={props.src} alt="" ref={imgRef} />
        <button onClick={(e) => sendImageToCart(e, props.src)} {...props} />
      </FlyingButtonWrapper>
    </>
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
  @keyframes fly {
    100% {
      top: 0;
      left: 76%;
      opacity: 0;
      display: none;
      max-width: 50px;
      max-height: 50px;
    }
  }
  img {
    border-radius: 10px;
    max-width: 80px;
    max-height: 80px;
    opacity: 1;
    position: fixed;
    display: none;
    animation: fly 1s;
    z-index: 5;
  }
`;
