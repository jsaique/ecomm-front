import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { FaShoppingCart } from "react-icons/fa";
import LinkBtn from "@/components/LinkBtn";
import { useContext } from "react";
import { CartContext } from "@/components/CartContext";
import FlyingButton from "./FlyingButton";

export default function Featured({ featuredProduct }) {
  const { addProduct } = useContext(CartContext);
  // const addFeaturedToCart = function () {
  //   addProduct(featuredProduct._id);
  // };

  return (
    <Background>
      <Center>
        <ColumnWrapper>
          <StyledColumn>
            <div>
              <StyledTitle>{featuredProduct.title}</StyledTitle>
              <StyledDescription>
                {featuredProduct.description}
              </StyledDescription>
              <ButtonWrapper>
                <LinkBtn
                  href={"/product/" + featuredProduct._id}
                  outline={1}
                  white={1}
                >
                  Read more
                </LinkBtn>
                <FlyingButton
                  white
                  _id={featuredProduct._id}
                  src={featuredProduct.images?.[0]}
                >
                  <FaShoppingCart />
                  Add to cart
                </FlyingButton>
                {/* <Button onClick={addFeaturedToCart} white={1}>
                  <FaShoppingCart />
                  Add to cart
                </Button> */}
              </ButtonWrapper>
            </div>
          </StyledColumn>
          <StyledColumn>
            <img
              src="https://aries-next-ecomm.s3.amazonaws.com/1698775544454.jpg"
              alt=""
            />
          </StyledColumn>
        </ColumnWrapper>
      </Center>
    </Background>
  );
}

const Background = styled.div`
  background-color: #0f172a;
  padding: 50px 0;
`;

const StyledTitle = styled.h1`
  color: #f1f5f9;
  margin: 0;
  font-weight: normal;
  font-size: 1.5rem;
  @media screen and (min-width: 768px) {
    font-size: 3rem;
  }
`;

const StyledDescription = styled.p`
  color: #94a3b8;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  img {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    div:nth-child(1) {
      order: 0;
    }
    img {
      max-width: 100%;
    }
  }
`;

const StyledColumn = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;
`;
