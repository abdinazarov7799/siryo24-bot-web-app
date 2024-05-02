import React from 'react';
import {URLS} from "../../constants/url.js";
import {KEYS} from "../../constants/key.js";
import useGetOneQuery from "../../hooks/api/useGetOneQuery.js";
import {Button} from "antd";
import {useTranslation} from "react-i18next";
import {PlusOutlined} from "@ant-design/icons";

const MyApplication = ({userId}) => {
    const {t} = useTranslation();
    const {data,isLoading} = useGetOneQuery({
        id: userId,
        url: URLS.get_application,
        key: `${KEYS.get_application}_my`,
        params: {
            params: {
                mine: true,
            }
        }
    })
    return (
        <>
         <Button type={"primary"} block icon={<PlusOutlined />}>
             {t("Yangi qo'shish")}
         </Button>
        </>
    );
};

export default MyApplication;