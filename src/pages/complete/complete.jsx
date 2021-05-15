import React, {useState, useEffect} from 'react'
import { Breadcrumb, Table, Space, Button, Modal, message } from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import {reqDocList, reqRepeatSign} from '../../api/index'
import dateToString from '../../utils/dateUtils'
import fileDownload from 'js-file-download'
import Axios from 'axios';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import memoryUtils from '../../utils/memoryUtils'

const { confirm } = Modal;
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
        } else if(doc_mode === 'multiple ') {
          return '一份多签'
        } else {
          return '不限人数'
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
            <Button size='small' type="primary" onClick={() => showPromiseConfirm(item)}>补签</Button>
            <Button size='small' type="primary" onClick={() => showSignDetail(item)}>详情</Button>
            <Button size='small' type="primary" onClick={() => downloadSignDoc(item)}>下载</Button>
        </Space>
      ),
    },
]
const getDataSource = async setData => {
  const result = await reqDocList('end','end_time', memoryUtils.user._id)
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

function showPromiseConfirm(item) {
  const {doc_id} = item
  confirm({
    title: '是否开启补签?',
    icon: <ExclamationCircleOutlined />,
    content: '每个文档只有一次补签机会，开启后，文档签名将不限制签署人数。',
    onOk:async function() {
        const result = await reqRepeatSign(doc_id)
        if(result.status === 0){
          message.success('开启补签成功！')
          history.push('/ongoing')
        }  else {
          message.error(result.msg)
        }
    },
    onCancel() {},
  });
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