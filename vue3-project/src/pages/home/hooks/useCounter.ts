// 描述：这是计数器功能

import { ref } from 'vue'

const useCounter = arg => {
  const num = ref(arg || 0)

  const numChange = arg => {
    num.value += arg
  }

  return [num, numChange]
}

export default useCounter
