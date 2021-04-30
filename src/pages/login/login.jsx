import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd';
import { 
    AntDesignOutlined,
    UserOutlined, 
    LockOutlined,
} from '@ant-design/icons'

import './login.less'

//用户名校验规则 
const accountValidator = (rule, value) => {
    const phoneReg = /^1[3-578]\d{9}$/
    const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    if( phoneReg.test(value) || mailReg.test(value)){
        return Promise.resolve()
    }else{
        return Promise.reject("请输入有效的账户")
    }
}
// 密码校验规则
const pwdValidator = (rule, value) => {
    const spaceReg = /[\s]+/
    if( !value || spaceReg.test(value) ){
        return Promise.reject('请输入有效的密码')
    }else{
        return Promise.resolve()
    }
}

export default function Login(_window) {

    const [ visible, setVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)

    const handleClose = () => {
        setVisible(false);
    }

    // 账户和密码校验成功，在此处发送请求
    const onFinish = async (values) => {
        setLoading(true)
        setVisible(false)
        const { username, password } = values
        const loginResult = await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({message:'success'})
            }, 1000)
        })
        setLoading(false)
        // _window.history.replace('/')
        setVisible(true)
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
                <h2>用户登录</h2>

                <div className="alert-container" style={ visible ? { height:'60px' } : { height:'0' } }>
                    {
                        visible ? (
                            <Alert 
                                message="用户名或者密码错误" 
                                type="error" 
                                showIcon 
                                closable
                                onClose={handleClose}
                            />
                        ) : null
                    }
                </div>
                
                <Form
                    name="loginForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        name="username"
                        validateFirst="true"
                        rules={[{ validator: accountValidator }]}
                    >
                        <Input 
                            placeholder="请输入手机号或者邮箱地址"
                            prefix={<UserOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        validateFirst="true"
                        rules={[{ validator: pwdValidator }]}
                    >
                        <Input.Password 
                            placeholder="请输入登录密码"
                            prefix={<LockOutlined className="site-form-item-icon" />}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button block type="primary"  htmlType="submit" {...{loading}} >登录</Button>
                    </Form.Item>
                </Form>
            </div>
            <span className="login-footer">欢迎使用微信签署后台管理系统</span>
        </div>
    )
}