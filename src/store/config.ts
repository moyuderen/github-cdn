import { defineStore } from 'pinia'
import { Config } from '@/cdn-sdk/cdn/index'
interface ConfigState {
  config: Config
}
export const useConfigStore = defineStore('config', {
  state: (): ConfigState => {
    return {
      config: {
        token: '',
        owner: '',
        repo: '',
        branch: 'main',
      },
    }
  },
  actions: {
    setConfig(config: Config) {
      this.config = Object.assign(this.config, config)
    },
  },
})
