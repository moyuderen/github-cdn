import { defineStore } from 'pinia';
import type { CreateConfig } from '../core/api/create-file';

interface State {
  config: CreateConfig;
}

export default defineStore('config', {
  state: (): State => {
    return {
      config: {
        token: '',
        owner: '',
        repo: '',
        branch: '',
        path: '',
        message: '',
      },
    };
  },
  actions: {
    setConfig(config: CreateConfig) {
      this.config = Object.assign(this.config, config);
    },
  },
});
