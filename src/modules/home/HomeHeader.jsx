import React, {useEffect, useState} from 'react';
import {Affix, Button, Drawer, Flex, Input, Select, Space, Switch, TreeSelect, Typography} from "antd";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {useTranslation} from "react-i18next";
import {get, isNil,isEmpty} from "lodash";
import axios from "axios";
import config from "../../config.js";
const {Title} = Typography;

const initialParams = {
    category: null,
    country: null,
    manufacturer: null,
    name: null,
    seller: null,
    stockMarket: false
}
const HomeHeader = ({open,setOpen,params,setParams,userId}) => {
    const [preParams,setPreParams] = useState(initialParams);
    const {t} = useTranslation();
    const [treeData, setTreeData] = useState([]);
    const {data:categories,isLoadingCategories} = useGetAllQuery({
        key: KEYS.get_category,
        url: URLS.get_category,
        params:{
            params: {
                user_id: userId
            }
        },
        enabled: open
    })
    const {data:countries,isLoadingCountries} = useGetAllQuery({
        key: KEYS.get_country,
        url: URLS.get_country,
        enabled: open
    })
    const {data:manufacturers,isLoadingManufacturers} = useGetAllQuery({
        key: KEYS.get_manufacturer,
        url: URLS.get_manufacturer,
        enabled: open
    })
    const {data:sellers,isLoadingSellers} = useGetAllQuery({
        key: KEYS.get_seller,
        url: URLS.get_seller,
        enabled: open
    })
    useEffect(() => {
        if (!isNil(get(categories,'data.data'))){
            setTreeData(get(categories,'data.data')?.map((item) => {
                return {
                    id: get(item,'id'),
                    pId: 0,
                    value: get(item,'id'),
                    title: get(item,'name'),
                    disabled: true,
                }
            }))
        }
    }, [categories]);
    const onLoadData = async ({id}) => {
        try {
            const response = await axios({
                method: 'get',
                baseURL: config.API_ROOT,
                url: `${URLS.get_product_name}/${id}`,
            });
            const data = get(response,'data.data',[]);
            const treeNodeData = data?.map(item => ({
                pId: id,
                value: get(item,'id'),
                title: get(item,'name'),
                isLeaf: true,
            }));
            setTreeData(prevData => {
                return [
                    ...prevData,
                    ...treeNodeData
                ]
            });
        } catch (error) {
            console.error('Error loading data:', error);
        }
    }
    const onChange = (name,value) => {
        setPreParams(prevState => {
            return {...prevState, [name]: value};
        })
    }

    return (
        <>
            <Affix offsetTop={10}>
                <Input
                    prefix={<SearchOutlined />}
                    suffix={<FilterOutlined onClick={() => setOpen(!open)} />}
                    style={{width: "100%"}}
                    placeholder={t("Marka bo'yicha qidirish masalan: 27")}
                    value={get(params,'search')}
                    onChange={(e) => setParams(prevState => {
                        if (isEmpty(e.target.value)) {
                            return {...prevState, ["search"]: null}
                        }else{
                            return {...prevState, ["search"]: e.target.value}
                        }
                    })}
                />
            </Affix>
            <Drawer
                placement={"top"}
                closable={false}
                key="input-filter"
                open={open}
                height={320}
                onClose={() => setOpen(false)}
            >
                <Space direction={"vertical"} style={{width: "100%"}}>
                    <TreeSelect
                        treeDataSimpleMode
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder={t("Kategoriya")}
                        allowClear
                        loadData={onLoadData}
                        value={get(preParams,'category')}
                        treeData={treeData}
                        onChange={(e) => onChange("category",e)}
                    />
                    <Select
                        allowClear
                        placeholder={t("Mamlakat")}
                        loading={isLoadingCountries}
                        style={{width: "100%"}}
                        value={get(preParams,'country')}
                        onChange={(e) => onChange("country",e)}
                        options={get(countries,'data.data')?.map((item) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                    />
                    <Select
                        allowClear
                        placeholder={t("Ishlab chiqaruvchi")}
                        loading={isLoadingManufacturers}
                        style={{width: "100%"}}
                        value={get(preParams,'manufacturer')}
                        onChange={(e) => onChange("manufacturer",e)}
                        options={get(manufacturers,'data.data')?.map((item) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                    />
                    <Select
                        allowClear
                        placeholder={t("Sotuvchi")}
                        loading={isLoadingSellers}
                        style={{width: "100%"}}
                        value={get(preParams,'seller')}
                        onChange={(e) => onChange("seller",e)}
                        options={get(sellers,'data.data')?.map((item) => {
                            return {
                                value: get(item,'id'),
                                label: get(item,'name')
                            }
                        })}
                    />
                    <Flex align={"center"} justify={"space-between"}>
                        <Title level={4}>{t("Birja")}</Title>
                        <Switch value={get(preParams,'stockMarket')} onChange={(e) => onChange("stockMarket",e)}/>
                    </Flex>
                    <Button type="primary" block onClick={() => {
                        setParams(preParams)
                        setOpen(false)
                    }}>
                        {t("Filterlash")}
                    </Button>
                    <Button type="default" block onClick={() => {
                        setParams(initialParams)
                        setPreParams(initialParams)
                        setOpen(false)
                    }}>
                        {t("Filterni tozalash")}
                    </Button>
                </Space>
            </Drawer>
        </>
    );
};

export default HomeHeader;