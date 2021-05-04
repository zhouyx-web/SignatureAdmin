import React, { useState } from 'react'
import { Form, Input, Button, Alert, message, } from 'antd';
import { 
    AntDesignOutlined,
    UserOutlined, 
    LockOutlined,
} from '@ant-design/icons'

import './login.less'
import { reqLogin } from '../../api/index'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

//用户名校验规则 
const accountValidator = (rule, value) => {
    // const phoneReg = /^1[3-578]\d{9}$/
    // const mailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
    const usernameReg = /^\w{3,11}$/
    // if( phoneReg.test(value) || mailReg.test(value)){
    if( usernameReg.test(value)){
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

    if(memoryUtils.user.username) _window.history.replace('/')

    const [ visible, setVisible ] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ errmsg, setErrmsg ] = useState('')

    const handleClose = () => {
        setVisible(false);
    }

    // 账户和密码校验成功，在此处发送请求
    const onFinish = async (values) => {
        setLoading(true) // 按钮加载状态
        setVisible(false) // 登录失败提示框
        const { username, password } = values
        const loginResult = await reqLogin(username, password)
        setLoading(false)
        if(!loginResult.status){// login success
            message.success('登录成功！')
            const {data} = loginResult
            // 将用户信息存入内存与localStorage
            memoryUtils.user = data
            storageUtils.saveUser(data)
            // 跳转至主页面 一定要将用户信息存入之后再跳转。因为在主界面中也存在判断用户是否存在，此时用户还未存储，就又跳转到登录界面
            _window.history.replace('/')
        } else {//login failed
            setVisible(true)
            setErrmsg(loginResult.msg)
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
                <h2>用户登录</h2>

                <div className="alert-container" style={ visible ? { height:'60px' } : { height:'0' } }>
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