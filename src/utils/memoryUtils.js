/*
  用来在内存保存一些数据的工具模块
  便于程序运行时读取当前登录信息，提高访问速度
 */
const userStorage = {
  user: {}, // 保存当前登陆的user
}
export default userStorage