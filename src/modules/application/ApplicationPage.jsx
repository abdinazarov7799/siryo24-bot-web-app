import React from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Flex, Space, Tabs, Typography} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {get} from "lodash";
import {KEYS} from "../../constants/key.js";
import MyApplication from "./MyApplication.jsx";
import AllApplication from "./AllApplication.jsx";
import Container from "../../components/Container.jsx";
const {Title} = Typography;

const ApplicationPage = () => {
    const {t} = useTranslation();
    const {userId,lang} = useParams()
    const navigate = useNavigate()
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
                <Flex justify={"space-between"} align={"center"}>
                    <Button
                        icon={<LeftOutlined />}
                        type="primary"
                        onClick={()=> navigate(`/catalog/${userId}/${lang}`)}
                    />
                    <Title level={3}>{t("Buyurtmalar")}</Title>
                    <div></div>
                </Flex>
                <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                    <Tabs defaultActiveKey="1" items={items} centered/>
                </Space>
            </Space>
        </Container>
    );
};

export default ApplicationPage;