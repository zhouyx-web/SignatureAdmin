import React, { useEffect, useState } from 'react'
import { message, Skeleton, Button } from 'antd'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import memoryUtiles from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { reqGetUid, reqDocInfo, reqStartSign } from '../../api/index'
import './user-sign.less'

const getUid = async (setSigner) => {
    console.log('getid')
    // 获取signer
    const result = await reqGetUid()
    if (result.status === 0) {
        // 赋值 + 存储
        const { uid } = result.data
        setSigner({ uid })
        memoryUtiles.signer = { uid }
        storageUtils.saveUid(uid)
    }
}

export default function UserSign(props) {
    const [signer, setSigner] = useState(memoryUtiles.signer)
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [docInfo, setDocInfo] = useState({})

    // 获取文档id 
    const doc_id = props.location.hash.replace('#doc_id=', '')
    useEffect(() => {
        // 不存在signer
        if (!signer.uid) getUid(setSigner)

        reqDocInfo(doc_id)
        .then(result => {
            if(result.status === 0){
                document.title = result.data.doc_name
                setDocInfo(result.data)
            }
        })
    }, [])

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function onDocumentLoadError(err) {
        message.error('文档加载失败！原因:' + err.message)
    }
    const go = () => {
        const page = pageNumber + 1 > numPages ? pageNumber : pageNumber + 1
        setPageNumber(page)
    }

    const back = () => {
        const page = pageNumber - 1 <= 0 ? 1 : pageNumber - 1
        setPageNumber(page)
    }

    const startSign = async() => {
        // 点击开始签署，在sign表添加一条签署记录，表示开始签署，在提交签名后才算完成签署
        const uid = signer.uid
        const result = await reqStartSign(doc_id, uid)
        if(result.status === 0){
            // 跳转至签名版界面
            props.history.push('/user-sign/signature-board',{doc_id, uid})
        } else {
            message.error(result.msg)
        }
    }
    

    return (
        <div className="preview">
            <div className="pdf-container">
                <Document
                    className="pdf-doc"
                    file={`/upload/docs/${doc_id}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={<Skeleton active />}
                    renderMode="svg"
                >
                    <Page pageNumber={pageNumber} scale={0.65} />
                </Document>
            </div>
            <div className="bottom-control-panel">
                <div className="page-controls">
                    <Button type='text' onClick={back}>{'<'}</Button>
                    <span>{pageNumber} of {numPages}</span>
                    <Button type='text' onClick={go}>{'>'}</Button>
                </div>
            </div>
            <Button 
                type="primary" 
                onClick={startSign}
                size="large"
                block
            >开始签署</Button>
        </div>
    )
}