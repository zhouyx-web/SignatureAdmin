import React, { useState } from 'react'
import {
  Layout,
  Avatar,
  Modal,
  Popover,
  message,
  Form,
  Input,
  Button
} from 'antd'
import { UserOutlined, ExclamationCircleOutlined, LockOutlined } from '@ant-design/icons';

import './index.less'
import { reqUpdatePwd } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const { Header } = Layout
const { confirm } = Modal

// 密码校验规则
const pwdValidator = (rule, value) => {
  const spaceReg = /[\s]+/
  if (!value || spaceReg.test(value)) {
    return Promise.reject('密码格式不正确')
  } else {
    return Promise.resolve()
  }
}

let replaceHistory
let username
function showConfirm() {
  confirm({
    title: '确认退出登录吗？',
    icon: <ExclamationCircleOutlined />,
    content: `当前登录用户:${username}`,
    cancelText: "取消",
    okText: "确定",
    okType: "danger",
    onOk() {
      // 清除locastorage/memoryStorage 并强制退出
      storageUtils.removeUser()
      memoryUtils.user = {}
      message.success('退出成功！')
      replaceHistory('/login')
    }
  })
}

const onFinish = async values => {
  values.username = username
  if (values.oldPwd === values.password) {
    message.error('修改前后密码不能一致')
  } else {
    const result = await reqUpdatePwd({ ...values })
    if (result.status === 0) {
      // 密码修改成功
      memoryUtils.user = {}
      storageUtils.removeUser()
      replaceHistory('/login')
      message.success(result.msg)
    } else {
      message.error(result.msg)
    }
  }

}

export default function HeaderInner(props) {
  replaceHistory = props._window.history.replace
  username = memoryUtils.user.username
  const [isModalVisible, setIsModalVisible] = useState(false);

  const updatePwd = () => {
    setIsModalVisible(true);
  };

  const DetailContent = (
    <>
      <p>用户中心</p>
      <p onClick={showConfirm}>退出登录</p>
      <p onClick={updatePwd}>修改密码</p>
    </>
  )

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Header className="site-layout-background">
        <Popover content={DetailContent} trigger="hover">
          <Avatar className="avatar" size="large" icon={<UserOutlined />} />
        </Popover>
        <span>{username}</span>
        <Modal
          title={`修改密码: 用户名 ${username}`}
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="updatePwd"
            onFinish={onFinish}
          >
            <Form.Item
              name="oldPwd"
              validateFirst="true"
              label="旧密码"
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
                { validator: pwdValidator }]}
            >
              <Input.Password
                placeholder="输入旧密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>
            <Form.Item
              name="password"
              validateFirst="true"
              label="新密码"
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
                { validator: pwdValidator }]}
            >
              <Input.Password
                placeholder="输入新密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={['password']}
              label="确认密码"
              labelCol={{ span: 4 }}
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="确认密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <div style={{ display: "flex", justifyContent: 'space-around' }}>
                <Button type="primary" htmlType="reset" >重置输入</Button>
                <Button type="primary" htmlType="submit" >提交</Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </Header>
    </>
  )
}