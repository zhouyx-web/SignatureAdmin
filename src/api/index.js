/* 
    包装接口，便于外部调用
*/

import ajax from './ajax'

// 登录请求
export const reqLogin = (username, password) => ajax('/manage/user/login', {username, password}, 'POST')
// 文件删除请求
export const reqDeleteFile = (doc_id) => ajax('/manage/docs/delete', {doc_id}, 'POST')
// 文档预发布请求
export const reqPrepareRelease = updateOptions => ajax('/manage/docs/release/first', updateOptions, 'POST')
// 文档中间发布请求
export const reqMidRelease = signArea => ajax('/manage/docs/release/second', signArea, 'POST')
// 文档最终发布请求
export const reqRelease = releaseOptions => ajax('/manage/docs/release/end', releaseOptions, 'POST')
// 获取文档列表
export const reqDocList = doc_status => ajax('/manage/docs/list', {doc_status})
// 结束签署
export const reqEndSign = endOptions => ajax('/manage/docs/sign-end', endOptions, 'POST')
// 签署用户登记接口
export const reqGetUid = () => ajax('/manage/user/get-uid')
// 获取单个签署文件信息
export const reqDocInfo = (doc_id) => ajax('/manage/docs/get-doc', {doc_id})
// 记录用户开始签署
export const reqStartSign = (doc_id, uid) => ajax('/manage/sign/start-sign', {doc_id, uid}, 'POST')
