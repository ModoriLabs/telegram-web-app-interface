import { createGlobalStyle, css } from 'styled-components';
import reset from 'styled-reset';

import { inter, poppins } from '@/utils/font';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  :root {
    --bg-light: #FFFFFF;
    --bg-light-hover: lightgray;
    --bg-initial: rgba(251, 251, 251);
    --bg-deep: #EFEFEF;
    --bg-deeper: #E5E5E5;

    --text-initial: #020407;
    --text-dimmed: #5C5C5C;
    --text-dimmest: #858585;
    --text-inverted: #E5E7EB;
    --text-disabled: #CECECE;

    --border-color: #D3D7DB;
    --box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);

    --bnb-color: #F3BA2F;
    --senior-color: #AFA3FD;
    --junior-color: #C5F07F;
    --blue-color: #625FFB;
    --success-color: #61C454; // green, confirm color
    --warning-color: #EE6A5F; // red, failed, some notification color

    --modal-disabled-color: #B0B0B0;
    --modal-gray: #858585;
    --modal-disabled-button: #D9D9D9;

    --nav-height: 80px;
    --footer-height: 56px;

    --senior-gradient: linear-gradient(134.33deg, #7BF2E9 1.14%, #64E8DE 1.15%, #B65EBA 100%);
    --junior-gradient: linear-gradient(91.24deg, #83FF8F -3.05%, #C5F07F 99.34%);
    --poppins: ${poppins.style.fontFamily};
    --inter: ${inter.style.fontFamily};
  }

  body {
    position: relative;
    min-height: 100%;
    white-space: pre-line;
    background-color: var(--bg-light);
    color: var(--text-initial);
    line-height: 1.5;
  }

  html,
  body {
    padding: 0;
    margin: 0;
    font-family: var(--poppins);

    touch-action: manipulation;
    font-weight: normal;
    word-wrap: break-word;
    font-kerning: normal;
    -webkit-tap-highlight-color:transparent;
    -webkit-tap-highlight-rgba: (0,0,0,0)
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
    word-break: keep-all;
  }

  article,
  aside,
  figure,
  figcaption,
  section,
  div,
  footer,
  header,
  main,
  nav {
    display: block;
    margin: 0;
  }

  button {
    margin: 0;
    border: 0;
    color: inherit;
    font-family: var(--poppins);

    font-weight: 500;
  }
  button:focus {
    outline: none;
  }

  img {
    max-width: 100%;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  b,
  strong {
    margin: 0;
    padding: 0;
    color: inherit;
    font-family: var(--poppins);
    font-weight: 600;
  }

  p,
  span {
    margin: 0;
    padding: 0;
    color: inherit;
    font-family: var(--poppins);
    font-weight: 400;
  }

  input {
    font-family: var(--poppins);
  }

  ul {
    display: block;
    margin: 0;
    list-style: none;
    padding: 0;
  }

  li {
    display: block;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input:focus {
    outline: none;
  }
  &::-webkit-scrollbar {
    /* width: 5px; */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #999999;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: #222222;
  } 
`;
