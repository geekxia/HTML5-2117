import request from '@/utils/request'

export function fetchAllCates(params={}) {
  return request({
    url: '/cates',
    method: 'get',
    params
  })
}

// 商品新增与编辑
export function fetchGoodSubmit(data) {
  return request({
    url: '/good/update',
    method: 'post',
    data
  })
}

export function fetchGoodList(params={}) {
  return request({
    url: '/good/list',
    method: 'get',
    params
  })
}

export function fetchGoodInfo(id) {
  return request({
    url: '/good/info',
    method: 'get',
    params: { id }
  })
}

// 支持指删除
export function fetchGoodDel(ids) {
  return request({
    url: '/good/del',
    method: 'post',
    data: { ids }
  })
}
