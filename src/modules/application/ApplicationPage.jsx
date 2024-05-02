import React from 'react';
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Flex, Space, Tabs, Typography} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import {get} from "lodash";
import {KEYS} from "../../constants/key.js";
import MyApplication from "./MyApplication.jsx";
import AllApplication from "./AllApplication.jsx";
const {Title} = Typography;

const ApplicationPage = () => {
    const {t} = useTranslation();
    const {userId,lang} = useParams()
    const navigate = useNavigate()
    const items = [
        {
            key: '1',
            label: t("Mening buyurtmalarim"),
            children: <MyApplication />
        },
        {
            key: '2',
            label: t("Barcha buyurtmalar"),
            children: <AllApplication />
        }
    ]
    return (
        <>
            <Button
                icon={<LeftOutlined />}
                type="primary"
                onClick={()=> navigate(`/catalog/${userId}/${lang}`)}
                style={{position: "absolute", top: 5}}
            >
                {t("Back")}
            </Button>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={2}>{t("Buyurtmalar")}</Title>
                </Flex>
                <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                    <Tabs defaultActiveKey="1" items={items} centered/>
                </Space>
            </Space>
        </>
    );
};

export default ApplicationPage;