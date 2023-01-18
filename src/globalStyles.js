// globalStyles.js
import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }

  .ant-input {
    display: none;
  }
`;
 
export default GlobalStyle;