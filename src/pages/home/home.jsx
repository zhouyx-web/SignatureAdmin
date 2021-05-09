import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd';
import {
    FieldTimeOutlined,
    FileAddOutlined,
    FileWordOutlined,
    FileDoneOutlined,
} from '@ant-design/icons';

import './home.less'

export default function Home(_window) {
    return (
        <>
            <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>快捷操作</Breadcrumb.Item>
            </Breadcrumb>
            <div className="card-style">
                <Link className="item" to="/newfile"><FileAddOutlined className="icon-1 icon" /><span>新建空白面签</span></Link>
                <Link className="item" to="/uploadfile"><FileWordOutlined className="icon-2 icon" /><span>上传本地文件</span></Link>
                <Link className="item" to="/ongoing"><FieldTimeOutlined className="icon-3 icon" /><span>正在签署的面签</span></Link>
                <Link className="item" to="/complete"><FileDoneOutlined className="icon-4 icon" /><span>已经结束的面签</span></Link>
            </div>
        </>
    )
}