import React from 'react';
import {get} from "lodash";
import { Image } from 'antd'
const TabProduct = ({data}) => {

    return (
        <div>
            <Image
                width={200}
                src={get(data,'data.imageUrl')}
            />
        </div>
    );
};

export default TabProduct;