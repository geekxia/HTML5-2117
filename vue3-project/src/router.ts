import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

// 路由懒加载
const Study = () => import('@/pages/study/Study.vue')
const Home = () => import('@/pages/home/Home.vue')
const Find = () => import('@/pages/find/Find.vue')

const router = createRouter({
  history: createWebHashHistory(),  // hash模式
  // history: createWebHistory(),  // history模式
  routes: [
    { path: '/', component: Study },
    { path: '/home', component: Home },
    { path: '/find', component: Find },

  ]
})

export default router
