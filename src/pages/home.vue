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

    {{ reposList }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { UploadFilled } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import useConfigStore from '../store/config';
import Cdn from '../core/index';
import { useGetRepos } from './useGetRepos';
import { useCreateRepo } from './createRepo';

const { config } = storeToRefs(useConfigStore());

const cdn = new Cdn({
  token: config.value.token,
});

const { reposList } = useGetRepos(cdn, config.value);

const beforeUpload = async (rawFile) => {
  useCreateRepo(cdn, config.value, rawFile);
  return;
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
}
</style>
