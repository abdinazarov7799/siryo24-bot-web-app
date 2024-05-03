import React from 'react';
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import {Flex, Space, Tabs, Typography} from "antd";
import MyApplication from "./MyApplication.jsx";
import AllApplication from "./AllApplication.jsx";
import Container from "../../components/Container.jsx";
import HomeFooter from "../home/HomeFooter.jsx";
const {Title} = Typography;

const ApplicationPage = () => {
    const {t} = useTranslation();
    const {userId,lang} = useParams()
    const items = [
        {
            key: '1',
            label: t("Mening buyurtmalarim"),
            children: <MyApplication userId={userId}/>
        },
        {
            key: '2',
            label: t("Barcha buyurtmalar"),
            children: <AllApplication userId={userId}/>
        }
    ]
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Buyurtmalar")}</Title>
                </Flex>
                <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                    <Tabs defaultActiveKey="1" items={items} centered/>
                </Space>
            </Space>
            <HomeFooter userId={userId} lang={lang}/>
        </Container>
    );
};

export default ApplicationPage;