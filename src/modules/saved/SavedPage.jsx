import React from 'react';
import {Empty, Flex, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {URLS} from "../../constants/url.js";
import {KEYS} from "../../constants/key.js";
import {useParams} from "react-router-dom";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {get, isEmpty} from "lodash";
import Product from "../../components/ProductContainer.jsx";
import Container from "../../components/Container.jsx";
import Footer from "../../layouts/Footer.jsx";
import Loader from "../../components/Loader.jsx";
const {Title} = Typography;

const SavedPage = () => {
    const {t} = useTranslation();
    const {userId,lang} = useParams()
    const {data,isLoading} = useGetOneQuery({
        id: userId,
        url: URLS.get_favorites,
        key: KEYS.get_favorites,
        params: {
            params: {
                page: 0,
                size: 1000
            }
        }
    })
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Sevimlilar")}</Title>
                </Flex>
                <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                    {isLoading ? <Loader /> : isEmpty(get(data,'data.data.content')) ? <Empty style={{marginTop: 50}} description={t("Malumot yo'q")}/> : get(data,'data.data.content',[])?.map((product,index) =>
                        <Product
                            product={product}
                            key={index+1}
                            userId={userId}
                            lang={lang}
                            listKeyId={KEYS.get_favorites}
                        />
                    )}
                </Space>
            </Space>
            <Footer userId={userId} lang={lang}/>
        </Container>
    );
};

export default SavedPage;