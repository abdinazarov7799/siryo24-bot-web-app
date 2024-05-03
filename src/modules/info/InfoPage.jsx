import React from 'react';
import {useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import Footer from "../../layouts/Footer.jsx";
import {Flex, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import globe from '../../assets/icons/globe.svg'
import group_user from '../../assets/icons/group_user.svg'
import cash from '../../assets/icons/cash.svg'
import heart_filled from '../../assets/icons/heart_filled.svg'
import calendar from '../../assets/icons/calendar.svg'
import document from '../../assets/icons/document.svg'
import industry from '../../assets/icons/industry.svg'
import recycle_repeat from '../../assets/icons/recycle_repeat.svg'
const {Title,Text} = Typography;

const ItemDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 12px;
    position: relative;
    margin-top: 5px;
`
const InfoPage = () => {
    const {userId,lang} = useParams();
    const {t} = useTranslation();
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Tavsiflar")}</Title>
                </Flex>
                <ItemDiv>
                    <Space>
                        <img src={globe} width={25} height={25}/>
                        <Text strong>{t("Ishlab chiqarilgan mamlakat")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={group_user} width={25} height={25}/>
                        <Text strong>{t("Sotuvchi yoki tashkilot")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={industry} width={25} height={25}/>
                        <Text strong>{t("Ishlab chiqaruvchi zavod")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={cash} width={25} height={25}/>
                        <Text strong>{t("Naqd to'lov usuli qabul qilish imkoni mavjud")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={document} width={25} height={25}/>
                        <Text strong>{t("Pul o'tkazmasi orqali to'lov usuli qabul qilish imkoni mavjud")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={recycle_repeat} width={25} height={25}/>
                        <Text strong>{t("Analog markalar soni")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={heart_filled} width={25} height={25}/>
                        <Text strong>{t("Sevimli bo'limiga markani qo'shish")}</Text>
                    </Space>
                </ItemDiv>
                <ItemDiv>
                    <Space>
                        <img src={calendar} width={25} height={25}/>
                        <Text strong>{t("Yaratilgan sava va vaqt ko'rsatkichi")}</Text>
                    </Space>
                </ItemDiv>
            </Space>
            <Footer userId={userId} lang={lang}/>
        </Container>
    );
};

export default InfoPage;