import styled from "styled-components";
import Button from "@/components/Button";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";

export default function ProductBox({ _id, title, description, price, images }) {
  const url = "/products/" + _id;
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <img src={images[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfo>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <Button primary={1} outline={1}>
            <FaShoppingCart />
            Add
          </Button>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div``;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled(Link)`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
  color: inherit;
  text-decoration: none;
`;

const ProductInfo = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`;