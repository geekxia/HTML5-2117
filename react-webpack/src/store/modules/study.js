// 子store

import { makeAutoObservable } from 'mobx'

export default class StudyStore {
  constructor () {
    makeAutoObservable(this)
  }

  msg = 'hello mobx'

  changeMsg (payload) {
    this.msg = payload
  }
}
