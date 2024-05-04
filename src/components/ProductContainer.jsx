import React, {useState} from 'react';
import {URLS} from "../constants/url.js";
import {get, isEqual,} from "lodash";
import {Flex, Modal, Row, Space, theme, Typography} from "antd";
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
import MoreInfoModal from "./MoreInfoModal.jsx";

const ProductDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 10px;
    position: relative;
    margin-top: 5px;
`
const AnalogsDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    padding: 15px;
    border-radius: 10px;
    margin-top: 10px;
`
const ElementDiv = styled.div`
    position: absolute;
    display: flex;
    right: 10px;
    top: -17px;
    & div {
        cursor: pointer;
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
const body = {maxHeight: 350, overflow: "auto"}
const Product = ({product,userId,lang,listKeyId}) => {
    const {t} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpenAnalogs, setModalOpenAnalogs] = useState(false);

    const {mutate} = usePostQuery({
        listKeyId,
        hideSuccessToast: true
    })

    const addRemoveFavorities = (id,add) => {
        mutate({
            url: `${URLS.product_add_remove_favorites}/${id}/${userId}?add=${add}`,
        })
    }

    return (
        <ProductDiv key={get(product,'id')}>
            <MoreInfoModal
                isModalOpen={isOpen}
                setModalOpen={setIsOpen}
                userId={userId}
                product={product}
            />
            <Modal
                key="analogs"
                title={get(product,'name')}
                open={isModalOpenAnalogs}
                onCancel={() => setModalOpenAnalogs(false)}
                footer={null}
                styles={{body}}
            >
                {
                    get(product,'analogs',[])?.map((analog,index) => {
                        return (
                            <AnalogsDiv key={index+1}>
                                <Space direction={"vertical"} style={{width:'100%'}}>
                                    <Row>
                                        <Title level={3}>{get(analog, 'name')}</Title>
                                    </Row>
                                    <Row>
                                        <Text strong>{t("Mamlakat")}: {get(analog,'country')}</Text>
                                    </Row>
                                    <Row>
                                        <Text strong>{t("Kategoriya")}: {get(analog,'category')}</Text>
                                    </Row>
                                </Space>
                            </AnalogsDiv>
                        )
                    })
                }
            </Modal>
            <ElementDiv>
                <div onClick={() => setModalOpenAnalogs(true)}>
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
            <Space direction={"vertical"} style={{width: "100%"}} size={"small"} onClick={() => setIsOpen(true)}>
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
