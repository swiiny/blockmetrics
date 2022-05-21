import { createGlobalStyle, DefaultTheme } from 'styled-components';

const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
//========================================================================================================
// GENERAL
//========================================================================================================
* {
	box-sizing: border-box;
}
*::before {
	box-sizing: border-box;
}
*::after {
	box-sizing: border-box;
}

body {
  margin: 0;
}

html {
  background-color: ${(p) => p.theme.colors.bg};
}

h1,
h2,
h3,
h4,
h5,
h6,
button,
span,
a,
p,
input,
textarea { // TODO : Set font family
	font-family: SetFontFamily, Helvetica, sans-serif;
	color: ${(p) => p.theme.colors.text.default};

	margin: 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

a {
  text-decoration: none;
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  -webkit-text-fill-color: ${({ theme }) => theme.colors.text.default};
  box-shadow: 0 0 0px 1000px #00000000 inset;
  -webkit-transition: background-color 5000s ease-in-out 0s;
  transition: background-color 5000s ease-in-out 0s;
}

input,
textarea {
  background-color: transparent;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px ${(p) => p.theme.colors.bg};
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  border-radius: 6px;
  box-shadow: inset 0 0 6px ${(p) => p.theme.colors.text.default};
}

//========================================================================================================
// FONTS
//========================================================================================================


`;

export default GlobalStyle;
