import { ref } from 'vue';
import Cdn from '../core/index';
import type { CreateConfig } from '../core/api/create-file';
import { ElNotification } from 'element-plus';
import { ElMessage } from 'element-plus';
import { parseFile } from '../utils/file';

export async function useCreateRepo(
  cdn: Cdn,
  config: CreateConfig,
  rawFile: File,
) {
  const record = await parseFile(rawFile);

  cdn.createFile(
    {
      ...config,
      path: `${record.name}`,
      onsuccess() {
        ElMessage({
          message: '上传成功 !',
          type: 'success',
        });
      },
      onerror(error, options) {
        if (error.status === 422) {
          ElNotification({
            title: 'Error',
            message: '已存在该文件',
            type: 'error',
          });
        }
      },
    },
    record.peerBase64,
  );
}
