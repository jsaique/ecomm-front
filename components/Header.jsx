import Link from "next/link";
import styled from "styled-components";
import Center from "@/components/Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";

export default function Header() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={"/"}>eShopping</Logo>
          <StyledNav mobilenavactive={mobileNavActive.toString()}>
            <NavLink href={"/"}>Home</NavLink>
            <NavLink href={"/products"}>All products</NavLink>
            <NavLink href={"/categories"}>Categories</NavLink>
            <NavLink href={"/account"}>Account</NavLink>
            <NavLink href={"/cart"}>Cart ({cartProducts.length})</NavLink>
          </StyledNav>
          <SideIcons>
            <IconContext.Provider value={{ size: "1em" }}>
              <Link href={"/search"}>
                <BsSearch />
              </Link>
              <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
                <GiHamburgerMenu />
              </NavButton>
            </IconContext.Provider>
          </SideIcons>
        </Wrapper>
      </Center>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  background-color: #0f172a; // slate 900
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled(Link)`
  color: #f1f5f9; // slate 100
  text-decoration: none;
  position: relative;
  z-index: 3;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const NavLink = styled(Link)`
  display: block;
  color: #94a3b8; // slate 400
  text-decoration: none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding: 0;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: none;
  color: #f1f5f9;
  position: relative;
  z-index: 3;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;

const StyledNav = styled.nav`
  ${(props) =>
    props.mobilenavactive === "true" ? `display: block;` : `display: none;`}

  gap: 15px;
  position: fixed;
  top: 0px;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #0f172a;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;

const SideIcons = styled.div`
  display: flex;
  a {
    color: #f1f5f9;
    display: inline-block;
    max-width: 20px;
  }
`;
