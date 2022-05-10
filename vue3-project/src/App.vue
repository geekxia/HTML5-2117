<template>
  <!-- 路由的视图容器 -->
  <suspense>
    <router-view />
    <template #fallback>
      <h1>加载中。。。</h1>
    </template>
  </suspense>

</template>

<script setup>
  import { provide, defineProps } from 'vue'
  provide('msg', 2022)
  const props = defineProps({
    version: { type: String, default: '' }
  })
  console.log('app props', props)

  provide('info', {a:100,b:200})
  provide('list', [4,5,6])
</script>

<style lang='scss'>
html, body {
  padding: 0; margin: 0;
  font-size: .43rem;
  text-align: center;
}
</style>
