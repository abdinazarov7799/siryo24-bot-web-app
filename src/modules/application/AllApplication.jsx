import React from 'react';
import {Button, Col, Flex, Row, Space, Typography} from "antd";
import {get} from "lodash";
import {KEYS} from "../../constants/key.js";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import axios from "axios";
import config from "../../config.js";
import {URLS} from "../../constants/url.js";
import {useParams} from "react-router-dom";
import {CalendarOutlined, CommentOutlined} from "@ant-design/icons";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import UserImg from '../../assets/icons/group_user.svg'
const {Title,Text,Link} = Typography;


const ItemDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 12px;
    position: relative;
    margin-top: 5px;
`

const AllApplication = () => {
    const {userId,lang} = useParams()
    const {t} = useTranslation();
    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [`${KEYS.get_application}_all`],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => axios({
            method: "get",
            baseURL: config.API_ROOT,
            url: `${URLS.get_application}/${userId}`,
            params: {mine: false,page: pageParam},
        })
            .then(response => response?.data?.data?.content)
            .catch(error => console.error('Error fetching data:', error)),
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length
        },
    });

    return (
        <>
            <InfiniteScroll
                dataLength={data ? data.pages.flat().length : 0}
                next={() => fetchNextPage()}
                hasMore={hasNextPage}
                loader={<h4></h4>}
                style={{width: "100%", minHeight: "50vh"}}
                hasChildren={false}
            >
                <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                    {get(data,'pages',[])?.flat().map((item) => {
                        return (
                            <ItemDiv>
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
                                            <Space>
                                                <CalendarOutlined style={{fontSize: 16}}/>
                                                <Text>{get(item,'createdAt')}</Text>
                                            </Space>
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
                                            <Button
                                                type="primary"
                                                onClick={() => window.location.href = `tel:${get(item,'phoneNumber')}`}
                                            >
                                                {get(item,'user.phoneNumber')}
                                            </Button>
                                        </Col>
                                    </Flex>
                                </Space>
                            </ItemDiv>
                            )
                    })}
                </Space>
            </InfiniteScroll>
        </>
    );
};

export default AllApplication;