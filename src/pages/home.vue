<template>
  <div class="home">
    <el-upload drag action="#" multiple :before-upload="beforeUpload">
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
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { ElMessage } from 'element-plus';

import { parseFile } from '../utils/file';
import Cdn from '../core/index';

const cdn = new Cdn({
  token: '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',
});

const beforeUpload = async (rawFile) => {
  const record = await parseFile(rawFile);
  console.log(await cdn.createFile(record.peerBase64));
  //   const { documentation_url, message, commit, content } = await cdn.createFile(
  //     record.peerBase64,
  //   );
  //   if (documentation_url) {
  //     ElNotification({
  //       title: 'Error',
  //       message,
  //       type: 'error',
  //     });
  //     return;
  //   }
  //   ElMessage({
  //     message: '上传成功 !',
  //     type: 'success',
  //   });
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
