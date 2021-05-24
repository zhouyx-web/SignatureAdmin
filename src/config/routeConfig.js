import Home from '../pages/home/home'
import Upload from '../pages/upload/home'
import NewFile from '../pages/newfile/newfile'
import Templet from '../pages/templet/templet'
import UnPublish from '../pages/unpublish/unpublish'
import OnGoing from '../pages/ongoing/ongoing'
import Complete from '../pages/complete/home'

// 用来主页面路由注册 <Route> 和菜单匹配
const routeConfig = [
    { id:'/home', path:'/home', component: Home},
    { id:'/creator', path:'/newfile', component: NewFile },
    { id:'/creator', path:'/uploadfile', component: Upload },
    { id:'/creator', path:'/templet', component: Templet },
    { id:'/manage', path:'/unpublish', component: UnPublish },
    { id:'/manage', path:'/ongoing', component: OnGoing },
    { id:'/manage', path:'/complete', component: Complete },

]

export default routeConfig