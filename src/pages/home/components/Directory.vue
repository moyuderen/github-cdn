<template>
  <div class="directory">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(breadcrumb, index) in directoryBreadcrumb"
          :key="breadcrumb"
          @click="jumpDir(breadcrumb, index)"
        >
          {{ breadcrumb }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="file-box">
      <div v-for="item in directoryList" :key="item.name" class="file">
        <div v-if="directoryType.Dir === item.type" @click="openDir(item)">
          <img src="../../../assets/dir.png" alt="" />
        </div>
        <div v-if="directoryType.File === item.type">
          <div v-if="isImageUrl(item.name)" @click="openFile(item)">
            <el-image
              lazy
              style="width: 44px; height: 44px; border-radius: 4px"
              :src="item.download_url"
              fit="fill"
            ></el-image>
          </div>
          <img v-else src="../../../assets/file.png" @click="openFile(item)" />
        </div>
        <el-tooltip
          class="box-item"
          effect="dark"
          :content="item.name"
          placement="bottom"
        >
          <div class="file-name">
            {{ item.name }}
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Folder,
  Document,
  Picture,
  Delete,
  ArrowRight,
} from '@element-plus/icons-vue'
import { isImageUrl } from '@/utils/file'
import { useSetPath } from '../hooks/useSetPath'

import { GithubRepo, DirectoryType } from '@/cdn-sdk/types'

const props = defineProps({
  list: {
    type: Array as PropType<GithubRepo[]>,
    default() {
      return []
    },
  },
})

const emits = defineEmits(['openDir', 'openFile', 'getList'])

const directoryType = DirectoryType
const directoryList = computed(() => {
  let dirs = []
  let files = []
  props.list.forEach((item: GithubRepo) => {
    if (item.type === DirectoryType.File) {
      files.push(item)
    }
    if (item.type === DirectoryType.Dir) {
      dirs.push(item)
    }
  })

  return dirs.concat(files)
})

const directoryBreadcrumb = ref(['root'])
let pathName = ref('')

const openDir = (dir) => {
  directoryBreadcrumb.value.push(dir.name)
  useSetPath(directoryBreadcrumb.value)
  emits('openDir')
}

const openFile = (file) => {
  emits('openFile', file)
}
const jumpDir = (dir, index) => {
  const length = directoryBreadcrumb.value.length
  if (index === length - 1) {
    return
  }
  directoryBreadcrumb.value = directoryBreadcrumb.value.slice(0, index + 1)
  useSetPath(directoryBreadcrumb.value)

  emits('openDir')
}
</script>

<style lang="scss" scoped>
.directory {
  min-height: 400px;
}
.breadcrumb {
  min-width: 360px;
  margin-top: 20px;
  margin-bottom: 10px;
}

:deep(.el-breadcrumb__item) {
  font-size: 18px;
  cursor: pointer;
}

.file-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
}
.file {
  display: flex;
  flex-direction: column;
  align-items: center;
  // cursor: pointer; 会导致事件慢
  margin-bottom: 30px;
  margin-right: 10px;

  .file-name {
    text-align: center;
    width: 110px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
    font-size: 12px;
  }
}
</style>
