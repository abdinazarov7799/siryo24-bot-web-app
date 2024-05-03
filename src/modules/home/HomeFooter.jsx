import React from 'react';
import {Button, Flex, Space, theme, Typography} from "antd";
import {
    FundOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
const {Text} = Typography;

const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
}
const buttonIconStyle = {
    fontSize: 30
}
const buttonTextStyle = {
    fontSize: 12
}

const HomeFooter = ({userId,lang}) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    const {t} = useTranslation();
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            padding: "10px 15px",
            borderRadius: 0,
            borderTop: "1px solid #a2a2a2",
            width: "100%",
            backgroundColor: colorBgContainer,
        }}>
            <Flex justify={"space-between"}>
                <div
                    style={buttonStyle}
                    onClick={() => navigate(`/catalog/${userId}/${lang}`)}
                >
                    <UnorderedListOutlined style={buttonIconStyle}/>
                    <Text style={buttonTextStyle}>{t("Asosiy menyu")}</Text>
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => navigate(`/application/${userId}/${lang}`)}
                >
                    <ShoppingCartOutlined style={buttonIconStyle}/>
                    <Text style={buttonTextStyle}>{t("Buyurtmalar")}</Text>
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => navigate(`/saved/${userId}/${lang}`)}
                >
                    <StarOutlined style={buttonIconStyle}/>
                    <Text style={buttonTextStyle}>{t("Sevimlilar")}</Text>
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => navigate(`/archive/${userId}/${lang}`)}
                >
                    <FundOutlined style={buttonIconStyle}/>
                    <Text style={buttonTextStyle}>{t("Arxiv narxlar")}</Text>
                </div>
                <div
                    style={buttonStyle}
                    onClick={() => navigate(`/info/${userId}/${lang}`)}
                >
                    <InfoCircleOutlined style={buttonIconStyle}/>
                    <Text style={buttonTextStyle}>{t("Tavsif")}</Text>
                </div>
            </Flex>
        </div>
    );
};

export default HomeFooter;