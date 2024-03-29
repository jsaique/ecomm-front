/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import Center from "@/components/Center";
import { FaShoppingCart } from "react-icons/fa";
import LinkBtn from "@/components/LinkBtn";
import FlyingButton from "./FlyingButton";
import { RevealWrapper } from "next-reveal";

export default function Featured({ featuredProduct }) {
  return (
    <Background>
      <Center>
        <ColumnWrapper>
          <StyledColumn>
            <div>
              <RevealWrapper origin={"bottom"} delay={0}>
                <ContentWrapper>
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
                      white={1}
                      _id={featuredProduct._id}
                      src={featuredProduct.images?.[0]}
                    >
                      <FaShoppingCart />
                      Add to cart
                    </FlyingButton>
                  </ButtonWrapper>
                </ContentWrapper>
              </RevealWrapper>
            </div>
          </StyledColumn>
          <ImgColumn>
            <RevealWrapper delay={0}>
              <CenterImg>
                <img
                  className={"main"}
                  src={featuredProduct.images?.[0]}
                  alt=""
                />
              </CenterImg>
            </RevealWrapper>
          </ImgColumn>
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
  img.main {
    max-width: 100%;
    max-height: 200px;
    display: block;
    margin: 0 auto;
  }
  div:nth-child(1) {
    order: 2;
    margin-left: auto;
    margin-right: auto;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.1fr 0.9fr;
    & > div:nth-child(1) {
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

const CenterImg = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImgColumn = styled(StyledColumn)`
  & > div {
    width: 100%;
  }
`;

const ContentWrapper = styled.div``;
