import React, {useEffect, useState} from 'react';
import {Empty, FloatButton, Space} from "antd";
import Container from "../../components/Container.jsx";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {get, isEmpty} from "lodash";
import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Product from "../../components/ProductContainer.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import {useInfiniteQuery} from "react-query";
import axios from "axios";
import config from "../../config.js";
import HomeHeader from "./HomeHeader.jsx";
import Footer from "../../layouts/Footer.jsx";
import Loader from "../../components/Loader.jsx";

const initialParams = {
    category: null,
    country: null,
    manufacturer: null,
    name: null,
    seller: null,
    stockMarket: false
}

const HomePage = () => {
    const {i18n} = useTranslation();
    const {lang,userId} = useParams();
    const [params,setParams] = useState(initialParams)
    const [open, setOpen] = useState(false);
    const {t} = useTranslation()
    const {
        data,
        fetchNextPage,
        hasNextPage,
        refetch,
        isLoading
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
    useEffect(() => {
        refetch();
    },[params])
    const changeLang = () => {
        localStorage.setItem('lang', lang);
        i18n.changeLanguage(lang)
    }
    useEffect(() => {
        changeLang();
    }, []);
    const productsData = get(data,'pages',[])?.flat();

    return (
        <>
            <Container>
                <Space style={{width: "100%"}} direction={"vertical"}>
                    <HomeHeader
                        open={open}
                        setOpen={setOpen}
                        params={params}
                        setParams={setParams}
                        userId={userId}
                        initialParams={initialParams}
                    />
                    <InfiniteScroll
                        dataLength={data ? data?.pages?.flat().length : 0}
                        next={() => fetchNextPage()}
                        hasMore={hasNextPage}
                        loader={<h4></h4>}
                        style={{width: "100%", paddingTop: 15}}
                        hasChildren={false}
                    >
                        <Space style={{width: "100%"}} direction={"vertical"} size={"middle"}>
                            {isLoading ? <Loader /> : isEmpty(productsData) ? <Empty style={{marginTop: 50}} description={t("Malumot yo'q")}/> :
                                productsData?.map((product,index) =>{
                                return (
                                    <Product
                                        setParams={setParams}
                                        product={product}
                                        key={index+1}
                                        userId={userId}
                                        lang={lang}
                                        listKeyId={KEYS.product_list}
                                    />
                                )
                                }
                            )}
                        </Space>
                    </InfiniteScroll>
                </Space>
                <FloatButton.Group>
                    <FloatButton.BackTop style={{transform: "scale(1.2)", marginBottom: 50}}/>
                </FloatButton.Group>
                <Footer userId={userId} lang={lang}/>
            </Container>
        </>
    );
};

export default HomePage;
