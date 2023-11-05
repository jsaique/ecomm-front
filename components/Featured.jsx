import styled from "styled-components";
import Center from "@/components/Center";
import Button from "@/components/Button";
import { FaShoppingCart } from "react-icons/fa";
import LinkBtn from "@/components/LinkBtn";

export default function Featured({ featuredProduct }) {
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
                  href={"/products/" + featuredProduct._id}
                  outline={1}
                  white={1}
                >
                  Read more
                </LinkBtn>
                <Button primary={1}>
                  <FaShoppingCart />
                  Add to cart
                </Button>
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
  font-size: 3rem;
`;

const StyledDescription = styled.p`
  color: #94a3b8;
  font-size: 0.8rem;
`;

const ColumnWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 40px;
  img {
    max-width: 100%;
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
