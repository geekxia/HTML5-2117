import loadable from '@loadable/component'
import {
  AppstoreOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons'

import { FormattedMessage } from 'react-intl'

const Dashboard = loadable(()=>import('./dashboard'))

const GoodList = loadable(()=>import('./good/GoodList'))
const GoodForm = loadable(()=>import('./good/GoodForm'))

const UserList = loadable(()=>import('./user/UserList'))
const UserInfo = loadable(()=>import('./user/UserInfo'))

export default [
  {
    id: 9,
    title: '我的面板',
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 901,
        title: '数据统计',
        path: '/dashboard',
        component: Dashboard,
      }
    ]
  },
  {
    id: 10,
    title: <FormattedMessage id='menu.good' />,
    icon: <AppstoreOutlined />,
    children: [
      {
        id: 1001,
        title: <FormattedMessage id='menu.good.list' />,
        path: '/good/list',
        component: GoodList,
        children: [
          {
            id: 1002,
            title: '商品新增',
            path: '/good/add',
            component: GoodForm,
            notMenu: true
          },
          {
            id: 1003,
            title: '商品编辑',
            path: '/good/edit/:id',
            component: GoodForm,
            notMenu: true
          }
        ]
      },

    ]
  },
  {
    id: 11,
    title: '用户管理',
    icon: <PieChartOutlined />,
    children: [
      {
        id: 1101,
        title: '用户列表',
        path: '/user/list',
        component: UserList
      },
      {
        id: 1102,
        title: '用户详情',
        path: '/user/info',
        component: UserInfo
      },
    ]
  }
]
