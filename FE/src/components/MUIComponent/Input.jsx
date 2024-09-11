import React from "react";
// import styled from 'styled-components';
import styled from "@emotion/styled";

const InputField = styled.input`
    width: 300px;
    height: 40px;
    padding: 5px 30px;
    border: none;
    border-radius: 10px;
    background-color: #F6F6F6;
    font-size: 16px;
    color: #333333;
    outline: none;
    box-shadow: 0 0 10px #888888;
    font-family: inter, sans-serif;
`;

const Input = ({placeholder}) => {
  return <InputField type="text" placeholder={placeholder}/>;
};

Input.defaultProps = {
    placeholder: 'Enter text',
}

export default Input;