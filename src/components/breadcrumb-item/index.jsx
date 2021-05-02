import { Menu } from 'antd'
import {Link} from 'react-router-dom'

import menuConfig from '../../config/menuConfig'

export default function BreadItem (path){
    // 找到子菜单对象
    const subMenu = menuConfig.find(item => item.path === path)
    // 生成子菜单
    return (
        <Menu>
            {
            subMenu.children.map(subItem => {
                return (
                    <Menu.Item key={subItem.path}>
                        <Link to={subItem.path}>{subItem.title}</Link>
                    </Menu.Item>
                )
            })
            }
        </Menu>
    )
}