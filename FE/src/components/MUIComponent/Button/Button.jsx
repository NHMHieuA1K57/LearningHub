import React from "react";
import styles from "./Button.module.css";
import A from "../../../common/assets";

const Button = (props) => {
  const { onClick, variant, children, style } = props;

  let buttonStyles = styles.button;
  let buttonBgColor = A.colors.primary;
  let buttonTextColor = A.colors.white;

  if (variant === "cancel") {
    buttonStyles = `${styles.button} ${styles.cancel}`;
    buttonBgColor = A.colors.white;
    buttonTextColor = A.colors.black;
  }

  const inlineStyles = {
    backgroundColor: buttonBgColor,
    color: buttonTextColor,
    ...style, //merging style prop with inline style
  };

  return (
    <button
      className={buttonStyles}
      onClick={props.onClick}
      style={{ ...inlineStyles }}
    >
      {children}
    </button>
  );
};

export default Button;