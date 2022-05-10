import { defineConfig, history } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  // 配置式路由（尽量不要使用约定式路由）
  routes: [
    { path: '/', component: '@/pages/dashboard/index' },
    {
      name: '商品管理',
      icon: 'apple',  // <AppstoreOutlined />
      path: '/good',
      // 二级路由
      routes: [
        {
          name: '商品列表',
          path: 'list',
          component: '@/pages/good/list'
        },
        {
          name: '商品新增',
          path: 'add',
          component: '@/pages/good/form'
        }
      ]
    }

  ],
  fastRefresh: {},
  layout: {
    logo: '/logo.png',
    name: '千锋教育',
    siderWidth: 170
  },
  devServer: {
    port: 8080
  },
  dynamicImportSyntax: {},
  favicon: '/favicon.ico',
  hash: true,
  history: { type: 'hash' },
  mfsu: {},
  proxy: {},
  publicPath: './',
  webpack5: {},
  dva: { immer: true }
})
