import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import { signIn, signOut, useSession } from "next-auth/react";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);

  const logout = async function () {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_REDIRECT_URL,
    });
  };
  const login = async function () {
    await signIn("google");
  };

  const saveAddress = function () {
    const data = { name, email, address, city, state, zip, country };
    axios.put("/api/address", data);
  };

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    // Fetching the data from the database
    axios.get("/api/address").then((res) => {
      setName(res.data.name);
      setEmail(res.data.email);
      setAddress(res.data.address);
      setCity(res.data.city);
      setState(res.data.state);
      setZip(res.data.zip);
      setCountry(res.data.country);
      setAddressLoaded(true);
    });
    axios.get("/api/wishlist").then((res) => {
      setWishedProducts(res.data.map((wp) => wp.product));
      setWishlistLoaded(true);
    });
  }, [session]);

  function removedProductFromWishlist(idToRemove) {
    setWishedProducts((product) => {
      return [...product.filter((p) => p._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div>
            <RevealWrapper delay={0}>
              <WhiteBox>
                <h2>Wishlist</h2>
                {!wishlistLoaded && <Spinner fullWidth={true} />}
                {wishlistLoaded && (
                  <>
                    <WishedProductGrid>
                      {wishedProducts.length > 0 &&
                        wishedProducts.map((wp) => (
                          <ProductBox
                            key={wp._id}
                            {...wp}
                            wished={true}
                            onRemoveFromWishlist={removedProductFromWishlist}
                          />
                        ))}
                    </WishedProductGrid>
                    {wishedProducts.length === 0 && (
                      <>
                        {session && <p>Your wishlist is empty</p>}
                        {!session && <p>Login with Google</p>}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
          <div>
            <RevealWrapper delay={100}>
              <WhiteBox>
                <h2>{session ? "Account details" : "Welcome Guest"}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <>
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
                    <Button block={1} black={1} onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </>
                )}
                {session && (
                  <Button primary={1} onClick={logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary={1} onClick={login}>
                    Login with Google
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>
    </>
  );
}

const ColsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 40px;
  margin: 40px 0;
`;

const CityContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const WishedProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;
