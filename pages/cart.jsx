import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function CartPage() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => setProducts(response.data));
    }
  }, [cartProducts]);

  return (
    <>
      <Header />
      <Center>
        <ColumWrapper>
          <Box>
            {!cartProducts?.length && <div>Your cart is empty</div>}
            {products.length > 0 && (
              <>
                <Title>Cart</Title>
                {products.map((product) => (
                  <div>
                    {product.title}:{" "}
                    {cartProducts.filter((id) => id === product._id).length}
                  </div>
                ))}
              </>
            )}
          </Box>
          {!!cartProducts?.length && (
            <Box>
              <Title>Order Information</Title>
              <input type="text" placeholder="Address" />
              <input type="text" placeholder="Address 2" />
              <Button block={1} black={1}>
                Continue to payment
              </Button>
            </Box>
          )}
        </ColumWrapper>
      </Center>
    </>
  );
}

const ColumWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
`;
