<template>
  <el-drawer
    v-model="showDrawer"
    title="I'm outer Drawer"
    :size="500"
    :show-close="false"
  >
    <template v-slot:title>
      <div class="config">
        <div>Config</div>
        <el-icon @click="close" class="icon">
          <circle-close />
        </el-icon>
      </div>
    </template>
    <Config />
  </el-drawer>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { CircleClose } from '@element-plus/icons-vue';
import Config from './Config.vue';
import { useMainStore } from '../store/main';

const mainStore = useMainStore();
const { showDrawer } = storeToRefs(mainStore);

const close = () => {
  mainStore.toggleDrawer();
};
</script>

<style lang="scss" scoped>
.config {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  cursor: pointer;
}
</style>
