import React, {useEffect, useState} from 'react';
import {Affix, Input, Space, Typography} from "antd";
import Container from "../../components/Container.jsx";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import Product from "./components/ProductContainer.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import filter from '../../assets/icons/filter.svg'
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import axios from "axios";
import config from "../../config.js";
const {Text} = Typography

const HomePage = () => {
    const {t,i18n} = useTranslation();
    const navigate = useNavigate();
    const {lang,userId} = useParams();
    const [params,setParams] = useState({})

    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: [KEYS.product_list],
        initialPageParam: 0,
        queryFn: ({ pageParam = 0 }) => axios({
            method: "get",
            baseURL: config.API_ROOT,
            url: `${URLS.product_list}/${userId}`,
            params: {...params, page: pageParam},
        })
            .then(response => response?.data?.data?.content)
            .catch(error => console.error('Error fetching data:', error)),
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length
        },
    });

    const changeLang = () => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang)
    }
    useEffect(() => {
        changeLang();
    }, []);
    return (
        <Container>
            <Space style={{width: "100%"}} direction={"vertical"}>
                <Affix offsetTop={10}>
                    <Input
                        prefix={<SearchOutlined />}
                        suffix={<FilterOutlined />}
                        style={{width: "100%"}}
                        size={"large"}
                        placeholder="Search"
                    />
                </Affix>
                <InfiniteScroll
                    dataLength={data ? data.pages.flat().length : 0}
                    next={() => fetchNextPage()}
                    hasMore={hasNextPage}
                    loader={<h4></h4>}
                    style={{width: "100%"}}
                    hasChildren={false}
                >
                    <Space style={{width: "100%"}} direction={"vertical"}>
                        {get(data,'pages',[])?.flat().map((product) =>
                            <Product product={product} key={get(product,'id')} userId={userId} lang={lang}/>
                        )}
                    </Space>
                </InfiniteScroll>
            </Space>
        </Container>
    );
};

export default HomePage;
