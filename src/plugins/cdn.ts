import { Cdn } from '@/core/index'
import { useConfigStore } from '@/store/config'
import { storage, Config_Key } from '@/utils/storage'

export function setupCdn(app) {
  const configStore = useConfigStore()
  const configure = storage.get(Config_Key)
  if (configure) {
    configStore.setConfig(configure)
  }
  const cdn = new Cdn({
    token: configStore.config.token,
  })
  app.config.globalProperties.cdn = cdn
}
