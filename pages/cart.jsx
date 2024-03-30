/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import Center from "@/components/Center";
import Header from "@/components/Header";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Table from "@/components/Table";
import Input from "@/components/Input";
import css from "styled-jsx/css";
import Title from "@/components/Title";
import { RevealWrapper } from "next-reveal";
import { useSession } from "next-auth/react";

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [isSuccess, setIsSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios
        .post("/api/cart", { ids: cartProducts })
        .then((response) => setProducts(response.data));
    } else {
      setProducts([]);
    }
  }, [cartProducts]);
  // Clearing the cart
  useEffect(() => {
    if (typeof window === undefined) {
      return;
    }
    if (window.location.href.includes("success")) {
      clearCart();
      setIsSuccess(true);
    }
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setCity(res.data.city);
      setState(res.data.state);
      setZip(res.data.zip);
      setCountry(res.data.country);
    });
  }, [session]);

  // Adds a product in your existing cart
  const moreProduct = function (id) {
    addProduct(id);
  };
  // Decreases a product in your existing cart
  const lessProduct = function (id) {
    removeProduct(id);
  };
  // Calculating the total price of a product
  let totalPrice = 0;
  for (const productID of cartProducts) {
    const price =
      products.find((product) => product._id === productID)?.price || 0;
    totalPrice += price;
  }

  const goToPayment = async function () {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      address,
      city,
      state,
      zip,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumWrapper>
            <Box>
              <Title>Thank you, Your order is being processed!</Title>
              <p>You will recieve an email when your order is shipped.</p>
            </Box>
          </ColumWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumWrapper>
          <RevealWrapper delay={0}>
            <Box>
              <Title>Cart</Title>
              {!cartProducts?.length && <div>Your cart is empty</div>}
              {products.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <img src={product.images[0]} alt="" />
                          </ProductImageBox>
                          {product.title}:
                        </ProductInfoCell>
                        <td>
                          <Button onClick={() => lessProduct(product._id)}>
                            &#8722;
                          </Button>
                          <QuantityCell>
                            {
                              cartProducts.filter((id) => id === product._id)
                                .length
                            }
                          </QuantityCell>
                          <Button onClick={() => moreProduct(product._id)}>
                            &#43;
                          </Button>
                        </td>

                        <td>
                          &#36;
                          {cartProducts.filter((id) => id === product._id)
                            .length * product.price}
                        </td>
                      </tr>
                    ))}
                    <tr className="subtotal">
                      <td colSpan={2}>Products</td>
                      <td>&#36;{totalPrice}</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Shipping</td>
                      <td>${shippingFee}</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Total</td>
                      <td>${totalPrice + parseInt(shippingFee)}</td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>
          {!!cartProducts?.length && (
            <RevealWrapper delay={100}>
              <Box small={1}>
                <Title>Order Information</Title>

                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={address}
                  name="address"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <CityContainer>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="State"
                    value={state}
                    name="state"
                    onChange={(e) => setState(e.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Zipcode"
                    value={zip}
                    name="zip"
                    onChange={(e) => setZip(e.target.value)}
                  />
                </CityContainer>
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(e) => setCountry(e.target.value)}
                />
                <Button block={1} black={1} onClick={goToPayment}>
                  Continue to payment
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumWrapper>
      </Center>
    </>
  );
}

const ColumWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
  gap: 40px;
  margin-top: 40px;
  margin-bottom: 40px;
  table thead tr th:nth-child(3),
  table tbody tr td:nth-child(3),
  table tbody tr.subtotal td:nth-child(2) {
    text-align: right;
  }
  table tr.subtotal td {
    padding: 10px 0;
  }
  tr.total td {
    font-weight: bold;
  }
`;

const Box = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  ${(props) =>
    props.small &&
    css`
      max-height: 350px;
    `}
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 100px;
  padding: 2px;
  border: 1px solid #cbd5e1;
  border-radius: 10px;
  img {
    max-width: 60px;
    max-height: 60px;
    border-radius: 10px;
  }
  @media screen and (min-width: 768px) {
    width: 100px;
    height: 100px;
    padding: 10px;
    max-width: 80px;
    max-height: 80px;
  }
`;

const QuantityCell = styled.span`
  padding: 0 15px;
  @media screen and (min-width: 768px) {
    display: inline-block;
    padding: 0 10px;
  }
`;

const CityContainer = styled.div`
  display: flex;
  gap: 5px;
`;
