import { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';

const StyledGlobalStyle = createGlobalStyle`
    * {
      font-family: 'Trebuchet MS', Helvetica, sans-serif;
      margin: 0;
      box-sizing: border-box;
    }

    body {
        background-color:  white;
        margin: 0;
        font-size: 12px;
    }

    h1 {
        margin: 0;
    }

    textarea {
        &:focus-visible {
            outline-width: 0;
        }
    }
`;

function GlobalStyle() {
    return <StyledGlobalStyle />;
}

export default GlobalStyle;
