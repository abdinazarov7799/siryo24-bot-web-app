import React, {useEffect, useState} from 'react';
import {FloatButton, Space} from "antd";
import Container from "../../components/Container.jsx";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import Product from "../../components/ProductContainer.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import axios from "axios";
import config from "../../config.js";
import HomeHeader from "./HomeHeader.jsx";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {FiBookmark} from "react-icons/fi";

const HomePage = () => {
    const {i18n} = useTranslation();
    const {lang,userId} = useParams();
    const [params,setParams] = useState({})
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
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
                <HomeHeader open={open} setOpen={setOpen} params={params} setParams={setParams} userId={userId}/>
                <InfiniteScroll
                    dataLength={data ? data.pages.flat().length : 0}
                    next={() => fetchNextPage()}
                    hasMore={hasNextPage}
                    loader={<h4></h4>}
                    style={{width: "100%", paddingTop: 15}}
                    hasChildren={false}
                >
                    <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                        {get(data,'pages',[])?.flat().map((product) =>
                            <Product
                                product={product}
                                key={get(product,'id')}
                                userId={userId}
                                lang={lang}
                                listKeyId={KEYS.product_list}
                            />
                        )}
                    </Space>
                </InfiniteScroll>
            </Space>
            <FloatButton.Group>
                <FloatButton
                    type={"primary"}
                    onClick={() => navigate(`/application/${userId}/${lang}`)}
                    icon={<ShoppingCartOutlined />}
                    style={{transform: "scale(1.2)"}}
                />
                <FloatButton
                    type={"primary"}
                    onClick={() => navigate(`/saved/${userId}/${lang}`)}
                    icon={<FiBookmark />}
                    style={{transform: "scale(1.2)"}}
                />
                <FloatButton.BackTop style={{transform: "scale(1.2)", marginTop: 20}}/>
            </FloatButton.Group>
        </Container>
    );
};

export default HomePage;
