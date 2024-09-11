import React from "react";
import { Link as MuiLink } from "@mui/material";
import styled from "@emotion/styled";
import A from "../../common/assets";

const ButtonLinkStyle = styled(MuiLink)`
  text-decoration: none;
  font-size: 16px;
  font-family: inter, sans-serif;
  display: inline-block;
  margin: 5px 0;
  padding: 0.5rem 1rem;
  border: 1px solid #9747ff;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease;
  background: ${A.colors.primary};

  &:hover {
    background-color: #cba3ff;
    border-color: #cba3ff;
    box-shadow: 0 0 10px #888888;
  }

  &.cancel {
    background-color: #ffffff;
    color: #000000;
    border-color: #9747ff;

    &:hover {
      background-color: #cba3ff;
      border-color: #cba3ff;
      box-shadow: 0 0 10px #888888;
    }
  }
`;

const ButtonLink = ({ color, href, children, style, variant }) => {
  const buttonStyles = variant === "cancel" ? "cancel" : "";

  const linkStyles = `
    .link {
      text-decoration: none;
      color: ${color || "#000000"};
      transition: color 0.3s ease;
    }
  `;

  const styleTag = document.createElement("style");
  styleTag.innerHTML = linkStyles;
  document.head.appendChild(styleTag);

  return (
    <ButtonLinkStyle
      color={color}
      href={href}
      style={style}
      className={`link ${buttonStyles}`}
    >
      {children}
    </ButtonLinkStyle>
  );
};

export default ButtonLink;
