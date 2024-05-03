import React from 'react';
import {useParams} from "react-router-dom";
import Container from "../../components/Container.jsx";
import HomeFooter from "../home/HomeFooter.jsx";
import {Flex, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
const {Title} = Typography;

const InfoPage = () => {
    const {userId,lang} = useParams();
    const {t} = useTranslation();
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Tavsif")}</Title>
                </Flex>
            </Space>
            <HomeFooter userId={userId} lang={lang}/>
        </Container>
    );
};

export default InfoPage;