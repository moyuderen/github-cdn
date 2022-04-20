import { useConfigStore } from '@/store/config'

export function useConfigHook() {
  const configStore = useConfigStore()
  return {
    config: configStore.config,
    setConfig: configStore.setConfig,
  }
}
