import styled from "styled-components";

export default function OrderList({ line_items, createdAt, _id, ...rest }) {
  return (
    <StyledOrderList>
      <div>
        <time>{new Date(createdAt).toLocaleString("en-US")}</time>
        <StyledAddress>
          {rest.name}
          <br />
          {rest.address}
          <br />
          {rest.city}
          <br /> {rest.state}
          <br /> {rest.zip}
        </StyledAddress>
      </div>
      <div>
        {line_items.map((item) => (
          <ProductRow key={_id}>
            <span>{item.quantity} x </span>
            {item.price_data.product_data.name}
          </ProductRow>
        ))}
      </div>
    </StyledOrderList>
  );
}

const StyledOrderList = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
  padding: 10px 0;
  border-bottom: 1px solid #9ca3af;
  time {
    font-size: 1rem;
  }
`;

const ProductRow = styled.div`
  span {
    color: #9ca3af;
  }
`;

const StyledAddress = styled.div`
  font-size: 0.8rem;
  line-height: 1rem;
  margin-top: 5px;
`;
