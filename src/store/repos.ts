import { defineStore } from 'pinia'

export const useReposStore = defineStore('repos', {
  state: () => {
    return {
      path: '',
    }
  },
  actions: {
    setPath(path) {
      this.path = path
    },
  },
})
