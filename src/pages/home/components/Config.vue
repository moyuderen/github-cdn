<template>
  <el-form
    label-width="120px"
    ref="ruleFormRef"
    label-suffix=":"
    label-position="left"
  >
    <el-form-item label="Token" prop="token">
      {{ config.token }}
    </el-form-item>
    <el-form-item label="Owner" prop="owner">
      {{ config.owner }}
    </el-form-item>
    <el-form-item label="Repo" prop="repo">
      {{ config.repo }}
    </el-form-item>
    <el-form-item label="Branch">
      {{ config.branch }}
    </el-form-item>
    <el-form-item label="Commit message" v-if="config.message">
      {{ config.message }}
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { useConfigStore } from '@/store/config'
const config = useConfigStore().config
</script>
