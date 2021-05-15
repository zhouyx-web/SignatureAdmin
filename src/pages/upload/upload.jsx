import React, { useRef, useState } from 'react'
import {
    Form,
    Select,
    InputNumber,
    Breadcrumb,
    Input,
    Button,
    message
} from 'antd'
import BreadcrumbItemCreator from '../../components/breadcrumb-item/index'
import PicturesWall from '../../components/picture-wall/picture-wall'
import { reqPrepareRelease } from '../../api/index'
const { Option } = Select

// 生成可下拉的面包屑菜单
const menu = BreadcrumbItemCreator('/creator')
// 文档名校验规则
const fileNameValidator = (rule, value) => {
    const spaceReg = /[\s]+/
    if (!value || spaceReg.test(value)) {
        return Promise.reject('为你的文档取一个名字吧。')
    } else {
        return Promise.resolve()
    }
}

export default function Upload(props) {
    const [numDisable, setNumDisable] = useState(true)
    const {
        doc_id,
        doc_path,
        doc_name,
        doc_mode,
        max_sign_num,
        re_sign,
        valid_time
    } = props.location.state || {
        doc_mode: 'single',
        doc_name: '',
        max_sign_num: 1,
        valid_time: 0,
        re_sign: 'reject'
    }
    const pictureWallRef = useRef(null)
    const onFinish = async values => {
        console.log(values)
        // 是否已上传文件
        const doc_id = pictureWallRef.current.getFileListDetail()[0]
        if (doc_id) {
            /**
             * 更新以下字段：doc_name, doc_mode, creator_id, max_sign_num, re_sign
             * 保存以下字段：valid_time
             * api reqPrepareRelease; params updateOptions->obj
             */
            const updateOptions = { ...values }
            
            updateOptions.doc_id = doc_id
            const result = await reqPrepareRelease(updateOptions)
            if (result.status === 0) {
                message.success('文档设置保存成功！')
                // 跳转至签署域设置界面 传递参数 doc_id valid_time max_sign_num ...
                props.history.push('/uploadfile/doc-editor', { ...updateOptions })
            } else {
                message.error(result.msg)
            }
        } else {
            message.warning('请上传签署的pdf文件！')
        }
    }

    return (
        <>
            <Breadcrumb separator=">" style={{ margin: '16px 0' }}>
                <Breadcrumb.Item overlay={menu}><span style={{ cursor: 'pointer' }}>创建面签</span></Breadcrumb.Item>
                <Breadcrumb.Item>上传文档</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ backgroundColor: '#fff', padding: '10px 16px' }}>
                <div style={{marginBottom: "16px"}}>选择要上传的文件:</div>
                <PicturesWall ref={pictureWallRef} docInfo={{doc_id,doc_path,doc_name}} />
                <Form
                    name="file_setting"
                    onFinish={onFinish}
                    initialValues={{ doc_mode, max_sign_num, valid_time, re_sign, doc_name }}
                >
                    <div className="title-style">文档标题:</div>
                    <Form.Item name="doc_name" rules={[{ validator: fileNameValidator }]}>
                        <Input allowClear placeholder="签署主题名" />
                    </Form.Item>

                    <div className="title-style">可选项:</div>
                    <Form.Item name="doc_mode" label="签署模式">
                        <Select onSelect={
                            selected => selected === 'multiple' ? setNumDisable(false) : setNumDisable(true)
                        }>
                            <Option value='single'>一份一签</Option>
                            <Option value='multiple'>一份多签</Option>
                            <Option value='unlimited '>不限人数</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="max_sign_num" label="签署人数">
                        <InputNumber disabled={numDisable} min={1} max={10} />
                    </Form.Item>

                    <Form.Item label="签署时长">
                        <Form.Item name="valid_time" noStyle>
                            <InputNumber min={0} max={10} />
                        </Form.Item>
                        <span className="ant-form-text">0表示不限时</span>
                    </Form.Item>

                    <Form.Item name="re_sign" label="补签">
                        <Select>
                            <Option value='allow'>允许</Option>
                            <Option value='reject'>不允许</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item wrapperCol={{ span: 20, offset: 12 }} style={{ transform: '-50%' }}>
                        <Button type="primary" htmlType="submit">下一步</Button>
                    </Form.Item>

                </Form>

            </div>
        </>
    )
}