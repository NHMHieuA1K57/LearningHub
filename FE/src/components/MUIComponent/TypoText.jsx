import React from "react";
import styled from "@emotion/styled";

const TypoContent = styled.h3`
  font-family: inter, sans-serif;
  font-size: ${(props) => getFontSize(props.variant)};
  color: ${(props) => props.color};
  font-weight: ${(props) => getFontWeight(props.variant)};
`;

const getFontSize = (variant) => {
  switch (variant) {
    case "h1":
      return "2.6rem";
    case "h2":
      return "1.8rem";
    case "h3":
      return "1.5rem";
    case "h4":
      return "1.2rem";
    case "h5":
      return "1rem";
    default:
      return "1.5rem";
  }
};

const getFontWeight = (variant) => {
  if (variant === "h1") {
    return "bold";
  } else {
    return "normal";
  }
};

const TypoText = ({ variant, color, value, children, style }) => {
  return (
    <TypoContent variant={variant} style={{ color, ...style }}>
      {value || children}
    </TypoContent>
  );
};

export default TypoText;
