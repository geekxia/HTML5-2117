<script>
	export default {
		// 小程序风格的生命周期
		onLaunch: function() {
			// App启动时，悄悄登录
			console.log('---')
			uni.login({
				success: res => {
					console.log('---res',res)
					// 拿到code，通过wx.request调接口发送给后端，得到token
					// uni.request()
				}
			})
			// 这是唯一一个可以自动弹出的授权框
			uni.getSetting({
				success: res => {
					console.log('当前的授权情况', res)
					if (!res.authSetting['scope.userLocation']) {
						// 当用户未授权过，弹框请求用户授权
						uni.authorize({
							scope: 'scope.userLocation',
							success: res => {
								console.log('用户点击了同意', res)
							},
							fail: err => {
								console.log('用户点击了拒绝', err)
							}
						})
					}
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
