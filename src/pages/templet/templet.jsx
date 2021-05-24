import { Breadcrumb } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/creator')

export default function Templet (){
    return (
        <>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item overlay={menu}><span style={{cursor: 'pointer'}}>创建面签</span></Breadcrumb.Item>
            <Breadcrumb.Item>使用模板</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}