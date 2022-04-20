import { createSdk } from '@/cdn-sdk/index'
import { useConfigHook } from '@/hooks/useConfigHook'
import { storage, Config_Key } from '@/utils/storage'

export function init() {
  const { config, setConfig } = useConfigHook()
  const localConfig = storage.get(Config_Key)
  if (localConfig) {
    setConfig(localConfig)
  }
  return createSdk(config)
}
