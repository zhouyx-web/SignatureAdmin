import React, {useState, useEffect} from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Menu } from 'antd'
import { WechatOutlined } from '@ant-design/icons'

import menuConfig from '../../config/menuConfig'
import routeConfig from '../../config/routeConfig'
import './index.less'
const { SubMenu } = Menu

const generateMenuItem = (menuConfig, setOpenKeys, openKeys) => {
    return menuConfig.reduce((preValue, menuItem) => {
        // 不存在子菜单
        if(!menuItem.children){
            preValue.push((
                <Menu.Item key={menuItem.path} icon={menuItem.icon}>
                    <Link to={menuItem.path}>{menuItem.title}</Link>
                </Menu.Item>
            ))
        }else{
            preValue.push((
                <SubMenu 
                    key={menuItem.path} 
                    icon={menuItem.icon} 
                    title={menuItem.title}
                    onTitleClick={e => {
                        openKeys === e.key ? setOpenKeys('') : setOpenKeys(e.key)
                    }}
                >
                    {generateMenuItem(menuItem.children)}
                </SubMenu>
            ))
        }
        // 存在子菜单，先创建子菜单，再创建菜单项
        return preValue
    }, [])
}

function LeftNav (_window) {
    const [openKeys, setOpenKeys] = useState('')
    // 设置选中的菜单项Item
    let path = _window.location.pathname
    if(path === '/') {
        path = '/home'
    }else if (path.indexOf('/uploadfile')===0){
        path = '/uploadfile'
    }
    // 当path变化时，修改openKeys
    useEffect(() => {
        const subMenu = routeConfig.find(item => item.path === path) || {}
        setOpenKeys(subMenu.id)
    }, [path])

    return(
        <>
        <div className="logo" >
            <WechatOutlined className="icon"/>微信签署
        </div>
        <Menu 
            // 选中的菜单项 Menu.Item
            selectedKeys={[path]}
            // 打开的子菜单 Menu.SubMenu
            openKeys={[openKeys]}
            mode="inline" 
            style={{backgroundColor:'#fafafa'}}
        >
            {/* 生成左侧导航内容 ReactNodes */}
            { generateMenuItem(menuConfig, setOpenKeys, openKeys) }
        </Menu>
        </>
    )
}

export default withRouter(LeftNav)