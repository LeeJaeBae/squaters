import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

// 글로벌 스타일
const globalStyles = createGlobalStyle`
${reset};
body, div, input, h1, h2, h3, h4, h5, h6, p, fieldset, ul, ol, li {
        margin : 0 ; padding : 0 ;
    }
    h1, h2, h3, h4, h5, h6, p {
        font-size : 13px ; font-weight : none ;
    }
    a{
        text-decoration: none;
        color: inherit;
    }
    ul, li, ol {
        list-style : none ;
    }
    body {
        background-color : #142850;
    }
`;

export default globalStyles;
