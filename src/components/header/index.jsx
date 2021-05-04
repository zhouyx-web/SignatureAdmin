import {
  Layout,
  Avatar,
  Modal,
  Popover,
  message,
} from 'antd'
import { UserOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import './index.less'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'

const { Header } = Layout
const { confirm } = Modal

const DetailContent = (
  <>
    <p>用户中心</p>
    <p onClick={showConfirm}>退出登录</p>
  </>
)
let replaceHitory
function showConfirm() {
  const { username } = memoryUtils.user
  confirm({
    title: '确认退出登录吗？',
    icon: <ExclamationCircleOutlined />,
    content: `当前登录用户:${username}`,
    cancelText: "取消",
    okText: "确定",
    okType: "danger",
    onOk() {
      // 清除locastorage/memoryStorage 并强制退出
      storageUtils.removeUser()
      memoryUtils.user = {}
      message.success('退出成功！')
      replaceHitory('/login')
    }
  })
}


export default function HeaderInner(props) {
  const { username } = memoryUtils.user
  replaceHitory = props._window.history.replace
  return (
    <>
      <Header className="site-layout-background">
        <Popover content={DetailContent} trigger="hover">
          <Avatar className="avatar" size="large" icon={<UserOutlined />} />
        </Popover>
        <span>{username}</span>
      </Header>
    </>
  )
}