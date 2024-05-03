import React from 'react';
import {get, isNil} from "lodash";
import {Space, Typography} from "antd";
import styled from "styled-components";
import {PhoneOutlined} from "@ant-design/icons";
const {Text} = Typography;

const ElementDiv = styled.div`
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    padding: 20px;
    border-radius: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    & span {
        font-size: 25px;
    }
`

const TabPhone = ({data}) => {
    return (
        <Space direction={"vertical"} style={{width:'100%'}}>
            {
                !isNil(get(data, 'data.sellerPhone1')) && (
                    <a href={`tel:${get(data, 'data.sellerPhone1')}`} target={"_blank"}>
                        <ElementDiv>
                            <Text>{get(data, 'data.sellerPhone1')}</Text>
                            <PhoneOutlined />
                        </ElementDiv>
                    </a>
                )
            }
            {
                !isNil(get(data, 'data.sellerPhone2')) && (
                    <ElementDiv onClick={() => handleClick(get(data, 'data.sellerPhone2'))}>
                        <Text>{get(data, 'data.sellerPhone2')}</Text>
                        <PhoneOutlined />
                    </ElementDiv>
                )
            }

            {get(data, 'data.sellerPhone2')}
        </Space>
    );
};

export default TabPhone;