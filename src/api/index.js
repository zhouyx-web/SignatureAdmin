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