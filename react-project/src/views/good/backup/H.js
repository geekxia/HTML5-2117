import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { addCount, subCount, getQQList } from '@/store/actions'

export default () => {

  const dispatch = useDispatch()
  const { list } = useSelector(state=>state.study)

  useEffect(()=>{
    dispatch(getQQList())
  }, [])

  return (
    <div>
      ๅๅๅ่กจ
      {
        list.map(ele=>(
          <div key={ele.n}>{ele.k}</div>
        ))
      }
    </div>
  )
}
