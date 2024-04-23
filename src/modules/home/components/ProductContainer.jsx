import React from 'react';
import useGetOneQuery from "../../../hooks/api/useGetOneQuery.js";
import {URLS} from "../../../constants/url.js";
import {KEYS} from "../../../constants/key.js";
import {get, isArray,isEqual, isNil} from "lodash";
import {Button, Card, Col, Flex, Input, Row, Space, Spin, Typography} from "antd";
import {useTranslation} from "react-i18next";
import useStore from "../../../services/store/useStore.jsx";
import {useNavigate} from "react-router-dom";
import {Element} from "react-scroll"
const {Title,Text} = Typography;

const body = {
    padding: 6
}
const Product = ({product,userId,lang}) => {
    const {t} = useTranslation();
    const {orders,increment,decrement} = useStore();
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
        <Card
            hoverable
            styles={{body}}
        >
            <Space direction={"vertical"} style={{width: "100%"}}>
                <Text>{get(product,'seller')}</Text>
                <Text>{get(product,'acceptCash')}</Text>
                <Text>{get(product,'acceptTransfer')}</Text>
                <Text>{get(product,'favourite')}</Text>
                <Text>{get(product,'name')}</Text>
                <Text>{get(product,'country')}</Text>
                <Text>{get(product,'manufacturer')}</Text>
                <Text>{get(product,'price')}</Text>
                <Text>{get(product,'priceUpdatedTime')}</Text>
            </Space>
        </Card>
    );
};

export default Product;
