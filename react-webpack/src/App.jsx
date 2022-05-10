import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'mobx-react'
import store from '@/store'

import '@/styles/init.scss'

import routes from '@/views'
import Layout from '@/layout'

// 生成路由匹配规则
const createRoutes = () => {
  let result = []
  routes.forEach(ele=>{
    if (ele.routes) {
      ele.routes.forEach(ele=>{
        result.push(
          <Route key={ele.id} path={ele.path} element={ele.element} />
        )
      })
    }
  })
  return result
}

function App () {

  return (
    <HashRouter>
      <Provider {...store}>
        <Routes>
          <Route path='/' element={<Layout />}>
            { createRoutes() }
            <Route path='*' element={<div>页面走丢了</div>} />
          </Route>
        </Routes>
      </Provider>

    </HashRouter>
  )
}

export default App
