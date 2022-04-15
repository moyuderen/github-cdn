<template>
  <el-header class="header">
    <div>CDN</div>
    <div>
      <el-button type="primary" @click="openDrawer">
        <el-icon class="icon"><Tools /></el-icon>
        配置
      </el-button>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { Tools } from '@element-plus/icons-vue';
import { useMainStore } from '../store/main';

const main = useMainStore();

const openDrawer = () => {
  main.toggleDrawer();
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgb(220, 223, 230);
}

.icon {
  margin-right: 4px;
}
</style>
