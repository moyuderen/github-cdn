import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => {
    return {
      showDrawer: false,
    };
  },
  actions: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer;
    },
  },
});
