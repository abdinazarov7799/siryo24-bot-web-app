import React from 'react';
import {Affix, Button, Drawer, Flex, Input, Select, Space, Switch, Typography} from "antd";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import useGetAllQuery from "../../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../../constants/key.js";
import {URLS} from "../../../constants/url.js";
import {useTranslation} from "react-i18next";
import {get} from "lodash";
const {Title} = Typography;

const HomeHeader = ({open,setOpen,params,setParams,userId}) => {
    const {t} = useTranslation();
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
        key: KEYS.get_manufacturer,
        url: URLS.get_manufacturer,
        enabled: open
    })
    return (
        <>
            <Affix offsetTop={10}>
                <Input
                    prefix={<SearchOutlined />}
                    suffix={<FilterOutlined onClick={() => setOpen(!open)} />}
                    style={{width: "100%"}}
                    placeholder="Search"
                />
            </Affix>
            <Drawer
                placement={"top"}
                closable={false}
                key="input-filter"
                open={open}
                onClose={() => setOpen(false)}
            >
                <Space direction={"vertical"} style={{width: "100%"}}>
                    <Input
                        prefix={<SearchOutlined />}
                        suffix={<FilterOutlined onClick={() => setOpen(!open)} />}
                        placeholder="Search"
                        style={{width: "100%"}}
                    />
                    <Select
                        allowClear
                        placeholder={t("Kategoriya")}
                        loading={isLoadingCategories}
                        style={{width: "100%"}}
                        options={get(categories,'data.data')?.map((item) => {
                            return {
                                value: get(item,'id'),
                                label: get(item,'name')
                            }
                        })}
                    />
                    <Select
                        allowClear
                        placeholder={t("Mamlakat")}
                        loading={isLoadingCountries}
                        style={{width: "100%"}}
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
                        options={get(sellers,'data.data')?.map((item) => {
                            return {
                                value: item,
                                label: item
                            }
                        })}
                    />
                    <Flex align={"center"} justify={"space-between"}>
                        <Title level={4}>{t("Birja")}</Title>
                        <Switch />
                    </Flex>
                    <Button type="primary" block>
                        {t("Filterlash")}
                    </Button>
                </Space>
            </Drawer>
        </>
    );
};

export default HomeHeader;