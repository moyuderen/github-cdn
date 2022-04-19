<template>
  <el-form label-width="120px" ref="ruleFormRef">
    <el-form-item label="token" prop="token">
      {{ config.token }}
    </el-form-item>
    <el-form-item label="owner" prop="owner">
      {{ config.owner }}
    </el-form-item>
    <el-form-item label="repo" prop="repo">
      {{ config.repo }}
    </el-form-item>
    <el-form-item label="branch">
      {{ config.branch }}
    </el-form-item>
    <el-form-item label="path">
      {{ config.path }}
    </el-form-item>
    <el-form-item label="message">
      {{ config.message }}
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useConfig from '@/store/config'
const { config } = storeToRefs(useConfig())
</script>
