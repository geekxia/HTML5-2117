const baseURL = 'http://localhost:9999'  // 上线时，要改成https的线上URL
const version = '/api/v1'

export default function request(url,method='GET',data) {
  return new Promise((resolve,reject)=>{
    uni.request({
      url: baseURL + version + url,
      method,
      data,
      headers: {
        'X-Token': uni.getStorageSync('token')
      },
      success: res => {
        // 根据业务状态判断成功与失败
        // 数据过滤
        resolve(res)
      },
      fail: err => {
        // 提示用户为什么失败
        reject(err)
      }
    })
  })
}
