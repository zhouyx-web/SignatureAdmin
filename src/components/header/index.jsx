import React, {useState} from 'react'
import {
    Layout,
    Avatar,
    Modal,
    Popover,
} from 'antd'
import { UserOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';

import './index.less'

const { Header } = Layout
const { confirm } = Modal

const DetailContent = (
    <>
        <p>用户中心</p>
        <p onClick={showConfirm}>退出登录</p>
    </>
)
function showConfirm() {
    confirm({
      title: '确认退出登录吗？',
      icon: <ExclamationCircleOutlined />,
      content: '当前登录用户:Username',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


export default function HeaderInner() {
    return (
    <>
        <Header className="site-layout-background">
            <Popover content={DetailContent} trigger="hover">
                <Avatar className="avatar" size="large" icon={<UserOutlined />} />
            </Popover>
            <span>Username</span>
        </Header>
    </>
    )
}