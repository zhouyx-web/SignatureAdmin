import React, {useState, useEffect} from 'react'
import { Breadcrumb, Table, Space, Button, message } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import {reqDocList, reqEndSign} from '../../api/index'
import dateToString from '../../utils/dateUtils'
// 导入测试数据
// import testData from '../../config/testDataConfig'

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/manage')
// let setListData
let history

const columns = [
    {
      title: '编号',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      ellipsis: true,
      render:(text, item, index) => {return index + 1}
    },
    {
      title: '面签名称',
      dataIndex: 'doc_name',
      key: 'doc_name',
      width: 250,
      ellipsis: true,
    },
    {
      title: '面签类型',
      dataIndex: 'doc_mode',
      key: 'doc_mode',
      width: 100,
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
      title: '发布时间',
      dataIndex: 'release_time',
      key: 'release_time',
      width: 150,
      render: (text, item) => {
        const {release_time} = item
        return dateToString(release_time)
      }
    },
    {
      title: '签署状态',
      dataIndex: 'signed_num',
      key: 'signed_num',
      width: 100,
      render: (text, item) => {
        const {re_sign} = item
        if(re_sign === 'allow'){
          return '首签'
        } else {
          return '补签'
        }
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align:'center',
      render: (text, item) => (
        <Space size="middle">
            <Button size='small' type="primary">二维码</Button>
            <Button size='small' type="primary" onClick={async () => {
              let {doc_id, doc_path, sign_area} = item
              sign_area = JSON.parse(sign_area)
              const result = await reqEndSign({end_time:Date.now(), doc_id, doc_path, sign_area})
              if(result.status === 0){
                message.success('签署已完成')
                // getDataSource(setListData)
                // 跳转至完成签署界面
                history.push('/complete')
              } else {
                message.error('操作失败，请重试')
              }
            }}>结束</Button>
        </Space>
      ),
    },
]
const getDataSource = async setData => {
  const result = await reqDocList('ongoing')
  if(result.status === 0){
    setData(result.data)
  }
}

export default function OnGoing (props){
    const [ data, setData ] = useState([])
    // 赋值为全局变量，便于其他函数调用
    // setListData = setData
    history = props.history
    useEffect(() => {
        getDataSource(setData)
    }, [])
    return (
        <>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }} >
            <Breadcrumb.Item overlay={menu}><span style={{cursor: 'pointer'}}>我的面签</span></Breadcrumb.Item>
            <Breadcrumb.Item>进行中</Breadcrumb.Item>
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