import { createGlobalStyle, DefaultTheme } from 'styled-components';
import { EMediaQuery, ESize } from './utils/enum';
import { mq, setFontSize } from './utils/functions';

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
  margin: 0 auto;
	max-width: 1600px;
	padding: 0 ${(p) => p.theme.spacing['4xl']};

	${(p) => mq(EMediaQuery.lg, `padding: ${p.theme.spacing['xl']}`)}
	${mq(EMediaQuery.sm, `padding: 0 15px;`)}

  background: ${(p) => p.theme.colors.bg};
  min-height: 100vh;

  overflow-x: hidden;

  background-image: url('/assets/images/bubbles/bubbles-bg.svg');
  background-repeat: repeat-y;

  ${mq(EMediaQuery.sm, `background-size: contain;`)}
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
textarea {
  font-family: 'Outfit', sans-serif;
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
// SWAGGER UI
//========================================================================================================
.swagger-ui {

  .arrow,
  .model-toggle:after,
  section.models h4 svg {
    background-color: ${(p) => p.theme.colors.deepBlue};
    padding: 3px;

    border-radius: 50%;
  }

  .info h2 + a,
  .information-container.wrapper,
  .scheme-container {
    display: none;
  }

  .info h2.title,
  .renderedMarkdown p,
  table thead tr th,
  .parameter__name.required,
  .parameter__type,
  .col_header.response-col_status,
  .col_header.response-col_links,
  .col_header.response-col_description,
  .response .response-col_status,
  .response .response-col_links,
  .tab li button.tablinks,
  .btn,
  .opblock .opblock-section-header h4,
  table.model tr.property-row.required,
  .parameter__name
   {
    color: ${(p) => p.theme.colors.text.default};
  }

  .btn {
    border-color: ${(p) => p.theme.colors.deepBlue};
  }

  .opblock .opblock-summary-description,
  .prop-format,
  .model .property.primitive,
  .model-title {
    color: ${(p) => p.theme.colors.text.light};
  }

  .response-control-media-type__accept-message {
    color: ${(p) => p.theme.colors.text.positive};
  }


  .scheme-container,
  .opblock .opblock-section-header {
    background-color: transparent;
  }
}

`;

export default GlobalStyle;
