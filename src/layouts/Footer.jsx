import React from 'react';
import {Flex, theme, Typography} from "antd";
import {
    FundOutlined,
    InfoCircleOutlined,
    ShoppingCartOutlined,
    StarOutlined,
    UnorderedListOutlined
} from "@ant-design/icons";
import {useLocation, useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {get, isEqual} from "lodash";
import {useTelegram} from "../hooks/useTelegram.jsx";
const {Text} = Typography;
const {tg} = useTelegram()
const buttonStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
}
const buttonColor = !isEqual(get(tg,'colorScheme','light'),'light') && "#fff"
const buttonIconStyle = {
    fontSize: 30,
}
const buttonTextStyle = {
    fontSize: 12
}

const Footer = ({userId,lang}) => {
    const {
        token: { colorBgContainer,colorPrimary },
    } = theme.useToken();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const {pathname} = useLocation()
    const navigateUrls = {
        catalog: `/catalog/${userId}/${lang}`,
        application: `/application/${userId}/${lang}`,
        saved: `/saved/${userId}/${lang}`,
        archive: `/archive/${userId}/${lang}`,
        info: `/info/${userId}/${lang}`,
    }
    return (
        <div style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            padding: "10px 15px",
            borderRadius: "10px 10px 0 0",
            borderTop: "1px solid #a2a2a2",
            width: "100%",
            backgroundColor: colorBgContainer,
        }}>
            <Flex justify={"space-between"}>
                <div
                    style={{...buttonStyle,color: isEqual(pathname,get(navigateUrls,"catalog")) ? colorPrimary : buttonColor}}
                    onClick={() => navigate(get(navigateUrls,"catalog"))}
                >
                    <UnorderedListOutlined style={buttonIconStyle}/>
                    <Text style={{...buttonTextStyle,color: isEqual(pathname,get(navigateUrls,"catalog")) ? colorPrimary : buttonColor}}>
                        {t("Menyu")}
                    </Text>
                </div>
                <div
                    style={{...buttonStyle,color: isEqual(pathname,get(navigateUrls,"application")) ? colorPrimary : buttonColor}}
                    onClick={() => navigate(get(navigateUrls,"application"))}
                >
                    <ShoppingCartOutlined style={buttonIconStyle}/>
                    <Text style={{...buttonTextStyle,color: isEqual(pathname,get(navigateUrls,"application")) ? colorPrimary : buttonColor}}>
                        {t("Buyurtmalar")}
                    </Text>
                </div>
                <div
                    style={{...buttonStyle,color: isEqual(pathname,get(navigateUrls,"saved")) ? colorPrimary : buttonColor}}
                    onClick={() => navigate(get(navigateUrls,"saved"))}
                >
                    <StarOutlined style={buttonIconStyle}/>
                    <Text style={{...buttonTextStyle,color: isEqual(pathname,get(navigateUrls,"saved")) ? colorPrimary : buttonColor}}>
                        {t("Sevimlilar")}
                    </Text>
                </div>
                <div
                    style={{...buttonStyle,color: isEqual(pathname,get(navigateUrls,"archive")) ? colorPrimary : buttonColor}}
                    onClick={() => navigate(get(navigateUrls,"archive"))}
                >
                    <FundOutlined style={buttonIconStyle}/>
                    <Text style={{...buttonTextStyle,color: isEqual(pathname,get(navigateUrls,"archive")) ? colorPrimary : buttonColor}}>
                        {t("Arxiv narxlar")}
                    </Text>
                </div>
                <div
                    style={{...buttonStyle,color: isEqual(pathname,get(navigateUrls,"info")) ? colorPrimary : buttonColor}}
                    onClick={() => navigate(get(navigateUrls,"info"))}
                >
                    <InfoCircleOutlined style={buttonIconStyle}/>
                    <Text style={{...buttonTextStyle,color: isEqual(pathname,get(navigateUrls,"info")) ? colorPrimary : buttonColor}}>
                        {t("Tavsif")}
                    </Text>
                </div>
            </Flex>
        </div>
    );
};

export default Footer;