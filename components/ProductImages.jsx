import { useState } from "react";
import styled from "styled-components";

export default function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <>
      <BigImageWrapper>
        <BigImage src={activeImage} />
      </BigImageWrapper>
      <SmallImages>
        {images.map((image) => (
          <SmallImage
            key={image}
            active={image === activeImage ? "true" : "false"} // convert the prop to string
            onClick={() => setActiveImage(image)}
          >
            <Image src={image} alt="" />
          </SmallImage>
        ))}
      </SmallImages>
    </>
  );
}

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
`;

const BigImage = styled.img`
  max-width: 100%;
  max-height: 200px;
  width: auto;
  height: auto;
`;

const SmallImages = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
  cursor: pointer;
`;

const SmallImage = styled.div`
  border: 2px solid transparent;
  ${(props) =>
    props.active ? `border-color: #64748b;` : `border-color: transparent`}
  border-radius: 5px;
  height: 30px;
  padding: 5px;
`;

const BigImageWrapper = styled.div`
  text-align: center;
  height: 200px;
`;
