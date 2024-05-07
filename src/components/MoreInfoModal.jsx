import React from 'react';
import {get} from "lodash";
import {Modal, Tabs} from "antd";
import TabPhone from "./TabPhone.jsx";
import TabProduct from "./TabProduct.jsx";
import TabCompany from "./TabCompany.jsx";
import {useTranslation} from "react-i18next";
import useGetOneQuery from "../hooks/api/useGetOneQuery.js";
import {URLS} from "../constants/url.js";
import {KEYS} from "../constants/key.js";

const MoreInfoModal = ({isModalOpen,setModalOpen,product,userId}) => {
    const {t} = useTranslation();
    const {data,isLoading} = useGetOneQuery({
        id: get(product,'id'),
        url: `${URLS.product_get_by_id}/${get(product,'sellerId')}`,
        key: `${KEYS.product_get_by_id}_${get(product,'id')}`,
        params: {
            params: {
                user_id: userId
            }
        },
        enabled: isModalOpen
    })
    const items = [
        {
            key: '1',
            label: t("Raqam"),
            children: <TabPhone data={get(data,'data')}/>
        },
        {
            key: '2',
            label: t("Mahsulot"),
            children: <TabProduct data={get(data,'data')}/>
        },
        {
            key: '3',
            label: t("Tashkilot"),
            children: <TabCompany data={get(data,'data')}/>
        }
    ]
    return (
        <>
            <Modal
                key="more-info"
                title={get(product,'name')}
                open={isModalOpen}
                onCancel={() => setModalOpen(false)}
                footer={null}
            >
                <Tabs defaultActiveKey="1" items={items} centered type={"card"}/>
            </Modal>
        </>
    );
};

export default MoreInfoModal;