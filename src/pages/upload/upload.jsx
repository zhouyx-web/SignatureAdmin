import { Breadcrumb } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/creator')

export default function Upload (){
    return (
        <>
        <Breadcrumb  separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item overlay={menu}><a href="">创建面签</a></Breadcrumb.Item>
            <Breadcrumb.Item>文件上传</Breadcrumb.Item>
        </Breadcrumb>
        </>
    )
}