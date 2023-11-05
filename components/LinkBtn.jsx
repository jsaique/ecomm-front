import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";

export default function LinkBtn(props) {
  return <StyledLink {...props}></StyledLink>;
}

const StyledLink = styled(Link)`
  ${ButtonStyle}
`;
