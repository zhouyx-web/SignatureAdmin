import React, {useState, useEffect} from 'react'
import { Breadcrumb, Table, Space, Button } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import {reqDocList} from '../../api/index'
import dateToString from '../../utils/dateUtils'
// 导入测试数据
// import testData from '../../config/testDataConfig'

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/manage')
const columns = [
    {
      title: '编号',
      dataIndex: '_id',
      key: '_id',
      width: 200,
      ellipsis: true,
      render:(text, item, index) => {return index + 1}
    },
    {
      title: '面签名称',
      dataIndex: 'doc_name',
      key: 'doc_name',
      ellipsis: true,
    },
    {
      title: '面签类型',
      dataIndex: 'doc_mode',
      key: 'doc_mode',
      render:(text, item) => {
        const {doc_mode} = item
        if(doc_mode === 'single'){
          return '一份一签'
        } else {
          return '一份多签'
        }
      }
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text, item) => {
        const {create_time} = item
        return dateToString(create_time)
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align:'center',
      render: (text, item) => (
        <Space size="middle">
            <Button size='small' type="primary">编辑</Button>
            <Button size='small' type="primary">发布</Button>
        </Space>
      ),
    },
]
const getDataSource = async setData => {
  const result = await reqDocList('unpublish')
  if(result.status === 0){
    setData(result.data)
  }
}

export default function UnPublish (){
    const [ data, setData ] = useState([])
    useEffect(() => {
        getDataSource(setData)
    }, [])
    return (
        <>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item overlay={menu}><span style={{cursor: 'pointer'}}>我的面签</span></Breadcrumb.Item>
            <Breadcrumb.Item>未发布</Breadcrumb.Item>
        </Breadcrumb>
        <Table 
            columns={columns} 
            dataSource={data}
            rowKey={(item) => item.doc_id}
            pagination={{ 
                pageSize: 3, 
                showQuickJumper: true,
                total: data.length,
                position: ['bottomCenter']
            }}
        />
        </>
    )
}