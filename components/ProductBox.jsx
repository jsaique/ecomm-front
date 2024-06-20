/* eslint-disable @next/next/no-img-element */
import styled from "styled-components";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import FlyingButton from "./FlyingButton";
import HeartOutlinedIcon from "./icons/HeartOulinedIcon";
import { useState } from "react";
import HeartSolidIcon from "./icons/HeartSolidIcon";
import axios from "axios";

export default function ProductBox({
  _id,
  title,
  price,
  images,
  wished = false,
  onRemoveFromWishlist = () => {},
}) {
  const url = "/product/" + _id;
  const [isWished, setIsWished] = useState(wished);

  const addToWishlist = function (e) {
    e.preventDefault();
    e.stopPropagation();
    const nextValue = !isWished;
    if (nextValue === false && onRemoveFromWishlist) {
      onRemoveFromWishlist(_id);
    }
    axios
      .post("/api/wishlist", {
        product: _id,
      })
      .then(() => {});
    setIsWished(nextValue);
  };

  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished.toString()} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlinedIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt="" />
        </div>
      </WhiteBox>
      <ProductInfo>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>${price}</Price>
          <FlyingButton _id={_id} src={images?.[0]}>
            <FaShoppingCart />
            Add
          </FlyingButton>
        </PriceRow>
      </ProductInfo>
    </ProductWrapper>
  );
}

const ProductWrapper = styled.div`
  button {
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const WishlistButton = styled.button`
  border: none;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  cursor: pointer;
  svg {
    width: 16px;
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
  display: block;
  @media screen and (min-width: 768px) {
    display: flex;
  }
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  gap: 5px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight: 400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight: 600;
    text-align: left;
  }
`;
