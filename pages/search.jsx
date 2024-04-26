/* eslint-disable react-hooks/exhaustive-deps */
import Center from "@/components/Center";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ProductsGrid from "@/components/ProductsGrid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(debounce(searchProducts, 500), []);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      debouncedSearch(query);
    } else {
      setProducts([]);
    }
  }, [query]);

  function searchProducts(query) {
    axios
      .get("/api/products?query=" + encodeURIComponent(query))
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      });
  }
  return (
    <>
      <Header />
      <Center>
        <InputWrapper>
          <SearchInput
            autoFocus
            placeholder="Search product"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputWrapper>
        {!isLoading && query !== "" && products.length === 0 && (
          <h2>No product found for ({query})</h2>
        )}
        {isLoading && <Spinner fullWidth={true} />}
        {!isLoading && products.length > 0 && (
          <ProductsGrid products={products} />
        )}
      </Center>
    </>
  );
}

const SearchInput = styled(Input)`
  padding: 5px 10px;
  font-size: 1.5rem;
`;

const InputWrapper = styled.div`
  position: sticky;
  top: 60px;
  margin: 15px 0;
  padding: 5px 0;
  background-color: #cbd5e1;
`;
