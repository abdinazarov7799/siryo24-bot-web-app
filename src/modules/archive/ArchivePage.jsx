import React from 'react';
import Container from "../../components/Container.jsx";
import Footer from "../../layouts/Footer.jsx";
import {useParams} from "react-router-dom";
import {Flex, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {URLS} from "../../constants/url.js";
import {KEYS} from "../../constants/key.js";
const {Title} = Typography;

const ArchivePage = () => {
    const {userId,lang} = useParams()
    const {t} = useTranslation();
    const {data} = useGetAllQuery({
        url: URLS.get_price_history,
        key: KEYS.get_price_history,
        params: {
            params: {
                from: dayjs(new Date("05-01-2024")).unix(),
                to: dayjs(Date.now()).unix()
            }
        }
    })
    console.log(new Date("05-01-2024"));
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