import React, {useEffect, useState} from 'react';
import {URLS} from "../../constants/url.js";
import {KEYS} from "../../constants/key.js";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {Button, Col, Flex, Form, Input, Modal, Popconfirm, Row, Space, TreeSelect, Typography} from "antd";
import {useTranslation} from "react-i18next";
import {CalendarOutlined, CommentOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {get, isNil} from "lodash";
import axios from "axios";
import config from "../../config.js";
import useGetAllQuery from "../../hooks/api/useGetAllQuery.js";
import usePostQuery from "../../hooks/api/usePostQuery.js";
import styled from "styled-components";
import useDeleteQuery from "../../hooks/api/useDeleteQuery.js";
import calendar from '../../assets/icons/calendar.svg'
const { TextArea } = Input;
const {Title,Text} = Typography;

const ItemDiv = styled.div`
    border: 3px solid rgba(197, 197, 197, 0.45);
    border-radius: 15px;
    padding: 12px;
    position: relative;
    margin-top: 15px;
`
const FixedElement = styled.div`
    position: absolute;
    display: flex;
    right: 10px;
    top: -17px;
`

const MyApplication = ({userId}) => {
    const {t} = useTranslation();
    const [isModalOpen, setModalOpen] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const [form] = Form.useForm();
    const {data,isLoading} = useGetOneQuery({
        id: userId,
        url: URLS.get_application,
        key: `${KEYS.get_application}_my`,
        params: {
            params: {
                mine: true,
                page: 0,
                size: 1000
            }
        }
    })
    const {data:categories,isLoadingCategories} = useGetAllQuery({
        key: KEYS.get_category,
        url: URLS.get_category,
        params:{
            params: {
                user_id: userId
            }
        },
        enabled: isModalOpen
    })
    useEffect(() => {
        form.resetFields();
    }, [isModalOpen]);
    const {mutate} = usePostQuery({
        listKeyId: `${KEYS.get_application}_my`
    })
    const {mutate:deleteApplication,isLoading:isLoadingDelete} = useDeleteQuery({
        listKeyId: `${KEYS.get_application}_my`,
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
    const onFinish = (data) => {
        mutate({
            url: `${URLS.add_application}/${userId}`,
            attributes: data
        },{
            onSuccess: () => {
                setModalOpen(false)
            }
        })
    }
    const useDelete = (id) => {
        deleteApplication({
            url: `${URLS.delete_application}/${id}/${userId}`,
        })
    }
    return (
        <Space direction={"vertical"} style={{width: "100%", marginTop: 10}}>
            <Modal
                title={t("Yangi buyurtma qo'shish")}
                open={isModalOpen}
                onCancel={()=>{setModalOpen(false)}}
                footer={null}
            >
                <Form
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        name="products"
                        rules={[{
                            required: true,
                            message: t("Mahsulot tanlang"),
                        }]}
                    >
                        <TreeSelect
                            treeDataSimpleMode
                            style={{ width: '100%' }}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder={t("Kategoriya")}
                            allowClear
                            multiple
                            loadData={onLoadData}
                            treeData={treeData}
                        />
                    </Form.Item>
                    <Form.Item
                        name="comment"
                        rules={[{
                            required: true,
                            message: t("Izoh qoldiring")
                        }]}
                    >
                        <TextArea rows={4} placeholder={t("Izohingizni qoldiring (Misol uchun kerakli miqdor va hklarni yozib qoldiring):")} />
                    </Form.Item>
                    <Form.Item>
                        <Button type={"primary"} icon={<PlusOutlined />} block htmlType="submit">
                            {t("Buyurtma yaratish")}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Space direction={"vertical"} style={{width: "100%"}}>
                {get(data,'data.data.content')?.map((item,index) => {
                    return (
                        <ItemDiv key={index+1}>
                            <FixedElement>
                                <Popconfirm
                                    title={t("Delete")}
                                    description={t("Are you sure to delete?")}
                                    onConfirm={() => useDelete(get(item,'id'))}
                                    okText={t("Yes")}
                                    cancelText={t("No")}
                                >
                                    <Button danger type={"primary"} size={"small"} loading={isLoadingDelete}>
                                        {t("O'chirish")}
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>
                            </FixedElement>
                            <Space direction={"vertical"} style={{width: "100%"}} size={"small"}>
                                <Row justify={"space-between"} style={{flexFlow: "nowrap"}}>
                                    <Space style={{display: "flex", flexWrap: "wrap"}}>
                                        {
                                            get(item,'products',[])?.map((product,index)=> {
                                                return <Title
                                                    style={{display: "inline-block"}}
                                                    level={4}
                                                >
                                                    {get(product, 'name')}
                                                    {(get(item,'products',[])?.length > 0 && get(item,'products',[])?.length !== index+1)  && ","}
                                                </Title>
                                            })
                                        }
                                    </Space>
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
                            </Space>
                        </ItemDiv>
                    )
                })}
            </Space>
            <Button type={"primary"} block icon={<PlusOutlined />} onClick={() => setModalOpen(true)}>
                {t("Yangi qo'shish")}
            </Button>
        </Space>
    );
};

export default MyApplication;