import { ref } from 'vue'
import { Cdn, JsDelivr } from '../../core/index'
import { GithubRep } from '../../core/interface'
import type { CreateConfig } from '../../core/cdn/create-file'
import { isGithubFile } from '../../core/utils'
import { useReposStore } from '@/store/repos'
const reposStore = useReposStore()

const jsDelivr = new JsDelivr()
export function useGetRepos(sdk: Cdn, config: CreateConfig) {
  let reposList = ref([])
  let loading = ref(false)

  const getRepos = async (path: string = '') => {
    loading.value = true
    try {
      const { data } = await sdk.getFile({ ...config, path })
      reposList.value = (data || []).map((item: GithubRep) => {
        return isGithubFile(item.type)
          ? Object.assign(item, {
              jsdelivr_url: jsDelivr.transformToJsDelivr(item.html_url),
              jsdelivr_url_md: `[${item.name}](${jsDelivr.transformToJsDelivr(
                item.html_url,
              )})`,
              download_url_md: `[${item.name}](${item.download_url})`,
            })
          : item
      })
    } catch {
      //
    } finally {
      loading.value = false
    }
  }

  getRepos(reposStore.path)

  return {
    loading,
    getRepos,
    reposList,
  }
}
