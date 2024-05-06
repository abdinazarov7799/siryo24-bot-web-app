import React, {useEffect, useState} from 'react';
import {Affix, Button, Drawer, Flex, Input, Select, Space, Switch, Tag, theme, TreeSelect, Typography} from "antd";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {useTranslation} from "react-i18next";
import {get, isNil, isEmpty, isNull, isEqual} from "lodash";
const {Title} = Typography;


const HomeHeader = ({open,setOpen,params,setParams,userId,initialParams}) => {
    const {
        token: { colorPrimary },
    } = theme.useToken();
    const [preParams,setPreParams] = useState(params);
    const {t} = useTranslation();
    const [treeData, setTreeData] = useState();
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
        setPreParams(params)
    }, [params]);
    useEffect(() => {
        if (!isNil(get(categories,'data.data'))){
            setTreeData(get(categories,'data.data')?.map((item,index) => {
                return {
                    value: `category-${index}`,
                    title: get(item,'name'),
                    disabled: true,
                    children: !isEmpty(get(item,'products')) ? get(item,'products')?.map((child) => {
                        return {
                            value: `${get(child,'id')}`,
                            title: get(child,'name'),
                        }
                    }) : []
                }
            }))
        }
    }, [categories]);

    const onChange = (name,value) => {
        setPreParams(prevState => {
            return {...prevState, [name]: value};
        })
    }
    const onClearParam = (name) => {
        setParams(prevState => {
            return {...prevState, [name]: null};
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
                {
                    !isEmpty(params) && (
                        <Space style={{marginTop: 5}}>
                            {
                                Object.entries(params)?.map((item) => {
                                    let name = get(item,'[0]')
                                    let value = get(item,'[1]')
                                    if (!isNull(value) && value) {
                                        return (
                                            <Tag
                                                closable
                                                color={colorPrimary}
                                                onClose={() => onClearParam(name)}
                                            >
                                                {isEqual(value,true) ? t("Birja") : value}
                                            </Tag>
                                        )
                                    }
                                })
                            }
                        </Space>
                    )
                }
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
                        style={{ width: '100%' }}
                        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                        placeholder={t("Kategoriya")}
                        allowClear
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