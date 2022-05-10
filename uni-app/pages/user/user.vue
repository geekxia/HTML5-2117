<template>
  <view>
    <button @tap='getInfo'>获取用户头像</button>
    <button open-type='getPhoneNumber' @getphonenumber='getMobile'>登录</button>
    <button open-type='contact'>联系客户</button>
    <button open-type='feedback'>投诉建议</button>
  </view>


</template>

<script>
export default {
  methods: {
    getInfo () {
      uni.getUserProfile({
        desc: '请求访问你的用户信息',
        success (res) {
          console.log('用户信息', res)
        }
      })
    },
    getMobile (res) {
      console.log('--手机', res)
      // 只对企业小程序，res中是密文
      // request给后端。。。
    }
  }
}
</script>

<style lang="css" scoped>
</style>
