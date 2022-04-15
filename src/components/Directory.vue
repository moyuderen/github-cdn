<template>
  <div class="breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="breadcrumb in directoryBreadcrumb">
        {{ breadcrumb }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>

  <div v-for="item in directoryList" :key="item.name">
    <el-link
      v-if="directoryType.Dir === item.type"
      type="primary"
      @click="openDir(item)"
    >
      <el-icon class="icon"><Folder /></el-icon>
      {{ item.name }}
    </el-link>
    <el-link v-if="directoryType.File === item.type" type="info">
      <el-icon v-if="isImageUrl(item.name)" class="icon picture">
        <Picture />
      </el-icon>
      <el-icon v-else class="icon"><Document /></el-icon>
      <div :class="{ picture: isImageUrl(item.name) }">
        {{ item.name }}
      </div>
    </el-link>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue';
import { Folder, Document, Picture } from '@element-plus/icons-vue';
import { isImageUrl } from '../utils/file';
enum DirectoryType {
  File = 'file',
  Dir = 'dir',
}

type Type<T> = T[keyof T];

interface Directory {
  download_url: string;
  git_url: string;
  name: string;
  path: string;
  sha: string;
  size: number;
  type: Type<DirectoryType>;
  url: string;
}

const props = defineProps({
  list: {
    type: Array as PropType<Directory[]>,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(['openDir']);

const directoryType = DirectoryType;

const directoryList = computed(() => {
  let dirs = [];
  let files = [];
  props.list.forEach((item: Directory) => {
    if (item.type === DirectoryType.File) {
      files.push(item);
    }
    if (item.type === DirectoryType.Dir) {
      dirs.push(item);
    }
  });

  return dirs.concat(files);
});

const directoryBreadcrumb = ref(['root']);
const openDir = (dir) => {
  directoryBreadcrumb.value.push(dir.name);
  emits('openDir', dir.name);
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  min-width: 360px;
  margin-top: 20px;
  margin-bottom: 10px;
}

:deep(.el-breadcrumb) {
  font-size: 18px;
  cursor: pointer;
}

.icon {
  margin-right: 4px;
}
.picture {
  color: orange;
}
</style>
