import { ref } from 'vue'
import { cdnSdk } from '@/main'
import { useReposStore } from '@/store/repos'
const loading = ref(false)
const reposList = ref([])

export function useGetFiles() {
  async function getList() {
    try {
      loading.value = true
      reposList.value = await cdnSdk.getFile(useReposStore().path)
    } finally {
      loading.value = false
    }
  }

  getList()

  return {
    loading,
    reposList,
    getList,
  }
}
