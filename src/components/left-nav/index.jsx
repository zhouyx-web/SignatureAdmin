import { withRouter, Link } from 'react-router-dom'
import { Menu } from 'antd'
import { WechatOutlined } from '@ant-design/icons'

import menuConfig from '../../config/menuConfig'
import routeConfig from '../../config/routeConfig'
import './index.less'
const { SubMenu } = Menu

function LeftNav (_window) {

    const generateMenuItem = menuConfig => {
        return menuConfig.reduce((initValue, menuItem) => {
            // 不存在子菜单
            if(!menuItem.children){
                initValue.push((
                    <Menu.Item key={menuItem.path} icon={menuItem.icon}>
                        <Link to={menuItem.path}>{menuItem.title}</Link>
                    </Menu.Item>
                ))
            }else{
                initValue.push((
                    <SubMenu key={menuItem.path} icon={menuItem.icon} title={menuItem.title}>
                        {generateMenuItem(menuItem.children)}
                    </SubMenu>
                ))
            }
            // 存在子菜单，先创建子菜单，再创建菜单项
            return initValue
        }, [])
    }
    // 获取当前url的路径
    const pathname = _window.location.pathname
    // 设置展开的子菜单
    const openSubMenu = routeConfig.find(item => item.path === pathname) || {}
    return(
        <>
        <div className="logo" >
            <WechatOutlined className="icon"/>微信签署
        </div>
        <Menu 
            // 初始化选中的二级菜单
            defaultOpenKeys={[openSubMenu.id]} 
            // 初始化选中的菜单项
            defaultSelectedKeys={['/home']}
            // 当前选中的菜单项
            selectedKeys={[pathname]}
            mode="inline" 
            style={{backgroundColor:'#fafafa'}}
        >
            {/* 生成左侧导航内容 ReactNodes */}
            { generateMenuItem(menuConfig) }
        </Menu>
        </>
    )
}

export default withRouter(LeftNav)