import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,700&display=swap');

*{
  margin: 0;
  padding:0;
  outline: 0;
  box-sizing: border-box;
}
*:focus{
  outline: 0;
  }
  html, body, #root{ 
    max-height: 100vh;
  }
  body{
    -webkit-font-smoothing: antialiased;
  }
  body, input, button{
    font: 14px 'Roboto', sans-serif;
  }
  button{
    cursor: pointer;
  }
`;
