import React, {useEffect, useState} from 'react';
import {Affix, Button, Cascader, Drawer, Flex, Form, Input, Select, Space, Switch, TreeSelect, Typography} from "antd";
import {FilterOutlined, SearchOutlined} from "@ant-design/icons";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import {KEYS} from "../../constants/key.js";
import {URLS} from "../../constants/url.js";
import {useTranslation} from "react-i18next";
import {get, isEqual, isNil} from "lodash";
import axios from "axios";
import config from "../../config.js";
const {Title} = Typography;

const HomeHeader = ({open,setOpen,params,setParams,userId}) => {
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
        key: KEYS.get_manufacturer,
        url: URLS.get_manufacturer,
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
                height={280}
                onClose={() => setOpen(false)}
            >
                <Form>
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        <TreeSelect
                            treeDataSimpleMode
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder={t("Kategoriya")}
                            allowClear
                            loadData={onLoadData}
                            treeData={treeData}
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
                        <Button type="primary" block htmlType="submit">
                            {t("Filterlash")}
                        </Button>
                    </Space>
                </Form>
            </Drawer>
        </>
    );
};

export default HomeHeader;