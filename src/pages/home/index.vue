<template>
  <div class="home">
    <el-drawer v-model="showFile" title="File Info" size="800px">
      <File
        :file="fileInfo"
        @getList="getList"
        @close="showFile = false"
      ></File>
    </el-drawer>

    <div class="detail">
      <Config />
      <el-upload
        drag
        action="#"
        :multiple="false"
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
      <el-button type="primary" @click="getList">Refresh</el-button>
      <el-button type="primary" @click="openCreateDir">Create dir</el-button>
    </div>
    <CreateDir ref="createDirComp" @getList="getList" />
    <Rename ref="renameComp" @rename="createFile"></Rename>
    <Directory
      :list="reposList"
      @openDir="openDir"
      @openFile="openFile"
      v-loading="loading"
      @getList="getList"
      element-loading-text="loading..."
    ></Directory>
  </div>
</template>

<script setup lang="ts">
// libs
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import { ElNotification, ElMessage } from 'element-plus'
import { cdnSdk } from '@/main'
import { useReposStore } from '@/store/repos'
// hooks
import { useGetFiles } from './hooks/useGetFiles'
// components
import Directory from './components/Directory.vue'
import Config from './components/Config.vue'
import File from './components/File.vue'
import CreateDir from './components/CreateDir.vue'
import Rename from './components/Rename.vue'

const { loading, reposList, getList } = useGetFiles()

const checkExisting = (rawFile) => {
  return reposList.value.some((item) => {
    return rawFile.name === item.name
  })
}

let currentFile
const renameComp = ref(null)
async function beforeUpload(rawFile) {
  if (checkExisting(rawFile)) {
    ElNotification({
      title: 'Error',
      message: `已经存在${rawFile.name}`,
      type: 'error',
    })
    return
  }
  currentFile = rawFile
  renameComp.value.toggle(rawFile.name)
  return false
}

async function createFile(name) {
  try {
    await cdnSdk.createFile(currentFile, useReposStore().path, name)
    getList()
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
}

let showFile = ref(false)
let fileInfo = ref(null)
function openFile(file) {
  showFile.value = true
  fileInfo.value = file
}

function openDir() {
  getList()
}

const createDirComp = ref(null)
function openCreateDir() {
  createDirComp.value.toggle()
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
