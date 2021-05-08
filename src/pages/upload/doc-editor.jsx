import React, { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Skeleton, Drawer, Button } from 'antd';
import './doc-editor.less'
// import sample from '../../static/test.pdf'

export default function DocEditor() {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [visible, setVisible] = useState(false)

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }
    function onDocumentLoadError(err) {
        alert('文档加载失败！原因:' + err.message)
    }

    const showDrawer = () => {
        setVisible(true)
    };

    const onClose = () => {
        setVisible(false)
    };
    const go = () => {
        const page = pageNumber + 1 > numPages ? pageNumber : pageNumber + 1
        setPageNumber(page)
        // setVisible(false)
    }

    const back = () => {
        const page = pageNumber - 1 <= 0 ? 1 : pageNumber - 1
        setPageNumber(page)
        // setVisible(false)
    }

    return (
        <div className="site-drawer-render-in-current-wrapper">
            <Button type="primary" onClick={showDrawer}>
                Open
            </Button>
            <Drawer
                title="Basic Drawer"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <div className="page-controls">
                    <Button onClick={back}>{'<'}</Button>
                    <span>{pageNumber} of {numPages}</span>
                    <Button onClick={go}>{'>'}</Button>
                </div>
            </Drawer>
            <div className="pdf-container">
                <Document
                    file='/upload/docs/test.pdf'
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
                </Document>
            </div>
        </div>
    );
}