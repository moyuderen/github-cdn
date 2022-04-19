<template>
  <div class="home">
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
    <Config />
    <Directory
      :list="reposList"
      @openDir="openDir"
      :cdn="cdn"
      :config="config"
      v-loading="loading"
      @getList="getList"
      element-loading-text="获取目录中..."
    ></Directory>
  </div>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue'
import { storeToRefs } from 'pinia'
import useConfigStore from '../../store/config'
import { Cdn } from '../../core/index'
import { useGetRepos } from './useGetRepos'
import { useCreateRepo } from './useCreateRepo'
import Directory from './components/Directory.vue'
import Config from './components/Config.vue'

const { config } = storeToRefs(useConfigStore())

const cdn = new Cdn({
  token: config.value.token,
})

const { loading, reposList, getRepos } = useGetRepos(cdn, config.value)

const beforeUpload = async (rawFile) => {
  try {
    await useCreateRepo(cdn, config.value, rawFile)
    getList('')
  } catch {
    //
  }

  return
}

const openDir = (dirname) => {
  getList(dirname)
}

const getList = (dirname) => {
  getRepos(dirname)
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 40px;
}
</style>
