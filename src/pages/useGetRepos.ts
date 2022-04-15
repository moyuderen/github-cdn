import { ref } from 'vue';
import Cdn from '../core/index';
import type { CreateConfig } from '../core/api/create-file';

export function useGetRepos(sdk: Cdn, config: CreateConfig) {
  let reposList = ref([]);
  const getRepos = () => {
    sdk.getFile({
      ...config,
      onsuccess({ data }) {
        reposList.value = data;
      },
    });
  };

  getRepos();

  return {
    reposList,
  };
}
