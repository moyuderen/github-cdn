<template>
  <div class="login">
    <el-alert
      title="请配置 github仓库 相关信息"
      type="warning"
      center
      show-icon
      :closable="false"
    />

    <h4>1. Owner： 仓库拥有者</h4>
    <h4>2. Repo：仓库名称</h4>
    <h4>3. Token</h4>
    <el-steps
      :active="active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="Step 1" @click="active = 1" />
      <el-step title="Step 2" @click="active = 2" />
      <el-step title="Step 3" @click="active = 3" />
    </el-steps>

    <div class="step-content">
      <div v-if="active === 1" class="image">
        <img
          src="https://raw.githubusercontent.com/moyuderen/github-cdn/main/CDN/githu-token-create/WechatIMG874.png"
        />
      </div>
      <div v-if="active === 2" class="image">
        <img
          src="https://raw.githubusercontent.com/moyuderen/github-cdn/main/CDN/githu-token-create/WechatIMG875.png"
        />
      </div>
      <div v-if="active === 3" class="image">
        <img
          src="https://raw.githubusercontent.com/moyuderen/github-cdn/main/CDN/githu-token-create/WechatIMG876.png"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Edit, Picture, UploadFilled } from '@element-plus/icons-vue'

const active = ref(1)
</script>

<style lang="scss" scoped>
.step-content {
  margin-top: 30px;
  .image {
    display: flex;
    justify-content: center;
    img {
      width: 1000px;
    }
  }
}
</style>
