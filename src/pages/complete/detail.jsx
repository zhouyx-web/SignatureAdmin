import React, { useState } from 'react'
import { message, Skeleton, Button } from 'antd'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import './detail.less'

export default function UserSign(props) {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    if (!props.location.state) {
        props.history.replace('/complete')
        return <></>
    }
    const {doc_id} = props.location.state

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

    return (
        <div className="preview">
            <div className="pdf-container">
                <Document
                    className="pdf-doc"
                    file={`/upload/docs/sign-docs/${doc_id}`}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    loading={<Skeleton active />}
                    renderMode="svg"
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>
            <div className="bottom-control-panel">
                <div className="page-controls">
                    <Button type='text' onClick={back}>{'<'}</Button>
                    <span>{pageNumber} of {numPages}</span>
                    <Button type='text' onClick={go}>{'>'}</Button>
                </div>
            </div>
        </div>
    )
}