import { defineStore } from 'pinia'
import type { CreateConfig } from '../core/octokit/create-file'

interface State {
  config: CreateConfig
}

export const useConfigStore = defineStore('config', {
  state: (): State => {
    return {
      config: {
        token: '',
        owner: '',
        repo: '',
        branch: '',
        message: '',
      },
    }
  },
  actions: {
    setConfig(config: CreateConfig) {
      this.config = Object.assign(this.config, config)
    },
  },
})
