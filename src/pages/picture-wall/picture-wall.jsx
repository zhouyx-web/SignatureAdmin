import React, { Component } from 'react'
import { Upload, Modal, message } from 'antd';
import {
    LoadingOutlined,
    PaperClipOutlined,
    PictureTwoTone,
    FilePdfTwoTone,
    FileWordTwoTone,
    FileExcelTwoTone,
    PlusOutlined,
} from '@ant-design/icons';

import {FILE_UPLOAD_PARAMS} from '../../utils/constants'
import {reqDeleteFile} from '../../api/index'

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

class PicturesWall extends Component {
    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
    };
    // 获取组件内部的fileList元素对应的文件标识
    getFileListDetail = () => {
        return this.state.fileList.map(item => item.uid)
    }

    // 隐藏预览对话框
    handleCancel = () => this.setState({ previewVisible: false });

    // 点击文件链接或预览图标时的回调
    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };


    // 文件状态改变后执行的回调 uploading done error removed
    handleChange = async ({ file, fileList }) => {
        // file 当前正在操作的文件，fileList 组件中的文件列表状态
        if(file.status === 'done'){
            // 取出响应结果
            const result = file.response
            if(result.status === 0){
                message.success("文件上传成功！")
                // 新创建一个简单的文件状态
                const newFile = {
                    // 用于删除数据库中文件数据的标识
                    uid:result.data.doc_id,
                    // 用于页面展示的名称
                    name:result.data.doc_name,
                    // 文件状态
                    status:file.status,
                    // 文件url
                    url:result.data.doc_path + '/' + result.data.doc_id
                }
                // 删除fileList最后一个元素，也就是刚上传完毕的图片
                fileList.pop()
                fileList.push(newFile)
                console.log(newFile)
            } else {
                message.error("文件上传失败！")
            }
            
        } else if (file.status === 'removed'){
            // 发送请求删除文件
            const result = await reqDeleteFile(file.uid)
            if(result.status === 0){
                message.success("文件删除成功！")
            }
        } else if(file.status === 'error'){
            message.error('文件上传失败！')
        }
        this.setState({ fileList })
    };

    handleIconRender = (file, listType) => {
        const fileSufIconList = [
            { type: <FilePdfTwoTone />, suf: ['.pdf'] },
            { type: <FileExcelTwoTone />, suf: ['.xlsx', '.xls', '.csv'] },
            { type: <FileWordTwoTone />, suf: ['.doc', '.docx'] },
            {
                type: <PictureTwoTone />,
                suf: ['.webp', '.svg', '.png', '.gif', '.jpg', '.jpeg', '.jfif', '.bmp', '.dpg'],
            },
        ];
        // console.log(1, file, listType);
        let icon = file.status === 'uploading' ? <LoadingOutlined /> : <PaperClipOutlined />;
        if (listType === 'picture' || listType === 'picture-card') {
            if (listType === 'picture-card' && file.status === 'uploading') {
                icon = <LoadingOutlined />; // or icon = 'uploading...';
            } else {
                fileSufIconList.forEach(item => {
                    if (item.suf.includes(file.name.substr(file.name.lastIndexOf('.')))) {
                        icon = item.type;
                    }
                });
            }
        }
        return icon;
    };

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <>
                <Upload
                    // 上传地址
                    action="/manage/docs/upload"
                    accept=".pdf"
                    // 文件参数名
                    name={FILE_UPLOAD_PARAMS}
                    // 照片墙格式
                    listType="picture-card"
                    // 已上传文件的列表
                    fileList={fileList}
                    // 点击预览或者文件链接的响应函数
                    onPreview={this.handlePreview}
                    // 文件上传、成功、失败都会调用的函数
                    onChange={this.handleChange}
                    // 自定义显示icon
                    iconRender={this.handleIconRender}
                >
                    {fileList.length >= 8 ? null : uploadButton}
                </Upload>
                {/* 预览对话框 */}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
            </>
        );
    }
}

export default PicturesWall