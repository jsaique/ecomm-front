import styled from "styled-components";
import Center from "@/components/Center";
import ProductsGrid from "./ProductsGrid";

export default function NewProducts({ newProducts, wishedProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductsGrid products={newProducts} wishedProducts={wishedProducts} />
    </Center>
  );
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
`;
