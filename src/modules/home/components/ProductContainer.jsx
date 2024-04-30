import React from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {get,} from "lodash";
import {Button, Flex, Space, Spin, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
const {Title,Text} = Typography;
import globe from '../../../assets/icons/globe.svg'
import cash from '../../../assets/icons/cash.svg'
import document from '../../../assets/icons/document.svg'
import industry from '../../../assets/icons/industry.svg'
import groupUser from '../../../assets/icons/group_user.svg'
// import recycle from '../../../assets/icons/recycle_repeat.svg'

const ProductDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 10px;
`
const Product = ({product,userId,lang}) => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const {data,isLoading} = useGetOneQuery({
        id: get(product,'id'),
        url: URLS.product_get_by_id,
        key: `${KEYS.product_get_by_id}_${get(product,'id')}`,
        params: {
            params: {
                user_id: userId
            }
        },
        enabled: false
    })

    if (isLoading) {
        return <Flex justify={"center"} style={{marginTop: 10}}><Spin /></Flex>
    }

    return (
        <ProductDiv>
            <Space direction={"vertical"} style={{width: "100%"}} size={"small"}>
                <Flex justify={"space-between"} align={"center"}>
                    <Title level={4}>{get(product,'name')}</Title>
                    <div>
                        <Title level={4}>{get(product,'price')}</Title>
                        <Text>{get(product,'priceUpdatedTime')}</Text>
                    </div>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                    <Space>
                        <img src={globe} width={25} height={25}/>
                        <Title level={5}>{get(product,'country')}</Title>
                    </Space>
                    <Space>
                        <img src={industry} width={25} height={25}/>
                        <Title level={5}>{get(product,'manufacturer')}</Title>
                    </Space>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                    <Space>
                        <img src={groupUser} width={25} height={25}/>
                        <Title level={5}>{t("Sotuvchi: ")} {get(product,'seller')}</Title>
                    </Space>
                    <Space>
                        <img src={cash} width={25} height={25}/>
                        <img src={document} width={25} height={25}/>
                    </Space>
                </Flex>
            </Space>
        </ProductDiv>
    );
};

export default Product;
