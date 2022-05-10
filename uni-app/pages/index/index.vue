<template>
	<view>
		<view class='box' v-text='title'></view>
		<u-button v-if='!isLoc' text="月落" type='primary' @click='setLoc'>设置地址</u-button>
		<button open-type='share'>拼团</button>
		<view v-for='row in list'>
			<view class="row" :key='row.id' v-text='row.title' @tap='skipTo(row)'></view>
		</view>
		<view id='aa'></view>
		<button @tap='start1'>开始动画</button>
		<canvas type="2d" id="result" class='canvas'></canvas>
		<button @tap='saveTo'>保存到相册</button>
		<!-- <button open-type='openSetting'>手动打开授权</button> -->
		<button @tap='getSS'>打开授权</button>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				title: 'Hello',
				isLoc: true,
				list: [
					{id:1,title:'第一篇文章'},
					{id:2,title:'第二篇文章'},
					{id:3,title:'第三篇文章'},
					{id:4,title:'第四篇文章'}
				]
			}
		},
		computed: {
			...mapState('study', ['msg'])
		},
		onShow () {
			uni.getLocation({
				success: res => {
					console.log('当前用户的经纬度', res)
				}
			})
			uni.getSetting({
				success: res => {
					this.isLoc = res.authSetting['scope.userLocation']
				}
			})
		},
		onReady () {
			// console.log('--msg', this.msg)
			console.log(this.rpx2px(375))
			// 画布初始化
			const query = uni.createSelectorQuery()
			// console.log('---query', query)
			query.select('#result')
      	.fields({ node: true, size: true })
      	.exec((res) => {
					// canvas就是DOM
	        const canvas = res[0].node
					this.canvas = canvas
	        const ctx = canvas.getContext('2d')
					// 通过这种方式得到“画笔”，然后就可以使用MDN文档中的Canvas API

					// 在小程序中，画布API只支持px做单位，但是为了手机样式兼容

	        // const dpr = uni.getSystemInfoSync().pixelRatio
	        // canvas.width = res[0].width * dpr
	        // canvas.height = res[0].height * dpr
	        // ctx.scale(dpr, dpr)

					// 画图形
					const p1x = this.rpx2px((750-50)/2)
					const p1y = this.rpx2px((500-60)/2)
					const w1 = this.rpx2px(50)
					const h1 = this.rpx2px(60)
					ctx.strokeStyle = 'blue'
	        ctx.strokeRect(p1x, p1y, w1, h1)
					// 画文字
					ctx.fillStyle = 'red'
					ctx.font = `bold ${this.rpx2px(30)}px serif`
					ctx.fillText('千锋', 0, this.rpx2px(60))
					// 画图片（）
					this.getImage('https://img10.360buyimg.com/seckillcms/s500x500_jfs/t1/27758/23/15909/60548/6267d1b0E49c93145/a89522e21e2ad2dd.jpg').then(img=>{
						ctx.drawImage(img,100, 0, 100, 150)
					})
      	})

		},
		onPullDownRefresh () {
			console.log('--下拉了')
		},
		onReachBottom () {
			console.log('--到底了，该分页了')
		},
		onShareAppMessage (res) {
			console.log('分享', res)
			if (res.from==='button') {
				return {
					title: `张三邀请你参与拼团`,
					path: '/pages/order/order',
					imageUrl: 'https://img13.360buyimg.com/babel/s580x740_jfs/t1/92557/10/15252/173783/60a60c58Eaec1cb70/466903cb1e5a5d82.jpg!cc_290x370.webp'
				}
			} else {
				return {
					title: `我发现一个好吃的小程序`,
					path: '/pages/order/order',
					imageUrl: 'https://img13.360buyimg.com/babel/s580x740_jfs/t1/92557/10/15252/173783/60a60c58Eaec1cb70/466903cb1e5a5d82.jpg!cc_290x370.webp'
				}
			}
		},
		methods: {
			rpx2px (x) {
				const res = uni.getSystemInfoSync()
				console.log('手机信息', res)
				const win = res.windowWidth  // 375px
				// UI  750px
				return x*win/750
			},
			// 用于支持最新drawImage()写法
	    async getImage(path) {
	        const c = uni.createOffscreenCanvas({type: '2d'})
	        const image = c.createImage()
	        await new Promise(resolve => {
	            image.onload = resolve
	            image.src = path
	        })
	        return image
	    },
			setLoc () {
				uni.openSetting({
					success: res => {
						console.log('用户在内置授权页面中，同意了位置授权')
					},
					fail: err => {
						console.log('用户在内置授权页面中，没有操作')
					}
				})
			},
			skipTo (row) {
				console.log('--row', row)
				uni.navigateTo({
					url: '/pages/detail/detail?id='+row.id
				})
			},
			start1 () {
				console.log('-----11', typeof this.animate)
				// this.animate('#container', [
			  //   { opacity: 1.0, rotate: 0, backgroundColor: '#FF0000' },
			  //   { opacity: 0.5, rotate: 45, backgroundColor: '#00FF00'},
			  //   { opacity: 0.0, rotate: 90, backgroundColor: '#FF0000' },
			  //   ], 5000, function () {
			  //     this.clearAnimation('#container', { opacity: true, rotate: true }, function () {
			  //       console.log("清除了#container上的opacity和rotate属性")
			  //     })
			  // }.bind(this))
			},
			getSS () {
				// 把临时路径中的图片保存到相册
				uni.getSetting({
					success(res) {
						if (!res.authSetting['scope.writePhotosAlbum']) {
							uni.openSetting({
								success() {
									console.log('--')
								}
							})
						}
					}
				})
			},
			saveTo () {
				// 裁剪
				uni.canvasToTempFilePath({
						// 指定“裁剪”区域
            x: 0,
            y: 0,
            width: this.rpx2px(750),
            height: this.rpx2px(500),
						// 输出图片的尺寸
            destWidth: 1500,
            destHeight: 1000,
						// 指定操作哪张画布
            canvas: this.canvas,
            success(res) {
              uni.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath
              })
            }
        })
			}
		}
	}
</script>

<style lang='scss'>
	.canvas {
		border: 1rpx solid #cccccc;
		width: 100%;
		height: 500rpx;
	}
	$c: red;
	.box {
		color: $c;
	}
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.row {
		line-height: 80rpx;
		text-align: center;
	}
</style>
