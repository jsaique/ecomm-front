import Center from "@/components/Center";
import Header from "@/components/Header";
import ProductsGrid from "@/components/ProductsGrid";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { Category } from "@/models/Category";
import { Product } from "@/models/Product";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function CategoryPage({
  category,
  subCategories,
  products: originalProducts,
}) {
  const defaultSorting = "_id-desc";
  const defaultFilterValues = category.properties.map((prop) => ({
    name: prop.name,
    value: "all",
  }));
  const [products, setProducts] = useState(originalProducts);
  const [filterValues, setFilterValues] = useState(defaultFilterValues); //State for filter values
  const [sort, setSort] = useState(defaultSorting); // State for sorting
  const [loadingProducts, setLoadingProducts] = useState(false); // State when loading products
  const [filterChanged, setFilterChanged] = useState(false); // State to prevent Spinner from showing on reload

  const handleFilterChange = function (filterName, filterValue) {
    setFilterValues((prev) => {
      return prev.map((p) => ({
        name: p.name,
        value: p.name === filterName ? filterValue : p.value,
      }));
    });
    setFilterChanged(true);
  };
  useEffect(() => {
    if (!filterChanged) {
      return;
    }
    setLoadingProducts(true);
    const catIds = [category._id, ...(subCategories.map((c) => c._id) || [])];
    const params = new URLSearchParams();
    params.set("categories", catIds.join(","));
    params.set("sort", sort);
    filterValues.forEach((fil) => {
      if (fil.value !== "all") {
        params.set(fil.name, fil.value);
      }
    });
    let url = `/api/products?` + params.toString();
    axios.get(url).then((res) => setProducts(res.data));
    setTimeout(() => {
      setLoadingProducts(false);
    }, 1000);
  }, [filterValues, sort, filterChanged]);
  return (
    <>
      <Header />
      <Center>
        <CategoryHeader>
          <Title>{category.name}</Title>
          <FilterWrapper>
            {category.properties.map((prop) => (
              <Filter key={prop.name}>
                <span>
                  {prop.name.charAt(0).toUpperCase() + prop.name.slice(1)}:
                </span>
                <select
                  onChange={(e) =>
                    handleFilterChange(prop.name, e.target.value)
                  }
                  value={
                    filterValues.find((fil) => fil.name === prop.name).value
                  }
                >
                  <option value="all">All</option>
                  {prop.values.map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
              </Filter>
            ))}
            <Filter>
              <span>Sort:</span>
              <select
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value), setFilterChanged(true);
                }}
              >
                <option value="price-asc">price, lowest to highest</option>
                <option value="price-desc">price, highest to lowest</option>
                <option value="_id-desc">newest to oldest</option>
                <option value="_id-asc">oldest to newest</option>
              </select>
            </Filter>
          </FilterWrapper>
        </CategoryHeader>
        {loadingProducts && <Spinner fullWidth />}
        {!loadingProducts && (
          <div>
            {products.length > 0 && <ProductsGrid products={products} />}
            {products.length === 0 && (
              <ApologyWrapper>Sorry, No products found</ApologyWrapper>
            )}
          </div>
        )}
      </Center>
    </>
  );
}

export async function getServerSideProps(context) {
  const category = await Category.findById(context.query.id);
  const subCategories = await Category.find({ parent: category._id });
  const catIds = [category._id, ...subCategories.map((c) => c._id)];
  const products = await Product.find({ category: catIds });
  console.log(category);
  return {
    props: {
      category: JSON.parse(JSON.stringify(category)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FilterWrapper = styled.div`
  display: flex;
  gap: 15px;
`;

const Filter = styled.div`
  background-color: #a4bcda;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  color: #444;
  select {
    background-color: transparent;
    border: none;
    font-size: inherit;
    color: #444;
  }
`;

const ApologyWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;
