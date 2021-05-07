import React, { useRef, useState } from 'react'
import {
    Form,
    Select,
    InputNumber,
    Breadcrumb,
    Input,
    Switch,
    Radio,
    Slider,
    Button,
    Upload,
    Rate,
    Checkbox,
    Row,
    Col,
} from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import PicturesWall from '../picture-wall/picture-wall'
import './newfile.less'
const { Option } = Select

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/creator')
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 8 },
}

export default function NewFile() {
    const [numDisable, setNumDisable] = useState(true)
    const [timeDisable, setTimeDisable] = useState(true)

    const pictureWallRef = useRef(null)
    const onFinish = (values) => {
        console.log(values)
    }

    return (
        <>
            <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                <Breadcrumb.Item overlay={menu}><span style={{ cursor: 'pointer' }}>创建面签</span></Breadcrumb.Item>
                <Breadcrumb.Item>新建面签</Breadcrumb.Item>
            </Breadcrumb>
            <div className="title-style">选择要上传的文件:</div>
            <PicturesWall ref={pictureWallRef} />
            <Form
                name="file_setting"
                onFinish={onFinish}
                {...formItemLayout}
            >
                <Form.Item name="doc_title" label="文档标题">
                    <Input allowClear placeholder="默认使用上传文档标题" />
                </Form.Item>
                <Form.Item
                    name="doc_type"
                    label="签署模式"
                    hasFeedback
                    rules={[{ required: true, message: '请选择签署模式！' }]}
                >
                    <Select defaultValue={0} onSelect={
                        selectNum => selectNum === 1 ? setTimeDisable(false) : setTimeDisable(true)
                    }>
                        <Option value={0}>一份一签</Option>
                        <Option value={1}>一份多签</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="total_num" label="签署人数" rules={[{ required: true, message: '请输入签署人数' }]}>
                    <InputNumber disabled={timeDisable} min={1} max={10} defaultValue={1} />
                </Form.Item>
                <Form.Item
                    name="time_limit"
                    label="签署限时"
                    hasFeedback
                    rules={[{ required: true, message: '请选择签署时间' }]}
                >
                    <Select defaultValue={0} onSelect={
                        selectNum => selectNum === 1 ? setNumDisable(false) : setNumDisable(true)
                    }>
                        <Option value={0}>不限时</Option>
                        <Option value={1}>限时</Option>
                    </Select>
                </Form.Item>
                <Form.Item name="valid_time" label="签署市场" rules={[{ required: true, message: '请输入签署时长' }]}>
                    <InputNumber disabled={numDisable} min={0} max={10} defaultValue={0} />
                </Form.Item>

                <Form.Item
                    name="sign_add"
                    label="补签"
                    hasFeedback
                    rules={[{ required: true, message: '请选择补签项' }]}
                >
                    <Select defaultValue={0}>
                        <Option value={0}>不允许</Option>
                        <Option value={1}>允许</Option>
                    </Select>
                </Form.Item>

                <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>

            </Form>
        </>
    )
}