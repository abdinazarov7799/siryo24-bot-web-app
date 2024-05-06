import React from 'react';
import {Row, Spin} from "antd";

const Loader = () => {
    return <Row justify={"center"} style={{marginTop: 50}}><Spin /></Row>
};

export default Loader;
