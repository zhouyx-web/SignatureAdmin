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