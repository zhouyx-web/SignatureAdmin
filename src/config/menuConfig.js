import {
    UnorderedListOutlined,
    EditOutlined,
    FileAddOutlined,
    UploadOutlined,
    FileTextOutlined,
    FolderAddOutlined,
    FolderOutlined,
    FolderOpenOutlined,
    HomeOutlined
} from '@ant-design/icons'

const menuConfig = [
    {
        title: '首页',
        icon: <HomeOutlined />,
        path: '/home'
    },
    {
        title: '创建面签',
        icon: <EditOutlined />,
        path: '/creator',
        children: [
            {
                title: '新建面签',
                icon: <FileAddOutlined />,
                path: '/newfile'
            },
            {
                title: '上传文件',
                icon: <UploadOutlined />,
                path: '/upload'
            },
            {
                title: '使用模板',
                icon: <FileTextOutlined />,
                path: '/templet'
            },
        ]
    },
    {
        title: '我的面签',
        icon: <UnorderedListOutlined />,
        path: '/manage',
        children: [
            {
                title: '未发布',
                icon: <FolderAddOutlined />,
                path: '/unpublish',
            },
            {
                title: '进行中',
                icon: <FolderOpenOutlined />,
                path: '/ongoing',
            },
            {
                title: '已结束',
                icon: <FolderOutlined />,
                path: '/complete',
            },
        ]
    },
]

export default menuConfig