import styled from "styled-components";

export default function Table(props) {
  return <StyledTable {...props} />;
}

const StyledTable = styled.table`
  width: 100%;
  th {
    text-align: left;
    text-transform: uppercase;
    color: #cbd5e1;
    font-weight: 600;
    font-size: 0.7rem;
  }
  td {
    border-top: 1px solid #cbd5e1;
  }
`;
