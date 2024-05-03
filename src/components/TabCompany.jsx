import React from 'react';
import {get} from "lodash";
import {useTranslation} from "react-i18next";
import {Typography} from "antd";
const {Text} = Typography;

const TabCompany = ({data}) => {
    const {t} = useTranslation();

    return (
        <div>
            <Text style={{fontSize: 25}}>{t("Seller info")}: {get(data,'data.sellerInfo')}</Text>
        </div>
    );
};

export default TabCompany;