import React from 'react';
import Container from "../../components/Container.jsx";
import Footer from "../../layouts/Footer.jsx";
import {useParams} from "react-router-dom";
import {Flex, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
const {Title} = Typography;

const ArchivePage = () => {
    const {userId,lang} = useParams()
    const {t} = useTranslation();
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Arxiv narxlar")}</Title>
                </Flex>
            </Space>
            <Footer userId={userId} lang={lang}/>
        </Container>
    );
};

export default ArchivePage;