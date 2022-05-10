// 描述：useLang()是语言切换功能

import { ref, reactive, computed, watch } from 'vue'

const useLang = () => {
  const lang = ref('zh')
  const langList = reactive([
    { id: 1, value: 'zh', label: '中文' },
    { id: 2, value: 'en', label: '英文' },
    { id: 3, value: 'fr', label: '法语' }
  ])
  const change = (val) => {
    lang.value = val
  }
  watch(lang, (newLang, oldLang) => {
    console.log('Lang Changed', newLang, oldLang)
    console.log('我要调接口')
  })
  const langZH = computed(()=>{
    const res = langList.find(ele=>ele.value === lang.value)
    console.log('res', res)
    return res.label
  })
  // 返回视图（指令）要用的变量
  return {
    lang,
    langList,
    change,
    langZH
  }
}

export default useLang
