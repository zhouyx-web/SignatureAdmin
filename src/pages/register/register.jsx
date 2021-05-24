import React, { useState } from 'react'
import { Form, Input, Button, Alert, message, } from 'antd';
import {
    AntDesignOutlined,
    UserOutlined,
    LockOutlined,
} from '@ant-design/icons'
import {Link} from 'react-router-dom'

import './rejister.less'
import { reqRegister } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'

//用户名校验规则 
const accountValidator = (rule, value) => {
    // const phoneReg = /^1[3-578]\d{9}$/
    // const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    const usernameReg = /^\w{3,11}$/
    // if( phoneReg.test(value) || mailReg.test(value)){
    if (usernameReg.test(value)) {
        return Promise.resolve()
    } else {
        return Promise.reject("请输入有效的账户")
    }
}
// 密码校验规则
const pwdValidator = (rule, value) => {
    const spaceReg = /[\s]+/
    if (!value || spaceReg.test(value)) {
        return Promise.reject('请输入有效的密码')
    } else {
        return Promise.resolve()
    }
}

export default function Login(_window) {

    if (memoryUtils.user.username) _window.history.replace('/')

    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errmsg, setErrmsg] = useState('')

    const handleClose = () => {
        setVisible(false);
    }

    // 账户和密码校验成功，在此处发送注册请求
    const onFinish = async (values) => {
        setLoading(true) // 按钮加载状态
        setVisible(false) // 登录失败提示框
        const { username, password } = values
        const result = await reqRegister(username, password)
        setLoading(false)
        if (!result.status) {// login success
            message.success('注册成功')
            _window.history.replace('/login')
        } else {//login failed
            setVisible(true)
            setErrmsg(result.msg)
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className="login">
            <div className="login-header">
                <AntDesignOutlined className="icon" />
                <h1>微信签署文件发布平台</h1>
            </div>
            <div className="login-content">
                <h2>用户注册</h2>

                <div className="alert-container" style={visible ? { height: '60px' } : { height: '0' }}>
                    {
                        visible ? (
                            <Alert
                                message={errmsg}
                                type="error"
                                showIcon
                                closable
                                onClose={handleClose}
                            />
                        ) : null
                    }
                </div>

                <Form
                    name="registerForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        validateFirst="true"
                        rules={[{ validator: accountValidator }]}
                    >
                        <Input
                            placeholder="数字字母下划线3-11位"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        validateFirst="true"
                        rules={[{ validator: pwdValidator }]}
                    >
                        <Input.Password
                            placeholder="请输入注册密码"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
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
                        <Button block type="primary" htmlType="submit" {...{ loading }} >注册</Button>
                        <Link to="/login">去登录！</Link>
                    </Form.Item>
                </Form>
            </div>
            <span className="login-footer">欢迎使用微信签署后台管理系统</span>
        </div>
    )
}