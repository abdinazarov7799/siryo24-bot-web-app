import React from 'react';
import useGetOneQuery from "../hooks/api/useGetOneQuery.js";
import {URLS} from "../constants/url.js";
import {KEYS} from "../constants/key.js";
import {get, isEqual,} from "lodash";
import {Flex, Space, Spin, Typography} from "antd";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
const {Title,Text} = Typography;
import globe from '../assets/icons/globe.svg'
import cash from '../assets/icons/cash.svg'
import document from '../assets/icons/document.svg'
import industry from '../assets/icons/industry.svg'
import groupUser from '../assets/icons/group_user.svg'
import recycle from '../assets/icons/recycle_repeat.svg'
import noLiked from '../assets/icons/heart.svg'
import liked from '../assets/icons/heart_filled.svg'
import usePostQuery from "../hooks/api/usePostQuery.js";

const ProductDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 10px;
    position: relative;
    margin-top: 5px;
`
const ElementDiv = styled.div`
    position: absolute;
    display: flex;
    right: 10px;
    top: -17px;
    & div {
        width: 30px;
        height: 30px;
        background-color: #d9d9d9;
        border-radius: 50%;
        margin-right: 10px;
        & img {
            margin: 2.5px
        }
        & span {
            position: absolute;
            font-size: 12px;
            top: 8px;
            left: 12px;
        }
    }
`
const Product = ({product,userId,lang,listKeyId}) => {
    const {t} = useTranslation();
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
    const {mutate} = usePostQuery({
        listKeyId,
        hideSuccessToast: true
    })

    const addRemoveFavorities = (id,add) => {
        mutate({
            url: `${URLS.product_add_remove_favorites}/${id}/${userId}?add=${add}`,
        })
    }

    if (isLoading) {
        return <Flex justify={"center"} style={{marginTop: 10}}><Spin /></Flex>
    }
    return (
        <ProductDiv>
            <ElementDiv>
                <div>
                    <span>{get(product,'analogsCount')}</span>
                    <img src={recycle} width={25} height={25}/>
                </div>
                <div onClick={() => addRemoveFavorities(get(product,'id'),!get(product,'favourite'))}>
                    <img
                        src={get(product,'favourite') ? liked : noLiked}
                        width={25}
                        height={25}
                    />
                </div>
            </ElementDiv>
            <Space direction={"vertical"} style={{width: "100%"}} size={"small"}>
                <Flex justify={"space-between"} align={"center"}>
                    <Title level={4}>{get(product,'name')}</Title>
                    <div style={{textAlign: "end"}}>
                        {
                            isEqual(get(product,'price'),0) ?
                                <Title level={5}>{t(get(product,'status'))}</Title> :
                                <Title level={4} type={"success"}>{get(product,'price')}</Title>
                        }
                        <Text style={{fontSize: 11}}>{get(product,'priceUpdatedTime')}</Text>
                    </div>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                    <Flex>
                        <img src={globe} width={20} height={20} style={{margin: "auto 5px auto 0"}}/>
                        <Title level={5}>{get(product,'country')}</Title>
                    </Flex>
                    <Flex>
                        <img src={industry} width={20} height={20} style={{margin: "auto 5px auto 0"}}/>
                        <Title level={5}>{get(product,'manufacturer')}</Title>
                    </Flex>
                </Flex>
                <Flex justify={"space-between"} align={"center"}>
                    <Flex>
                        <img src={groupUser} width={20} height={20} style={{margin: "auto 5px auto 0"}}/>
                        <Title level={5}>{t("Sotuvchi: ")} {get(product,'seller')}</Title>
                    </Flex>
                    <Space>
                        {get(product,'acceptCash') && <img src={cash} width={20} height={20}/>}
                        {get(product,'acceptTransfer') && <img src={document} width={20} height={20}/>}
                    </Space>
                </Flex>
            </Space>
        </ProductDiv>
    );
};

export default Product;
