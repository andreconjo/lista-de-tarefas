import styled from "styled-components";

export const Footer = styled.footer`
  bottom: 20px;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);

  a {
    text-decoration: none;
    background-image: linear-gradient(45deg, #17c0e9, #c96ddd, #f45162);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: bold;
    cursor: pointer; 
    transition: 1s ease-in-out;
    
    &:hover {
     background-position: 281.94px;
    }
  }
`
