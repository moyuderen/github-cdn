<template>
  <div class="home">
    <el-drawer v-model="showFile" title="File Info" size="800px">
      <File :file="fileInfo"></File>
    </el-drawer>

    <div class="detail">
      <Config />
      <el-upload
        drag
        action="#"
        multiple
        :before-upload="beforeUpload"
        :show-file-list="false"
      >
        <el-icon class="el-icon--upload"><upload-filled /></el-icon>
        <div class="el-upload__text">
          Drop file here or
          <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            jpg/png files with a size less than 500kb
          </div>
        </template>
      </el-upload>
    </div>
    <div>
      <el-button type="primary" @click="refresh">Refresh</el-button>
    </div>
    <Directory
      :list="reposList"
      @openDir="openDir"
      @openFile="openFile"
      v-loading="loading"
      @getList="getList"
      element-loading-text="获取目录中..."
    ></Directory>
  </div>
</template>

<script setup lang="ts">
// libs
import { ref, getCurrentInstance } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'
// store
import { storeToRefs } from 'pinia'
import { useConfigStore } from '../../store/config'
import { useReposStore } from '@/store/repos'

// hooks
import { useGetRepos } from './useGetRepos'
import { useCreateRepo } from './useCreateRepo'
// components
import Directory from './components/Directory.vue'
import Config from './components/Config.vue'
import File from '@/components/File.vue'

const { config } = storeToRefs(useConfigStore())
const reposStore = useReposStore()

const { proxy } = getCurrentInstance()
const { loading, reposList, getRepos } = useGetRepos(proxy.$cdn, config.value)

const checkExisting = (rawFile) => {
  return reposList.value.some((item) => {
    return rawFile.name === item.name
  })
}
const beforeUpload = async (rawFile) => {
  if (checkExisting(rawFile)) {
    ElNotification({
      title: 'Error',
      message: `已经存在${rawFile.name}`,
      type: 'error',
    })
    return
  }
  try {
    await useCreateRepo(proxy.$cdn, config.value, rawFile)
    getList(reposStore.path)
    ElMessage({
      message: '上传成功 !',
      type: 'success',
    })
  } catch (error: any) {
    ElNotification({
      title: 'Error',
      message: error.message,
      type: 'error',
    })
  }

  return false
}

const getList = (path) => {
  getRepos(path)
}

const openDir = () => {
  getList(reposStore.path)
}

const refresh = () => {
  getList(reposStore.path)
}

const showFile = ref(false)
let fileInfo = ref(null)
const openFile = (file) => {
  showFile.value = true
  fileInfo.value = file
}
</script>

<style lang="scss" scoped>
.home {
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;
}

.detail {
  display: flex;
  justify-content: space-between;
}
</style>
