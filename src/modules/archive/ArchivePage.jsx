import React, {useState} from 'react';
import Container from "../../components/Container.jsx";
import Footer from "../../layouts/Footer.jsx";
import {useParams} from "react-router-dom";
import {Button, Col, Empty, Flex, Row, Space, Typography} from "antd";
import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {URLS} from "../../constants/url.js";
import {KEYS} from "../../constants/key.js";
import {get, isEmpty} from "lodash";
import calendar from "../../assets/icons/calendar.svg";
import {CommentOutlined} from "@ant-design/icons";
import UserImg from "../../assets/icons/group_user.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import axios from "axios";
import config from "../../config.js";
import styled from "styled-components";
import Loader from "../../components/Loader.jsx";
const {Title,Text} = Typography;

const initialParams = {
    from: dayjs(Date.now()).unix(),
    to: dayjs(Date.now()).unix()
}

const ItemDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 12px;
    position: relative;
    margin-top: 5px;
`
const ArchivePage = () => {
    const {userId,lang} = useParams()
    const {t} = useTranslation();
    const [params, setParams] = useState(initialParams)
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading
    } = useInfiniteQuery({
        queryKey: [KEYS.get_price_history],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => axios({
            method: "get",
            baseURL: config.API_ROOT,
            url: URLS.get_price_history,
            params: {...params,page: pageParam},
        })
            .then(response => response?.data?.data?.content)
            .catch(error => console.error('Error fetching data:', error)),
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length
        },
    });

    const productsData = get(data,'pages',[])?.flat();
    return (
        <Container>
            <Space direction="vertical" style={{width:'100%'}}>
                <Flex justify={"center"}>
                    <Title level={3}>{t("Arxiv narxlar")}</Title>
                </Flex>
                <InfiniteScroll
                    dataLength={data ? productsData.length : 0}
                    next={() => fetchNextPage()}
                    hasMore={hasNextPage}
                    loader={<h4></h4>}
                    style={{width: "100%", minHeight: "50vh"}}
                    hasChildren={false}
                >
                    <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                        {isLoading ? <Loader /> : isEmpty(productsData) ? <Empty style={{marginTop: 50}} description={t("Malumot yo'q")}/> : productsData?.map((item,index) => {
                            return (
                                <ItemDiv key={index+1}>
                                    <Space direction={"vertical"} style={{width: "100%"}} size={"small"}>
                                        <Row justify={"space-between"}>
                                            <Col>
                                                <Flex wrap={"wrap"}>
                                                    {
                                                        get(item,'products',[])?.map((product,index)=> {
                                                            return <Title level={4}>{get(product, 'name')}{index > 0 && ","}</Title>
                                                        })
                                                    }
                                                </Flex>
                                            </Col>
                                            <Col style={{textAlign: "end"}}>
                                                <Flex style={{width: 153}} align={"center"}>
                                                    <img src={calendar} width={24} height={24} style={{margin: "auto"}}/>
                                                    <Text>{get(item,'createdAt')}</Text>
                                                </Flex>
                                            </Col>
                                        </Row>
                                        <Flex wrap={"wrap"}>
                                            <CommentOutlined />
                                            <Text strong style={{margin: "0 5px"}}>{t("Kommentariya")}: </Text>
                                            <Text>{get(item,'comment')}</Text>
                                        </Flex>
                                        <Flex justify={"space-between"} align={"center"}>
                                            <Col>
                                                <Flex align={"center"}>
                                                    <img src={UserImg}/>
                                                    <Text style={{marginLeft: 5}} strong>{t("Ismi")}: {get(item,'user.name')}</Text>
                                                </Flex>
                                            </Col>
                                            <Col>
                                                <a href={`tel:${get(item,'phoneNumber')}`} target={"_blank"}>
                                                    <Button
                                                        type="primary"
                                                    >
                                                        {get(item,'user.phoneNumber')}
                                                    </Button>
                                                </a>
                                            </Col>
                                        </Flex>
                                    </Space>
                                </ItemDiv>
                            )
                        })}
                    </Space>
                </InfiniteScroll>
            </Space>
            <Footer userId={userId} lang={lang}/>
        </Container>
    );
};

export default ArchivePage;