<template>
  <div class="layout">
    <el-container class="container">
      <!-- <Aside></Aside> -->
      <el-container direction="vertical">
        <Header></Header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <Drawer>
      <Config />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import Header from './Header.vue'
import Drawer from './Drawer.vue'
import Config from './Config.vue'
</script>

<style lang="scss" scoped>
.layout {
  height: 100vh;
}

.container {
  height: 100%;
}
</style>
