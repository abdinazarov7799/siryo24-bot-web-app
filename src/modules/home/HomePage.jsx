import React, {useEffect, useState} from 'react';
import {Input, Space, Typography} from "antd";
import Container from "../../components/Container.jsx";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import Product from "./components/ProductContainer.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import {request} from "../../services/api/index.js";
import AffixContainer from "../../components/AffixContainer.jsx";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import axios from "axios";
import config from "../../config.js";
const {Text} = Typography

const HomePage = () => {
    const {t,i18n} = useTranslation();
    const navigate = useNavigate();
    const {lang,userId} = useParams();
    const [params,setParams] = useState({})

    const fetchData = (pageParam) => {
        axios({
            method: "get",
            baseURL: config.API_ROOT,
            url: `${URLS.product_list}/${userId}`,
            params: {...params, page: pageParam},
        }).then(response => {
            console.log(response?.data?.data?.content)
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    const {
        data,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: KEYS.product_list,
        initialPageParam: 1,
        queryFn: ({ pageParam = 1 }) => fetchData(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            return allPages.length + 1
        },
    });

    const productList = get(data,'pages')?.map((products) => (
        get(products,'data.data.content')?.map((product) => {
            return <Product product={product} key={get(product,'id')} userId={userId} lang={lang}/>
        })
    ))
    console.log(get(data,'pages'),'get(data,\'pages\')')
    const changeLang = () => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang)
    }
    useEffect(() => {
        changeLang();
    }, []);

    // useEffect(() => {
    //     get(data,'pages')?.map((res) => {
    //         setProductList((prevProductList) => {
    //             return [...prevProductList,get(res,'data.data.content')];
    //         })
    //     })
    // }, [get(data,'pages')]);
    return (
        <Container>
            <Space style={{width: "100%"}} direction={"vertical"}>
                <AffixContainer>
                    <Input
                        prefix={<SearchOutlined />}
                        suffix={<FilterOutlined />}
                        style={{width: "100%"}}
                    />
                </AffixContainer>
                <InfiniteScroll
                    dataLength={get(data,'data.data',[])?.length}
                    next={fetchNextPage}
                    hasMore={hasNextPage}
                    loader={<h4>Loading...</h4>}
                >
                    {productList}
                </InfiniteScroll>
            </Space>
            <button onClick={() => fetchNextPage()}>load more</button>
        </Container>
    );
};

export default HomePage;
