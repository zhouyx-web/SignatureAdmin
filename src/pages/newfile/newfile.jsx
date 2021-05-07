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
import PicturesWall from '../picture-wall/picture-wall'
import './newfile.less'
import memoryUtils from '../../utils/memoryUtils'
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

export default function NewFile() {
    const [numDisable, setNumDisable] = useState(true)

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
            updateOptions.creator_id = memoryUtils.user._id
            updateOptions.doc_id = doc_id
            const result = await reqPrepareRelease(updateOptions)
            if (result.status === 0) {
                message.success('文档设置保存成功！')
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
                <Breadcrumb.Item>新建面签</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ backgroundColor: '#fff', padding: '10px 16px' }}>
                <div className="title-style">选择要上传的文件:</div>
                <PicturesWall ref={pictureWallRef} />
                <Form
                    name="file_setting"
                    onFinish={onFinish}
                    initialValues={{
                        doc_mode: 'single',
                        max_sign_num: 1,
                        valid_time: 5,
                        re_sign: 'reject'
                    }}
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