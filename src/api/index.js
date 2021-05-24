/* 
    包装接口，便于外部调用
*/

import ajax from './ajax'

// 登录请求
export const reqLogin = (username, password) => ajax('/manage/user/login', {username, password}, 'POST')
// 用户注册
export const reqRegister = (username, password) => ajax('/manage/user/register', {username, password}, 'POST')
// 修改密码
export const reqUpdatePwd = accountInfo => ajax('/manage/user/update', accountInfo, 'POST')
// 文件删除请求
export const reqDeleteFile = (doc_id) => ajax('/manage/docs/delete', {doc_id}, 'POST')
// 文档预发布请求
export const reqPrepareRelease = updateOptions => ajax('/manage/docs/release/basic', updateOptions, 'POST')
// 文档中间发布请求
export const reqMidRelease = signArea => ajax('/manage/docs/release/sign-area', signArea, 'POST')
// 文档最终发布请求
export const reqRelease = releaseOptions => ajax('/manage/docs/release/confirm', releaseOptions, 'POST')
// 获取文档列表
export const reqDocList = (doc_status, time_type, creator_id) => ajax('/manage/docs/list', {doc_status, time_type, creator_id})
// 结束签署
export const reqEndSign = endOptions => ajax('/manage/docs/sign-end', endOptions, 'POST')
// 签署用户登记接口
export const reqGetUid = () => ajax('/manage/user/get-uid')
// 获取单个签署文件信息
export const reqDocInfo = (doc_id) => ajax('/manage/docs/info', {doc_id})
// 记录用户开始签署
export const reqStartSign = (doc_id, uid) => ajax('/manage/sign/start-sign', {doc_id, uid}, 'POST')
// 用户提交签名
export const reqCommitSign = (doc_id, uid, imgBase64) => ajax('/manage/sign/commit',{doc_id, uid, imgBase64}, 'POST')
// 下载签署好的文件 此API不会被使用
export const reqDownload = doc_id => ajax('/manage/docs/download', {doc_id})
// 补签接口
export const reqRepeatSign = doc_id => ajax('/manage/docs/repeat-sign', {doc_id}, 'POST')