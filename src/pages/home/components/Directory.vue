<template>
  <div class="directory">
    <div class="breadcrumb">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item
          v-for="(breadcrumb, index) in directoryBreadcrumb"
          @click="jumpDir(breadcrumb, index)"
        >
          {{ breadcrumb }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="file-box">
      <div v-for="item in directoryList" :key="item.name" class="file">
        <el-dropdown
          trigger="contextmenu"
          placement="top-start"
          @command="handleCommand"
          :hide-on-click="false"
        >
          <span class="el-dropdown-link">
            <div v-if="directoryType.Dir === item.type" @click="openDir(item)">
              <img src="../../../assets/dir.png" alt="" />
            </div>
            <div v-if="directoryType.File === item.type">
              <div v-if="isImageUrl(item.name)">
                <el-image
                  lazy
                  style="width: 44px; height: 44px; border-radius: 4px"
                  :src="item.download_url"
                  fit="fill"
                  :preview-src-list="[item.download_url]"
                ></el-image>
              </div>
              <img v-else src="../../../assets/file.png" alt="" />
            </div>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :command="{
                  type: 'delete',
                  detl: item,
                }"
              >
                删除
              </el-dropdown-item>
              <el-dropdown-item
                :command="{
                  type: 'rename',
                  detl: item,
                }"
              >
                重命名（todo）
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

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
import { ref, unref, computed, PropType } from 'vue'
import type { Ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Folder,
  Document,
  Picture,
  Delete,
  ArrowRight,
} from '@element-plus/icons-vue'
import { isImageUrl } from '../../../utils/file'
import useConfigStore from '../../../store/config'
import { storeToRefs } from 'pinia'
const { config } = storeToRefs(useConfigStore())

enum DirectoryType {
  File = 'file',
  Dir = 'dir',
}

type Type<T> = T[keyof T]

interface Directory {
  download_url: string
  git_url: string
  name: string
  path: string
  sha: string
  size: number
  type: Type<DirectoryType>
  url: string
}

const props = defineProps({
  list: {
    type: Array as PropType<Directory[]>,
    default() {
      return []
    },
  },
  cdn: {
    type: Object,
    default: null,
  },
  config: {
    type: Object,
    default: null,
  },
})

const emits = defineEmits(['openDir', 'getList'])

const directoryType = DirectoryType

const directoryList = computed(() => {
  let dirs = []
  let files = []
  props.list.forEach((item: Directory) => {
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
  const [root, ...paths] = directoryBreadcrumb.value
  pathName.value = paths.join('/')

  emits('openDir', pathName.value)
}

const jumpDir = (dir, index) => {
  const length = directoryBreadcrumb.value.length
  if (index === length - 1) {
    return
  }

  directoryBreadcrumb.value = directoryBreadcrumb.value.slice(0, index + 1)
  const [root, ...paths] = directoryBreadcrumb.value
  pathName.value = paths.join('/')
  emits('openDir', pathName.value)
}

enum CommandType {
  Delete = 'delete',
  Rename = 'rename',
}

interface Command {
  type: CommandType[keyof CommandType]
  detl: any
}

const handleCommand = (command: Ref<Command>) => {
  const commandInfo = unref(command)
  if (commandInfo.type === CommandType.Delete) {
    const { path, sha } = commandInfo.detl
    ElMessageBox.confirm(
      'proxy will permanently delete the file. Continue?',
      'Warning',
      {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning',
      },
    ).then(async () => {
      await props.cdn.deleteFile({
        ...props.config,
        path,
        sha,
      })
      emits('getList')
      ElMessage({
        type: 'success',
        message: 'Delete completed',
      })
    })
  }
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
}
.file {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
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
