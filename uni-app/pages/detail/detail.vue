<template>
  <!-- 承载一个H5网页 -->
  <web-view :src='`https://item.m.jd.com/product/4544060.html?_fd=jdm&cover=jfs/t1/149926/28/27332/324966/626a63c8E769b0bbd/8f9d9ebcf9ef41da.jpg&ptag=${id}`'></web-view>

  <!-- <web-view src='hybrid/html/article.html' @message='send' @onPostMessage='recieve'></web-view> -->

</template>

<script>
export default {
  data () {
    return {
      id: ''
    }
  },
  onLoad (opt) {
    const id = opt.id
    console.log('----', id)
    this.id = id
  },
  methods: {
    send () {

    },
    recieve () {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
