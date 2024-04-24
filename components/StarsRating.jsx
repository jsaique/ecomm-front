import styled from "styled-components";
import StarOutlinedIcon from "./icons/StarOutlinedIcon";
import { useState } from "react";
import StarSolidIcon from "./icons/StarSolidIcon";
import { primary } from "@/lib/colors";

export default function StarsRating({
  size = "md",
  defaultStar = 0,
  disabled,
  onChange = () => {},
}) {
  const [stars, setStars] = useState(defaultStar);

  const arr = [1, 2, 3, 4, 5];

  function handleStarClick(n) {
    if (disabled) return;
    setStars(n);
    onChange(n);
  }

  return (
    <StarsWrapper>
      {arr.map((n, index) => (
        <StarWrapper
          disabled={disabled}
          size={size}
          key={index}
          onClick={() => handleStarClick(n)}
        >
          {stars >= n ? <StarSolidIcon /> : <StarOutlinedIcon />}
        </StarWrapper>
      ))}
    </StarsWrapper>
  );
}

const StarsWrapper = styled.div`
  display: inline-flex;
  gap: 1px;
  align-items: center;
`;

const StarWrapper = styled.button`
  ${(props) =>
    props.size === "md" &&
    `
    height: 1.4rem;
    width: 1.4rem;
  `}
  ${(props) =>
    props.size === "sm" &&
    `
    height: 1rem;
    width: 1rem;
  `}
  ${(props) =>
    !props.disabled &&
    `
    cursor: pointer;
  `}
  padding: 0;
  border: 0;
  display: inline-block;
  background-color: transparent;
  color: ${primary};
`;
