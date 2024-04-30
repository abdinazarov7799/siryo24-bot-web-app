import React from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {ConfigProvider, theme} from "antd";
import {useTelegram} from "../hooks/useTelegram.jsx";
import {get, isEqual} from "lodash";
const { defaultAlgorithm, darkAlgorithm } = theme;
const {tg} = useTelegram();

const CustomTheme = {
    algorithm: isEqual(get(tg,'colorScheme','light'),'light') ? defaultAlgorithm : darkAlgorithm,
    fonts: {
        heading: `'Montserrat', sans-serif`,
        body: `'Montserrat', sans-serif`,
    },
    token: {
        colorPrimary: '#414bb2',
        borderRadius: '5px',
        fontSize: 16,
        fontSizeHeading5: 16,
    },
}

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    body {
        overflow-x: hidden;
        max-width: 600px;
        margin: 0 auto;
        min-height: 100vh;
    }
    h1,h2,h3,h4,h5,h6 {
        margin: 0!important;
    }
`
const Theme = ({ children }) => {

  return (
    <ThemeProvider theme={{}}>
        <GlobalStyles />
      <ConfigProvider theme={CustomTheme}>
        {children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default Theme;
