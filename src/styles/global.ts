import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /*
    Usando o CSS Reset recomendado pelo Josh Comeau
    https://www.joshwcomeau.com/css/custom-css-reset/
  */

  body {
    font-family: 'Inter', serif;
    margin: 0px;
  }

  /* 1. Use a more-intuitive box-sizing model */
  *, *::before, *::after {
    box-sizing: border-box;
  }
  /* 2. Remove default margin */
  * {
    margin: 0;
  }
  body {
    /* 3. Add accessible line-height */
    line-height: 1.5;
    /* 4. Improve text rendering */
    -webkit-font-smoothing: antialiased;
  }
  /* 5. Improve media defaults */
  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }
  /* 6. Inherit fonts for form controls */
  input, button, textarea, select {
    font: inherit;
  }
  /* 7. Avoid text overflows */
  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
  /* 8. Improve line wrapping */
  p {
    text-wrap: pretty;
  }
  h1, h2, h3, h4, h5, h6 {
    text-wrap: balance;
  }
  /*
    9. Create a root stacking context
  */
  #root, #__next {
    isolation: isolate;
  }
`;