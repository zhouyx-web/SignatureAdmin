import React, {useState, useEffect} from 'react'
import { Breadcrumb, Table, Space, Button } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import {reqDocList, reqDownload} from '../../api/index'
import dateToString from '../../utils/dateUtils'
import fileDownload from 'js-file-download'
import Axios from 'axios';
// 导入测试数据
// import testData from '../../config/testDataConfig'
let history

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/manage')
const columns = [
    {
      title: '编号',
      dataIndex: '_id',
      key: '_id',
      width: 70,
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
      width: 180,
      align:'center',
      render: (text, item) => {
        const {release_time} = item
        return dateToString(release_time)
      }
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      key: 'end_time',
      align:'center',
      width: 180,
      render: (text, item) => {
        const {end_time} = item
        return dateToString(end_time)
      }
    },
    {
      title: '签署人数',
      dataIndex: 'signState',
      key: 'signState',
      width: 100,
      align:'center',
      render: (text, item) => {
        const {max_sign_num, signed_num} = item
        return signed_num + '/' + max_sign_num
      }
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      align:'center',
      render: (text, item) => (
        <Space size="middle">
            <Button size='small' type="primary">补签</Button>
            <Button size='small' type="primary" onClick={() => showSignDetail(item)}>详情</Button>
            <Button size='small' type="primary" onClick={() => downloadSignDoc(item)}>下载</Button>
        </Space>
      ),
    },
]
const getDataSource = async setData => {
  const result = await reqDocList('end','end_time')
  if(result.status === 0){
    setData(result.data)
  }
}

const downloadSignDoc = async item => {
  const {doc_id} = item
  Axios.get('/manage/docs/download', {
    responseType: 'blob',
    params:{doc_id}
  }).then(res => {
    fileDownload(res.data, item.doc_name + '.pdf');
  });
}

const showSignDetail = item => {
  history.push('/complete/detail', {...item})
}


export default function Complete (props){
    const [ data, setData ] = useState([])
    history = props.history
    console.log(props)
    useEffect(() => {
        getDataSource(setData)
    }, [])
    return (
        <>
        <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
            <Breadcrumb.Item overlay={menu}><span style={{cursor: 'pointer'}}>我的面签</span></Breadcrumb.Item>
            <Breadcrumb.Item>已完成</Breadcrumb.Item>
        </Breadcrumb>
        <Table 
            columns={columns} 
            dataSource={data}
            rowKey={(item) => item.doc_id}
            pagination={{ 
                pageSize: 6, 
                showQuickJumper: true,
                total: data.length,
                position: ['bottomCenter']
            }}
        />
        </>
    )
}