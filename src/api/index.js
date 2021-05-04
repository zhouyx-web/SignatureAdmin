/* 
    包装接口，便于外部调用
*/

import ajax from './ajax'

// 登录请求
export const reqLogin = (username, password) => ajax('/manage/user/login', {username, password}, 'POST')