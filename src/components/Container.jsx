import React from 'react';
import {theme} from "antd";

const Container = ({children}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <div style={{
            margin: "0 auto",
            padding: "16px 16px 90px 16px",
            borderRadius: 0,
            width: "100%",
            backgroundColor: colorBgContainer,
            minHeight: "100vh"
        }}>
            {children}
        </div>
    );
};

export default Container;
