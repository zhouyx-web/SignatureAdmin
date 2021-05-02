import React, {useState, useEffect} from 'react'
import { Breadcrumb, Table, Space, Button } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
// 导入测试数据
import testData from '../../config/testDataConfig'

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/manage')
const columns = [
    {
      title: '编号',
      dataIndex: 'number',
      key: 'number',
      width: 100,
    },
    {
      title: '面签名称',
      dataIndex: 'fileName',
      key: 'fileName',
      ellipsis: true,
    },
    {
      title: '面签类型',
      dataIndex: 'fileType',
      key: 'fileType',
      width: 100,
    },
    {
      title: '发布时间',
      dataIndex: 'releaseTime',
      key: 'releaseTime',
      width: 150,
    },
    {
      title: '结束时间',
      dataIndex: 'completeTime',
      key: 'completeTime',
      width: 150,
    },
    {
      title: '签署人数',
      dataIndex: 'signState',
      key: 'signState',
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align:'center',
      render: (index, item) => (
        <Space size="middle">
            <Button size='small' type="primary">补签</Button>
            <Button size='small' type="primary">详情</Button>
            <Button size='small' type="primary">下载</Button>
        </Space>
      ),
    },
]
const getDataSource = setData => {
    setData(testData)
}

export default function Complete (){
    const [ data, setData ] = useState([])
    useEffect(() => {
        getDataSource(setData)
    }, [])
    return (
        <>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item overlay={menu}><a href="">我的面签</a></Breadcrumb.Item>
            <Breadcrumb.Item>已完成</Breadcrumb.Item>
        </Breadcrumb>
        <Table 
            columns={columns} 
            dataSource={data}
            pagination={{ 
                pageSize: 3, 
                showQuickJumper: true,
                total: 20,
                position: ['bottomCenter']
            }}
        />
        </>
    )
}