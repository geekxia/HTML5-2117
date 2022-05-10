<template>
  <h1>我是首页</h1>
  <div class='lang' >
    <span
      v-for='item in langList'
      :key='item.id'
      @click='change(item.value)'
      :class='{"on": item.value===lang}'
      v-text='item.label'>
    </span>
  </div>
  <h1>当前语法环境是：{{ langZH }}</h1>
  <hr>
  <h1 v-text='num'></h1>
  <button @click='setNum(-1)'>自减</button>
  <button @click='setNum(1)'>自增</button>
  <hr>

  <h1 v-text='age'></h1>
  <button @click='setAge(-5)'>自减</button>
  <button @click='setAge(10)'>自增</button>

</template>

<script setup>

  import useLang from './hooks/useLang.ts'
  import useCounter from './hooks/useCounter.ts'
  // 功能一
  const { lang, langList, change, langZH } = useLang()
  // 功能二
  const [num, setNum] = useCounter(100)
  const [age, setAge] = useCounter(50)

</script>



<style lang='scss'>
.lang {
  width: 4rem;
  display: flex;
  margin: 0 auto;
  &>span {
    flex: 1;
    text-align: center;
    line-height: .8rem;
    border: 1px solid #ccc;
    font-size: .4rem;
  }
  &>span.on {
    color: red;
  }
}
</style>

<style>
</style>
