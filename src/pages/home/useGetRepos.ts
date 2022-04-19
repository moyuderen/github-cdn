import { ref } from 'vue'
import { Cdn, JsDelivr } from '../../core/index'
import { GithubRep } from '../../core/interface'
import type { CreateConfig } from '../../core/cdn/create-file'
import { isGithubFile } from '../../core/utils'

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
              js_delivr_url: jsDelivr.transformToJsDelivr(item.html_url),
            })
          : item
      })
    } catch {
      //
    } finally {
      loading.value = false
    }
  }

  getRepos()

  return {
    loading,
    getRepos,
    reposList,
  }
}
