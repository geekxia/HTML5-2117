import React from 'react'

import { NavLink } from 'react-router-dom'
import routes from '@/views'

export default () => {

  // 动态生成菜单结构
  const navs = React.useMemo(()=>{
    return routes.map(ele=>(
      <div className='nav' key={ele.id}>
        <div>{ele.text}</div>
        <div style={{display:'none'}}>
          {
            ele.routes.map(ele=>(
              <div key={ele.id}>
                <NavLink
                  to={`/${ele.path}`}
                  style={({isActive})=>({color:isActive?'red':'black'})}>
                  {ele.text}
                </NavLink>
              </div>
            ))
          }
        </div>
      </div>
    ))
  }, [])

  return (
    <header>
      <div>
        { navs }
      </div>
    </header>
  )
}
