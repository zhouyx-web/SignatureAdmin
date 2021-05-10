import React, {useEffect, useState} from 'react'
import { message } from 'antd'
import memoryUtiles from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqGetUid} from '../../api/index'

const getUid = async (setSigner) => {
    console.log('getid')
    // 获取signer
    const result = await reqGetUid()
    if(result.status === 0){
        // 赋值 + 存储
        const {uid} = result.data
        setSigner({uid})
        memoryUtiles.signer = {uid}
        storageUtils.saveUid(uid)
    }
}

export default function UserSign(props){
    const [signer,setSigner] = useState(memoryUtiles.signer)
    // 获取文档id 
    const doc_id = props.location.hash.replace('#doc_id=','')
    // 不存在signer
    useEffect(() => {
        if(!signer.uid) getUid(setSigner)
    }, [])
    
    return (
        <div>用户签署</div>
    )
}