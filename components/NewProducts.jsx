import styled from "styled-components";
import Center from "@/components/Center";
import ProductBox from "@/components/ProductBox";

export default function NewProducts({ newProducts }) {
  return (
    <Center>
      <Title>New Arrivals</Title>
      <ProductGrid>
        {newProducts.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </ProductGrid>
    </Center>
  );
}

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 20px;
  font-weight: 400;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px;
`;
