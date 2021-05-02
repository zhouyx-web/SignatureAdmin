import Home from '../pages/home/home'
import NewFile from '../pages/newfile/newfile'
import Upload from '../pages/upload/upload'
import Templet from '../pages/templet/templet'
import UnPublish from '../pages/unpublish/unpublish'
import OnGoing from '../pages/ongoing/ongoing'
import Complete from '../pages/complete/complete'

const routeConfig = [
    { id:'/home', path:'/home', component: Home},
    { id:'/creator', path:'/newfile', component: NewFile },
    { id:'/creator', path:'/upload', component: Upload },
    { id:'/creator', path:'/templet', component: Templet },
    { id:'/manage', path:'/unpublish', component: UnPublish },
    { id:'/manage', path:'/ongoing', component: OnGoing },
    { id:'/manage', path:'/complete', component: Complete },
]

export default routeConfig