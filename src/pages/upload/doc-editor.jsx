import React, { useState, useRef, useEffect } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Skeleton, Button, message } from 'antd';
import './doc-editor.less'
import { CloseCircleFilled } from '@ant-design/icons';
import { reqMidRelease, reqRelease } from '../../api/index'
// import sample from '../../static/test.pdf'

export default function DocEditor(props) {
    // 判断是否传入了参数
    console.log(props)
    if (!props.location.state) {
        props.history.replace('/uploadfile')
    }
    // 取出传递的文档信息
    const { doc_id, valid_time, max_sign_num } = props.location.state
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [signAreaDisable, setSignAreaDisable] = useState('none')
    const [existSignArea, setExistSignArea] = useState(false)
    const pdfContainerRef = useRef(null)
    const pdfDocRef = useRef(null)
    const signAreaRef = useRef(null)
    const resizeRef = useRef(null)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function onDocumentLoadError(err) {
        alert('文档加载失败！原因:' + err.message)
    }

    const go = () => {
        const page = pageNumber + 1 > numPages ? pageNumber : pageNumber + 1
        setPageNumber(page)
    }

    const back = () => {
        const page = pageNumber - 1 <= 0 ? 1 : pageNumber - 1
        setPageNumber(page)
    }

    const dragSignArea = e => {
        console.log('mousedown')
        const { nativeEvent, target } = e
        // 计算文档区域与页面两者左上角偏移量
        const initTop = nativeEvent.pageY - nativeEvent.offsetY - target.offsetTop
        const initLeft = nativeEvent.pageX - nativeEvent.offsetX - target.offsetLeft
        // 计算maxTop maxLeft
        const maxTop = pdfDocRef.current.clientHeight - signAreaRef.current.offsetHeight
        const maxLeft = pdfDocRef.current.clientWidth - signAreaRef.current.offsetWidth
        // console.log('mousedown maxtop maxleft', pdfDocRef.current.clientHeight, signAreaRef.current.offsetHeight)
        pdfContainerRef.current.onmousemove = function (event) {
            // 获取鼠标坐标
            var posX = event.pageX;
            var posY = event.pageY;
            // 计算移动后的区域偏移量 = 鼠标坐标 - 初始偏移量 - 鼠标在签署区域的偏移量
            let left = posX - initLeft - nativeEvent.offsetX
            let top = posY - initTop - nativeEvent.offsetY

            // 限制区域移动的范围，不超过文档区域
            if (left < 0) { left = 0 }
            else if (left > maxLeft) { left = maxLeft }
            if (top < 0) { top = 0 }
            else if (top > maxTop) { top = maxTop }

            signAreaRef.current.style.left = left + 'px';
            signAreaRef.current.style.top = top + 'px';
        }
        pdfContainerRef.current.onmouseup = function () {
            pdfContainerRef.current.onmousemove = null
            pdfContainerRef.current.onmouseup = null
        }
    }

    const addSignArea = () => {
        setSignAreaDisable('inline-block')
        setExistSignArea(true)
        // 右下角添加鼠标按下事件
        resizeRef.current.onmousedown = function (event) {
            console.log('resizeMouseDown')
            // 获取签署区域与页面左上角的宽高差 pageX-resize区域对于签署区域的偏移量
            let topDis = event.pageY - resizeRef.current.offsetTop
            let leftDis = event.pageX - resizeRef.current.offsetLeft
            // 计算文档区域的宽高
            const pdfWidth = pdfDocRef.current.clientWidth
            const pdfHeight = pdfDocRef.current.clientHeight
            // 计算签署区域相对于文档区域坐上角的偏移量
            const signAreaLeft = signAreaRef.current.offsetLeft
            const signAreaTop = signAreaRef.current.offsetTop
            // 计算当前位置下的签署区域最大宽高 
            const maxSignWidth = pdfWidth - signAreaLeft
            const maxSignHeight = pdfHeight - signAreaTop
            pdfContainerRef.current.onmousemove = function (event) {
                // 计算变化后的宽高
                let width = event.pageX - leftDis
                let height = event.pageY - topDis
                // 判断计算后的宽高是否超过文档区域 + 限制最小宽高 100px 30px
                if (width < 100) { width = 100 }
                else if (width > maxSignWidth) { width = maxSignWidth }
                if (height < 30) { height = 40 }
                else if (height > maxSignHeight) { height = maxSignHeight }

                signAreaRef.current.style.width = width + 'px';
                signAreaRef.current.style.height = height + 'px';
            }
            pdfContainerRef.current.onmouseup = function (event) {
                pdfContainerRef.current.onmousemove = null
            }
            event.stopPropagation()
        }
    }

    // 根据签署人数设置签名区域的最小高宽
    // const figureMinWH = () => {
    /**
     * 文档宽度 W 文档高度 H 前端展示与后端文件尺寸一致
     * 最大宽度 maxW=W*0.75 最大高度 maxH=H*0.5
     * 单个签名域 minItemH=40px minItemW=W*0.75/6 px
     * num < 5,minW = num*
     * num > 5,wi
     * */
    // }
    const getSignAreaInfo = () => {
        // 起点坐标 宽高
        const left = signAreaRef.current.offsetLeft
        const top = signAreaRef.current.offsetTop
        const width = signAreaRef.current.offsetWidth
        const height = signAreaRef.current.offsetHeight
        return { left, top, width, height }
    }
    const saveSetting = async (isDocRelease) => {
        if(!existSignArea) {
            message.warning('请设置签名区域')
            return
        }
        // 保存面签设置，但是不发布，也就是不更新doc_status
        // 设置 sign_area 需要doc_id
        const sign_area = JSON.stringify(getSignAreaInfo())
        const result = await reqMidRelease({ sign_area, doc_id })
        if (result.status === 0) {
            // 保存成功
            message.success('签署区域设置保存成功')
            // 跳转页面
            if(!isDocRelease){
                props.history.replace('/unpublish')
            }
            return Promise.resolve('success')
        } else {
            message.error('区域设置保存失败，请重试')
            return Promise.reject('failed')
        }
    }

    const releaseDoc = () => {
        if(!existSignArea) {
            message.warning('请设置签名区域')
            return
        }
        // 先保存区域设置信息
        saveSetting(true).then(async() => {
            // 设置 release_time/end_time/doc_status/ 需要doc_id
            const release_time = Date.now()
            let end_time
            if (!valid_time) {
                end_time = 0
            } else {
                end_time = release_time + valid_time * 60 * 1000
            }
            const doc_status = 'ongoing'
            const releaseResult = await reqRelease({release_time, end_time, doc_status, doc_id})
            if(releaseResult.status === 0){
                message.success('文档发布成功')
                props.history.replace('/ongoing')
            } else {
                message.error('文档发布失败，请重试')
            }
        })

    }

    return (
        <div className="doc-editor-container">
            <div className="top-control-panel">
                <Button type="primary" onClick={addSignArea}>添加签署域</Button>
                <div className="page-controls">
                    <Button type='text' onClick={back}>{'<'}</Button>
                    <span>{pageNumber} of {numPages}</span>
                    <Button type='text' onClick={go}>{'>'}</Button>
                </div>
                <Button type="primary" onClick={saveSetting}>保存</Button>
                <Button type="primary" onClick={releaseDoc}>发布</Button>
            </div>

            <div className="pdf-container" ref={pdfContainerRef}>
                <Document
                    className="pdf-doc"
                    inputRef={pdfDocRef}
                    file={`/upload/docs/${doc_id}`}
                    // file='/upload/docs/test.pdf'
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={<Skeleton active />}
                    renderMode="svg"
                    options={{
                        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
                        cMapPacked: true,
                    }}
                >
                    <Page pageNumber={pageNumber} />
                    <div
                        className='sign-area'
                        ref={signAreaRef}
                        onMouseDown={dragSignArea}
                        style={{ display: signAreaDisable }}
                    >
                        <div className="resize" ref={resizeRef}></div>
                        <CloseCircleFilled className="closed" onClick={() => {
                            setSignAreaDisable('none')
                            setExistSignArea(false)
                        }} />
                        {/* <div className="sign-item-container"> */}
                        {/* 动态生成签名区域个数 */}
                        {/* </div> */}
                    </div>
                </Document>
            </div>
        </div>
    );
}