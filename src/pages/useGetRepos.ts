import { ref } from 'vue';
import Cdn from '../core/index';
import type { CreateConfig } from '../core/api/create-file';
import { fa } from 'element-plus/lib/locale';

export function useGetRepos(sdk: Cdn, config: CreateConfig) {
  let reposList = ref([]);
  let loading = ref(false);
  const getRepos = (path: string = '') => {
    loading.value = true;
    sdk.getFile({
      ...config,
      path,
      onsuccess({ data }) {
        loading.value = false;
        reposList.value = data;
      },
    });
  };

  getRepos();

  return {
    loading,
    getRepos,
    reposList,
  };
}
